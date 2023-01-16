export enum CVTypes {
  SHORT = "short",
  LONG = "long",
}

export interface ISideBarMenu {
  name: string;
  active: boolean;
  route: string;
}

export interface IContact {
  id: string;
  title: string;
  icon: string;
  href: string;
  type: string;
  order: number;
  isOpen?: boolean;
}

export interface IEducation {
  title: string;
  date: string;
  desc: string;
  order: number;
  isOpen?: boolean;
}

export interface ISelfProjects {
  title: string;
  desc: string;
  image: string;
  url: string;
  stack: string[];
  order: number;
}

export interface ICertificates {
  title: string;
  image: string;
  order: number;
}

export interface ISkills {
  skill: string;
  logo: string;
  group: string;
  order: number;
}

export interface ISkillTypes {
  type: string;
  title: string;
  order: number;
}

export interface ICV {
  title: string;
  images: string[];
  pdf: string;
  order: number;
  type: CVTypes;
}
