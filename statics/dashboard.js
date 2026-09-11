document.addEventListener("DOMContentLoaded", () => {
    const statTotal = document.getElementById("stat-total");
    const statMastered = document.getElementById("stat-mastered");
    const statWrong = document.getElementById("stat-wrong");
    const setCards = document.getElementById("set-cards");
    const setCountAll = document.getElementById("set-count-all");

    if (statTotal && statMastered && statWrong) {
        fetch("words.json")
            .then((response) => response.json())
            .then((data) => {
                const total = data.length;
                statTotal.textContent = total;
                statMastered.textContent = knownWords.length;
                statWrong.textContent = unknownWords.length;

                if (setCountAll) {
                    setCountAll.textContent = `${total}단어`;
                }

                if (setCards) {
                    const setMap = {};
                    data.forEach((word) => {
                        if (word.set) {
                            setMap[word.set] = (setMap[word.set] || 0) + 1;
                        }
                    });

                    Object.entries(setMap).forEach(([setName, count]) => {
                        const item = document.createElement("div");
                        item.className = "set-card-item";

                        const card = document.createElement("div");
                        card.className = "set-card";
                        card.dataset.set = setName;
                        card.innerHTML = `
                            <div class="set-card-title">${setName}</div>
                            <div class="set-card-count">${count}단어</div>
                        `;
                        card.addEventListener("click", () => {
                            window.location.href = `flash_card.html?set=${encodeURIComponent(setName)}`;
                        });

                        item.appendChild(card);
                        setCards.appendChild(item);
                    });
                }
            })
            .catch((error) =>
                console.error("Error fetching words for stats:", error),
            );
    }

    const allCard = setCards ? setCards.querySelector('[data-set="all"]') : null;
    if (allCard) {
        allCard.addEventListener("click", () => {
            window.location.href = "flash_card.html?mode=all";
        });
    }
});
