const Rating = ({ value, text }) => {
  const renderStar = (starNumber) => {
    if (value >= starNumber) {
      return <span className="text-yellow-400">★</span>;
    }

    if (value >= starNumber - 0.5) {
      return <span className="text-yellow-400">⯨</span>;
    }

    return <span className="text-gray-300">★</span>;
  };

  return (
    <div className="flex items-center gap-1">
      {renderStar(1)}
      {renderStar(2)}
      {renderStar(3)}
      {renderStar(4)}
      {renderStar(5)}

      {text && (
        <span className="ml-2 text-gray-600 text-sm">
          {text}
        </span>
      )}
    </div>
  );
};

export default Rating;