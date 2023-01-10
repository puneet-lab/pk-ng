import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "pk-responsibility-dialog",
  templateUrl: "./responsibility-dialog.component.html",
  styleUrls: ["./responsibility-dialog.component.scss"],
})
export class ResponsibilityDialogComponent implements OnInit {
  resonsibilityFormGroup: FormGroup;

  get resonsibilityFormArray(): FormArray {
    return this.resonsibilityFormGroup.get("responsibilities") as FormArray;
  }

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ResponsibilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) {
    this.resonsibilityFormGroup = this.fb.group({
      responsibilities: this.fb.array([this.getResFormControl()]),
    });
    if (data.length) {
      this.patchResponsibilities(data);
    }
  }

  ngOnInit(): void {}

  patchResponsibilities(responsibilities: string[]) {
    this.resonsibilityFormArray.clear();
    responsibilities.forEach((res) => {
      const resFormControl = this.getResFormControl();
      resFormControl.setValue(res);
      this.resonsibilityFormArray.push(resFormControl);
    });
  }

  getResFormControl(): FormControl {
    return this.fb.control("", [Validators.required]);
  }

  removeField(index: number): void {
    this.resonsibilityFormArray.removeAt(index);
  }

  addResponsibility(): void {
    this.resonsibilityFormArray.push(this.getResFormControl());
  }

  closeDialog(): void {
    const formValid = this.resonsibilityFormGroup.valid;
    if (formValid) {
      const responsibilities = this.resonsibilityFormArray.value;
      this.dialogRef.close(responsibilities);
    }
  }
}
