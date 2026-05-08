import requests
from app.config import ALPHA_VANTAGE_KEY

BASE_URL = "https://www.alphavantage.co/query"

def get_stock_data(symbol: str):
    url = f"{BASE_URL}?function=GLOBAL_QUOTE&symbol={symbol}&apikey={ALPHA_VANTAGE_KEY}"
    response = requests.get(url)
    return response.json()
