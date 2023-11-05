import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { SharedService } from "../../../../shared";

@Component({
  selector: "pk-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnInit, OnDestroy {
  isShowBlogCategory: boolean;

  blogCategoryForm = this.fb.group({
    categoryID: ["", Validators.required],
    categoryTitle: ["", Validators.required],
  });

  constructor(private fb: FormBuilder, private sharedService: SharedService) {}

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  showBlogCategoryForm(): void {
    this.isShowBlogCategory = !this.isShowBlogCategory;
  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
}
