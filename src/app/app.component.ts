import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUserService } from './app.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogCreatedUserDialog } from './dialogs/dialog-created-user-sucess.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userForm: FormGroup;
  isLoading: boolean = false;

  constructor(formBuilder: FormBuilder, private userService: AppUserService, public dialog: MatDialog) {
    this.userForm = formBuilder.group({
      fullName: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(100)] ],
      birthday: [null, Validators.required ],
      email: [null, [Validators.required, Validators.pattern(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm), Validators.maxLength(100)] ],
      phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')] ],
      ext: [null, Validators.maxLength(5)]
    })
  }

  submitForm() {
    if (this.userForm.status !== 'VALID') return false;
    
    this.isLoading = true;
    return this.userService.createUser(this.userForm.value).subscribe(result => {
      this.isLoading = false;
      this.dialog.open(DialogCreatedUserDialog);
      console.log("Result", result);
    });
  }
}
