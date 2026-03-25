import { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {
  // 1. STATE (With LocalStorage Loading)
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  
  const [history, setHistory] = useState(() => {
    // Check if we have a saved list in the browser
    const saved = localStorage.getItem('phextech_history');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. THE LOGIC (The "Waiter")
  const fetchStock = useCallback(async (symbolOverride = null) => {
    const targetSymbol = symbolOverride || query;
    if (!targetSymbol) return;

    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/test-stock/${targetSymbol}`);
      const data = await response.json();
      
      setStockData(data);

      // Only add to history if it's a real stock (not an error message)
      if (data.price !== "RATE LIMIT" && data.price !== "NOT FOUND") {
        setHistory(prev => {
          if (prev.includes(targetSymbol)) return prev;
          return [targetSymbol, ...prev].slice(0, 5);
        });
      }
    } catch (error) {
      console.error("Error fetching stock:", error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  // 3. THE PERSISTENCE TRIGGER (Saves history whenever it changes)
  useEffect(() => {
    localStorage.setItem('phextech_history', JSON.stringify(history));
  }, [history]);

  // 4. THE UI
  return (
    <div className="App">
      <h1>PhexTech Market-Pulse</h1>

      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.toUpperCase())}
          placeholder="Enter Symbol (e.g. TSLA)"
          onKeyDown={(e) => e.key === 'Enter' && fetchStock()} 
        />
        <button onClick={() => fetchStock()}>Search</button>
      </div>

      <div className="history-tags">
        {history.map((item) => (
          <button 
            key={item} 
            className="history-btn" 
            onClick={() => {
              setQuery(item);
              fetchStock(item);
            }}
          >
            {item}
          </button>
        ))}
        {history.length > 0 && (
          <button className="clear-btn" onClick={() => setHistory([])}>Clear</button>
        )}
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : stockData ? (
        <div className="card">
          <h2>{stockData.symbol}</h2>
          <p className="price-tag">R{stockData.price}</p>
          <p className={stockData.change?.startsWith('-') ? 'change-negative' : 'change-positive'}>
            {stockData.change}
          </p>
        </div>
      ) : (
        <p className="welcome-msg">Enter a stock symbol to begin.</p>
      )}
    </div>
  );
}

export default App;