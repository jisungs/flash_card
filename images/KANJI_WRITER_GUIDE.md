# 한자 획순 학습 기능 구현 가이드
### HanziWriter.js + 일본어 전용 획순 데이터(hanzi-writer-data-jp) 연동

이 문서는 어떤 html/js/css 프로젝트에도 그대로 적용할 수 있는 절차입니다.
사람이 단계별로 따라 해도 되고, 로컬 AI(Ollama 등)에게 이 문서 전체를 컨텍스트로 주고
"이 패턴대로 우리 프로젝트에 적용해줘"라고 요청해도 됩니다.

---

## 왜 필요한가

HanziWriter는 기본적으로 **중국어(간체/번체) 획순 데이터**를 사용합니다.
일본어 한자는 획순·자형이 중국식과 다른 경우가 있어서, 기본 설정 그대로 쓰면
일본어 학습자에게 틀린 획순을 보여줄 수 있습니다.
→ 반드시 별도의 `hanzi-writer-data-jp` 데이터를 `charDataLoader` 옵션으로 연결해야 합니다.

---

## 사전 준비물

- 별도 설치/빌드 도구 불필요 (npm 없이 CDN 스크립트 태그만으로 동작)
- 인터넷 연결 (CDN에서 라이브러리와 획순 데이터를 매번 fetch)
- 기존 프로젝트의 "한자 목록" 데이터 (예: `[{char: "私", reading: "わたし"}, ...]` 형태)

---

## Step 1. HanziWriter 라이브러리를 CDN으로 불러오기

`<head>`에 아래 한 줄만 추가합니다. 설치 과정 없이 전역 변수 `HanziWriter`를 바로 쓸 수 있습니다.

```html
<script src="https://cdn.jsdelivr.net/npm/hanzi-writer@3/dist/hanzi-writer.min.js"></script>
```

---

## Step 2. 한자를 그릴 HTML 컨테이너 준비

빈 `div` 하나에 고유 id를 부여합니다. HanziWriter가 이 안에 자동으로 SVG를 그립니다.
크기는 JS 옵션에서 지정하므로, div 자체에는 별도 width/height CSS를 줄 필요가 없습니다.

```html
<div id="character-target-div"></div>
```

---

## Step 3. 일본어 전용 획순 데이터 연결 (charDataLoader) — 가장 중요한 단계

`HanziWriter.create()` 호출 시 `charDataLoader` 옵션에 fetch 함수를 넣어
`hanzi-writer-data-jp` 저장소에서 데이터를 받아오게 합니다.

```javascript
function loadJapaneseCharData(char, onLoad, onError) {
  fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data-jp@0/${encodeURIComponent(char)}.json`)
    .then((res) => {
      if (!res.ok) throw new Error("데이터 없음: " + char);
      return res.json();
    })
    .then(onLoad)
    .catch(onError);
}

const writer = HanziWriter.create("character-target-div", "私", {
  width: 220,
  height: 220,
  padding: 12,
  showOutline: true,
  charDataLoader: loadJapaneseCharData, // 이 줄이 핵심
});
```

> 이 옵션을 빼면 기본값(중국어 획순 데이터)이 로드됩니다.

---

## Step 4. 획순 애니메이션 재생 기능 붙이기

버튼 클릭 시 `animateCharacter()`를 호출하면 획순이 순서대로 재생됩니다.

```javascript
document.getElementById("btn-animate").onclick = () => {
  writer.animateCharacter({
    onComplete: () => console.log("애니메이션 완료"),
  });
};
```

---

## Step 5. 사용자가 직접 써보는 퀴즈 모드 추가

`quiz()`를 호출하면 회색 안내선만 남고, 사용자가 직접 획을 그려야 하는 모드로 전환됩니다.

```javascript
document.getElementById("btn-quiz").onclick = () => {
  writer.quiz({
    onCorrectStroke: (strokeData) => {
      console.log(`${strokeData.strokeNum + 1}획 완료`);
    },
    onMistake: () => {
      console.log("이 획은 다시 시도");
    },
    onComplete: (summary) => {
      console.log(`완성! 총 실수 횟수: ${summary.totalMistakes}`);
    },
  });
};
```

---

## Step 6. 기존 플래시카드 데이터에 연동하기

카드 목록에서 현재 카드의 한자 한 글자만 꺼내 넘기면 됩니다.
카드가 바뀔 때는 새 인스턴스를 만들지 말고 `setCharacter()`로 재사용합니다.

```javascript
const flashcards = [
  { char: "私", reading: "わたし", meaning: "나" },
  { char: "学", reading: "がく", meaning: "배우다" },
];

let writer = null;

function loadCard(index) {
  const card = flashcards[index];
  if (writer) {
    writer.setCharacter(card.char); // 인스턴스 재사용
  } else {
    writer = HanziWriter.create("character-target-div", card.char, {
      width: 220,
      height: 220,
      charDataLoader: loadJapaneseCharData,
    });
  }
}
```

---

## 전체 동작 흐름 요약

```
[플래시카드 목록] → 현재 카드의 한자 문자 추출
        ↓
HanziWriter.create(대상 div, 한자, { charDataLoader: 일본어 데이터 로더 })
        ↓
  ┌─────────────┬─────────────┐
  │ animateCharacter()  │  quiz()      │
  │ (획순 애니메이션 재생) │ (직접 써보기)   │
  └─────────────┴─────────────┘
        ↓
카드 전환 시 → writer.setCharacter(새 한자)로 재사용
```

---

## 참고 자료

- HanziWriter 공식 문서: https://hanziwriter.org/docs.html
- 일본어 획순 데이터(hanzi-writer-data-jp): https://github.com/chanind/hanzi-writer-data-jp
  - 현재 실험적(experimental) 단계이며, 부수(radical) 정보는 아직 지원하지 않음
  - 획이 겹치는 지점에서 모서리가 각지게 보일 수 있음(캡핑 미지원)

## 함께 만든 실행 예제

이 문서와 함께 제공된 `kanji-writer-demo.html` 파일을 브라우저로 바로 열어 테스트할 수 있습니다.
