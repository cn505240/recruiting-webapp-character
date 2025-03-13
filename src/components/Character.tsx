import React, { useState, useEffect } from 'react';
import Attributes from './Attributes';
import Classes from './Classes';
import ClassDetails from './ClassDetails';
import Skills from './Skills';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from '../consts';
import type { Attributes as AttributesType, Class, Skill } from '../types';
import useLoadCharacter from '../hooks/useLoadCharacter';
import useSaveCharacter from '../hooks/useSaveCharacter';

const Character: React.FC = () => {
  const { loadCharacter, isLoading: isLoadingCharacter, error: loadError } = useLoadCharacter();
  const { saveCharacter, isLoading: isSavingCharacter, error: saveError } = useSaveCharacter();

  // Initialize attributes with default values
  const [attributes, setAttributes] = useState<AttributesType>({
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  });

  // Track selected class
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  // Initialize skills with default values
  const [skills, setSkills] = useState<Record<string, number>>(() => {
    const initialSkills: Record<string, number> = {};
    SKILL_LIST.forEach(skill => {
      initialSkills[skill.name] = 0;
    });
    return initialSkills;
  });

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const data = await loadCharacter();
        if (data?.body) {
          setAttributes(data.body.attributes || attributes);
          setSelectedClass(data.body.class || null);
          setSkills(data.body.skills || skills);
        }
      } catch (err) {
        console.error('Failed to load character:', err);
      }
    };

    fetchCharacter();
  }, []);

  // Calculate modifiers based on attribute scores
  const modifiers: Record<string, number> = {};
  Object.keys(attributes).forEach(attr => {
    modifiers[attr] = Math.floor((attributes[attr as keyof AttributesType] - 10) / 2);
  });

  // Handler to update attributes
  const handleSetAttribute = (name: string, value: number) => {
    setAttributes(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler to update skills
  const handleSetSkillScore = (name: string, value: number) => {
    setSkills(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler to save character
  const handleSave = async () => {
    try {
      await saveCharacter({
        attributes,
        class: selectedClass,
        skills
      });
      alert('Character saved successfully!');
    } catch (err) {
      console.error('Failed to save character:', err);
    }
  };

  // Calculate total skill points (based on Intelligence modifier)
  const totalSkillPoints = 10 + (4 * modifiers['Intelligence']);

  if (isLoadingCharacter) {
    return <div>Loading character...</div>;
  }

  if (loadError) {
    return <div>Error loading character: {loadError}</div>;
  }

  return (
    <div className="character">
      <h1>Character Sheet</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap' }}>
        <Attributes attributes={attributes} setAttributes={handleSetAttribute} modifiers={modifiers} />
        <Classes attributes={attributes} setSelectedClass={setSelectedClass} />
        {selectedClass && <ClassDetails className={selectedClass} attributes={CLASS_LIST[selectedClass]} />}
        <Skills skills={skills} setScore={handleSetSkillScore} modifiers={modifiers} totalSkillPoints={totalSkillPoints} />
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          onClick={handleSave}
          disabled={isSavingCharacter}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          {isSavingCharacter ? 'Saving...' : 'Save Character'}
        </button>
        {saveError && <div style={{ color: 'red', marginTop: '10px' }}>Error saving character: {saveError}</div>}
      </div>
    </div>
  );
};

export default Character;
