import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from dotenv import load_dotenv
import requests

# Load environment variables from .env
load_dotenv()
API_KEY = os.getenv("ALPHA_VANTAGE_KEY")

app = FastAPI()

origins = [
    "http://localhost:5173", # React app address
    "http://127.0.0.1:5173", # alternative address for app
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # allowed origins for CORS
    allow_credentials=True,
    allow_methods=["*"],    # allow all methods (GET, POST, etc)
    allow_headers=["*"],    # allow all headers
)
@app.get("/")
def read_root():
    return {"status": "PhexTech Backend Online", "cors": "Enabled"}

@app.get("/test-stock/{symbol}")
def get_test_stock(symbol: str):
    url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={API_KEY}"
    response = requests.get(url)
    data = response.json()

    # 1. Check if the API sent a 'Note' or 'Information' instead of stock data
    if "Information" in data or "Note" in data:
        return {
            "symbol": symbol,
            "price": "RATE LIMIT",
            "change": "Wait 60s"
        }

    quote = data.get("Global Quote", {})
    
    # 2. If the quote is empty, the symbol might be wrong
    if not quote:
        return {
            "symbol": symbol,
            "price": "NOT FOUND",
            "change": "Check Symbol"
        }

    return {
        "symbol": quote.get("01. symbol", symbol),
        "price": quote.get("05. price", "N/A"),
        "change": quote.get("10. change percent", "N/A")
    }
