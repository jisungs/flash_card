const Storage = {
    getKnownWords: () => safeParseJSON("knownWords", []),
    getUnknownWords: () => safeParseJSON("unknownWords", []),
    saveWords: (known, unknown) => {
        localStorage.setItem("knownWords", JSON.stringify(known));
        localStorage.setItem("unknownWords", JSON.stringify(unknown));
    }
};

// Global state for learning progress
let knownWords = Storage.getKnownWords();
let unknownWords = Storage.getUnknownWords();
