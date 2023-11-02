import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ScrollService {
  private scrollSubject = new Subject<Event>();
  scrollObservable = this.scrollSubject.asObservable();

  triggerScroll(event: Event): void {
    this.scrollSubject.next(event);
  }
}
