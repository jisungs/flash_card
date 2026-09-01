document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("flashcard-container");
    const card = document.querySelector(".flashcard");
    const front = card.querySelector(".front");
    const back = card.querySelector(".back");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const progress = document.getElementById("progress");
    const progressBar = document.getElementById("progress-bar");
    const categorySelect = document.getElementById("category-select");

    let allWords = [];
    let filteredWords = [];
    let currentIndex = 0;
    let currentCategory = "all";

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
            filteredWords = allWords;
        } else {
            filteredWords = allWords.filter(
                (word) => word.category === currentCategory,
            );
        }

        currentIndex = 0; // 카테고리 변경 시 첫 번째 카드로 이동
        updateCard();
    }

    function updateCard() {
        if (filteredWords.length === 0) {
            front.textContent = "";
            back.textContent = "";
            progress.textContent = "0 / 0";
            progressBar.style.width = "0%";
            return;
        }

        // Update text
        front.textContent = filteredWords[currentIndex].front;
        back.textContent = filteredWords[currentIndex].back;

        // Reset flip state
        card.classList.remove("flipped");

        // Update progress display
        progress.textContent = `${currentIndex + 1} / ${filteredWords.length}`;

        // Update progress bar width
        const percentage = ((currentIndex + 1) / filteredWords.length) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });

    prevBtn.addEventListener("click", () => {
        if (filteredWords.length === 0) return;
        currentIndex =
            (currentIndex - 1 + filteredWords.length) % filteredWords.length;
        updateCard();
    });

    nextBtn.addEventListener("click", () => {
        if (filteredWords.length === 0) return;
        currentIndex = (currentIndex + 1) % filteredWords.length;
        updateCard();
    });

    categorySelect.addEventListener("change", (e) => {
        currentCategory = e.target.value;
        applyFilter();
    });
});
