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

                    // Create Marquee Track
                    const track = document.createElement("div");
                    track.className = "marquee-track";

                    // 1. Add "All Sets" Card First
                    const allItem = document.createElement("div");
                    allItem.className = "set-card-item";
                    allItem.innerHTML = `
                        <div class="set-card" data-set="all">
                            <div class="set-card-title">전체 세트</div>
                            <div class="set-card-count">${data.length}단어</div>
                        </div>
                    `;
                    track.appendChild(allItem);

                    // 2. Create Other Set Cards
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

                        item.appendChild(card);
                        track.appendChild(item);
                    });

                    // 3. Clone cards for seamless loop
                    const clones = track.innerHTML;
                    track.innerHTML += clones;

                    // 4. Use Event Delegation for clicks
                    track.addEventListener("click", (e) => {
                        const card = e.target.closest(".set-card");
                        if (card) {
                            const setName = card.dataset.set;
                            if (setName === "all") {
                                window.location.href = "flash_card.html?mode=all";
                            } else {
                                window.location.href = `flash_card.html?set=${encodeURIComponent(setName)}`;
                            }
                        }
                    });

                    setCards.appendChild(track);
                }
            })
            .catch((error) =>
                console.error("Error fetching words for stats:", error),
            );
    }
});
