export enum PageUrlTypes {
  ADMIN_DASHBOARD = "admin/dashboard",
  DASHBOARD = "dashboard",
  ADMIN = "admin",
  LANDING = "landing",
}

export enum TitlebarActionTypes {
  ADD = "add",
  DELETE = "delete",
  EXP_RES = "exp_res",
}

export enum OperationModes {
  ADD = "ADD",
  EDIT = "EDIT",
}

export interface ITitlebarToggle {
  toggle: boolean;
  index: number;
}
export interface ITitlebarNotifyAction {
  id: TitlebarActionTypes;
  index: number;
}

export interface ITitlebarActions {
  id: TitlebarActionTypes;
  icon: string;
  isShow: boolean;
}
