import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { ScrollService } from "../../../services/scroll.service";

@Component({
  selector: "pk-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.scss"],
})
export class PortfolioComponent implements OnInit, OnDestroy {
  isComeInView = false;
  private scrollSubscription: Subscription;

  @ViewChild("initialLoadComponents", { static: false })
  initialLoadComponents: ElementRef;

  constructor(
    private scrollService: ScrollService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.scrollSubscription = this.scrollService.scrollObservable.subscribe(
      (event: Event) => {
        this.checkIfShouldLoadMore(event);
      }
    );
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
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}
