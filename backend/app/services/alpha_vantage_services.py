import requests
from app.config import API_KEY

BASE_URL = "https://www.alphavantage.co/query"

def fetch_stock(symbol: str):
    url = f"{BASE_URL}?function=GLOBAL_QUOTE&symbol={symbol}&apikey={API_KEY}"
    response = requests.get(url)
    return response.json()
