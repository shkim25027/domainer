# Domainer – Gulp 사용 안내

## 1. 설치

### 1-1. 프로젝트 의존성 설치

프로젝트 루트에서 다음 명령으로 `package.json`에 있는 패키지(Gulp 포함)를 한 번에 설치합니다.

```bash
npm install
```

설치가 끝나면 `node_modules` 폴더가 생성되고, Gulp와 플러그인 등이 로컬에 설치됩니다.

### 1-2. Gulp CLI 전역 설치 (선택, 권장)

터미널 어디서나 `gulp` 명령을 쓰려면 CLI를 전역으로 설치합니다.

```bash
npm install --global gulp-cli
```

> **참고:** 전역 설치를 하지 않아도, 프로젝트 폴더에서는 `npx gulp`로 실행할 수 있습니다.

## 2. 실행

프로젝트 루트에서 터미널 실행:

```bash
gulp
```

기본 태스크가 실행되며, SCSS 컴파일·이미지 최적화·HTML 조립·브라우저 새로고침 등이 동작합니다.

## 3. 설정

- **설정 파일:** `gulpfile.mjs`
- **빌드 출력 경로:** `gulpfile.mjs` 상단의 `paths` 객체에서 수정 (예: `paths.build` → `./dist/`, 각 소스/출력 경로)
