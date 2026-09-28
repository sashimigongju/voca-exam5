import { useState } from 'react'
import dayWordsData from '../../data/dayWords.json'
import './DayExamGenerator.css'

const WORDS_PER_PAGE = 50
const EXAM_TITLE = '고난도 단어 모음'

const dayList = Array.isArray(dayWordsData.days)
  ? dayWordsData.days
      .map((day) => ({
        ...day,
        words: Array.isArray(day.words)
          ? [...day.words].sort(
              (a, b) => Number(a.no) - Number(b.no),
            )
          : [],
      }))
      .sort((a, b) => Number(a.day) - Number(b.day))
  : []

function shuffle(items) {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(
      Math.random() * (i + 1),
    )
    const temporaryItem = result[i]

    result[i] = result[randomIndex]
    result[randomIndex] = temporaryItem
  }

  return result
}

function splitPages(items) {
  const pages = []

  for (
    let index = 0;
    index < items.length;
    index += WORDS_PER_PAGE
  ) {
    pages.push(items.slice(index, index + WORDS_PER_PAGE))
  }

  return pages
}

function splitColumns(items) {
  const middle = Math.ceil(items.length / 2)

  return [
    items.slice(0, middle),
    items.slice(middle),
  ]
}

function getTodayText() {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const date = String(today.getDate()).padStart(2, '0')

  return `${today.getFullYear()}. ${month}. ${date}.`
}

