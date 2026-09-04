document.addEventListener("DOMContentLoaded", () => {
    // --- Common Logic ---
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

    // --- Dashboard Logic (index.html) ---
    const statTotal = document.getElementById("stat-total");
    const statMastered = document.getElementById("stat-mastered");
    const statWrong = document.getElementById("stat-wrong");
    const setSelect = document.getElementById("set-select");
    const startLearnBtn = document.getElementById("start-learn-btn");

    if (statTotal && statMastered && statWrong) {
        fetch("words.json")
            .then((response) => response.json())
            .then((data) => {
                const total = data.length;
                statTotal.textContent = total;
                statMastered.textContent = knownWords.length;
                statWrong.textContent = unknownWords.length;

                // 세트 목록 동적 생성
                if (setSelect) {
                    const sets = [
                        ...new Set(
                            data.map((word) => word.set).filter(Boolean),
                        ),
                    ];
                    sets.forEach((set) => {
                        const option = document.createElement("option");
                        option.value = set;
                        option.textContent = set;
                        setSelect.appendChild(option);
                    });
                }
            })
            .catch((error) =>
                console.error("Error fetching words for stats:", error),
            );
    }

    if (startLearnBtn && setSelect) {
        startLearnBtn.addEventListener("click", (e) => {
            const selectedSet = setSelect.value;
            if (selectedSet !== "all") {
                e.preventDefault();
                window.location.href = `flash_card.html?set=${encodeURIComponent(selectedSet)}`;
            }
        });
    }

    // --- Learning Logic (flash_card.html) ---
    const container = document.getElementById("flashcard-container");
    if (!container) return; // exit if not on learning page

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
    let currentSet = "all";
    let currentContent = "all"; // 추가

    // URL 파라미터 확인 (예: ?mode=wrong, ?set=기초 일본어, ?content=drama_01)
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get("mode");
    const setParam = urlParams.get("set");
    const contentParam = urlParams.get("content"); // 추가

    if (mode) {
        currentCategory = mode;
    }
    if (setParam) {
        currentSet = setParam;
    }
    if (contentParam) {
        // 추가
        currentContent = contentParam;
    }

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
        // 1. 먼저 세트(Set) 필터링 적용
        let baseWords = allWords;
        if (currentSet !== "all") {
            baseWords = allWords.filter((word) => word.set === currentSet);
        }

        // 2. 콘텐츠(Content) 필터링 적용 (추가)
        if (currentContent !== "all") {
            baseWords = baseWords.filter(
                (word) => word.contentId === currentContent,
            );
        }

        // 3. 선택된 카테고리(Category)에 따라 filteredWords 업데이트
        if (currentCategory === "all") {
            filteredWords = baseWords.map((word, index) => ({
                ...word,
                id: allWords.indexOf(word), // 원본 allWords의 인덱스를 id로 사용
            }));
        } else if (currentCategory === "wrong") {
            filteredWords = baseWords
                .filter((word) => unknownWords.includes(allWords.indexOf(word)))
                .map((word) => ({ ...word, id: allWords.indexOf(word) }));
        } else if (currentCategory === "known") {
            filteredWords = baseWords
                .filter((word) => knownWords.includes(allWords.indexOf(word)))
                .map((word) => ({ ...word, id: allWords.indexOf(word) }));
        } else {
            filteredWords = baseWords
                .filter((word) => word.category === currentCategory)
                .map((word) => ({ ...word, id: allWords.indexOf(word) }));
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
