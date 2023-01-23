export enum PageUrlTypes {
  ADMIN_DASHBOARD = "admin/dashboard",
  DASHBOARD = "dashboard",
  ADMIN = "admin",
  LANDING = "landing",
  ADMIN_EXPERIENCE = "admin/dashboard/experience",
}

export enum OperationModes {
  ADD = "ADD",
  EDIT = "EDIT",
}

export interface IPrivacyPolicy {
  title: string;
  order: number;
}

export interface IDownloadResponse {
  status: boolean;
  downloadLink: string;
}

export interface IAdminActionBtns {
  edit: Function;
  delete: Function;
}
