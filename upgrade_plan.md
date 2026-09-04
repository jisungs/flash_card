# 🚀 Flash Card 프로젝트 업그레이드 계획: 콘텐츠 중심 학습 시스템

현재의 일반적인 학습 방식에서 벗어나, 사용자가 특정 콘텐츠(예: 드라마)를 선택하고 해당 콘텐츠와 관련된 단어를 학습하는 **'콘텐츠 기반 학습 경험(Content-driven Learning Experience)'**을 구축하는 것을 목표로 합니다.

---

## 🎯 목표

1. **넷플릭스 스타일의 덱 선택 화면**: `card_deck.html`을 시각적으로 매력적인 콘텐츠 선택 화면으로 업그레이드합니다.
2. **콘텐츠-단어 매핑**: 특정 콘텐츠(이미지)와 그에 해당하는 단어 세트를 연결합니다.
3. **흐름의 전환**: 사용자가 섬네일을 클릭하면, 해당 콘텐츠의 테마가 반영된 학습 세트로 즉시 연결됩니다.

---

## 📋 상세 업그레이드 단계

### 1단계: 데이터 구조 및 콘텐츠 매핑 체계 구축

콘텐츠(드라마/영화)와 단어 세트 간의 관계를 정의해야 합니다.

* **`words.json` 구조 개선**: 각 단어 객체에 `contentId` 또는 `contentName` 필드를 추가하여, 어떤 콘텐츠의 학습 데이터인지를 식별할 수 있도록 합니다.
* **콘텐츠 메타데이터 정의**: `card_deck.html`에서 표시할 콘텐츠 목록(이름, 섬네일 이미지 경로, 고유 ID)을 정의하는 구조를 만듭니다.

### 2단계: `card_deck.html` UI/UX 업그레이드 (넷플릭스 스타일)

단순한 리스트가 아닌 시각적 경험을 제공합니다.

* **레이아웃 설계**: 넷플릭스 특유의 카드형 레이아웃(Grid)을 적용합니다.
* **컴포넌트 구성**:
  * **Hero Section**: 현재 가장 추천하는 콘텐츠를 크게 보여주는 상단 섹션.
  * **Content Row**: `drama_thumnail_01.jpg`와 같은 섬네일 이미지가 포함된 카드형 목록.
* **인터랙션 추가**: 카드에 마우스를 올렸을 때 약간 커지거나 밝아지는 호버(Hover) 효과를 적용하여 클릭 유도.

### 3단계: 콘텐츠 기반 학습 경로 구현 (`scripts.js` 고도화)

사용자의 '선택'이 '학습'으로 이어지는 로직을 구현합니다.

* **콘텐츠 선택 로직**: `card_deck.html`에서 카드를 클릭할 때, 해당 콘텐츠의 ID를 URL 파라미터(예: `?content=drama_01`)로 담아 `flash_card.html`로 이동시킵니다.
* **학습 필터링 로직 업데이트**:
  * `flash_card.html`의 `scripts.js`가 URL 파라미터를 읽어, 해당 콘텐츠에 할당된 단어들만 필터링하여 `filteredWords`를 생성하도록 수정합니다.
* **학습 결과 추적 강화**: 학습된 데이터가 단순한 단어 정보가 아니라, '어떤 콘텐츠를 통해 학습했는지'에 대한 정보와 함께 `LocalStorage`에 저장될 수 있도록 확장합니다.

---

## 🛠️ 기술 스택 및 도구

* **HTML5/CSS3**: 넷플릭스 스타일의 그리드 및 애니메이션 구현
* **JavaScript**: URL 파라미터 파싱 및 데이터 필터링 로직
* **JSON**: 콘텐츠-단어 매핑 데이터 관리

## 🚀 기대 효과

* **학습 동기 부여**: 단순 단어 암기가 아닌, 좋아하는 콘텐츠를 공부한다는 느낌을 주어 학습 몰입도를 높입니다.
* **시각적 만족도 향상**: 정적인 페이지에서 동적인 콘텐츠 플랫폼의 느낌으로 프로젝트의 UI 수준을 격상시킵니다.

