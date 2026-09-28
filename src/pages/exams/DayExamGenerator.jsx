import { useState } from 'react'
import dayWordsData from '../../data/dayWords.json'
import './DayExamGenerator.css'

const WORDS_PER_PAGE = 50

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

    ;[result[i], result[randomIndex]] = [
      result[randomIndex],
      result[i],
    ]
  }

  return result
}

function splitPages(items) {
  const pages = []

  for (
    let i = 0;
    i < items.length;
    i += WORDS_PER_PAGE
  ) {
    pages.push(items.slice(i, i + WORDS_PER_PAGE))
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
        gridTemplateRows:
          `repeat(${rowCount}, minmax(0, 1fr))`,
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
            key={`${item.no}-${item.questionNumber}`}
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
  dayNumber,
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
          <h2>
            고난도 VOCA Day {dayNumber}{' '}
            {answerMode ? '정답지' : '단어시험지'}
          </h2>

          <p>
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
        Day {dayNumber} · {answerMode ? '정답지' : '시험지'}
      </footer>
    </article>
  )
}

function DayExamGenerator({ onBack }) {
  const [selectedDayNumber, setSelectedDayNumber] =
    useState(dayList[0]?.day ?? null)

  const [direction, setDirection] = useState('en-ko')
  const [order, setOrder] = useState('sequential')
  const [examItems, setExamItems] = useState([])
  const [studentName, setStudentName] = useState('')
  const [examDate, setExamDate] = useState(getTodayText())
  const [status, setStatus] = useState('')

  const selectedDay = dayList.find(
    (day) => Number(day.day) === Number(selectedDayNumber),
  )

  const handleGenerate = () => {
    if (!selectedDay || selectedDay.words.length === 0) {
      setStatus('선택한 Day에 단어 자료가 없습니다.')
      return
    }

    const words = [...selectedDay.words].sort(
      (a, b) => Number(a.no) - Number(b.no),
    )

    const orderedWords =
      order === 'random' ? shuffle(words) : words

    const numberedWords = orderedWords.map(
      (word, index) => ({
        ...word,
        questionNumber: index + 1,
      }),
    )

    setExamItems(numberedWords)
    setStatus(
      `Day ${selectedDay.day} 전체 ${numberedWords.length}문항을 생성했습니다.`,
    )
  }

  const handlePrint = () => {
    if (examItems.length === 0) {
      setStatus('먼저 시험지를 만들어 주세요.')
      return
    }

    window.print()
  }

  const handleDaySelect = (day) => {
    setSelectedDayNumber(day.day)
    setExamItems([])
    setStatus(`Day ${day.day}: ${day.words.length}개 단어`)
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
          <h1>고난도 VOCA Day별 단어시험지</h1>
          <p>
            Day를 선택하면 해당 Day의 전체 단어로
            시험지와 정답지를 만듭니다.
          </p>
        </header>

        <div
          className="day-selector"
          aria-label="Day 선택"
        >
          {dayList.map((day) => (
            <button
              key={day.day}
              type="button"
              className={
                Number(selectedDayNumber) === Number(day.day)
                  ? 'day-selector-button selected'
                  : 'day-selector-button'
              }
              aria-pressed={
                Number(selectedDayNumber) === Number(day.day)
              }
              onClick={() => handleDaySelect(day)}
            >
              <span>Day {day.day}</span>
              <small>{day.words.length}개</small>
            </button>
          ))}
        </div>

        <div className="day-settings">
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
            className="day-primary-button"
            type="button"
            disabled={!selectedDay}
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
            (selectedDay
              ? `선택한 Day의 전체 단어: ${selectedDay.words.length}개`
              : 'Day 자료가 없습니다.')}
        </p>
      </section>

      <section className="day-print-area">
        {examItems.length === 0 ? (
          <div className="day-print-placeholder">
            Day를 선택하고 ‘시험지 만들기’를 눌러 주세요.
          </div>
        ) : (
          <>
            {pages.map((items, index) => (
              <DayPrintPage
                key={`test-${index}`}
                dayNumber={selectedDayNumber}
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
                dayNumber={selectedDayNumber}
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

