export interface IAdminListItem {
  id: number;
  title: string;
  route?: string;
}

export interface IAdminSideNavSubItems extends IAdminListItem {}

export interface IAdminSideNavItems extends IAdminListItem {
  showSubItems?: boolean;
  subItems?: IAdminSideNavSubItems[];
}

export interface IExperience {
  position: string;
  companyName: string;
  startDate: string;
  endDate: string;
  durationYear: number;
  durationMonth: number;
  country: string;
  order: number;
  isOpen: boolean;
  responsibilities: IOrderText[];
}

export interface IOrderText {
  order: number;
  text: string;
}