---

## 🔮 미래 업그레이드 옵션 (Future Upgrade Options)

### 1. 콘텐츠 다양화 (Content Expansion)

* **내용**: `words.json`에 새로운 콘텐츠 세트(예: 영화, 여행 영어, 기초 단어 등)를 대량으로 추가하고, `card_deck.html`에 새로운 카드들을 배치합니다.
* **목적**: 사용자가 고를 수 있는 옵션을 늘려 실제 서비스 같은 풍성함을 제공합니다.

### 2. 소리 학습 기능 (Sound/TTS)

* **내용**: 브라우저의 `Web Speech API (TTS - Text to Speech)`를 활용하여, 카드를 뒤집을 때 자동으로 발음을 들려주거나 스피커 아이크을 눌러 발음을 확인할 수 있는 기능을 추가합니다.
* **목적**: 시각적 학습을 청각적 학습으로 확장하여 실제 학습 효율을 극대화합니다.

### 3. 지능형 학습 알고리즘 (SRS)

* **내용**: **SRS(Spaced Repetition System, 간격 반복 알고리즘)** 개념을 도입합니다. (예: 틀린 단어는 더 자주, 맞춘 단어는 더 천천히 노출하는 Leitner System 방식)
* **목적**: 사용자의 기억력을 최적화하는 전문적인 학습 엔진을 구축합니다.

## 💰 유료 서비스 전환을 위한 비즈니스 및 기술 업그레이드 (SaaS Transformation)

현재의 로컬 도구를 넘어, 수익 창출이 가능한 전문 유료 서비스로 발전하기 위한 로드맵입니다.

### 1. 인프라 및 사용자 데이터 체계의 전환 (Infrastructure & User Data)
* **핵심 작업**: 백엔드 서버 구축 및 데이터베이스(DB) 도입
* **상세 내용**:
    * **Backend 서버 구축**: `main.py`를 활용하여 API 서버(FastAPI/Flask) 구축
    * **데이터베이스 도입**: `words.json` 대신 PostgreSQL/MongoDB 등을 사용하여 사용자의 학습 상태를 중앙 서버에 저장
    * **사용자 인증(Auth)**: 회원가입/로그인 시스템을 도입하여 기기 간 학습 데이터 동기화 지원
* **목적**: 어디서든 내 학습 기록을 확인하고 관리할 수 있는 환경 조성

### 2. 학습 가치의 극대화: 지능형 학습 알고리즘 (Intelligent Learning)
* **핵심 작업**: SRS(Spaced Repetition System) 알고리즘의 고도화
* **상세 내용**:
    * **고급 알고리즘 적용**: 단순 맞춤/틀림 저장을 넘어, SM-2와 같은 전문적인 간약 반복 알고리즘을 도입하여 최적의 복습 타이밍 제공
    * **개인화된 학습 경로**: 사용자의 오답 패턴을 분석하여 취약한 부분을 집중적으로 제안하는 기능
* **목적**: 사용자의 기억력을 최적화하는 '스마트한 학습 엔진'으로서의 핵심 경쟁력 확보

### 3. AI 기술과의 결합 (AI-Powered Features)
* **핵심 작업**: AI를 활용한 콘텐츠 자동 생성 및 학습 보조
* **상세 내용**:
    * **AI 카드 생성**: 사용자가 문장이나 단어만 입력해도 LLM을 활용하여 자동으로 `앞면-뒷면` 세트를 생성
    * **AI 발음 및 학습 보조**: AI TTS를 통한 자동 발음 기능 및 문맥에 맞는 예문 생성 기능
* **목적**: 학습 준비 시간을 획기적으로 단축하고 학습 경험을 풍부하게 제공

### 4. 수익 모델 및 서비스 운영 (Monetization & Operations)
* **핵심 작업**: 구독 모델 및 결제 시스템 도입
* **상세 내용**:
    * **구독 모델(Subscription)**: Free(기Basic) vs Pro(무제한 동기화, AI 기능, 고급 통계 등)로 등급 분리
    * **결제 시스템 연동**: Stripe/PayPal 등을 통한 정기 결제 기능 구축
    * **전문 콘텐츠 라이브러리**: 전문가가 검수한 고퀄리티 단어 세트 제공
