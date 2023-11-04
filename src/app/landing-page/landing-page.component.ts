import { AfterViewInit, Component, OnDestroy, ViewChild } from "@angular/core";
import { MatDrawerContent } from "@angular/material/sidenav";
import { Subscription, tap } from "rxjs";
import { ISideBarMenu } from "src/models";
import { ScrollService } from "src/services/scroll.service";
import { SharedService } from "src/shared";

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
  images =
    "https://firebasestorage.googleapis.com/v0/b/puneeetkushwah.appspot.com/o/assets%2Flanding-bg.jpg?alt=media&token=81fcae2a-0dd2-4d9a-9f14-b14ddf3a1370&_gl=1*1wivrf6*_ga*MjExOTgzNjY3NS4xNjc1NDk1MzA3*_ga_CW55HF8NVT*MTY5OTAyNTQ0Ny40LjEuMTY5OTAyNTUyNy41NC4wLjA.";

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
