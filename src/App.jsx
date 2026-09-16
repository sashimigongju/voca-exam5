import { useState } from 'react'
import './App.css'
import ExamControls from './components/ExamControls'
import QuestionColumn from './components/QuestionColumn'
import ExamCatalog from './components/ExamCatalog'
import Middle3ExamGenerator from './components/Middle3ExamGenerator'
import { examCatalog } from './data/examCatalog'
import {
  vocabItems,
  definitionItems,
} from './data/vocabulary'
import {
  vocab6Items,
  definition6Items,
} from './data/vocabulary6'
const examSources = {
  'middle2-unit5': {
    vocab: vocabItems,
    defs: definitionItems,
  },

  'middle2-unit6': {
    vocab: vocab6Items,
    defs: definition6Items,
  },
}

function getPoolItems(
  pool,
  vocabularyList,
  definitionList,
) {
  if (pool === 'vocab') {
    return vocabularyList
  }

  if (pool === 'defs') {
    return definitionList
  }

  return [
    ...vocabularyList,
    ...definitionList,
  ]
}

function shuffle(items) {
  const copiedItems = [...items]

  for (let index = copiedItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1),
    )

    const temporaryItem = copiedItems[index]
    copiedItems[index] = copiedItems[randomIndex]
    copiedItems[randomIndex] = temporaryItem
  }

  return copiedItems
}

