# SCSS 폴더 가이드 (초보자용)

이 폴더는 사이트의 **스타일(디자인)**을 관리하는 SCSS 파일들이 들어 있습니다.  
처음 보시는 분도 **어디를 고치면 어떤 게 바뀌는지** 쉽게 찾을 수 있도록 정리해 두었습니다.

---

## 🚀 빠르게 찾기: "이걸 바꾸고 싶다" → "이 파일을 열자"

| 바꾸고 싶은 것 | 열어볼 파일 |
|----------------|-------------|
| **전체 글자 색, 배경 색, 버튼 색** | `_root.scss` (CSS 변수) |
| **헤더(로고, 메뉴)** | `layouts/_layout.scss` (헤더·네비 포함) |
| **플로팅 버튼/메뉴** | `layouts/_floating.scss` (추가 시) |
| **버튼 모양** | `components/_buttons.scss` (추가 시) |
| **팝업 모양** | `common/_modal.scss` |
| **메인 페이지** | `pages/_main.scss` |
| **관리자 페이지** | `pages/admin/` 폴더 |
| **폰트, 리셋, 공통 유틸** | `import/`, `common/` 폴더 |

---

## 📁 폴더가 하는 일 (한 줄 요약)

```
scss/
├── _root.scss          ← 🎨 색상·그림자·그라데이션 등 "디자인 변수" (여기만 바꿔도 전체에 반영)
├── style.scss          ← 📄 페이지별 스타일만 묶어서 style.css 로 컴파일 (진입점)
├── common.scss         ← 🔧 공통 스타일 묶어서 common.css 로 컴파일 (진입점)
│
├── import/             ← 설정용 (변수, mixin, 리셋, 폰트 등) — 보통 수정 빈도 낮음
├── common/             ← 공통 스타일 (리셋, 모달, 반응형)
├── layouts/            ← 헤더, 네비, 본문 레이아웃
├── components/         ← 버튼, 팝업 등 재사용 UI (추가 시)
└── pages/              ← 페이지별 스타일 (메인, admin, value, provided …)
```

- **style.min.css** = `style.scss`가 컴파일된 결과 (페이지 전용 스타일)
- **common.min.css** = `common.scss`가 컴파일된 결과 (공통 스타일)  
→ HTML에서는 `common.min.css` → `style.min.css` 순서로 로드합니다.

---

## 📂 각 폴더 안에는 뭐가 있나요?

### `import/` — 기본 설정
- `_variables.scss` : 폰트 크기, 줄간격, 폰트 패밀리 등
- `_mixin.scss` : 반복 쓰는 스타일 묶음 (flex, blind, ellipsis, 미디어쿼리 등)
- `_typography.scss` : 타이포그래피
- `_reset-css.scss` : 브라우저 기본 스타일 리셋
- `_px-convert.scss`, `_lib-fonts.scss` : 단위/폰트 보조

### `common/` — 공통 스타일
- `_reset.scss` : 스크롤바, clearfix, blind, gra 클래스
- `_modal.scss` : 모달, dim 배경
- `_responsive.scss` : 전역 미디어쿼리(폰트 크기 등)

### `layouts/` — 레이아웃
- `_layout.scss` : 헤더, 네비(사이드), 본문(.wrap, .inner, .container)

### `components/` — 재사용 UI
- 필요 시 `_buttons.scss`, `_popup.scss` 등 추가

### `pages/` — 페이지별
- `_main.scss` : 메인
- **`admin/`** : **관리자 대시보드** (variables, base, components, sections, blocks, responsive)
- 추가 시: value/, provided/, primary/, analysis/, results/, _faq.scss, _buy.scss

관리자(admin) 폴더에는 `_variables.scss`, `_base.scss`, `components/`(버튼·체크박스·태그 등), `_sections.scss`, `_blocks.scss`, `_responsive.scss`가 있고,  
`_index.scss`가 한 번에 불러옵니다.

---

## 🔧 관리자 대시보드 스타일 수정하기

