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
}
