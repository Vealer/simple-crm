import { Component, OnInit } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getFirestore,
  setDoc,
} from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss'],
})
export class DialogEditUserComponent implements OnInit {
  user: User;
  loading: boolean = false;
  birthDate: Date;
  userId: string;
  db = this.firestore;

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {}

  async saveUser() {
    this.user.birthDate = this.birthDate ? this.birthDate.getTime() : 0;
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
