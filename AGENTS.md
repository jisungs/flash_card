# AGENTS.md

## 프로젝트 개요

외국어(일본어/영어) 학습용 플래시카드 앱. 순수 프런트엔드(HTML/CSS/JS + Bootstrap 5)로 구성되어 있으며, 별도의 빌드 과정 없이 `words.json`과 브라우저 LocalStorage만으로 동작한다. 백엔드(server, DB, 실제 인증)는 아직 미구현 상태다.

## 실행 방법

정적 파일이므로 웹 서버를 통해서 실행해야 `fetch("words.json")`이 동작한다.

```bash
python3 -m http.server 8000
# http://localhost:8000
```

`file://`로 직접 열면 단어 로드에 실패한다.

## 주요 파일 및 구조

| 파일 | 역할 |
|---|---|
| `index.html` | 대시보드. 전체/마스터/복습 통계 + 학습 세트 선택 카드 carousel |
| `flash_card.html` | 핵심 학습 페이지. URL 파라미터로 모드 분기 |
| `card_deck.html` | 넷플릭스 스타일 콘텐츠(드라마) 선택 화면 |
| `kanji_deck.html` | 한자 획순 연습 (HanziWriter + `hanzi-writer-data-jp` CDN) |
| `login.html` / `logout.html` | 데모 로그인/로그아웃 (하드코딩된 자격증명) |
| `sign_up.html` | 5단계 회원가입 온보딩 (기획서 `plans/회원가입페이지_기획서.md` 기반, 저장 로직 없음) |
| `scripts.js` | 모든 동적 로직 담당 (학습 페이지 대시보드 2개 용도) |
| `styles.css` | 공통 스타일 + `:root` 디자인 토큰 (`--bg-color`, `--accent-color` 등) |
| `auth.css` | 로그인/로그아웃/회원가입 공통 스타일 (`auth-*` 클래스). `styles.css` 뒤에 로드 |
| `words.json` | 단어 데이터 소스 |
| `main.py` | 백엔드 골격 자리 (`print('hello world')`만 존재) |
| `upgrade_plan.md` / `plans/` | 구현·미래 개선 계획 문서 (SRS 알고리즘, DB, 구독 등은 계획만 존재) |
| `images/` | ✓/✗ 버튼 PNG, 콘텐츠 썸네일 등 |

## 데이터 흐름

- **단어 데이터**: `words.json` — 단어 객체는 `front`, `back`, `category`, `set`, `contentId` 필드를 가진다.
  - `set`: 세트 그룹 (예: "기초 일본어", "Drama Vocabulary")
  - `contentId`: 콘텐츠 매핑 (예: `drama_01`) — `card_deck.html`의 카드와 연결
- **학습 상태**: LocalStorage의 `knownWords` / `unknownWords` (배열, `words.json` 인덱스 저장)
- `scripts.js`의 필터링 순서: `set` → `content` → `category(mode)` 순으로 좁혀 `filteredWords`를 만든다.

## 학습 페이지 URL 파라미터

`flash_card.html`에서 사용:

| 파라미터 | 예시 | 동작 |
|---|---|---|
| `mode` | `all`, `wrong`, `known`, 또는 `category` 값 | 학습 세트 필터링. `wrong`/`known`은 LocalStorage 기반 |
| `set` | `기초 일본어` | 특정 세트만 학습 |
| `content` | `drama_01` | 특정 콘텐츠 단어만 학습 |

## 핵심 기능

- 카드 3D 뒤집기, 셔플(Fisher-Yates), 진행률 바, 완료 모달
- 담당·모바일 입력: 키보드(`←`/`→`/`Space`), 좌우 스와이프
- 카드 뒷면 ✓/✗ 오버레이 버튼 → 정답/오답 기록 후 자동으로 다음 카드로 이동
- 오답 노트: `flash_card.html?mode=wrong`

## 주의사항 및 잔여 작업

- `main.py`가 비어 있고 로그인·회원가입은 모두 프런트 훼이크로만 동작 (DB/세션 없음). 계획은 `upgrade_plan.md`에 정리됨.
- 인증 페이지(login/logout/sign_up)는 `styles.css` + `auth.css`만 로드하며 인라인 `<style>` 없음. 배경 그린 `--bg-color` 상속, navbar 없음(집중형 레이아웃 유지). sign_up은 JS가 참조하는 `.step`/`.select-card`/`.tag`/`.btn` 클래스명을 유지해야 한다.
- `login.html`의 링크 일부가 존재하지 않는 파일(`signup.html`, `forgot-password.html`)을 가리킨다.
- `styles.css\`` (백틱이 붙은 파일)은 오타로 보이는 중복 파일 → 삭제 대상.
- `scripts.js`는 학습 페이지와 대시보드 로직이 한 파일에 공존하며, `#flashcard-container` 존재 여부로 분기한다.

## 커밋 컨벤션

- 한국어로 메시지 작성, 최근 커밋은 짧은 요약형 (예: "login logout 페이지 nav bar 제거").
- 병합된 `styles.css\`` 같은 임시/오타 파일은 커밋 전 정리.