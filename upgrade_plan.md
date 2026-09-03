# 🚀 Flash Card 프로젝트 업그레이드 로드맵

이 문서는 초보 개발자나 AI 에이전트가 단계별로 따라 하며 단순한 플래시카드 앱을 전문적인 학습 도구로 발전시킬 수 있도록 설계된 가이드라인입니다.

---

## 📌 프로젝트 목표

정적인 단어장 앱에서 시작하여 **사용자 경험(UX) 개선 $\rightarrow$ 학습 데이터 관리 $\rightarrow$ 서버 기반 서비스**로 확장하는 것을 목표로 합니다.

---

## 🛠️ 단계별 업그레이드 계획

### 🟢 단계 1: UX 및 인터페이스 강화 (Quick Wins)
**목표**: 사용자가 더 편리하고 빠르게 학습할 수 있는 환경 구축

#### 1.1 키보드 내비게이션 추가
... (기존 내용 유지) ...

#### 1.2 카드 셔플(Shuffle) 기능
... (기존 내용 유지) ...

#### 1.3 반응형 디자인 및 애니메이션 개선
... (기존 내용 유지) ...

#### 1.4 내비게이션 시스템 구축 (Navigation System) 🆕
**목표**: 여러 기능을 효율적으로 전환할 수 있는 중앙 제어 장치(Navbar) 구현

- **반응형 내비게이션 바 (Navbar) 추가**:
    - **구현**: Bootstrap 5를 활용한 상단 내비게이션 바 구현.
    - **메뉴 구성**:
        - **🏠 홈 (Home)**: 학습 시작 페이지 및 전체 학습 통계 요약.
        - **📖 학습하기 (Learn)**: 실제 플래시카드 학습 화면.
        - **❌ 오답 노트 (Wrong Note)**: 틀린 단어만 모아보는 전용 모드.
        - **⚙️ 설정 (Settings)**: 데이터 초기화 및 사용자 설정.
    - **최적화**: 모바일 햄버거 메뉴 적용 및 현재 페이지 `active` 표시.

- **페이지 구조 재편**:
    - `index.html`: 앱의 메인 진입점(Dashboard)으로 변경하여 학습 현황 표시.
    - `flash_card.html`: 학습 전용 페이지로 독립시켜 집중도 향상.
    - 공통 Navbar 컴포넌트 구조를 적용하여 일관성 유지.

- **시각적 최적화**:
    - Navbar와 메인 콘텐츠 간의 여백(Spacing) 최적화로 답답함 해소.
    - `styles.css`에 브랜드 컬러가 적용된 Navbar 전용 스타일 추가.


- **기능**: 마우스 없이 키보드로 조작 가능
- **구현 방법**:
  - `scripts.js`에 `window.addEventListener('keydown', ...)` 추가.
  - `ArrowLeft`: `prevBtn.click()` 실행.
  - `ArrowRight`: `nextBtn.click()` 실행.
  - `Space` 또는 `Enter`: `card.click()` 실행.

#### 1.2 카드 셔플(Shuffle) 기능

- **기능**: 학습 순서를 무작위로 섞어 암기 효과 극대화
- **구현 방법**:
  - HTML에 `Shuffle` 버튼 추가.
  - `Fisher-Yates Shuffle` 알고리즘을 사용하여 `filteredWords` 배열을 무작위로 섞는 함수 구현.
  - 셔플 후 `currentIndex = 0`으로 초기화하고 `updateCard()` 호출.

#### 1.3 반응형 디자인 및 애니메이션 개선

- **기능**: 모바일 최적화 및 매끄러운 시각 효과
- **구현 방법**:
  - `styles.css`에서 `@media` 쿼리를 사용하여 모바일 화면 크기에 맞게 카드 크기 조정.
  - CSS `transition`과 `transform: rotateY()`를 활용하여 카드가 뒤집히는 3D 애니메이션 정교화.

---

### 🟡 단계 2: 학습 효율성 및 상태 관리 (Intermediate)

**목표**: 개인 맞춤형 학습 경험 제공 및 데이터 유지

#### 2.1 학습 상태 저장 (LocalStorage)

- **기능**: 페이지를 새로고침해도 마지막에 보던 카드 위치 유지
- **구현 방법**:
  - `updateCard()` 호출 시 `localStorage.setItem('flashcard_index', currentIndex)`로 저장.
  - 페이지 로드 시 `localStorage.getItem`을 통해 `currentIndex` 복구.

#### 2.2 '알아요/몰라요' 체크 및 오답 노트 (고도화)

