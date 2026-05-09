from fastapi import APIRouter
from app.services.alpha_vantage_service import get_stock_data
from app.utils.responses import success, error

router = APIRouter()

@router.get("/stock/{symbol}")
def get_stock(symbol: str):

    data = get_stock_data(symbol)

    if "Information" in data or "Note" in data:
        return {
            "symbol": symbol,
            "price": "RATE LIMIT",
            "change": "Wait 60s"
        } 

    quote = data.get("Global Quote", {})

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
