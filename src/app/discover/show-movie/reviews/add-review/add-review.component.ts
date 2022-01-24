import { MatButtonModule } from '@angular/material/button';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiscoverService } from 'src/app/discover/discover.service';
import { UiService } from 'src/app/core/ui/ui.service';

@Component({
  selector: 'add-review-dialog',
  template: `
    <h1 mat-dialog-title>Add rate to movie</h1>
    <div mat-dialog-content>
      <p>from 1 to 10</p>
      <mat-form-field appearance="fill">
        <mat-label>rate a movie</mat-label>
        <input matInput [(ngModel)]="rate" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button>No Thanks</button>
      <button mat-button color="primary" (click)="addRate()">Ok</button>
    </div>
  `,
})
export class AddReviewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData,
    private discoverService: DiscoverService,
    private uiService: UiService,
    public dialogRef: MatDialogRef<AddReviewComponent>
  ) {}
  rate: number;
  ngOnInit(): void {}

  addRate() {
    if (isNaN(this.rate) || this.rate > 10 || this.rate < 1) return;
    this.discoverService.addRate(this.passedData.movieId, this.rate).subscribe(
      (result) => {
        this.uiService.snackbar(result.status_message, 'OKAY');
        this.dialogRef.close();
      },
      (err) => {
        this.uiService.snackbar('Something went wrong', 'CLOSED');
        this.dialogRef.close();
      }
    );
  }
}
