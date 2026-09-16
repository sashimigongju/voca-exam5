function QuestionColumn({
  items,
  answerMode,
  columnName,
}) {
  const pageType = answerMode ? 'answer' : 'exam'

  return (
    <div className="q-column">
      {items.map((item) => (
        <div
          className="q-row"
          key={`${pageType}-${columnName}-${item.id}-${item.number}`}
        >
          <div className="q-no">
            {item.number}
          </div>

          <div className="q-prompt">
            {answerMode ? item.answer : item.prompt}
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

export default QuestionColumn
