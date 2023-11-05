import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { MatDrawerContent } from "@angular/material/sidenav";
import { Subject, fromEvent } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import { ISideBarMenu } from "../../models";
import { ScrollService } from "../../services/scroll.service";
import { SharedService } from "../../shared";

@Component({
  selector: "pk-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent implements AfterViewInit, OnDestroy {
  contacts$ = this.sharedService.getContactList();
  name = "Puneet Kushwah";
  title = "Lead Full Stack Engineer";
  title2 = "Senior Software Engineer";

  sideBarMenu: ISideBarMenu[] = [
    {
      name: "Portfolio",
      active: true,
      route: "portfolio",
    },
    {
      name: "Contact",
      active: false,
      route: "contact",
    },
    {
      name: "CV",
      active: false,
      route: "cv",
    },
  ];

  private destroy$ = new Subject<void>();

  @ViewChild("drawerContent", { static: false })
  drawerContent: MatDrawerContent;
  @ViewChild("mobileContent", { static: false }) mobileContent: ElementRef;

  constructor(
    private sharedService: SharedService,
    private scrollService: ScrollService
  ) {}

  ngAfterViewInit(): void {
    this.drawerContent
      .elementScrolled()
      .pipe(
        tap((event) => this.scrollService.triggerScroll(event)),
        takeUntil(this.destroy$)
      )
      .subscribe();

    fromEvent<Event>(this.mobileContent.nativeElement, "scroll")
      .pipe(
        tap((event) => this.scrollService.triggerScroll(event)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