function QuestionColumn({
  items,
  direction,
  answerMode,
}) {
  const rowCount = Math.max(items.length, 1)

  return (
    <div
      className="day-question-column"
      style={{
        gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
      }}
    >
      {items.map((item) => {
        const prompt =
          direction === 'en-ko'
            ? item.english
            : item.korean

        const answer =
          direction === 'en-ko'
            ? item.korean
            : item.english

        return (
          <div
            className="day-question-row"
            key={`${item.sourceDay}-${item.no}-${item.questionNumber}`}
          >
            <span className="day-question-no">
              {item.questionNumber}.
            </span>

            <span className="day-question-prompt">
              {prompt}
            </span>

            <span
              className={
                answerMode
                  ? 'day-question-answer is-filled'
                  : 'day-question-answer'
              }
            >
              {answerMode ? answer : ''}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function DayPrintPage({
  dayLabel,
  items,
  direction,
  order,
  answerMode,
  pageNumber,
  pageCount,
  totalCount,
  studentName,
  examDate,
}) {
  const [leftItems, rightItems] = splitColumns(items)

  const directionLabel =
    direction === 'en-ko'
      ? '영어 → 한국어'
      : '한국어 → 영어'

  const orderLabel =
    order === 'random'
      ? '무작위 출제'
      : '자료 순서'

  return (
    <article className="day-print-page">
      <header className="day-print-header">
        <div>
          <h2>{EXAM_TITLE}</h2>
          <p>
            {dayLabel} · {answerMode ? '정답지' : '시험지'} ·{' '}
            {directionLabel} · {orderLabel} · 총 {totalCount}문항 ·{' '}
            {pageNumber}/{pageCount}쪽
          </p>
        </div>

        <div className="day-print-student">
          <span>
            이름: {studentName || '________________'}
          </span>
          <span>
            날짜: {examDate || '________________'}
          </span>
        </div>
      </header>

      <div className="day-print-columns">
        <QuestionColumn
          items={leftItems}
          direction={direction}
          answerMode={answerMode}
        />

        <QuestionColumn
          items={rightItems}
          direction={direction}
          answerMode={answerMode}
        />
      </div>

      <footer className="day-print-footer">
        {EXAM_TITLE} · {dayLabel} ·{' '}
        {answerMode ? '정답지' : '시험지'}
      </footer>
    </article>
  )
}

function DayExamGenerator({ onBack }) {
  const [selectedDayNumbers, setSelectedDayNumbers] =
    useState([])

  const [direction, setDirection] = useState('en-ko')
  const [order, setOrder] = useState('sequential')
  const [questionCount, setQuestionCount] = useState(50)
  const [examItems, setExamItems] = useState([])
  const [studentName, setStudentName] = useState('')
  const [examDate, setExamDate] = useState(getTodayText())
  const [status, setStatus] = useState('')

  const selectedDays = dayList.filter((day) =>
    selectedDayNumbers.includes(Number(day.day)),
  )

  const selectedDayLabel = selectedDays
    .map((day) => `Day ${day.day}`)
    .join(' + ')

  const selectedWordCount = selectedDays.reduce(
    (total, day) => total + day.words.length,
    0,
  )

  const handleDaySelect = (day) => {
    const dayNumber = Number(day.day)

    const nextDayNumbers = selectedDayNumbers.includes(dayNumber)
      ? selectedDayNumbers.filter(
          (selectedNumber) => selectedNumber !== dayNumber,
        )
      : [...selectedDayNumbers, dayNumber].sort(
          (a, b) => a - b,
        )

    const nextDays = dayList.filter((item) =>
      nextDayNumbers.includes(Number(item.day)),
    )

    const nextLabel = nextDays
      .map((item) => `Day ${item.day}`)
      .join(' + ')

    const nextWordCount = nextDays.reduce(
      (total, item) => total + item.words.length,
      0,
    )

    setSelectedDayNumbers(nextDayNumbers)
    setExamItems([])

    setStatus(
      nextDays.length > 0
        ? `${nextLabel} 선택됨 · ${nextWordCount}개 단어`
        : 'Day를 하나 이상 선택하세요.',
    )
  }
const handleQuestionCountChange = (event) => {
  const value = event.target.value

  setExamItems([])

  if (value === '') {
    setQuestionCount('')
    return
  }

  const number = Number(value)

  if (!Number.isFinite(number)) {
    return
  }

  setQuestionCount(
    Math.max(1, Math.min(120, Math.floor(number))),
  )
}
  
const handleGenerate = () => {
  if (selectedDays.length === 0) {
    setStatus('시험지에 넣을 Day를 하나 이상 선택하세요.')
    return
  }

  const inputCount = Number(questionCount)

  if (!Number.isInteger(inputCount) || inputCount < 1) {
    setStatus('문항 수를 1~120 사이의 정수로 입력하세요.')
    return
  }

  const combinedWords = selectedDays
    .flatMap((day) =>
      day.words.map((word) => ({
        ...word,
        sourceDay: Number(day.day),
      })),
    )
    .sort(
      (a, b) =>
        a.sourceDay - b.sourceDay ||
        Number(a.no) - Number(b.no),
    )

  if (combinedWords.length === 0) {
    setStatus('선택한 Day에 단어 자료가 없습니다.')
    return
  }

  const requestedCount = Math.min(inputCount, 120)
  const actualCount = Math.min(
    requestedCount,
    combinedWords.length,
  )

  const orderedWords =
    order === 'random'
      ? shuffle(combinedWords)
      : combinedWords

  const numberedWords = orderedWords
    .slice(0, actualCount)
    .map((word, index) => ({
      ...word,
      questionNumber: index + 1,
    }))

  setExamItems(numberedWords)

  const shortageMessage =
    combinedWords.length < requestedCount
      ? ` 선택한 Day의 단어가 ${combinedWords.length}개라 가능한 문항만 출제했습니다.`
      : ''

  setStatus(
    `${selectedDayLabel}에서 ${numberedWords.length}문항을 생성했습니다.${shortageMessage}`,
  )
}

  const handlePrint = () => {
    if (examItems.length === 0) {
      setStatus('먼저 시험지를 만들어 주세요.')
      return
    }

    window.print()
  }

  const handleClearDays = () => {
    setSelectedDayNumbers([])
    setExamItems([])
    setStatus('선택한 Day를 모두 해제했습니다.')
  }

  const pages = splitPages(examItems)

  return (
    <main className="day-exam-page">
      <section className="day-exam-controls">
        <button
          className="day-back-button"
          type="button"
          onClick={onBack}
        >
          ← 시험지 목록
        </button>

        <header className="day-screen-header">
          <h1>{EXAM_TITLE}</h1>
          <p>
            Day를 여러 개 선택할 수 있습니다.
            선택한 Day를 다시 누르면 선택이 해제됩니다.
          </p>
        </header>

        <div className="day-selector" aria-label="Day 선택">
          {dayList.map((day) => {
            const isSelected =
              selectedDayNumbers.includes(Number(day.day))

            return (
              <button
                key={day.day}
                type="button"
                className={
                  isSelected
                    ? 'day-selector-button selected'
                    : 'day-selector-button'
                }
                aria-pressed={isSelected}
                onClick={() => handleDaySelect(day)}
              >
                <span>Day {day.day}</span>
                <small>{day.words.length}개</small>
              </button>
            )
          })}
        </div>

        <div className="day-settings">
          <label>
  출제 문항 수 (최대 120)
  <input
    type="number"
    min="1"
    max="120"
    step="1"
    value={questionCount}
    onChange={handleQuestionCountChange}
  />
</label>
          <label>
            출제 방향
            <select
              value={direction}
              onChange={(event) => {
                setDirection(event.target.value)
                setExamItems([])
              }}
            >
              <option value="en-ko">영어 → 한국어</option>
              <option value="ko-en">한국어 → 영어</option>
            </select>
          </label>

          <label>
            출제 순서
            <select
              value={order}
              onChange={(event) => {
                setOrder(event.target.value)
                setExamItems([])
              }}
            >
              <option value="sequential">자료 순서</option>
              <option value="random">무작위</option>
            </select>
          </label>

          <label>
            이름
            <input
              value={studentName}
              onChange={(event) =>
                setStudentName(event.target.value)
              }
              placeholder="이름"
            />
          </label>

          <label>
            날짜
            <input
              value={examDate}
              onChange={(event) =>
                setExamDate(event.target.value)
              }
            />
          </label>
        </div>

        <div className="day-actions">
          <button
            type="button"
            onClick={handleClearDays}
            disabled={selectedDayNumbers.length === 0}
          >
            선택 해제
          </button>

          <button
            className="day-primary-button"
            type="button"
            disabled={selectedDayNumbers.length === 0}
            onClick={handleGenerate}
          >
            시험지 만들기
          </button>

          <button
            type="button"
            disabled={examItems.length === 0}
            onClick={handlePrint}
          >
            인쇄
          </button>
        </div>

        <p className="day-status" aria-live="polite">
          {status ||
            (selectedDays.length > 0
              ? `${selectedDayLabel} 선택됨 · ${selectedWordCount}개 단어`
              : 'Day를 하나 이상 선택하세요.')}
        </p>
      </section>

      <section className="day-print-area">
        {examItems.length === 0 ? (
          <div className="day-print-placeholder">
            Day를 하나 이상 선택하고 ‘시험지 만들기’를 눌러 주세요.
          </div>
        ) : (
          <>
            {pages.map((items, index) => (
              <DayPrintPage
                key={`test-${index}`}
                dayLabel={selectedDayLabel}
                items={items}
                direction={direction}
                order={order}
                answerMode={false}
                pageNumber={index + 1}
                pageCount={pages.length}
                totalCount={examItems.length}
                studentName={studentName}
                examDate={examDate}
              />
            ))}

            {pages.map((items, index) => (
              <DayPrintPage
                key={`answer-${index}`}
                dayLabel={selectedDayLabel}
                items={items}
                direction={direction}
                order={order}
                answerMode
                pageNumber={index + 1}
                pageCount={pages.length}
                totalCount={examItems.length}
                studentName={studentName}
                examDate={examDate}
              />
            ))}
          </>
        )}
      </section>
    </main>
  )
}

export default DayExamGenerator
