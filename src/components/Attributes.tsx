import React from 'react';
import Attribute from './Attribute';
import { ATTRIBUTE_LIST } from '../consts';
import type { Attributes as AttributesType } from '../types';

interface AttributesProps {
  attributes: AttributesType;
  setAttributes: (name: string, value: number) => void;
  modifiers: Record<string, number>;
}

const Attributes: React.FC<AttributesProps> = ({ attributes, setAttributes, modifiers }) => {
  const handleSetScore = (attributeName: string, newValue: number) => {
    // Calculate total of all attributes except the one being changed
    const otherAttributesTotal = Object.entries(attributes)
      .filter(([name]) => name !== attributeName)
      .reduce((sum, [, value]) => sum + value, 0);
    
    // Check if new total would exceed 70
    if (otherAttributesTotal + newValue > 70) {
      alert('Total attributes cannot exceed 70');
      return;
    }

    setAttributes(attributeName, newValue);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Attributes</h2>
      <div>
        {ATTRIBUTE_LIST.map((attributeName) => (
          <Attribute
            key={attributeName}
            name={attributeName}
            score={attributes[attributeName]}
            modifier={modifiers[attributeName]}
            setScore={(value) => handleSetScore(attributeName, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Attributes;
