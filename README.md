# 온리원에듀 은평점 5관 · 전용 단어시험지 사이트

온리원에듀 브랜드 디자인을 적용한 React + Vite 단어시험지 제작 사이트입니다. **2026 하반기 스타일 메인 화면**을 추가했고, 기존 7·8과 단어/영영풀이와 A4 출력 로직을 유지합니다.

## VS Code에서 미리보기

1. 다운로드한 `온리원에듀_단어시험지_전체사이트.zip`의 압축을 해제합니다.
2. 압축 해제한 폴더를 VS Code에서 엽니다.
3. Node.js 20.19 이상 또는 22.12 이상이 설치된 터미널에서 다음 명령을 실행합니다.

   ```bash
   npm ci
   npm run dev
   ```

4. Vite가 출력한 URL로 접속합니다 (기본 설정은 `http://localhost:5173/voca-exam5/`).
5. 맨 위의 7과/8과 시험지 네 카드를 각각 눌러 생성·정답지·A4 인쇄를 확인합니다.

## 정식 빌드 및 배포

```bash
npm run build
```

성공하면 `dist/` 폴더가 생성됩니다. GitHub 저장소 `main` 브랜치에 소스 파일을 반영하면, 기존 `.github/workflows/deploy.yml`의 GitHub Pages 자동 배포가 실행됩니다.

> `vite.config.js`의 `base: '/voca-exam5/'`는 기존 GitHub Pages 저장소명을 기준으로 유지합니다. 실제 저장소 이름이 다르면 변경하세요.

## 수정 범위

- 새 홈 화면: `src/components/ExamCatalog.jsx`, `src/components/ExamCatalog.css`
- 로고·파비콘: `public/onlyone-logo.webp`, `public/favicon.png`
- 탭 제목과 언어 정보: `index.html`
- 기존 단어 JSON/인쇄 파일: 변경하지 않음

`BRAND_UI_CHANGES.md`에 파일 목록, 확인 결과 및 환경상 한계를 기록했습니다.
