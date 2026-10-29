# 온리원에듀 은평점 5관: 브랜드 메인 UI 적용 내역

## 반영 사항
- 기준: `voca-exam5-lesson8-A4-updated.zip` (중2 7과·8과 포함)
- 첫 화면만 2026 스타일의 교육용 랜딩 페이지 디자인으로 변경
- 사용자 제공 로고 사용: `public/onlyone-logo.webp`
- 브라우저 파비콘 추가: `public/favicon.png`
- 사이트 소개 문구: **온리원에듀 은평점 5관 전용 단어시험지 사이트입니다.**
- 상단 첫 네 개 카드: 중2 7과 영→한 / 중2 7과 영영풀이 / 중2 8과 영→한 / 중2 8과 영영풀이
- 다른 기존 시험지 6종은 아래의 '다른 시험지' 영역에 유지
- 상단 메뉴, 시험지 선택/이용 안내 CTA는 실제 내부 섹션으로 이동
- 화면 크기에 따라 카드가 4열 → 2열 등으로 재배치되는 반응형 CSS 적용
- 사용하지 않는 로그인/검색 메뉴는 추가하지 않음

## 변경한 코드 파일
- `src/components/ExamCatalog.jsx`
- `src/components/ExamCatalog.css` (신규)
- `index.html` (한국어 제목·설명·아이콘)
- `public/onlyone-logo.webp` (신규)
- `public/favicon.png` (신규)
- README와 이 변경 안내

## 유지 확인
- 중2 7과: 영→한 66 / 영영풀이 51
- 중2 8과: 영→한 72 / 영영풀이 46
- `src/App.css`, `src/components/Middle2Unit7ExamGenerator.jsx`, `src/data/middle2Unit7.json`, `src/data/middle2Unit8.json` 등은 직전 ZIP과 **동일**
- 프린트 레이아웃, 학생 정보, 정답지, 랜덤 및 문항 수 설정 유지

## 검증 상태
- 프로젝트 내 JS/JSX 20개 파일에 대한 TypeScript 구문 검사 통과
- 홈페이지 React 서버사이드 정적 렌더링 검사 통과 (새 카드 4개, 기존 카드 6개)
- 네 메뉴 ID의 App 라우팅 연결 확인
- 기존 핵심 출력 파일과 기준 ZIP의 바이너리 일치 확인
- **한계**: 이 실행 환경은 기존 ZIP이 macOS ARM64 의존성만 포함해 Linux용 Rolldown native binding이 없고 npm 내려받기가 제한되어, Vite 정식 빌드/브라우저 클릭 및 인쇄 테스트까지 완료하지 못함. VS Code에서 `npm ci && npm run build`로 최종 확인 필요.

## 배포 참고
- GitHub Pages Vite base 경로는 기존의 `/voca-exam5/`로 유지
- 저장소 이름이 다르면 `vite.config.js`의 `base`를 변경해야 함
- **이미 배포 중인 사이트에 반영하기 전**, 압축을 해제해 VS Code에서 실행하고 메인 카드 4개와 인쇄 미리보기를 확인한 다음 GitHub에 반영하세요.
