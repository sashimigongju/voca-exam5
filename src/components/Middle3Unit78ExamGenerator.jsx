import { useState } from 'react'
import middle3_7_8Data from '../data/mid3_7_8.json'

const PAGE_CAPACITY = 50
const MAX_QUESTIONS = 120

const TAG_MAP = {
  ko: '한→영',
  en: '영→한',
  def: '영영',
}

function getTodayText() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}. ${month}. ${day}.`
}

function getChapterLabel(chapter) {
  if (chapter === 'all') {
    return '7·8과 전체'
  }

  return `${chapter}과`
}

function getKindLabel(kind) {
  if (kind === 'ko') {
    return '한→영 해석'
  }

  if (kind === 'en') {
    return '영→한 해석'
  }

  if (kind === 'def') {
    return '영영풀이'
  }

  return '한→영 + 영영풀이'
}

function getChapterIds(chapter) {
  if (chapter === 'all') {
    return ['7', '8']
  }

  return [chapter]
}

function getPoolItems(chapter, kind) {
  const result = []

  getChapterIds(chapter).forEach((chapterId) => {
    const source = middle3_7_8Data[`${chapterId}과`]

    if (!source) {
      return
    }

    const wordList = Array.isArray(source.wordList)
      ? source.wordList
      : []

    const phraseList = Array.isArray(source.phraseList)
      ? source.phraseList
      : []

    const definitions = Array.isArray(source.definitions)
      ? source.definitions
      : []

    const vocabulary = []

    // 단어 목록을 출제 자료에 추가
    wordList.forEach((word, index) => {
      if (word?.english && word?.korean) {
        vocabulary.push({
          id: `word-${index}`,
          english: word.english,
          partOfSpeech: word.partOfSpeech ?? '',
          korean: word.korean,
        })
      }

      // pluralForm이 있는 항목은 별도 문항으로 출제
      if (
        word?.pluralForm?.english &&
        word?.pluralForm?.korean
      ) {
        vocabulary.push({
          id: `plural-${index}`,
          english: word.pluralForm.english,
          partOfSpeech: word.partOfSpeech ?? '',
          korean: word.pluralForm.korean,
        })
      }
    })

    // 숙어 목록도 한→영·영→한 출제 자료에 추가
    phraseList.forEach((phrase, index) => {
      if (phrase?.english && phrase?.korean) {
        vocabulary.push({
          id: `phrase-${index}`,
          english: phrase.english,
          partOfSpeech: '',
          korean: phrase.korean,
        })
      }
    })

    // 단어·숙어 출제
    if (kind === 'ko' || kind === 'en' || kind === 'mixed') {
      vocabulary.forEach((item) => {
        const englishText = item.partOfSpeech
          ? `${item.english} (${item.partOfSpeech})`
          : item.english

        const isEnglishToKorean = kind === 'en'

        result.push({
          id: `${chapterId}-${item.id}`,
          chapter: chapterId,
          kind: kind === 'mixed' ? 'ko' : kind,
          prompt: isEnglishToKorean
            ? englishText
            : item.korean,
          answer: isEnglishToKorean
            ? item.korean
            : englishText,
        })
      })
    }

    // 영영풀이 출제
    if (kind === 'def' || kind === 'mixed') {
      definitions.forEach((entry, index) => {
        if (!entry?.english || !entry?.definition) {
          return
        }

        result.push({
          id: `${chapterId}-def-${index}`,
          chapter: chapterId,
          kind: 'def',
          prompt: entry.definition,
          answer: entry.english,
        })
      })
    }
  })

  return result
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
    copiedItems[index] = copiedItems[randomIndex]
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

function makeChunks(items, size) {
  const chunks = []

  for (
    let index = 0;
    index < items.length;
    index += size
  ) {
    chunks.push(items.slice(index, index + size))
  }

  return chunks
}

function Middle3QuestionColumn({
  items,
  answerMode,
  columnName,
}) {
  return (
    <div className="q-column">
      {items.map((item) => (
        <div
          className="q-row"
          key={`${answerMode ? 'answer' : 'exam'}-${columnName}-${item.id}-${item.number}`}
        >
          <div className="q-no">
            {item.number}
          </div>

          <div className="q-prompt">
            <span className="type-tag">
              {TAG_MAP[item.kind]}
            </span>

            {answerMode
              ? item.answer
              : item.prompt}
          </div>

          {!answerMode && (
            <div
              className="q-answer-space"
              aria-label="답안 공간"
            />
          )}
        </div>
      ))}
    </div>
  )
}

function Middle3PrintPage({
  title,
  subtitle,
  items,
  answerMode,
  pageNumber,
  totalPages,
  studentName,
  examDate,
  onStudentNameChange,
  onExamDateChange,
}) {
  const [leftItems, rightItems] = splitColumns(items)

  return (
    <article
      className={`print-page middle3-print-page ${
        answerMode ? 'answer-page' : 'exam-page'
      }`}
    >
      <header className="sheet-header">
        <div className="sheet-title">
          {title}
        </div>

        <div className="sheet-subtitle">
          {subtitle} · {pageNumber}/{totalPages}쪽
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
        <Middle3QuestionColumn
          items={leftItems}
          answerMode={answerMode}
          columnName="left"
        />

        <Middle3QuestionColumn
          items={rightItems}
          answerMode={answerMode}
          columnName="right"
        />
      </div>

      <div className="page-note">
        동아(윤정미) 개정 중3 · {title}
      </div>
    </article>
  )
}

function Middle3Unit78ExamGenerator({ onBack }) {
  const initialItems = getPoolItems('7', 'ko')

  const [chapter, setChapter] = useState('7')
  const [kind, setKind] = useState('ko')
  const [mode, setMode] = useState('sequential')
  const [count, setCount] = useState(50)
  const [examItems, setExamItems] = useState([])
  const [studentName, setStudentName] = useState('')
  const [examDate, setExamDate] = useState(getTodayText())

  const [status, setStatus] = useState(
    `현재 출제 가능 문항: ${initialItems.length}개 (7과 · ${getKindLabel('ko')})`,
  )

  const availableItems = getPoolItems(chapter, kind)
  const examPages = makeChunks(examItems, PAGE_CAPACITY)

  const handleFilterChange = (nextChapter, nextKind) => {
    const nextItems = getPoolItems(nextChapter, nextKind)
    const maxCount = Math.min(
      nextItems.length,
      MAX_QUESTIONS,
    )

    setCount((currentCount) => {
      const parsedCount = Number(currentCount)
      const currentNumber = Number.isFinite(parsedCount)
        ? Math.floor(parsedCount)
        : 1

      if (maxCount === 0) {
        return 1
      }

      return Math.min(
        Math.max(currentNumber, 1),
        maxCount,
      )
    })

    setExamItems([])

    setStatus(
      `현재 출제 가능 문항: ${nextItems.length}개 (${getChapterLabel(nextChapter)} · ${getKindLabel(nextKind)})`,
    )
  }

  const handleChapterChange = (event) => {
    const nextChapter = event.target.value

    setChapter(nextChapter)
    handleFilterChange(nextChapter, kind)
  }

  const handleKindChange = (event) => {
    const nextKind = event.target.value

    setKind(nextKind)
    handleFilterChange(chapter, nextKind)
  }

  const handleModeChange = (event) => {
    setMode(event.target.value)
    setExamItems([])
  }

  const handleCountChange = (event) => {
    setCount(event.target.value)
    setExamItems([])
  }

  const handleGenerateExam = () => {
    if (availableItems.length === 0) {
      setStatus('출제할 자료가 없습니다.')
      return
    }

    const requestedCount = Number(count)

    if (
      !Number.isFinite(requestedCount) ||
      requestedCount < 1
    ) {
      setStatus('문항 수는 1개 이상 입력해야 합니다.')
      return
    }

    const safeCount = Math.min(
      Math.floor(requestedCount),
      availableItems.length,
      MAX_QUESTIONS,
    )

    const orderedItems =
      mode === 'random'
        ? shuffle(availableItems)
        : availableItems

    const selectedItems = orderedItems
      .slice(0, safeCount)
      .map((item, index) => ({
        ...item,
        number: index + 1,
      }))

    setCount(safeCount)
    setExamItems(selectedItems)

    setStatus(
      `시험지와 정답지가 생성되었습니다. ${safeCount}문항 · ${Math.ceil(safeCount / PAGE_CAPACITY)}페이지`,
    )
  }

  const handlePrint = () => {
    if (examItems.length === 0) {
      setStatus('먼저 시험지를 만들어 주세요.')
      return
    }

    window.print()
  }

  const handleReset = () => {
    setChapter('7')
    setKind('ko')
    setMode('sequential')
    setCount(50)
    setExamItems([])
    setStudentName('')
    setExamDate(getTodayText())

    const resetItems = getPoolItems('7', 'ko')

    setStatus(
      `현재 출제 가능 문항: ${resetItems.length}개 (7과 · ${getKindLabel('ko')})`,
    )
  }

  return (
    <main className="app middle3-app">
      <section className="screen">
        <button
          className="back-button"
          type="button"
          onClick={onBack}
        >
          ← 시험지 목록으로
        </button>

        <h1>
          동아(윤정미) 개정 중3 7·8과 단어시험지
        </h1>

        <p className="description">
          7과와 8과의 단어·숙어 한→영·영→한,
          영영풀이 자료를 바탕으로 시험지와 정답지를
          생성합니다.
        </p>

        <section
          className="controls"
          aria-label="중3 7·8과 시험지 설정"
        >
          <label className="control">
            <span>출제 단원</span>

            <select
              value={chapter}
              onChange={handleChapterChange}
            >
              <option value="7">7과</option>
              <option value="8">8과</option>
              <option value="all">7·8과 전체</option>
            </select>
          </label>

          <label className="control">
            <span>출제 항목</span>

            <select
              value={kind}
              onChange={handleKindChange}
            >
              <option value="ko">한→영 해석</option>
              <option value="en">영→한 해석</option>
              <option value="def">영영풀이</option>
              <option value="mixed">
                한→영 + 영영풀이
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
              <option value="random">랜덤</option>
            </select>
          </label>

          <label className="control">
            <span>문항 수</span>

            <input
              type="number"
              min="1"
              max={Math.min(
                MAX_QUESTIONS,
                availableItems.length,
              )}
              value={count}
              onChange={handleCountChange}
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
            disabled={examItems.length === 0}
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
            7과 단어·숙어{' '}
            <strong>
              {getPoolItems('7', 'ko').length}개
            </strong>
            {' · '}영영풀이{' '}
            <strong>
              {getPoolItems('7', 'def').length}개
            </strong>
          </div>

          <div className="count-card">
            8과 단어·숙어{' '}
            <strong>
              {getPoolItems('8', 'ko').length}개
            </strong>
            {' · '}영영풀이{' '}
            <strong>
              {getPoolItems('8', 'def').length}개
            </strong>
          </div>
        </div>

        <p className="hint">
          문항은 최대 120개까지 출제되며, 페이지당
          50문항으로 나뉩니다. 인쇄 시 A4, 배율 100%,
          머리글 및 바닥글 해제를 권장합니다.
        </p>
      </section>

      <section
        className="print-area middle3-print-area"
        aria-label="중3 7·8과 시험지 미리보기"
      >
        {examItems.length === 0 ? (
          <div className="empty print-empty">
            시험지 만들기 버튼을 눌러 주세요.
          </div>
        ) : (
          <>
            {examPages.map((pageItems, index) => (
              <Middle3PrintPage
                key={`exam-page-${index}`}
                title={`동아(윤정미) 개정 중3 ${getChapterLabel(chapter)} 단어시험지`}
                subtitle={`${getKindLabel(kind)} · 문제`}
                items={pageItems}
                answerMode={false}
                pageNumber={index + 1}
                totalPages={examPages.length}
                studentName={studentName}
                examDate={examDate}
                onStudentNameChange={(event) =>
                  setStudentName(event.target.value)
                }
                onExamDateChange={(event) =>
                  setExamDate(event.target.value)
                }
              />
            ))}

            {examPages.map((pageItems, index) => (
              <Middle3PrintPage
                key={`answer-page-${index}`}
                title="정답지"
                subtitle="시험지와 같은 순서"
                items={pageItems}
                answerMode
                pageNumber={index + 1}
                totalPages={examPages.length}
                studentName={studentName}
                examDate={examDate}
                onStudentNameChange={(event) =>
                  setStudentName(event.target.value)
                }
                onExamDateChange={(event) =>
                  setExamDate(event.target.value)
                }
              />
            ))}
          </>
        )}
      </section>
    </main>
  )
}

export default Middle3Unit78ExamGenerator
