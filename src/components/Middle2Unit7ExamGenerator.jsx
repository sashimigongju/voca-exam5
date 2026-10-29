import { useState } from 'react'
import QuestionColumn from './QuestionColumn'
import lesson7Data from '../data/middle2Unit7.json'
import lesson8Data from '../data/middle2Unit8.json'

// 중2 7·8과는 영→한/영영풀이 모두 A4 한 페이지에 50문항씩 배치합니다.
const WORDS_PER_PAGE = 50
const DEFINITIONS_PER_PAGE = 50

function makeExamTypes(data) {
  return {
  'en-ko': {
    label: '1. 영→한',
    items: data.english_to_korean.map(({ word, meaning }, index) => ({
      id: `word-${index}`,
      prompt: word,
      answer: meaning,
    })),
    pageSize: WORDS_PER_PAGE,
  },
  definitions: {
    label: '2. 영영풀이',
    items: data.english_definitions.map(({ word, definition }, index) => ({
      id: `definition-${index}`,
      prompt: definition,
      answer: word,
    })),
    pageSize: DEFINITIONS_PER_PAGE,
  },
  }
}

function todayText() {
  const date = new Date()
  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}.`
}

function shuffle(items) {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[other]] = [result[other], result[index]]
  }
  return result
}

function chunk(items, pageSize) {
  const pages = []
  for (let index = 0; index < items.length; index += pageSize) {
    pages.push(items.slice(index, index + pageSize))
  }
  return pages
}

function Middle2Unit7PrintPage({
  title,
  label,
  items,
  pageNumber,
  totalPages,
  answerMode,
  kind,
  unit,
  studentName,
  examDate,
  onStudentNameChange,
  onExamDateChange,
}) {
  const halfway = Math.ceil(items.length / 2)
  const leftItems = items.slice(0, halfway)
  const rightItems = items.slice(halfway)

  return (
    <article
      className={`print-page middle2-7-print-page ${kind === 'definitions' ? 'middle2-7-def-print-page' : ''} ${items.length === 50 ? 'middle2-7-filled-page' : ''} ${unit === 8 && kind === 'definitions' && items.length === 46 ? 'middle2-8-46-def-page' : ''} ${answerMode ? 'answer-page' : 'exam-page'}`}
    >
      <header className="sheet-header">
        <div className="sheet-title">{answerMode ? '정답지' : title}</div>
        <div className="sheet-subtitle">
          {label} · {pageNumber}/{totalPages}쪽 · {answerMode ? '시험지와 같은 순서' : '문제'}
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
        <QuestionColumn items={leftItems} answerMode={answerMode} columnName="left" />
        <QuestionColumn items={rightItems} answerMode={answerMode} columnName="right" />
      </div>
      <div className="page-note">{title}{answerMode ? ' · 정답지' : ''}</div>
    </article>
  )
}

function Middle2Unit7ExamGenerator({ onBack, kind = 'en-ko', title, unit = 7 }) {
  const examTypes = makeExamTypes(unit === 8 ? lesson8Data : lesson7Data)
  const examType = examTypes[kind] ?? examTypes['en-ko']
  const { items: availableItems, label, pageSize } = examType
  const total = availableItems.length

  const [mode, setMode] = useState('sequential')
  const [count, setCount] = useState(Math.min(50, total))
  const [examItems, setExamItems] = useState([])
  const [studentName, setStudentName] = useState('')
  const [examDate, setExamDate] = useState(todayText)
  const [status, setStatus] = useState(`현재 출제 가능 문항: ${total}개 (${label})`)

  const pages = chunk(examItems, pageSize)

  const handleGenerateExam = () => {
    const requestedCount = Number(count)
    if (!Number.isFinite(requestedCount) || requestedCount < 1) {
      setStatus('문항 수는 1개 이상 입력해야 합니다.')
      return
    }

    const safeCount = Math.min(Math.floor(requestedCount), total)
    const source = mode === 'random' ? shuffle(availableItems) : availableItems
    const nextItems = source.slice(0, safeCount).map((item, index) => ({
      ...item,
      number: index + 1,
    }))
    setCount(safeCount)
    setExamItems(nextItems)
    setStatus(`시험지와 정답지가 생성되었습니다. ${safeCount}문항 · 각각 ${Math.ceil(safeCount / pageSize)}쪽`)
  }

  const handlePrint = () => {
    if (!examItems.length) {
      setStatus('먼저 시험지를 만들어 주세요.')
      return
    }
    window.print()
  }

  const handleReset = () => {
    setMode('sequential')
    setCount(Math.min(50, total))
    setExamItems([])
    setStudentName('')
    setExamDate(todayText())
    setStatus(`현재 출제 가능 문항: ${total}개 (${label})`)
  }

  return (
    <main className="app">
      <section className="screen">
        <button className="back-button" type="button" onClick={onBack}>
          ← 시험지 목록으로
        </button>

        <header className="intro">
          <h1>{title}</h1>
          <p>
            중2 {unit}과 교재 1~6쪽의 단어로 시험지와 정답지를 만듭니다.
          </p>
        </header>

        <section className="controls" aria-label={`중2 ${unit}과 시험지 설정`}>
          <label className="control">
            <span>출제 유형</span>
            <select value={kind} disabled aria-label="선택한 시험 유형">
              <option value={kind}>{label} ({total}개)</option>
            </select>
          </label>

          <label className="control">
            <span>출제 방식</span>
            <select
              value={mode}
              onChange={(event) => {
                setMode(event.target.value)
                setExamItems([])
              }}
            >
              <option value="sequential">자료 순서대로</option>
              <option value="random">랜덤</option>
            </select>
          </label>

          <label className="control">
            <span>문항 수</span>
            <input
              type="number"
              min="1"
              max={total}
              value={count}
              onChange={(event) => {
                setCount(event.target.value)
                setExamItems([])
              }}
            />
          </label>

          <button className="btn" type="button" onClick={handleGenerateExam}>
            시험지 만들기
          </button>
          <button
            className="btn secondary"
            type="button"
            onClick={handlePrint}
            disabled={!examItems.length}
          >
            시험지 + 정답지 인쇄
          </button>
          <button className="btn light" type="button" onClick={handleReset}>
            초기화
          </button>
        </section>

        <div className="status" aria-live="polite">{status}</div>
        <p className="hint">
          시험지 생성 후 이름과 날짜를 입력할 수 있습니다. 인쇄 창에서
          A4, 여백 없음, 배율 100%, 머리글 및 바닥글 해제를 권장합니다.
        </p>
      </section>

      <section className="print-area" aria-label="시험지 미리보기">
        {pages.length === 0 ? (
          <div className="empty print-empty">시험지 만들기 버튼을 눌러 주세요.</div>
        ) : (
          <>
            {pages.map((pageItems, index) => (
              <Middle2Unit7PrintPage
                key={`exam-${index}`}
                title={title}
                label={label}
                items={pageItems}
                pageNumber={index + 1}
                totalPages={pages.length}
                answerMode={false}
                kind={kind}
                unit={unit}
                studentName={studentName}
                examDate={examDate}
                onStudentNameChange={(event) => setStudentName(event.target.value)}
                onExamDateChange={(event) => setExamDate(event.target.value)}
              />
            ))}
            {pages.map((pageItems, index) => (
              <Middle2Unit7PrintPage
                key={`answer-${index}`}
                title={title}
                label={label}
                items={pageItems}
                pageNumber={index + 1}
                totalPages={pages.length}
                answerMode
                kind={kind}
                unit={unit}
                studentName={studentName}
                examDate={examDate}
                onStudentNameChange={(event) => setStudentName(event.target.value)}
                onExamDateChange={(event) => setExamDate(event.target.value)}
              />
            ))}
          </>
        )}
      </section>
    </main>
  )
}

export default Middle2Unit7ExamGenerator
