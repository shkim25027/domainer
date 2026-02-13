# Domainer

React + Vite 기반 SPA.

## 프로젝트 구조

```
domainer/
├── public/              # 정적 파일 (그대로 서빙)
│   ├── favicon.svg
│   ├── fonts/           # 웹 폰트
│   └── images/          # 이미지, 아이콘
├── src/
│   ├── components/      # 레이아웃·공통 컴포넌트
│   │   ├── Layout.jsx
│   │   ├── Header.jsx
│   │   ├── Nav.jsx
│   │   └── Footer.jsx
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── Home.jsx
│   │   └── Guide.jsx
│   ├── styles/          # SCSS (공통·컴포넌트·레이아웃)
│   │   ├── common.scss
│   │   ├── style.scss
│   │   ├── guide.scss
│   │   ├── _root.scss
│   │   ├── import/      # 변수, 믹스인, 리셋 등
│   │   ├── common/      # 리셋, 모달, 반응형
│   │   ├── components/  # 버튼, 뱃지, 입력, 카드 등
│   │   ├── layouts/
│   │   └── pages/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## 설치

```bash
npm install
```

## 실행

```bash
npm run dev
```

또는 `npm start` — 개발 서버가 `http://localhost:3000`에서 실행됩니다.

## 빌드

```bash
npm run build
```

`dist/`에 배포용 파일이 생성됩니다.

```bash
npm run preview
```

빌드 결과를 로컬에서 확인할 수 있습니다.

## 라우팅

- `/` — 메인
- `/guide` — 컴포넌트 가이드 (버튼, 뱃지, 폼 등)

## 설정

- **Vite:** `vite.config.js`
- **스타일:** `src/styles/` (SCSS 진입: `common.scss`, `style.scss`)
