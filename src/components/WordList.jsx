function WordList({ day }) {
  const words = day?.words ?? []

  if (!day) {
    return (
      <section className="word-panel">
        <p className="study-empty">
          선택한 학습 자료가 없습니다.
        </p>
      </section>
    )
  }

  return (
    <section className="word-panel">
      <header className="word-panel-header">
        <p className="word-panel-label">
          보고서 VOCA{day.title.replace(' ', '')}
        </p>

        <h2>{day.title}</h2>

        <p className="word-count">
          {words.length > 0
            ? `${words.length}개 단어`
            : '아직 단어 자료가 없습니다.'}
        </p>
      </header>

      {words.length === 0 ? (
        <div className="study-empty">
          이 Day의 단어 자료를 준비 중입니다.
        </div>
      ) : (
        <ol className="word-list">
          {words.map((item, index) => (
            <li
              className="word-item"
              key={item.id}
            >
              <span className="word-number">
                {index + 1}
              </span>

              <span className="word-text">
                {item.word}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

export default WordList