* **목적**: 지속 가능한 수익 창출 및 전문적인 학습 플랫폼으로서의 브랜드 구축

## 🎨 프론트엔드 완성도 향상 계획 (Front-end Polish Plan)

단순한 기능 구현을 넘어, 사용자에게 "완성도 높은 제품"이라는 인상을 주기 위한 시각적/경험적 업그레이드 계획입니다.

---

### 1. 디자인 시스템 구축 (Design System)
모든 스타일을 체계적으로 관리하여 브랜드의 일관성을 유지합니다.

* **내용**: CSS 변수(`:root`)를 사용하여 색상, 간격, 그림자, 애니메이션 속도를 중앙 제어합니다.
* **목적**: 디자인 변경 시 유지보수 효율을 높이고, 모든 요소에 일치된 톤앤매너를 적용합니다.
* **핵심 요소**: `--color-primary`, `--shadow-lg`, `--radius-md`, `--transition-base` 등

### 2. 마이크로 인터랙션 및 애니메이션 (Micro-interactions)
사용자의 동작에 대해 생동감 있는 반응을 제공합니다.

* **내용**: 
    * 카드 뒤집기 애니메이션에 `perspective`와 `scale` 효과를 추가하여 입체감 극대화.
    * 버튼 클릭 시 미세한 크기 변화(`scale(0.95)`)를 주어 물리적인 클릭감 제공.
* **목적**: 정적인 웹페이지를 동적이고 살아있는 서비스로 전환합니다.

### 3. UX 디테일 및 피드백 (UX Details)
사용자가 서비스와 상호작용하고 있다는 신호를 명확히 전달합니다.

* **내용**:
    * **토스트 메시지(Toast Messages)**: 학습 상태 변경 시(예: 단어 저장 성공) 하단에 작은 알림창을 띄워 피드백 제공.
    * **스켈레톤 스크린(Skeleton Screens)**: 데이터를 불러오는 동안 카드 모양의 플레이스홀더를 보여주어 로딩 경험 개선.
* **목적**: 로딩 중의 지루함을 줄이고, 사용자의 행동에 대한 명확한 결과 확인을 돕습니다.

### 4. 모바일 최적화 및 제스처 (Mobile & Gestures)
스마트폰 환경에서의 사용 편의성을 극대화합니다.

* **내용**:
    * **스와이프 제스처(Swipe Gestures)**: 카드를 좌우로 밀어 정답/오답을 처리하는 모바일 친화적 인터랙션 구현.
    * **터치 최적화**: 버튼 크기와 간격을 손가락 터치에 적합하도록 조정.
* **목적**: 모바일 환경에서 앱(App)을 사용하는 듯한 자연스러운 경험을 제공합니다.

---

---

# 🛠️ P0 긴급 UI/UX 수정 계획서 (실행 가능 버전)

> **대상**: 초보 개발자 또는 로컬 AI(Agent)  
> **목적**: 모바일에서 플래시카드 앱이 사실상 사용 불가능한 핵심 버그 4건을 수정  
> **변경 파일**: `styles.css`, `scripts.js` (총 2개 파일)  
> **소요 시간**: 약 35~45분

---

## 📋 수정 요약

| # | 문제 | 파일 | 심각도 |
|---|------|------|--------|
| 1 | 정답/오답 버튼이 모바일에서 보이지 않음 | `styles.css` | 🔴 치명적 |
| 2 | 터치 타겟(버튼)이 너무 작음 | `styles.css` | 🔴 치명적 |
| 3 | 스와이프 제스처 미지원 | `scripts.js` | 🔴 치명적 |
| 4 | `e.target` 체크 버그 (이미지 클릭 시 카드 뒤집힘) | `scripts.js` | 🟠 높음 |

---

## 1️⃣ 정답/오답 버튼이 모바일에서 보이지 않는 문제

