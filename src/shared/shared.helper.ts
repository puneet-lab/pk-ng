import { FormArray } from "@angular/forms";
import {
  ITitlebarActionFunc,
  ITitlebarActions,
  ITitlebarNotifyAction,
  TitlebarActionTypes,
} from "src/models";

export const getFormArraySharedButtons = (
  index: number,
  formArray: FormArray,
  actionFunction: ITitlebarActionFunc
): ITitlebarActions[] => {
  return [
    {
      id: TitlebarActionTypes.ADD,
      icon: "fa-solid fa-plus",
      isShow: index === formArray.controls?.length - 1,
      actionFunc: actionFunction.add,
    },
    {
      id: TitlebarActionTypes.DELETE,
      icon: "fa-solid fa-trash-can",
      isShow: index > 0,
      actionFunc: actionFunction.remove,
    },
  ];
};

export const notifyCommonTitleBarActions = ({
  id,
  index,
  actionFunc,
}: ITitlebarNotifyAction): void => {
  switch (id) {
    case TitlebarActionTypes.ADD:
      actionFunc?.call(null);
      break;
    case TitlebarActionTypes.DELETE:
      actionFunc?.call(null, index);
      break;

    default:
      throw new Error("No valid Title bar common action");
  }
};
