import { Component, OnInit } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss'],
})
export class DialogEditAddressComponent implements OnInit {
  user: User;
  userId: string;
  loading: boolean = false;
  db = this.firestore;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>,  private firestore: Firestore) {}

  ngOnInit(): void {}

  saveUser() {
    this.loading = true;

    const docRef = doc(this.db, 'users', this.userId);
    setDoc(docRef, this.user.toJSON())
      .then((docRef) => {
        console.log('Entire Document has been updated successfully');
      })
      .catch((error) => {
        console.log(error);
      });
    this.loading = false;
    this.dialogRef.close();
  }
}
