import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "pk-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.scss"],
})
export class PortfolioComponent implements AfterViewInit, OnDestroy {
  @ViewChild("selfProjectsRef", { static: false }) selfProjectsRef: ElementRef;

  constructor(private zone: NgZone) {}

  isScrollUntilSelfProject = false;

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
  }

  ngOnDestroy(): void {
    // window.removeEventListener("scroll", this.onScroll);
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(event: any): void {
    console.log("Scrolling...");
    // Your logic here
  }
}
