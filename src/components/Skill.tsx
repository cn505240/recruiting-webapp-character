import React from 'react';
import type { Attribute } from '../types';

interface SkillProps {
  name: string;
  score: number;
  modifier: number;
  modifierAttribute: Attribute;
  total: number;
  setScore: (value: number) => void;
}

const Skill: React.FC<SkillProps> = ({
  name,
  score,
  modifier,
  modifierAttribute,
  total,
  setScore
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>{name}: </span>
      <span>{score}</span>
      <span>(Modifier: {modifierAttribute}): </span>
      <span>{modifier}</span>
      <button 
        onClick={() => setScore(score + 1)}
        style={{ padding: '0 8px' }}
      >
        +
      </button>
      <button 
        onClick={() => setScore(score - 1)}
        style={{ padding: '0 8px' }}
      >
        -
      </button>
      <span>total: {total}</span>
    </div>
  );
};

export default Skill;