### 문제 설명
`styles.css` 139~143번째 줄을 보면, 정답/오답 버튼(`.overlay-controls`)이 **마우스를 올렸을 때만(`:hover`)** 나타나도록 설정되어 있습니다. 모바일(스마트폰/태블릿)에는 `:hover`가 없기 때문에, 사용자가 카드를 뒤집어도 버튼이 **영원히 보이지 않습니다**. 결과적으로 사용자는 학습 상태를 기록할 수 없습니다.

### 수정 전 코드 (`styles.css` 139~143번째 줄)
```css
/* 수정 전: hover일 때만 보임 */
.flashcard.flipped .back:hover .overlay-controls {
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
}
```

### 수정 후 코드
```css
/* 수정 후: flipped 상태면 항상 보임 (hover 불필요) */
.flashcard.flipped .back .overlay-controls {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
}

/* 데스크톱(마우스가 있는 기기)에서는 hover 시 버튼에 스케일 효과 추가 */
@media (hover: hover) {
    .flashcard.flipped .back .overlay-controls .control-btn:hover {
        transform: scale(1.15);
    }
}
```

### 변경 포인트
- `.back:hover` → `.back`으로 변경 (`:hover` 제거)
- `!important` 3개 제거 (`opacity`, `visibility`, `pointer-events`)
- `@media (hover: hover)` 블록 추가: 데스크톱에서만 hover 인터랙션 유지

### 검증 방법
1. �라우저에서 `flash_card.html` 열기
2. 카드를 클릭하여 뒤집기
3. **데스크톱**: 마우스 올리면 버튼 스케일업 효과 확인
4. **모바일(또는 브라우저 개발자도구 → 모바일 모드)**: 카드 뒤집으면 버튼 바로 표시되는지 확인

---

## 2️⃣ 터치 타겟(버튼)이 너무 작은 문제

### 문제 설명
`styles.css` 216~223번째 줄의 `select, button` 스타일을 보면 `padding: 8px 12px`으로 설정되어 있습니다. 이는 실제 높이 약 36px 정도인데, WCAG(Web Content Accessibility Guidelines)에서는 터치 타겟 최소 높이를 **44px** 이상 권장합니다. 현재 상태では 손가락으로 정확히 누르기 어렵습니다.

### 수정 대상 ①: 공통 버튼/셀렉트 (`styles.css` 216~223번째 줄)

**수정 전:**
```css
select,
button {
    padding: 8px 12px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
    cursor: pointer;
}
```

**수정 후:**
```css
select,
button {
    padding: 10px 16px;
    min-height: 48px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    cursor: pointer;
}
```

**변경 포인트:**
- `padding`: `8px 12px` → `10px 16px` (여백 확대)
- `min-height: 48px` 추가 (WCAG 기준 충족)
- `border-radius`: `5px` → `8px` (약간 둥글게)

### 수정 대상 ②: 오버레이 컨트롤 버튼 (`styles.css` 145~158번째 줄)

**수정 전:**
```css
.control-btn {
    width: 60px;
    height: 60px;
    background: none;
    border: none;
    cursor: pointer;
    transition: transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-shadow: none;
    z-index: 20;
}
```

**수정 후:**
```css
.control-btn {
    width: 56px;
    height: 56px;
    min-width: 48px;
    min-height: 48px;
    background: none;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-shadow: none;
    z-index: 20;
    -webkit-tap-highlight-color: transparent;
}
```

**변경 포인트:**
- `width/height`: `60px` → `56px` (약간 축소)
- `min-width: 48px`, `min-height: 48px` 추가 (최소 터치 영역 보장)
- `-webkit-tap-highlight-color: transparent` 추가 (iOS에서 파란색 하이라이트 제거)

### 수정 대상 ③: 모바일 브레이크포인트 내 (`styles.css` 242~262번째 줄)

**현재 모바일 브레이크포인트 끝에 다음 블록을 추가합니다:**
```css
/* 242번째 줄 기존 @media 블록 안에 추가 */
@media (max-width: 480px) {
    /* ... 기존 코드 유지 ... */
    
    /* 위 코드 끝에 아래 2줄 추가 */
    .controls button,
    .controls select {
        min-height: 48px;
        padding: 12px 16px;
    }
}
```

