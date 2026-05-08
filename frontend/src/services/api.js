export const fetchStock = async (symbol) => {
  const response = await fetch(`http://127.0.0.1:8000/test-stock/${symbol}`);
  return response.json();
};
