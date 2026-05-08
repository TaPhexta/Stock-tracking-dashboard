import { useState, useEffect, useCallback } from "react";
import { fetchStock } from "../services/api";

export default function useStock() {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("phextech_history");
    return saved ? JSON.parse(saved) : [];
  });

  const getStock = useCallback(async (symbolOverride = null) => {
    const target = symbolOverride || query;
    if (!target) return;

    setLoading(true);

    try {
      const data = await fetchStock(target);

      setStockData(data);

      if (data.price !== "RATE LIMIT" && data.price !== "NOT FOUND") {
        setHistory((prev) => {
          if (prev.includes(target)) return prev;
          return [target, ...prev].slice(0, 5);
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    localStorage.setItem("phextech_history", JSON.stringify(history));
  }, [history]);

  return {
    stockData,
    loading,
    query,
    setQuery,
    history,
    setHistory,
    getStock,
  };
}
