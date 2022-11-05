import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User = new User();
  data$: Observable<any>;
  allUsers = [];
 


  constructor(public dialog: MatDialog, private firestore: Firestore) {

    
   }

  ngOnInit(): void {
    const coll = collection(this.firestore, 'users'); 
    this.data$ = collectionData(coll, {idField: 'customIdField'}); 
    this.data$.subscribe( (result: any) => { 
      this.allUsers = result;
      console.log("das ergebnis:" , this.allUsers); 

    });
  }

  openDialog(){
    this.dialog.open(DialogAddUserComponent);
  }

}
