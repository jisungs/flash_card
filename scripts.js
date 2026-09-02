document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("flashcard-container");
    const card = document.querySelector(".flashcard");
    const front = card.querySelector(".front");
    const backText = card.querySelector(".back-text");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const shuffleBtn = document.getElementById("shuffle-btn");
    const progress = document.getElementById("progress");
    const progressBar = document.getElementById("progress-bar");
    const categorySelect = document.getElementById("category-select");
    const completionModal = document.getElementById("completion-modal");
    const completionMessage = document.getElementById("completion-message");
    const closeModal = document.getElementById("close-modal");

    let allWords = [];
    let filteredWords = [];
    let currentIndex = 0;
    let currentCategory = "all";

    const safeParseJSON = (key, defaultValue) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error(`Error parsing localStorage key ${key}:`, e);
            return defaultValue;
        }
    };

    let knownWords = safeParseJSON("knownWords", []);
    let unknownWords = safeParseJSON("unknownWords", []);

    fetch("words.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            allWords = data;
            applyFilter(); // 초기 필터링 적용
        })
        .catch((error) => {
            console.error("Error fetching words:", error);
            container.innerHTML =
                "<p>Failed to load words. Please ensure you are running this via a web server.</p>";
        });

    function applyFilter() {
        // 현재 선택된 카테고리에 따라 filteredWords 업데이트
        if (currentCategory === "all") {
            filteredWords = allWords.map((word, index) => ({
                ...word,
                id: index,
            }));
        } else if (currentCategory === "wrong") {
            filteredWords = allWords
                .filter((_, index) => unknownWords.includes(index))
                .map((word, index) => ({ ...word, id: index }));
        } else {
            filteredWords = allWords
                .filter((word) => word.category === currentCategory)
                .map((word, index) => ({ ...word, id: index })); // 원본 인덱스 보존을 위해 map 사용
        }

        currentIndex = 0; // 카테고리 변경 시 첫 번째 카드로 이동
        updateCard();
    }

    function shuffleWords() {
        if (filteredWords.length === 0) return;

        // Fisher-Yates Shuffle Algorithm
        for (let i = filteredWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filteredWords[i], filteredWords[j]] = [
                filteredWords[j],
                filteredWords[i],
            ];
        }

        currentIndex = 0;
        updateCard();
    }

    function updateCard() {
        if (filteredWords.length === 0) {
            front.textContent = "";
            backText.textContent = "";
            progress.textContent = "0 / 0";
            progressBar.style.width = "0%";
            return;
        }

        // Update text
        front.textContent = filteredWords[currentIndex].front;
        backText.textContent = filteredWords[currentIndex].back;

        // Reset flip state
        card.classList.remove("flipped");

        // Update progress display
        progress.textContent = `${currentIndex + 1} / ${filteredWords.length}`;

        // Update progress bar width
        const percentage = ((currentIndex + 1) / filteredWords.length) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    function showCompletionModal() {
        const total = filteredWords.length;
        const knownCount = filteredWords.filter((word) =>
            knownWords.includes(word.id),
        ).length;
        const accuracy = total > 0 ? Math.round((knownCount / total) * 100) : 0;

        completionMessage.textContent = `총 ${total}개의 단어 중 ${knownCount}개를 마스터했습니다! (정확도: ${accuracy}%)`;
        completionModal.classList.add("show");
    }

    card.addEventListener("click", (e) => {
        if (e.target.classList.contains("control-btn")) return;
        card.classList.toggle("flipped");
    });

    const correctBtn = document.querySelector(".correct-btn");
    const incorrectBtn = document.querySelector(".incorrect-btn");

    function markWord(isCorrect) {
        const wordId = filteredWords[currentIndex].id;

        if (isCorrect) {
            if (!knownWords.includes(wordId)) knownWords.push(wordId);
            unknownWords = unknownWords.filter((id) => id !== wordId);
        } else {
            if (!unknownWords.includes(wordId)) unknownWords.push(wordId);
            knownWords = knownWords.filter((id) => id !== wordId);
        }

        localStorage.setItem("knownWords", JSON.stringify(knownWords));
        localStorage.setItem("unknownWords", JSON.stringify(unknownWords));

        // Mark 후 자동으로 다음 카드로 이동
        nextBtn.click();
    }

    correctBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        markWord(true);
    });

    incorrectBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        markWord(false);
    });

    shuffleBtn.addEventListener("click", shuffleWords);

    prevBtn.addEventListener("click", () => {
        if (filteredWords.length === 0) return;
        currentIndex =
            (currentIndex - 1 + filteredWords.length) % filteredWords.length;
        updateCard();
    });

    nextBtn.addEventListener("click", () => {
        if (filteredWords.length === 0) return;

        if (currentIndex === filteredWords.length - 1) {
            showCompletionModal();
            currentIndex = 0; // 리셋
        } else {
            currentIndex = (currentIndex + 1) % filteredWords.length;
        }
        updateCard();
    });

    closeModal.addEventListener("click", () => {
        completionModal.classList.remove("show");
        applyFilter(); // 리셋 및 재시작
    });

    categorySelect.addEventListener("change", (e) => {
        currentCategory = e.target.value;
        applyFilter();
    });

    // Keyboard Navigation
    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowLeft":
                prevBtn.click();
                break;
            case "ArrowRight":
                nextBtn.click();
                break;
            case " ":
            case "Enter":
                e.preventDefault(); // Space key scroll prevention
                card.click();
                break;
        }
    });
});
