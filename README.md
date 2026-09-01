# 🗂️ Flash Card Project

A lightweight, elegant, and intuitive web-based flashcard application designed for language learners. This project provides a smooth learning experience through beautiful CSS 3D animations and efficient data handling.

---

## ✨ Overview

**Flash Card Project** is a minimalist tool built to help users master new vocabulary through active recall. By separating data from logic, it offers a scalable foundation for building a robust learning platform.

### 🚀 Key Features

- **✨ 3D Flip Animation**: Smooth, realistic card-flipping effect using CSS 3D transforms.
- **📂 Dynamic Data Loading**: All flashcard content is loaded dynamically from a `words.json` file.
- **🔍 Smart Filtering**: Easily switch between different languages or categories.
- **📊 Real-time Progress**: Track your learning journey with a visual progress bar and counter.
- **🎨 Clean UX**: A minimalist and distraction-free interface.

---

## 🛠️ Tech Stack

- **Frontend**:
  - HTML5 (Structure)
  - CSS3 (3D Animations & Styling)
  - Vanilla JavaScript (Logic & Data Fetching)

---

## 🚀 How to Use

Since the application fetches data from a JSON file, it needs to be served via a web server to avoid CORS issues.

### Prerequisites

- A web browser (Chrome, Firefox, Edge, etc.)
- A local web server (e.g., VS Code **Live Server** extension, or Python's built-in server)

### Installation & Running

1. **Clone the repository:**

   ```bash
   git clone https://github.com/[your-username]/flash-card-project.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd flash-card-project
   ```

3. **Start a local server:**
   If you have Python installed, you can simply run:

   ```bash
   python -m http.server 8000
   ```

4. **Open in your browser:**
   Go to `http://localhost:8000` in your browser.

---

## 📅 Roadmap & Progress

We are building this project in phases to ensure a solid architectural foundation.

### [x] Phase 1: Data-driven System (Completed)

- [x] Decouple Data from HTML (JSON integration)
- [x] Dynamic Rendering of card elements

### [x] Phase 2: Navigation & UX (Completed)

- [x] Navigation Controls (Previous/Next)
- [x] Progress Indicator & Progress Bar
- [x] Category Filtering

### [ ] Phase 3: Backend & Persistence (Planned)

- [ ] **Python Backend**: Implement a FastAPI or Flask server for advanced management.
- [ ] **User Progress Tracking**: Save "Learned" status in a database (SQLite).
- [ ] **Admin Interface**: A simple UI to add, edit, or delete words via API.

---

## 🎨 Color Scheme

The design uses a calming color palette to minimize eye strain during study sessions:

| Element | Hex Code |
| :--- | :--- |
| **Background** | `#E8F5E9` |
| **Primary (Color 1)** | `#66BB6A` |
| **Secondary (Color 2)** | `#A5D6A7` |
| **Accent (Color 3)** | `#E8F5E9` |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

---
*Made with ❤️ for language learners.*
