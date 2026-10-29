import { useState } from 'react'
import middle1Data from '../data/middle1Data'
import QuestionColumn from './QuestionColumn'

const FIXED_COUNT = 50

function getTodayText() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}. ${month}. ${day}.`
}

function getLessonIds(lesson) {
  if (lesson === 'all') {
    return ['5', '6']
  }

  return [lesson]
}

function getLessonLabel(lesson) {
  if (lesson === 'all') {
    return '5·6과 전체'
  }

  return `${lesson}과`
}

function getPoolLabel(pool) {
  if (pool === 'vocab') {
    return '1. 교과서 어휘 목록'
  }

  if (pool === 'defs') {
    return '3. 필수 단어 영영풀이'
  }

  return '1+3 전체'
}

function getDirectionLabel(direction) {
  if (direction === 'ko-en') {
    return '한국어 뜻 → 영어'
  }

  return '영어 → 한국어 뜻'
}

function adaptVocabularyItems(rows, direction) {
  return rows.map((item) => ({
    ...item,

    prompt:
      direction === 'ko-en'
        ? item.prompt
        : item.word,

    answer:
      direction === 'ko-en'
        ? item.word
        : item.prompt,
  }))
}

function adaptDefinitionItems(rows) {
  return rows.map((item) => ({
    ...item,
    prompt: item.prompt,
    answer: item.word,
  }))
}

function getPoolItems(
  lesson,
  pool,
  direction,
) {
  const result = []

  getLessonIds(lesson).forEach((lessonId) => {
    const source = middle1Data[lessonId]

    if (!source) {
      return
    }

    if (pool !== 'defs') {
      result.push(
        ...adaptVocabularyItems(
          source.vocab,
          direction,
        ),
      )
    }

    if (pool !== 'vocab') {
      result.push(
        ...adaptDefinitionItems(source.defs),
      )
    }
  })

  return result
}

function getPoolCounts(lesson) {
  let vocabCount = 0
  let definitionCount = 0

  getLessonIds(lesson).forEach((lessonId) => {
    const source = middle1Data[lessonId]

    if (!source) {
      return
    }

    vocabCount += source.vocab.length
    definitionCount += source.defs.length
  })

  return {
    vocabCount,
    definitionCount,
    totalCount: vocabCount + definitionCount,
  }
}

function shuffle(items) {
  const copiedItems = [...items]

  for (
    let index = copiedItems.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1),
    )

    const temporaryItem = copiedItems[index]

    copiedItems[index] =
      copiedItems[randomIndex]

    copiedItems[randomIndex] = temporaryItem
  }

  return copiedItems
}

function splitColumns(items) {
  const middle = Math.ceil(items.length / 2)

  return [
    items.slice(0, middle),
    items.slice(middle),
  ]
}

function Middle1PrintPage({
  items,
  answerMode,
  title,
  subtitle,
  studentName,
  examDate,
  onStudentNameChange,
  onExamDateChange,
}) {
  const [leftItems, rightItems] =
    splitColumns(items)

  return (
    <article
      className={
        answerMode
          ? 'print-page middle1-print-page answer-page'
          : 'print-page middle1-print-page exam-page'
      }
    >
      <header className="sheet-header">
        <div className="sheet-title">
          {title}
        </div>

        <div className="sheet-subtitle">
          {subtitle}
        </div>

        {!answerMode && (
          <div className="student-info">
            <label>
              이름
              <input
                type="text"
                value={studentName}
                onChange={onStudentNameChange}
                aria-label="이름"
              />
            </label>

            <label>
              날짜
              <input
                type="text"
                value={examDate}
                onChange={onExamDateChange}
                aria-label="날짜"
              />
            </label>
          </div>
        )}
      </header>

      <div className="question-grid">
        <QuestionColumn
          items={leftItems}
          answerMode={answerMode}
          columnName="left"
        />

        <QuestionColumn
          items={rightItems}
          answerMode={answerMode}
          columnName="right"
        />
      </div>

      <div className="page-note">
        동아(윤정미) 중1 · {getLessonLabel('all')}
      </div>
    </article>
  )
}

function Middle1ExamGenerator({ onBack }) {
  const initialItems = getPoolItems(
    '5',
    'all',
    'en-ko',
  )

  const [lesson, setLesson] = useState('5')
  const [pool, setPool] = useState('all')
  const [direction, setDirection] =
    useState('en-ko')
  const [mode, setMode] =
    useState('sequential')
  const [examItems, setExamItems] = useState([])
  const [studentName, setStudentName] =
    useState('')
  const [examDate, setExamDate] = useState(
    getTodayText(),
  )
  const [status, setStatus] = useState(
    `현재 출제 가능 문항: ${initialItems.length}개`,
  )

  const availableItems = getPoolItems(
    lesson,
    pool,
    direction,
  )

  const counts = getPoolCounts(lesson)

  const updateStatus = (
    nextLesson,
    nextPool,
    nextDirection,
  ) => {
    const nextItems = getPoolItems(
      nextLesson,
      nextPool,
      nextDirection,
    )

    setExamItems([])

    if (nextItems.length < FIXED_COUNT) {
      setStatus(
        `현재 범위는 ${nextItems.length}개라 50문항을 만들 수 없습니다.`,
      )
    } else {
      setStatus(
        `현재 출제 가능 문항: ${nextItems.length}개 · 50문항 고정 출제`,
      )
    }
  }

  const handleLessonChange = (event) => {
    const nextLesson = event.target.value

    setLesson(nextLesson)
    updateStatus(nextLesson, pool, direction)
  }

  const handlePoolChange = (event) => {
    const nextPool = event.target.value

    setPool(nextPool)
    updateStatus(lesson, nextPool, direction)
  }

  const handleDirectionChange = (event) => {
    const nextDirection = event.target.value

    setDirection(nextDirection)
    updateStatus(lesson, pool, nextDirection)
  }

  const handleModeChange = (event) => {
    setMode(event.target.value)
    setExamItems([])
  }

  const handleGenerateExam = () => {
    if (availableItems.length < FIXED_COUNT) {
      setExamItems([])
      setStatus(
        `현재 범위는 ${availableItems.length}개라 50문항을 만들 수 없습니다.`,
      )
      return
    }

    const selectedItems =
      mode === 'random'
        ? shuffle(availableItems).slice(0, FIXED_COUNT)
        : availableItems.slice(0, FIXED_COUNT)

    const numberedItems = selectedItems.map(
      (item, index) => ({
        ...item,
        number: index + 1,
      }),
    )

    setExamItems(numberedItems)
    setStatus(
      `시험지와 정답지가 생성되었습니다. 50문항`,
    )
  }

  const handlePrint = () => {
    if (examItems.length !== FIXED_COUNT) {
      setStatus('먼저 50문항 시험지를 만들어 주세요.')
      return
    }

    window.print()
  }

  const handleReset = () => {
    const resetItems = getPoolItems(
      '5',
      'all',
      'en-ko',
    )

    setLesson('5')
    setPool('all')
    setDirection('en-ko')
    setMode('sequential')
    setExamItems([])
    setStudentName('')
    setExamDate(getTodayText())
    setStatus(
      `현재 출제 가능 문항: ${resetItems.length}개`,
    )
  }

  const lessonLabel = getLessonLabel(lesson)
  const poolLabel = getPoolLabel(pool)
  const directionLabel =
    getDirectionLabel(direction)

  return (
    <main className="app middle1-app">
      <section className="screen">
        <button
          className="back-button"
          type="button"
          onClick={onBack}
        >
          ← 시험지 목록으로
        </button>

        <h1>
          동아(윤정미) 중1 5·6과 단어시험지
        </h1>

        <p className="description">
          교과서 어휘는 영어와 한국어 방향을
          선택할 수 있고, 영영풀이는 영영풀이를
          보고 영어 단어를 쓰는 방식입니다.
        </p>

        <section
          className="controls"
          aria-label="중1 시험지 설정"
        >
          <label className="control">
            <span>과 선택</span>

            <select
              value={lesson}
              onChange={handleLessonChange}
            >
              <option value="5">5과</option>
              <option value="6">6과</option>
              <option value="all">
                5·6과 전체
              </option>
            </select>
          </label>

          <label className="control">
            <span>출제 범위</span>

            <select
              value={pool}
              onChange={handlePoolChange}
            >
              <option value="all">
                1+3 전체 ({counts.totalCount}개)
              </option>

              <option value="vocab">
                1. 교과서 어휘 목록 (
                {counts.vocabCount}개)
              </option>

              <option value="defs">
                3. 필수 단어 영영풀이 (
                {counts.definitionCount}개)
              </option>
            </select>
          </label>

          <label className="control">
            <span>교과서 어휘 방향</span>

            <select
              value={direction}
              onChange={handleDirectionChange}
            >
              <option value="en-ko">
                영어 → 한국어 뜻
              </option>

              <option value="ko-en">
                한국어 뜻 → 영어
              </option>
            </select>
          </label>

          <label className="control">
            <span>출제 방식</span>

            <select
              value={mode}
              onChange={handleModeChange}
            >
              <option value="sequential">
                자료 순서대로
              </option>

              <option value="random">
                랜덤
              </option>
            </select>
          </label>

          <label className="control">
            <span>출제 문항</span>

            <input
              id="middle1-count"
              type="text"
              value="50문항"
              readOnly
              aria-label="고정 출제 문항 수"
            />
          </label>

          <button
            className="btn"
            type="button"
            onClick={handleGenerateExam}
          >
            시험지 만들기
          </button>

          <button
            className="btn secondary"
            type="button"
            onClick={handlePrint}
            disabled={examItems.length !== FIXED_COUNT}
          >
            시험지 + 정답지 인쇄
          </button>

          <button
            className="btn light"
            type="button"
            onClick={handleReset}
          >
            초기화
          </button>
        </section>

        <div className="status" aria-live="polite">
          {status}
        </div>

        <div className="counts">
          <div className="count-card">
            5과 어휘{' '}
            <strong>
              {middle1Data[5].vocab.length}개
            </strong>
            {' · '}영영풀이{' '}
            <strong>
              {middle1Data[5].defs.length}개
            </strong>
          </div>

          <div className="count-card">
            6과 어휘{' '}
            <strong>
              {middle1Data[6].vocab.length}개
            </strong>
            {' · '}영영풀이{' '}
            <strong>
              {middle1Data[6].defs.length}개
            </strong>
          </div>
        </div>

        <p className="hint">
          출제 문항은 50개로 고정됩니다.
          선택 범위가 50개보다 적으면 시험지를
          만들 수 없습니다. 인쇄 시 A4, 배율
          100%, 머리글 및 바닥글 해제를 권장합니다.
        </p>
      </section>

      <section
        className="print-area middle1-print-area"
        aria-label="중1 시험지 미리보기"
      >
        {examItems.length !== FIXED_COUNT ? (
          <div className="empty print-empty">
            시험지 만들기 버튼을 눌러 주세요.
          </div>
        ) : (
          <>
            <Middle1PrintPage
              items={examItems}
              answerMode={false}
              title={`동아(윤정미) 중1 ${lessonLabel} 단어시험지`}
              subtitle={`${poolLabel} · ${directionLabel} · 문제`}
              studentName={studentName}
              examDate={examDate}
              onStudentNameChange={(event) =>
                setStudentName(event.target.value)
              }
              onExamDateChange={(event) =>
                setExamDate(event.target.value)
              }
            />

            <Middle1PrintPage
              items={examItems}
              answerMode
              title="정답지"
              subtitle="시험지와 같은 순서"
              studentName={studentName}
              examDate={examDate}
              onStudentNameChange={(event) =>
                setStudentName(event.target.value)
              }
              onExamDateChange={(event) =>
                setExamDate(event.target.value)
              }
            />
          </>
        )}
      </section>
    </main>
  )
}

export default Middle1ExamGenerator