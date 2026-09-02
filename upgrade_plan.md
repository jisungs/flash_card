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
- **구현 방법**:
  - `admin.html` 또는 별도의 관리 탭 생성.
  - 입력 폼(앞면, 뒷면, 카테고리)을 통해 데이터를 입력받아 LocalStorage의 JSON 데이터 업데이트.
  - 업데이트된 데이터를 `words.json` 대신 우선적으로 로드하도록 로직 수정.

#### 3.2 Python Backend 도입 (FastAPI/Flask)

- **기능**: 여러 기기에서 데이터 동기화 및 사용자 계정 관리
- **구현 방법**:
  - `main.py`를 활용하여 REST API 서버 구축.
  - `/words` (GET): 단어 목록 가져오기.
  - `/words` (POST): 새 단어 추가하기.
  - `scripts.js`의 `fetch("words.json")`를 `fetch("http://localhost:8000/words")`로 변경.

#### 3.3 데이터베이스(DB) 연동

- **기능**: 대량의 단어 데이터를 안정적으로 저장
- **구현 방법**:
  - SQLite 또는 MongoDB 연결.
  - 단어 테이블 설계: `id`, `front`, `back`, `category`, `created_at`.
  - Backend API가 JSON 파일 대신 DB에서 데이터를 쿼리하여 반환하도록 수정.

---

## 📅 추천 실행 순서

1. **Week 1**: 단계 1의 모든 기능 구현 $\rightarrow$ 기본 사용성 완성.
2. **Week 2**: 단계 2의 LocalStorage 및 오답 노트 구현 $\rightarrow$ 실제 학습 도구화.
3. **Week 3~4**: 단계 3의 Backend 및 DB 도입 $\rightarrow$ 풀스택 웹 애플리케이션으로 진화.
