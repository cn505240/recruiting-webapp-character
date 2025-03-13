import React from 'react';
import Skill from './Skill';
import { SKILL_LIST } from '../consts';

interface SkillsProps {
  skills: Record<string, number>;
  setScore: (name: string, value: number) => void;
  modifiers: Record<string, number>;
  totalSkillPoints: number;
}

const Skills: React.FC<SkillsProps> = ({ skills, setScore, modifiers, totalSkillPoints }) => {
  const handleSetScore = (name: string, value: number) => {
    // Calculate total skill points used
    const totalUsed = Object.entries(skills).reduce((sum, [skillName, score]) => {
      if (skillName === name) {
        return sum + value;
      }
      return sum + score;
    }, 0);

    if (totalUsed > totalSkillPoints) {
      alert('Cannot exceed total skill points available!');
      return;
    }

    setScore(name, value);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '5px' }}>Skills</h2>
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        Total skill points available: {totalSkillPoints}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {SKILL_LIST.map((skill) => (
          <Skill
            key={skill.name}
            name={skill.name}
            score={skills[skill.name]}
            modifier={modifiers[skill.attributeModifier]}
            modifierAttribute={skill.attributeModifier}
            total={skills[skill.name] + modifiers[skill.attributeModifier]}
            setScore={(value) => handleSetScore(skill.name, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Skills;