### 검증 방법
1. 브라우저 개발자도구 → 모바일 모드 (iPhone 12/13 크기)
2. 학습 페이지에서 버튼과 셀렉트가 손가락으로 편하게 눌리는지 확인
3. 오버레이의 ✓/✗ 버튼이 적절한 크기인지 확인

---

## 3️⃣ 스와이프 제스처 미지원 문제

### 문제 설명
`scripts.js` 전체에 터치/스와이프 관련 코드가 전혀 없습니다. 모바일 사용자가 카드를 좌우로 밀어서(swi pe) 다음/이전 카드로 이동할 수 없고, 오직 키보드의 화살표 키만 사용할 수 있습니다.

### 추가 위치: `scripts.js` 마지막 부분 (292번째 줄 끝)

**다음 코드를 `scripts.js`의 맨 마지막 줄(`});` 닫기 괄호 앞)에 삽입합니다:**

```javascript
    // === 스와이프 제스처 (모바일 터치 지원) ===
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const SWIPE_THRESHOLD = 50; // 최소 스와이프 거리 (px)

    if (container) {
        container.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        container.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // 수평 스와이프가 수직보다 클 때만 처리
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // 스와이프 임계값 초과 확인
                if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
                    if (deltaX < 0) {
                        // 왼쪽으로 스와이프 → 다음 카드
                        nextBtn.click();
                    } else {
                        // 오른쪽으로 스와이프 → 이전 카드
                        prevBtn.click();
                    }
                }
            }
        }, { passive: true });
    }
```

### 코드 설명 (한 줄씩)

| 줄 | 설명 |
|---|------|
| `let touchStartX = 0` | 터치 시작 X 좌표를 저장하는 변수 |
| `let touchStartY = 0` | 터치 시작 Y 좌표를 저장하는 변수 |
| `container.addEventListener("touchstart", ...)` | 사용자가 화면을 터치했을 때 시작 좌표 기록 |
| `{ passive: true }` | 스크롤 성능 최적화 (preventDefault 사용 안 함) |
| `container.addEventListener("touchend", ...)` | 손가락을 뗐을 때 끝 좌표 기록 후 계산 |
| `const deltaX = touchEndX - touchStartX` | 수평 이동 거리 계산 |
| `Math.abs(deltaX) > Math.abs(deltaY)` | **수평 스와이프인지 확인** (수직 스크롤과 구분) |
| `deltaX < 0` | 음수 = 왼쪽으로 이동 = 다음 카드 |
| `deltaX > 0` | 양수 = 오른쪽으로 이동 = 이전 카드 |

### CSS 추가 (`styles.css`)

`styles.css`의 `.flashcard` 셀렉터에 `touch-action` 속성을 추가합니다.

**수정 전 (`styles.css` 63~70번째 줄):**
```css
.flashcard {
    width: 300px;
    height: 200px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}
```

**수정 후:**
```css
.flashcard {
    width: 300px;
    height: 200px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    touch-action: pan-y;
}
```

**변경 포인트:** `touch-action: pan-y;` 1줄 추가
- `pan-y`: 수직 스크롤은 브라우저가 처리, 수평 터치는 JavaScript가 처리

### 검증 방법
1. 모바일 기기 또는 브라우저 개발자도구 모바일 모드에서 열기
2. 카드를 왼쪽으로 스와이프 → 다음 카드로 이동하는지 확인
3. 카드를 오른쪽으로 스와이프 → 이전 카드로 이동하는지 확인
4. 상하로 스크롤해도 페이지가 정상적으로 스크롤되는지 확인

---

## 4️⃣ `e.target` 체크 버그 (이미지 클릭 시 카드 뒤집힘)