- **기능**: 카드를 뒤집어 정답을 확인한 후, 호버 시 나타나는 버튼으로 암기 여부를 체크하고 저장
- **상세 구현 단계**:
    1. **UI 오버레이 추가**: `.back` 요소 내부에 `overlay-controls` 컨테이너와 `Check(O)`, `Cross(X)` 버튼 추가.
    2. **CSS 호버 인터랙션**: 평소에는 `opacity: 0`이었다가, 카드 뒷면(`.back`)에 마우스를 올리면(Hover) 버튼들이 나타나도록 CSS Transition 구현.
    3. **데이터 ID 시스템**: 각 단어에 고유 ID를 부여하여 LocalStorage에 저장할 때 어떤 단어인지 식별 가능하게 함.
    4. **상태 저장 로직**:
       - `Check` 클릭 $\rightarrow$ `knownWords` 리스트에 ID 저장.
       - `Cross` 클릭 $\rightarrow$ `unknownWords` 리스트에 ID 저장.
    5. **오답 노트 연동**: `unknownWords`에 포함된 단어들만 필터링하여 다시 학습하는 '오답 노트 모드' 구현.

#### 2.3 학습 진척도 리포트

- **기능**: 전체 학습 완료 후 성취도 표시
- **구현 방법**:
  - `currentIndex`가 `filteredWords.length - 1`에 도달하고 마지막 카드를 확인했을 때 '학습 완료' 모달창 띄우기.
  - (정답 버튼 도입 시) `(정답 횟수 / 전체 횟수) * 100`으로 정답률 계산 및 표시.

---

### 🔴 단계 3: 데이터 확장 및 아키텍처 전환 (Advanced)

**목표**: 정적 파일에서 벗어나 동적인 데이터 관리 시스템 구축

#### 3.1 단어 관리 UI (CRUD) 구현

- **기능**: 코드 수정 없이 웹에서 단어 추가, 수정, 삭제
- **상세 구현 단계**:
    1. **관리자 페이지 구축**: `admin.html` 또는 메인 화면의 '관리자 모드' 탭 생성.
    2. **입력 폼 설계**: 단어 앞면, 뒷면, 카테고리를 입력받는 Form 구현.
    3. **로컬 데이터베이스(LocalStorage) 연동**: 입력된 데이터를 LocalStorage의 `customWords` 리스트에 저장.
    4. **데이터 병합 로직**: `words.json`의 기본 단어 + LocalStorage의 사용자 추가 단어를 합쳐서 학습 리스트 생성.
    5. **삭제/수정 기능**: 저장된 단어 목록을 리스트로 보여주고, 개별 삭제 및 수정 기능 구현.

#### 3.2 Python Backend 도입 (FastAPI/Flask)

- **기능**: 여러 기기에서 데이터 동기화 및 사용자 계정 관리
- **상세 구현 단계**:
    1. **서버 환경 설정**: Python 가상환경(`venv`) 설정 및 FastAPI/Flask 설치.
    2. **REST API 설계**:
       - `GET /words`: 전체 단어 목록 반환.
       - `POST /words`: 새 단어 추가.
       - `DELETE /words/{id}`: 특정 단어 삭제.
    3. **프론트엔드 통신 변경**: `fetch("words.json")` $\rightarrow$ `fetch("http://localhost:8000/words")`로 변경하여 서버 데이터 사용.

#### 3.3 데이터베이스(DB) 연동

- **기능**: 대량의 데이터를 안정적으로 저장하고 관리
- **상세 구현 단계**:
    1. **DB 선택 및 연결**: SQLite (가볍고 설정 불필요) 또는 MongoDB 연결.
    2. **스키마 설계**: `id`, `front`, `back`, `category`, `created_at` 필드 정의.
    3. **API-DB 연동**: Backend API가 파일이 아닌 DB에서 데이터를 쿼리하여 반환하도록 수정.
    4. **사용자별 데이터 분리**: (추가 확장) 로그인 기능을 도입하여 사용자마다 서로 다른 단어장을 가지도록 구현.

---

## 📅 추천 실행 순서

1. **Week 1**: 단계 1의 모든 기능 구현 $\rightarrow$ 기본 사용성 완성.
2. **Week 2**: 단계 2의 LocalStorage 및 오답 노트 구현 $\rightarrow$ 실제 학습 도구화.
3. **Week 3~4**: 단계 3의 Backend 및 DB 도입 $\rightarrow$ 풀스택 웹 애플리케이션으로 진화.
