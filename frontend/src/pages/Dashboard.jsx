import useStock from "../hooks/useStock";
import SearchBar from "../components/SearchBar";
import HistoryTags from "../components/HistoryTags";
import StockCard from "../components/StockCard";
import Loader from "../components/Loader";

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

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={() => getStock()}
      />

      <HistoryTags
        history={history}
        onSelect={(item) => getStock(item)}
        onClear={() => setHistory([])}
      />

      {loading && <Loader />}

      {!loading && <StockCard stockData={stockData} />}

      {!stockData && !loading && (
        <p className="welcome-msg">Enter a stock symbol to begin.</p>
      )}
    </div>
  );
}

export default Dashboard;
