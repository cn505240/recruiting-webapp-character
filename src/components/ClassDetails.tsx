import React from 'react';
import type { Attributes, Class } from '../types';

interface ClassDetailsProps {
  className: Class;
  attributes: Attributes;
}

const ClassDetails: React.FC<ClassDetailsProps> = ({ className, attributes }) => {
  return (
    <div style={{ 
      border: '1px solid #ccc',
      padding: '15px',
      margin: '10px 0',
      maxWidth: '300px'
    }}>
      <div style={{ marginBottom: '15px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '10px' }}>{className}</h3>
        <div style={{ marginLeft: '10px' }}>
          {Object.entries(attributes).map(([attr, value]) => (
            <div key={attr}>
              {attr}: {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
