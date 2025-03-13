export type Attribute = "Strength" | "Dexterity" | "Constitution" | "Intelligence" | "Wisdom" | "Charisma";

export type Attributes = {
    Strength: number;
    Dexterity: number;
    Constitution: number;
    Intelligence: number;
    Wisdom: number;
    Charisma: number;
};

export type Class = "Barbarian" | "Wizard" | "Bard";

export type Skills = {
    [key in Skill]: number;
};

export type Skill = "Acrobatics" | "Animal Handling" | "Arcana" | "Athletics" | "Deception" | "History" | "Insight" | "Intimidation" | "Investigation" | "Medicine" | "Nature" | "Perception" | "Performance" | "Persuasion" | "Religion" | "Sleight of Hand" | "Stealth" | "Survival";