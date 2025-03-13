import React from 'react';
import type { Attributes as AttributesType, Class as ClassType } from '../types';

interface ClassProps {
  name: ClassType;
  classMinimumAttributes: AttributesType;
  characterAttributes: AttributesType;
  onClick: (name: ClassType) => void;
}

const Class: React.FC<ClassProps> = ({ name, classMinimumAttributes, characterAttributes, onClick }) => {
  // Check if character meets all minimum attribute requirements for this class
  const meetsRequirements = Object.entries(classMinimumAttributes).every(
    ([attribute, minimumValue]) => {
      const attributeKey = attribute as keyof AttributesType;
      return characterAttributes[attributeKey] >= minimumValue;
    }
  );

  // Style based on whether requirements are met
  const textColor = meetsRequirements ? 'green' : 'red';

  return (
    <div style={{ margin: '5px 0', cursor: 'pointer' }} onClick={() => onClick(name)}>
      <span style={{ color: textColor, fontWeight: 'bold' }}>{name}</span>
    </div>
  );
};

export default Class;
