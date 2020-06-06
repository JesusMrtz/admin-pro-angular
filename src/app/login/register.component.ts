import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { UserService } from '../services/user/user.service';
import { UserModel } from '../models/user.model';
declare function initPlugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    initPlugins();
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, [Validators.required]),
      termAndConditions: new FormControl(false)
    }, {
      validators: this.inputsPasswordAreEquals('password', 'password2')
    });

    this.registerForm.setValue({
      name: 'Karely Lucero Ricalde Villanueva',
      email: 'test1@correo.com',
      password: '123456',
      password2: '1234567',
      termAndConditions: true
    });
  }

  registerUser() {
    if (this.registerForm.valid && this.registerForm.value.termAndConditions) {
      const valuesOfRegisterForm = this.registerForm.value;
      const user = new UserModel(valuesOfRegisterForm.name, valuesOfRegisterForm.email, valuesOfRegisterForm.password);

      this.userService.createUser(user).subscribe((response) => this.router.navigate(['/login']));
    }

    if (!this.registerForm.value.termAndConditions) {
      swal('Advertencia', 'Debe aceptar las condiciones', 'warning');
    }
  }

  inputsPasswordAreEquals(inputValue: string, inputToCompare: string) {
    return (group: FormGroup) => {
      const inputPassword = group.controls[inputValue].value;
      const inputConfirmPassword = group.controls[inputToCompare].value;

      if (inputPassword === inputConfirmPassword) {
        return null;
      }
      return {
          areEquals: true
        };
    };
  }

}
