function ExamControls({
  pool,
  mode,
  count,
  totalItemCount,
  vocabCount,
  definitionCount,
  availableItemCount,
  hasExam,
  onPoolChange,
  onModeChange,
  onCountChange,
  onGenerateExam,
  onPrint,
  onReset,
}) {
  return (
    <section
      className="controls"
      aria-label="시험지 설정"
    >
      <label className="control">
        <span>출제 범위</span>

        <select
          value={pool}
          onChange={onPoolChange}
        >
          <option value="all">
            1+3 전체 ({totalItemCount}개)
          </option>

          <option value="vocab">
            1. 교과서 어휘 목록 ({vocabCount}개)
          </option>

          <option value="defs">
            3. 필수 단어 영영풀이 (
            {definitionCount}개)
          </option>
        </select>
      </label>

      <label className="control">
        <span>출제 방식</span>

        <select
          value={mode}
          onChange={onModeChange}
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
        <span>문항 수</span>

        <input
          type="number"
          min="1"
          max={availableItemCount}
          value={count}
          onChange={onCountChange}
        />
      </label>

      <button
        className="btn"
        type="button"
        onClick={onGenerateExam}
      >
        시험지 만들기
      </button>

      <button
        className="btn secondary"
        type="button"
        onClick={onPrint}
        disabled={!hasExam}
      >
        시험지 + 정답지 인쇄
      </button>

      <button
        className="btn light"
        type="button"
        onClick={onReset}
      >
        초기화
      </button>
    </section>
  )
}

export default ExamControls