function getTodayText() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}. ${month}. ${day}.`
}

function splitColumns(items) {
  const middle = Math.ceil(items.length / 2)

  return [
    items.slice(0, middle),
    items.slice(middle),
  ]
}


function App() {
  const [selectedExamId, setSelectedExamId] =
    useState(null)

  const currentSource =
    examSources[selectedExamId] ??
    examSources['middle2-unit5']

  const currentVocabItems = currentSource.vocab
  const currentDefinitionItems = currentSource.defs

  const totalItemCount =
    currentVocabItems.length +
    currentDefinitionItems.length

  const [pool, setPool] = useState('all')
  const [mode, setMode] = useState('sequential')
  const [count, setCount] = useState(
    Math.min(50, totalItemCount),
  )
  const [examItems, setExamItems] = useState([])
  const [studentName, setStudentName] = useState('')
  const [examDate, setExamDate] = useState(
    getTodayText(),
  )
  const [status, setStatus] = useState(
    `현재 출제 가능 문항: ${totalItemCount}개`,
  )

  const availableItems = getPoolItems(
    pool,
    currentVocabItems,
    currentDefinitionItems,
  )
 const poolLabel = {
  all: `1+3 전체 (${totalItemCount}개)`,
  vocab: `1. 교과서 어휘 목록 (${currentVocabItems.length}개)`,
  defs: `3. 필수 단어 영영풀이 (${currentDefinitionItems.length}개)`,
}[pool]

  const [leftItems, rightItems] = splitColumns(examItems)

  const handlePoolChange = (event) => {
    const nextPool = event.target.value
   const nextItems = getPoolItems(
  nextPool,
  currentVocabItems,
  currentDefinitionItems,
)

    setPool(nextPool)

    setCount((currentCount) => {
      const numberCount = Number(currentCount) || 1

      return Math.min(
        Math.max(Math.floor(numberCount), 1),
        nextItems.length,
      )
    })

    setExamItems([])

    setStatus(
      `현재 출제 가능 문항: ${nextItems.length}개`,
    )
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
      `시험지와 정답지가 생성되었습니다. ${safeCount}문항`,
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
    setPool('all')
    setMode('sequential')
    setCount(Math.min(50, totalItemCount))
    setExamItems([])
    setStudentName('')
    setExamDate(getTodayText())
    setStatus(
      `현재 출제 가능 문항: ${totalItemCount}개`,
    )
  }
  const handleSelectExam = (examId) => {
    if (examId === 'middle3-5-6') {
      setSelectedExamId(examId)
      return
    }

    const nextSource = examSources[examId]

    if (!nextSource) {
      return
    }

    const nextTotalItemCount = nextSource.vocab.length +
      nextSource.defs.length

    setSelectedExamId(examId)
    setPool('all')
    setMode('sequential')
    setCount(Math.min(50, nextTotalItemCount))
    setExamItems([])
    setStudentName('')
    setExamDate(getTodayText())

    setStatus(
      `현재 출제 가능 문항: ${nextTotalItemCount}개`
    )
  }

const selectedExam =
  examCatalog.find(
    (exam) => exam.id === selectedExamId,
  ) ?? null

if (!selectedExam) {
  return (
    <ExamCatalog
      exams={examCatalog}
onSelectExam={handleSelectExam}
    />
  )
}

if (selectedExamId === 'middle3-5-6') {
  return (
    <Middle3ExamGenerator
      onBack={() => {
        setSelectedExamId(null)
      }}
    />
  )
}

  return (
    <main className="app">
      {/* 화면용 설정 영역 */}
      <section className="screen">
        <button
  className="back-button"
  type="button"
  onClick={() => {
    setSelectedExamId(null)
    setExamItems([])
  }}
>
  ← 시험지 목록으로
</button>
        <header className="intro">
          <h1>{selectedExam.title}</h1>

          <p>
            출제 범위와 문항 수를 선택해 영어 단어시험지를
            만들어 보세요.
          </p>
        </header>

          <ExamControls
  pool={pool}
  mode={mode}
  count={count}
  totalItemCount={totalItemCount}
 vocabCount={currentVocabItems.length}
definitionCount={currentDefinitionItems.length}
  availableItemCount={availableItems.length}
  hasExam={examItems.length > 0}
  onPoolChange={handlePoolChange}
  onModeChange={handleModeChange}
  onCountChange={handleCountChange}
  onGenerateExam={handleGenerateExam}
  onPrint={handlePrint}
  onReset={handleReset}
/>


        <div className="status" aria-live="polite">
          {status}
        </div>

        <p className="hint">
          시험지 생성 후 이름과 날짜를 입력할 수 있습니다.
          인쇄 창에서 A4, 배율 100%, 머리글 및 바닥글 해제를
          권장합니다.
        </p>
      </section>

      {/* 시험지와 정답지 영역 */}
      <section
        className="print-area"
        aria-label="시험지 미리보기"
      >
        {examItems.length === 0 ? (
          <div className="empty print-empty">
            시험지 만들기 버튼을 눌러 주세요.
          </div>
        ) : (
          <>
            {/* 시험지 */}
            <article className="print-page exam-page">
              <header className="sheet-header">
                <div className="sheet-title">
                  {selectedExam.title}
                </div>

                <div className="sheet-subtitle">
                  {poolLabel} · 문제
                </div>

                <div className="student-info">
                  <label>
                    이름
                    <input
                      type="text"
                      value={studentName}
                      onChange={(event) =>
                        setStudentName(event.target.value)
                      }
                      aria-label="이름"
                    />
                  </label>

                  <label>
                    날짜
                    <input
                      type="text"
                      value={examDate}
                      onChange={(event) =>
                        setExamDate(event.target.value)
                      }
                      aria-label="날짜"
                    />
                  </label>
                </div>
              </header>

              <div className="question-grid">
                <QuestionColumn
                  items={leftItems}
                  answerMode={false}
                  columnName="left"
                />

                <QuestionColumn
                  items={rightItems}
                  answerMode={false}
                  columnName="right"
                />
              </div>

              <div className="page-note">
                동아(윤정미) 중2 5과
              </div>
            </article>

            {/* 정답지 */}
            <article className="print-page answer-page">
              <header className="sheet-header">
                <div className="sheet-title">
                  정답지
                </div>

                <div className="sheet-subtitle">
                  {poolLabel} · 시험지와 같은 순서
                </div>
              </header>

              <div className="question-grid">
                <QuestionColumn
                  items={leftItems}
                  answerMode
                  columnName="left"
                />

                <QuestionColumn
                  items={rightItems}
                  answerMode
                  columnName="right"
                />
              </div>

              <div className="page-note">
                동아(윤정미) 중2 5과 · 정답지
              </div>
            </article>
          </>
        )}
      </section>
    </main>
  )
}

export default App

