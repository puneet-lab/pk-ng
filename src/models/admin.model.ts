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
  duration: string;
  country: string;
  order: number;
  isOpen: boolean;
  responsibilities: IOrderText[];
}

export interface IOrderText {
  order: string;
  text: string;
}
