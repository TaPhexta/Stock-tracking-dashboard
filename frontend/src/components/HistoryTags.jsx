function HistoryTags({ history, onSelect, onClear }) {
  return (
    <div className="history-tags">
      {history.map((item) => (
        <button key={item} onClick={() => onSelect(item)}>
          {item}
        </button>
      ))}

      {history.length > 0 && (
        <button onClick={onClear}>Clear</button>
      )}
    </div>
  );
}

export default HistoryTags;