### 문제 설명
`scripts.js` 210번째 줄을 보면:
```javascript
if (e.target.classList.contains("control-btn")) return;
```
카드를 클릭했을 때, `e.target`이 정확히 `.control-btn` 버튼 요소인지 확인합니다. 그러나 ✓/✗ 버튼은 `<button class="control-btn"><img src="..."/></button>` 구조로, 사용자가 **버튼 안의 이미지(`<img>`)를 클릭하면** `e.target`이 `img`가 됩니다. `img`는 `control-btn` 클래스가 없으므로 이 체크를 통과하고, 결과적으로 **버튼을 누르려는데 카드가 뒤집혀버리는 버그**가 발생합니다.

### 수정 대상: `scripts.js` 209~212번째 줄

**수정 전:**
```javascript
card.addEventListener("click", (e) => {
    if (e.target.classList.contains("control-btn")) return;
    card.classList.toggle("flipped");
});
```

**수정 후:**
```javascript
card.addEventListener("click", (e) => {
    if (e.target.closest(".control-btn")) return;
    card.classList.toggle("flipped");
});
```

**변경 포인트:**
- `e.target.classList.contains("control-btn")` → `e.target.closest(".control-btn")`

**왜 `closest()`인가?**
- `classList.contains()`: 요소 **자신**에게만 클래스가 있는지 확인
- `closest()`: 요소 **자신 + 부모 요소들** 중에서 해당 셀렉터를 찾음
- 이미지(`img`)를 클릭해도 `closest(".control-btn")`는 부모인 `<button class="control-btn">`를 찾아서 `null`이 아닌 값을 반환 → 카드 뒤집기 방지

### 검증 방법
1. 학습 페이지에서 카드를 뒤집기
2. 마우스 커서를 ✓ 버튼 위로 이동
3. ✓ 버튼의 **이미지 부분**을 클릭
4. **预期**: 카드가 뒤집히지 않고, 정답으로 처리되어야 함

---

## ✅ 전체 수정 완료 후 검증 체크리스트

모든 수정이 끝난 후, 아래 항목을 순서대로 테스트합니다:

### 데스크톱 테스트
- [ ] 카드 클릭 → 뒤집기 정상 작동
- [ ] 카드 뒤집은 후 마우스 올리면 ✓/✗ 버튼 표시
- [ ] ✓ 버튼 클릭 → 정답 처리, 다음 카드로 이동
- [ ] ✗ 버튼 클릭 → 오답 처리, 다음 카드로 이동
- [ ] 이전/다음 버튼 키보드 좌우 방향키로 작동
- [ ] 셔플 버튼 작동
- [ ] 학습 완료 시 모달 표시

### 모바일 테스트 (가장 중요)
- [ ] 카드 터치 → 뒤집기 정상 작동
- [ ] 카드 뒤집은 후 ✓/✗ 버튼이 **바로 표시됨** (hover 불필요)
- [ ] ✓/✗ 버튼을 손가락으로 편하게 누를 수 있음 (48px+)
- [ ] 왼쪽 스와이프 → 다음 카드로 이동
- [ ] 오른쪽 스와이프 → 이전 카드로 이동
- [ ] 상하 스크롤 정상 작동
- [ ] ✓ 버튼의 이미지 부분을 터치해도 카드가 뒤집히지 않음

---

## 📁 변경 파일 요약

| 파일 | 수정 위치 | 변경 내용 |
|------|-----------|-----------|
| `styles.css` | 63~70번째 줄 | `.flashcard`에 `touch-action: pan-y` 추가 |
| `styles.css` | 139~143번째 줄 | `:hover` 제거, `!important` 제거, `@media (hover: hover)` 블록 추가 |
| `styles.css` | 145~158번째 줄 | `.control-btn`에 `min-width/min-height: 48px` 추가 |
| `styles.css` | 216~223번째 줄 | `select, button`에 `min-height: 48px`, `padding` 확대 |
| `styles.css` | 242~262번째 줄 | 모바일 브레이크포인트에 버튼 높이 규칙 추가 |
| `scripts.js` | 209~212번째 줄 | `e.target.classList.contains` → `e.target.closest` |
| `scripts.js` | 292번째 줄 앞 | 스와이프 제스처 코드 블록 신규 추가 |
