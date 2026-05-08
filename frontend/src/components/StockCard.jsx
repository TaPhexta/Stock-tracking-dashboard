function StockCard({ stockData }) {
  if (!stockData) return null;

  return (
    <div className="card">
      <h2>{stockData.symbol}</h2>
      <p className="price-tag">R{stockData.price}</p>
      <p className={stockData.change?.startsWith("-") ? "change-negative" : "change-positive"}>
        {stockData.change}
      </p>
    </div>
  );
}

export default StockCard;
