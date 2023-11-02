import { OnDestroy, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";

export abstract class NoIndexPage implements OnInit, OnDestroy {
  constructor(private metaService: Meta) {}

  ngOnInit(): void {
    this.addNoIndexMetaTags();
  }

  ngOnDestroy(): void {
    this.removeNoIndexMetaTags();
  }

  private addNoIndexMetaTags(): void {
    this.metaService.addTags([
      { name: "robots", content: "noindex" },
      { name: "googlebot", content: "noindex" },
    ]);
  }

  private removeNoIndexMetaTags(): void {
    this.metaService.removeTag("name='robots'");
    this.metaService.removeTag("name='googlebot'");
  }
}
