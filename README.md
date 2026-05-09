📈 PhexTech Market-Pulse

**PhexTech Market-Pulse** is a professional-grade, full-stack stock tracking dashboard. It features a responsive **React** frontend that communicates with a **FastAPI** backend to deliver real-time financial data, while maintaining high security and a seamless user experience.

---

✨ Features

- **Real-Time Market Data:** Fetches live quotes (Price & Change %) via the Alpha Vantage API.
- **Smart History Tracking:** Automatically remembers your last 5 searches using `LocalStorage`.
- **Persistent UX:** History tags act as "Quick-Links" that trigger instant data refreshes.
- **Dynamic Styling:** Automatic color-coding (Green/Red) for market performance.
- **Full-Stack Security:** Implements `.env` management to keep API credentials secure and out of version control.
- **Responsive Feedback:** Custom CSS loading spinners and error handling for API rate limits.

---

🛠️ Tech Stack

- **Frontend:** React 18, Vite, CSS3 (Custom Animations & Flexbox)
- **Backend:** Python 3.10+, FastAPI, Uvicorn (ASGI Server)
- **API Integration:** Alpha Vantage (Global Quote Endpoints)
- **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`)

---

📦 Installation & Setup

 1. Backend Configuration
Navigate to the backend directory and set up your virtual environment:
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
**
