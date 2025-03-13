import React from 'react';
import Class from './Class';
import { CLASS_LIST } from '../consts';
import type { Attributes, Class as ClassType } from '../types';

interface ClassesProps {
  attributes: Attributes;
  setSelectedClass: (className: ClassType) => void;
}

const Classes: React.FC<ClassesProps> = ({ attributes, setSelectedClass }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Classes</h2>
      <div>
        {Object.entries(CLASS_LIST).map(([className, classAttributes]) => (
          <Class
            key={className}
            name={className as ClassType}
            classMinimumAttributes={classAttributes}
            characterAttributes={attributes}
            onClick={() => setSelectedClass(className as ClassType)}
          />
        ))}
      </div>
    </div>
  );
};

export default Classes;
