import {
  FirebaseOrderTypes,
  IFirebaseOrder,
  ISkillTypes,
  ISkills,
} from "src/models";

export const getOrderQueryDesc = (): IFirebaseOrder => {
  return {
    order: "order",
    direction: FirebaseOrderTypes.desc,
  };
};

export const getOrderQueryAsc = (): IFirebaseOrder => {
  return {
    order: "order",
    direction: FirebaseOrderTypes.asc,
  };
};

export const createSkillTypesMap = (
  skillTypes: ISkillTypes[],
  skills: ISkills[]
): {
  [key: string]: ISkills[];
} => {
  const skillTypesMap: { [key: string]: ISkills[] } = {};
  for (let index = 0; index < skillTypes.length; index++) {
    const { type } = skillTypes[index];
    skillTypesMap[type] = skills.filter(({ group }) => group === type);
  }

  return skillTypesMap;
};
