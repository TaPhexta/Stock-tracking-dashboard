from fastapi import APIRouter
from app.services.alpha_vantage import get_stock_data
from app.utils.responses import success, error

router = APIRouter()

@router.get("/stock/{symbol}")
def stock(symbol: str):

    data = get_stock_data(symbol)

    if "Note" in data or "Information" in data:
        return error("Rate limit reached. Try again later.")

    quote = data.get("Global Quote", {})

    if not quote:
        return error("Invalid symbol")

    result = {
        "symbol": quote.get("01. symbol"),
        "price": quote.get("05. price"),
        "change": quote.get("10. change percent")
    }

    return success(result)
