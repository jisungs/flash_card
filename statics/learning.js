document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("flashcard-container");
    if (!container) return;

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
    let currentContent = "all";

    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get("mode");
    const setParam = urlParams.get("set");
    const contentParam = urlParams.get("content");

    if (mode) currentCategory = mode;
    if (setParam) currentSet = setParam;
    if (contentParam) currentContent = contentParam;

    fetch("words.json")
        .then((response) => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then((data) => {
            allWords = data;
            applyFilter();
        })
        .catch((error) => {
            console.error("Error fetching words:", error);
            container.innerHTML = "<p>Failed to load words. Please ensure you are running this via a web server.</p>";
        });

    function applyFilter() {
        let baseWords = allWords;
        if (currentSet !== "all") {
            baseWords = allWords.filter((word) => word.set === currentSet);
        }

        if (currentContent !== "all") {
            baseWords = baseWords.filter((word) => word.contentId === currentContent);
        }

        if (currentCategory === "all") {
            filteredWords = baseWords.map((word, index) => ({
                ...word,
                id: allWords.indexOf(word),
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

        currentIndex = 0;
        updateCard();
    }

    function shuffleWords() {
        if (filteredWords.length === 0) return;
        for (let i = filteredWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filteredWords[i], filteredWords[j]] = [filteredWords[j], filteredWords[i]];
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
        front.textContent = filteredWords[currentIndex].front;
        backText.textContent = filteredWords[currentIndex].back;
        card.classList.remove("flipped");
        progress.textContent = `${currentIndex + 1} / ${filteredWords.length}`;
        const percentage = ((currentIndex + 1) / filteredWords.length) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    function showCompletionModal() {
        const total = filteredWords.length;
        const knownCount = filteredWords.filter((word) => knownWords.includes(word.id)).length;
        const accuracy = total > 0 ? Math.round((knownCount / total) * 100) : 0;
        completionMessage.textContent = `총 ${total}개의 단어 중 ${knownCount}개를 마스터했습니다! (정확도: ${accuracy}%)`;
        completionModal.classList.add("show");
    }

    card.addEventListener("click", (e) => {
        if (e.target.closest(".control-btn")) return;
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
        Storage.saveWords(knownWords, unknownWords);
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
        currentIndex = (currentIndex - 1 + filteredWords.length) % filteredWords.length;
        updateCard();
    });

    nextBtn.addEventListener("click", () => {
        if (filteredWords.length === 0) return;
        if (currentIndex === filteredWords.length - 1) {
            showCompletionModal();
            currentIndex = 0;
        } else {
            currentIndex = (currentIndex + 1) % filteredWords.length;
        }
        updateCard();
    });

    closeModal.addEventListener("click", () => {
        completionModal.classList.remove("show");
        applyFilter();
    });

    if (categorySelect) {
        categorySelect.addEventListener("change", (e) => {
            currentCategory = e.target.value;
            applyFilter();
        });
    }

    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowLeft": prevBtn.click(); break;
            case "ArrowRight": nextBtn.click(); break;
            case " ":
            case "Enter":
                e.preventDefault();
                card.click();
                break;
        }
    });

    let touchStartX = 0, touchStartY = 0, touchEndX = 0, touchEndY = 0;
    const SWIPE_THRESHOLD = 50;
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
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
                    if (deltaX < 0) nextBtn.click();
                    else prevBtn.click();
                }
            }
        }, { passive: true });
    }
});
