import './ExamCatalog.css'

const featuredIds = [
  'middle2-unit7-en-ko',
  'middle2-unit7-definitions',
  'middle2-unit8-en-ko',
  'middle2-unit8-definitions',
]

const featuredMeta = {
  'middle2-unit7-en-ko': { unit: '7과', type: '영어 → 한글', count: '66개 어휘', kind: 'words' },
  'middle2-unit7-definitions': { unit: '7과', type: '영영풀이', count: '51개 영영 정의', kind: 'definitions' },
  'middle2-unit8-en-ko': { unit: '8과', type: '영어 → 한글', count: '72개 어휘', kind: 'words' },
  'middle2-unit8-definitions': { unit: '8과', type: '영영풀이', count: '46개 영영 정의', kind: 'definitions' },
}

function Icon({ name, size = 24, ...props }) {
  const base = { viewBox: '0 0 24 24', width: size, height: size, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, ...props }
  if (name === 'book') return <svg {...base}><path d="M12 6.7C9 4.8 5.2 4.7 2 5.5v13c3.4-.8 7-.7 10 1.1 3-1.8 6.6-1.9 10-1.1v-13c-3.2-.8-7-.7-10 1.2Z" /><path d="M12 6.7v12.9" /></svg>
  if (name === 'file') return <svg {...base}><path d="M14 2H5.5A1.5 1.5 0 0 0 4 3.5v17A1.5 1.5 0 0 0 5.5 22h13a1.5 1.5 0 0 0 1.5-1.5V8z" /><path d="M14 2v6h6M8 12h8M8 16h8M8 19h5" /></svg>
  if (name === 'print') return <svg {...base}><path d="M6 8V3h12v5M6 18H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6zM18 11h.01" /></svg>
  if (name === 'check') return <svg {...base}><path d="M7 3h8l4 4v14H5V3h2Z" /><path d="M15 3v5h4M8 12h6M8 16h3"/><path d="m13 16 2 2 4-4" /></svg>
  if (name === 'shuffle') return <svg {...base}><path d="m17 3 4 4-4 4M3 17h4c4 0 5-10 10-10h4M17 21l4-4-4-4M3 7h4c2 0 3 2 4 4M14 16c1 1 2 1 3 1h4" /></svg>
  if (name === 'arrow') return <svg {...base}><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
  if (name === 'spark') return <svg {...base}><path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2ZM19 17l.6 2.4L22 20l-2.4.6L19 23l-.6-2.4L16 20l2.4-.6L19 17Z"/></svg>
  if (name === 'layers') return <svg {...base}><path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/></svg>
  return null
}

function ExamCard({ exam, onSelectExam }) {
  const meta = featuredMeta[exam.id]
  const definition = meta.kind === 'definitions'

  return (
    <button
      type="button"
      className={`home-exam-card ${definition ? 'home-exam-card--definition' : 'home-exam-card--word'}`}
      disabled={!exam.available}
      onClick={() => onSelectExam(exam.id)}
      aria-label={`${exam.title} 선택하기`}
    >
      <span className="home-exam-icon"><Icon name={definition ? 'file' : 'book'} size={27} /></span>
      <span className="home-exam-content">
        <span className="home-exam-tag">{meta.type}</span>
        <strong>중2 {meta.unit}</strong>
        <span className="home-exam-title">{definition ? '영영풀이 시험지' : '영 → 한 시험지'}</span>
        <span className="home-exam-details">동아(윤정미) · {meta.count}</span>
      </span>
      <span className="home-exam-arrow"><Icon name="arrow" size={18} /></span>
    </button>
  )
}

function ExamPreview() {
  const examples = [
    ['wash one’s face', '세수하다'],
    ['spicy', '매운'],
    ['order', '주문하다'],
    ['delicious', '맛있는'],
    ['souvenir', '기념품'],
    ['picture', '그림'],
  ]

  return (
    <div className="home-preview" aria-hidden="true">
      <div className="home-preview-halo" />
      <div className="home-preview-caption"><Icon name="spark" size={19} /> 단어 학습, 더 편리하게</div>
      <div className="home-preview-paper home-preview-paper--answer">
        <div className="home-preview-paper-minihead">ANSWER KEY</div>
        <h3>정답지</h3>
        <div className="home-preview-tiny-rule" />
        {examples.map(([word, answer], idx) => <div className="home-preview-answer" key={word}><span>{idx + 1}.</span>{answer}</div>)}
      </div>
      <div className="home-preview-paper home-preview-paper--exam">
        <div className="home-preview-paper-minihead"><span>ONE · VOCABULARY</span><span>LESSON 07</span></div>
        <h3>단어시험지</h3>
        <div className="home-preview-sheet-meta"><span>중학교 2학년</span><span>7과</span><span>영어 → 한글</span></div>
        <div className="home-preview-lines">
          {examples.map(([word], idx) => <div className="home-preview-line" key={word}><span className="home-preview-number">{String(idx + 1).padStart(2, '0')}</span><span className="home-preview-word">{word}</span><span className="home-preview-blank" /></div>)}
        </div>
        <div className="home-preview-sheet-footer"><span>ONLYONE EDU</span><span>01 / 01</span></div>
      </div>
      <div className="home-floating-note"><span className="home-floating-note-icon"><Icon name="check" size={22} /></span><span><b>A4 출력</b><small>시험지 + 정답지</small></span></div>
      <div className="home-preview-star home-preview-star--one">✳</div>
      <div className="home-preview-star home-preview-star--two">✦</div>
    </div>
  )
}

