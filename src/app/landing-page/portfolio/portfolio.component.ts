import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import { ScrollService } from "../../../services/scroll.service";

@Component({
  selector: "pk-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.scss"],
})
export class PortfolioComponent implements OnInit, OnDestroy {
  isComeInView = false;
  private destroy$ = new Subject<void>();
  @ViewChild("initialLoadComponents", { static: false })
  initialLoadComponents: ElementRef;

  constructor(
    private scrollService: ScrollService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      this.isComeInView = true;
    } else {
      this.scrollService.scrollObservable
        .pipe(
          tap((event: Event) => {
            this.checkIfShouldLoadMore(event);
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }

  checkIfShouldLoadMore(event: Event): void {
    const { scrollTop, clientHeight: eventClientHeight } =
      event.target as Element;
    const { clientHeight, offsetTop } =
      this.initialLoadComponents.nativeElement;

    const triggerOffset = 50;
    const scrollPosition = scrollTop + eventClientHeight;
    const triggerPosition = offsetTop + clientHeight - triggerOffset;

    if (scrollPosition >= triggerPosition && !this.isComeInView) {
      this.isComeInView = true;
      this.cdRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
