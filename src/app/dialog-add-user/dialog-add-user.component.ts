import { Component, OnInit } from '@angular/core';
import { addDoc, collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent implements OnInit {
  loading = false;
  user: User = new User();
  birthDate: Date;
  

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>,  private firestore: Firestore) {}

  ngOnInit(): void {}

  async saveUser() {
    this.user.birthDate = this.birthDate ? this.birthDate.getTime() : 0;
    console.log('Current User: ' + JSON.stringify(this.user));
    this.loading = true;
    await addDoc(collection(this.firestore, "users"), this.user.toJSON());
    this.loading = false;
    this.dialogRef.close();
  }
}
