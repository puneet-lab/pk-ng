import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  ITitlebarActions,
  ITitlebarNotifyAction,
  ITitlebarToggle,
  TitlebarActionTypes,
} from "src/models";

@Component({
  selector: "pk-titlebar",
  templateUrl: "./titlebar.component.html",
  styleUrls: ["./titlebar.component.scss"],
})
export class TitlebarComponent {
  @Input() title: string;
  @Input() index: number;
  @Input() isOpen: boolean;
  @Input() actionButtons: ITitlebarActions[];
  @Output() notifyToggle: EventEmitter<ITitlebarToggle> = new EventEmitter();
  @Output() notifyAction: EventEmitter<ITitlebarNotifyAction> =
    new EventEmitter();

  //@Input() openClose: any;

  toggleTitle(): void {
    this.isOpen = !this.isOpen;
    this.notifyToggle.emit({ toggle: this.isOpen, index: this.index });
  }

  onAction(id: TitlebarActionTypes): void {
    this.notifyAction.emit({ id, index: this.index });
  }
}
