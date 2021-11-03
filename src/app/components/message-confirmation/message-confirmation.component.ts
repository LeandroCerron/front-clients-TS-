import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-confirmation',
  templateUrl: './message-confirmation.component.html',
  styleUrls: ['./message-confirmation.component.css']
})
export class MessageConfirmationComponent implements OnInit {
  message: string;
  btn = 'accept';

  constructor( public dialogRef: MatDialogRef<MessageConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.message = data.message;
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
