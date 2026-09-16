function ExamCatalog({
  exams,
  onSelectExam,
}) {
  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <p className="catalog-label">
          ENGLISH TEST PAPER
        </p>

        <h1>영어 시험지 만들기</h1>

        <p>
          만들고 싶은 시험지를 선택하세요.
        </p>
      </header>

      <section
        className="exam-catalog"
        aria-label="시험지 목록"
      >
        {exams.map((exam) => (
          <article
            className="exam-card"
            key={exam.id}
          >
            <div className="exam-card-content">
              <p className="exam-card-label">
                시험지
              </p>

              <h2>{exam.title}</h2>

              <p>{exam.description}</p>
            </div>

            <button
              className="exam-card-button"
              type="button"
              disabled={!exam.available}
              onClick={() =>
                onSelectExam(exam.id)
              }
            >
              {exam.available
                ? '시험지 만들기'
                : '자료 준비 중'}
            </button>
          </article>
        ))}
      </section>
    </main>
  )
}

export default ExamCatalog