function ExamCatalog({ exams, onSelectExam }) {
  const featured = featuredIds.map((id) => exams.find((exam) => exam.id === id)).filter(Boolean)
  const extra = exams.filter((exam) => !featuredIds.includes(exam.id))

  return (
    <main className="home-shell" id="home-top">
      <header className="home-nav">
        <div className="home-nav-inner">
          <a className="home-brand" href="#home-top" aria-label="온리원에듀 단어시험지 홈">
            <img src={`${import.meta.env.BASE_URL}onlyone-logo.webp`} alt="Onlyone Edu 1:1 온리원에듀" />
          </a>
          <nav className="home-nav-links" aria-label="메인 메뉴">
            <a href="#exam-selection">시험지 선택</a>
            <a href="#how-to-use">이용 안내</a>
          </nav>
          <a className="home-nav-cta" href="#exam-selection">시험지 만들기 <Icon name="arrow" size={16} /></a>
        </div>
      </header>

      <div className="home-main">
        <section className="home-hero" aria-labelledby="home-headline">
          <div className="home-hero-copy">
            <p className="home-eyebrow"><span className="home-eyebrow-dot" /> ONLYONE EDU · VOCABULARY EXAM</p>
            <h1 id="home-headline">꾸준한 단어 학습이<br /><span>더 큰 가능성</span>을 만듭니다.</h1>
            <p className="home-hero-statement">온리원에듀 은평점 5관 전용<br className="home-mobile-break" /> 단어시험지 사이트입니다.</p>
            <p className="home-hero-description">필요한 단원을 고르고, 원하는 문항 수로 만들어요.<br />시험지부터 정답지까지 한 번에 준비할 수 있습니다.</p>
            <div className="home-hero-actions">
              <a href="#exam-selection" className="home-primary-button"><Icon name="file" size={19} /> 시험지 선택하기 <Icon name="arrow" size={19} /></a>
              <a href="#how-to-use" className="home-secondary-button"><Icon name="book" size={19} /> 이용 안내 보기</a>
            </div>
            <div className="home-hero-assurance"><span className="home-assurance-dot" /> 단원별 출제 <span className="home-assurance-divider">·</span> 랜덤 출제 <span className="home-assurance-divider">·</span> A4 인쇄 지원</div>
          </div>
          <ExamPreview />
        </section>

        <section className="home-features" aria-label="시험지 제작 기능">
          <div className="home-feature"><span className="home-feature-icon home-feature-icon--cyan"><Icon name="print" size={25} /></span><span><strong>A4 출력 지원</strong><small>인쇄에 맞춘 시험지</small></span></div>
          <div className="home-feature"><span className="home-feature-icon home-feature-icon--mint"><Icon name="check" size={25} /></span><span><strong>정답지 자동 생성</strong><small>시험지와 함께 한 번에</small></span></div>
          <div className="home-feature"><span className="home-feature-icon home-feature-icon--blue"><Icon name="shuffle" size={25} /></span><span><strong>단어 랜덤 출제</strong><small>매번 다른 순서로 출제</small></span></div>
          <div className="home-feature"><span className="home-feature-icon home-feature-icon--cyan"><Icon name="layers" size={25} /></span><span><strong>단원별 시험지</strong><small>교과서별로 빠르게 선택</small></span></div>
        </section>

        <section className="home-exams-section" id="exam-selection" aria-labelledby="home-exams-heading">
          <div className="home-section-heading">
            <div><div className="home-section-kicker">CHOOSE YOUR EXAM</div><h2 id="home-exams-heading">시험지 선택</h2><p>원하는 단원과 유형을 선택해 단어시험지를 만들어보세요.</p></div>
            <span className="home-section-count">중2 7·8과 <strong>4가지 유형</strong></span>
          </div>
          <div className="home-featured-grid">
            {featured.map((exam) => <ExamCard key={exam.id} exam={exam} onSelectExam={onSelectExam} />)}
          </div>
        </section>

        <section className="home-other-section" aria-labelledby="home-other-heading">
          <div className="home-section-heading home-section-heading--compact"><div><div className="home-section-kicker">MORE VOCABULARY TESTS</div><h2 id="home-other-heading">다른 시험지</h2><p>기존에 사용하던 시험지도 모두 그대로 이용할 수 있어요.</p></div></div>
          <div className="home-other-grid">
            {extra.map((exam) => <button type="button" className="home-other-card" key={exam.id} disabled={!exam.available} onClick={() => onSelectExam(exam.id)}><span className="home-other-icon"><Icon name="book" size={21} /></span><span className="home-other-copy"><strong>{exam.title}</strong><small>{exam.description}</small></span><span className="home-other-arrow"><Icon name="arrow" size={17} /></span></button>)}
          </div>
        </section>

        <section className="home-guide" id="how-to-use" aria-labelledby="home-guide-heading">
          <div className="home-guide-intro"><span className="home-section-kicker">HOW TO USE</span><h2 id="home-guide-heading">시험지 만들기, 간단해요</h2><p>기존의 시험지 제작 기능과 출력 형식은 그대로 유지했어요.</p></div>
          <div className="home-guide-steps"><div><span>01</span><strong>시험지 선택</strong><p>단원과 유형을 고르세요.</p></div><div><span>02</span><strong>문항 수 설정</strong><p>순서 또는 랜덤 출제를 선택하세요.</p></div><div><span>03</span><strong>생성 후 A4 출력</strong><p>시험지와 정답지를 인쇄하세요.</p></div></div>
        </section>
      </div>
      <footer className="home-footer"><span>© 2026 ONLYONE EDU · 은평점 5관</span><span>온리원에듀 은평점 5관 전용 단어시험지 사이트</span></footer>
    </main>
  )
}

export default ExamCatalog
