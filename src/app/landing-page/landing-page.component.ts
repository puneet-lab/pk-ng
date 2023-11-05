import { AfterViewInit, Component, OnDestroy, ViewChild } from "@angular/core";
import { MatDrawerContent } from "@angular/material/sidenav";
import { Subscription } from "rxjs/internal/Subscription";
import { tap } from "rxjs/internal/operators/tap";
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

  @ViewChild("drawerContent", { static: false })
  drawerContent: MatDrawerContent;
  drawerSubscription: Subscription;

  constructor(
    private sharedService: SharedService,
    private scrollService: ScrollService
  ) {}

  ngAfterViewInit(): void {
    this.drawerSubscription = this.drawerContent
      .elementScrolled()
      .pipe(
        tap((event) => {
          this.scrollService.triggerScroll(event);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.drawerSubscription && this.drawerSubscription.unsubscribe();
  }
}