관리자 페이지는 **컴포넌트 단위**로 나뉘어 있어, 용도별로 찾아 수정하기 쉽습니다.

| 수정할 것 | 열 파일 |
|-----------|---------|
| 관리자 전용 색·간격·사이드바 너비 | `pages/admin/_variables.scss` |
| 관리자 공통 레이아웃·컨테이너 | `pages/admin/_base.scss` |
| **버튼** (확정/취소/아웃라인, 필터 버튼) | `pages/admin/components/_button.scss` |
| **체크박스·리스트** (선택 영역, 스크롤 컨트롤) | `pages/admin/components/_checkbox.scss` |
| **태그** (필터 태그, 보상 유형 태그) | `pages/admin/components/_tag.scss` |
| **뱃지·상태** (보통/주의/비협조) | `pages/admin/components/_badge.scss` |
| **칩** (제거 가능 칩) | `pages/admin/components/_chip.scss` |
| **입력 필드** (편집 필드) | `pages/admin/components/_input.scss` |
| **카드·아이템 블록** | `pages/admin/components/_card.scss` |
| **링크·문서 목록** | `pages/admin/components/_link.scss` |
| **별점** | `pages/admin/components/_stars.scss` |
| 페이지 헤더·통계·요약 블록 | `pages/admin/_blocks.scss` |
| 대시보드·테이블·폼 섹션 | `pages/admin/_sections.scss` |
| 관리자 반응형 | `pages/admin/_responsive.scss` |

HTML에서 관리자 페이지에는 루트에 `class="page-admin"` 등을 붙여 스코프를 나누면 됩니다.

---

## 🔧 자주 쓰는 작업

### 1) 색상만 바꾸고 싶을 때
- **전역 색** : `_root.scss` 안의 `:root { ... }` 값 수정  
  (예: `--text-primary`, `--color-green`, `--bg-base` 등)

### 2) 특정 페이지만 고칠 때
- 해당 페이지 폴더로 이동 (예: 관리자 → `pages/admin/`)
- 그 페이지 전용 변수는 `_variables.scss`, 스타일은 `_base.scss` 또는 `_sections.scss`

### 3) Mixin 쓰는 방법 (다른 scss 파일 안에서)
```scss
@use "../import/mixin" as *;     // layouts, components 에서
@use "../../import/mixin" as *;  // pages 에서
@use "../../import/mixin" as *; // pages/admin 등 하위에서

.내클래스 {
  @include flex(center, center);
  @include mq(tablet, max) { ... }
}
```

### 4) 변수 쓰는 방법
```scss
@use "../import/variables" as *;
// 또는 페이지별 변수: @use "variables" as *;  (해당 페이지 폴더 안에서)
```

---

## 📦 CSS가 로드되는 순서 (참고)

1. **common.min.css** (common.scss 컴파일)
   - import(폰트, 리셋 등) → common(리셋, 모달, 반응형)
2. **style.min.css** (style.scss 컴파일)
   - `_root.scss`(CSS 변수) → layouts → pages(메인, admin 등)

즉, **공통 레이아웃·컴포넌트**가 먼저 로드되고, 그 다음 **페이지 전용 스타일**이 로드됩니다.

---

## ✅ 유지보수 팁

- **파일 이름 앞에 `_`가 붙은 파일**은 단독으로 컴파일되지 않고, 다른 파일에서 `@forward`/`@use`로 불러 씁니다.
- **색·간격 등은 가능한 한 `_root.scss`나 각 폴더의 `_variables.scss`에 두고**, 숫자를 직접 넣기보다 변수로 쓰면 나중에 수정이 쉽습니다.
- **새 페이지를 추가**할 때는 `pages/_index.scss`에 한 줄 `@forward "새폴더명/index";` 를 추가하고, `pages/새폴더명/` 안에 `_index.scss`와 필요한 scss 파일들(_variables, _base, _sections, _responsive 등)을 만듭니다.

궁금한 점이 있으면 위 표에서 "바꾸고 싶은 것"에 맞는 파일을 먼저 열어보면 됩니다.
