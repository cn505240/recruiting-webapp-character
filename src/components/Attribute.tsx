import React from 'react';

interface AttributeProps {
  name: string;
  score: number;
  modifier: number;
  setScore: (value: number) => void;
}

const Attribute: React.FC<AttributeProps> = ({ name, score, modifier, setScore }) => {
  const handleIncrement = () => {
    if (score < 20) {
      setScore(score + 1);
    } else {
      alert(`${name} cannot be increased above 20`);
    }
  };

  const handleDecrement = () => {
    if (score > 0) {
      setScore(score - 1);
    } else {
      alert(`${name} cannot be decreased below 0`);
    }
  };

  return (
    <div>
      {name}: {score} (Modifier: {modifier})
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
};

export default Attribute;
