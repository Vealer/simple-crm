import { Component, OnInit } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  onSnapshot,
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { User } from '../models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  private routeSub: Subscription;
  user: any = new User();
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      console.log(params); //log the entire params object
      this.userId = params['id'];
    });
    console.log(this.userId);
    this.getUser();
  }

  getUser() {
    const unsub = onSnapshot(
      doc(this.firestore, `users`, `${this.userId}`),
      (doc: any) => {
        console.log('Current data: ', doc.data());
        this.user.firstName = doc.data().firstName;
        this.user.lastName = doc.data().lastName;
        this.user.email = doc.data().email;
        this.user.street = doc.data().street;
        this.user.zipCode = doc.data().zipCode;
        this.user.city = doc.data().city;
      }
    );
    console.log('Dieser USer: ', this.user);
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
  }
}
