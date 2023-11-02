import { Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
export class SeoService {
  constructor(private metaService: Meta) {}

  addNoIndexMetaTags(): void {
    this.metaService.addTags([
      { name: "robots", content: "noindex" },
      { name: "googlebot", content: "noindex" },
    ]);
  }

  removeNoIndexMetaTags(): void {
    this.metaService.removeTag("name='robots'");
    this.metaService.removeTag("name='googlebot'");
  }
}
