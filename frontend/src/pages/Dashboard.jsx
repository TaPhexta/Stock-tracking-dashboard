import useStock from "../hooks/useStock";

function Dashboard() {
  const {
    stockData,
    loading,
    query,
    setQuery,
    history,
    setHistory,
    getStock,
  } = useStock();

  return (
    <div className="App">
      <h1>PhexTech Market-Pulse</h1>

      <div className="search-container">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && getStock()}
          placeholder="Enter Symbol"
        />
        <button onClick={() => getStock()}>Search</button>
      </div>

      <div className="history-tags">
        {history.map((item) => (
          <button key={item} onClick={() => getStock(item)}>
            {item}
          </button>
        ))}

        {history.length > 0 && (
          <button onClick={() => setHistory([])}>Clear</button>
        )}
      </div>

      {loading && <div className="spinner"></div>}

      {stockData && !loading && (
        <div className="card">
          <h2>{stockData.symbol}</h2>
          <p className="price-tag">R{stockData.price}</p>
          <p>{stockData.change}</p>
        </div>
      )}

      {!stockData && !loading && (
        <p className="welcome-msg">Enter a stock symbol to begin.</p>
      )}
    </div>
  );
}

export default Dashboard;
