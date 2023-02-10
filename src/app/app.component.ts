import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUserService } from './app.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogCreatedUserDialog } from './dialogs/dialog-created-user-sucess.component';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  userForm: FormGroup;
  isLoading: boolean = false;

  @ViewChild('signature')
  public signaturePad!: SignaturePadComponent;

  signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    minWidth: 5,
    canvasWidth: 300,
    canvasHeight: 200,
    backgroundColor: "#FFFF"
  };

  constructor(formBuilder: FormBuilder, private userService: AppUserService, public dialog: MatDialog) {
    this.userForm = formBuilder.group({
      fullName: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(100)] ],
      birthday: [null, Validators.required ],
      email: [null, [Validators.required, Validators.pattern(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm), Validators.maxLength(100)] ],
      phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')] ],
      ext: [null, Validators.maxLength(5)],
      signature: [null, Validators.required]
    })
  }

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 5);
  }

  drawStart(event: MouseEvent | Touch) {
  }

  drawComplete(event: MouseEvent | Touch) {
    this.userForm.get('signature')?.setValue(this.signaturePad.toDataURL());
  }

  resetDraw() {
    this.signaturePad.clear();
    this.userForm.get('signature')?.setValue(null);
  }

  submitForm() {
    if (this.userForm.status !== 'VALID') return false;
    
    this.isLoading = true;
    return this.userService.createUser(this.userForm.value).subscribe(result => {
      this.isLoading = false;
      this.dialog.open(DialogCreatedUserDialog);
    });
  }
}
