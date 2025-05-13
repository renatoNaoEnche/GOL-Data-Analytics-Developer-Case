import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;

    const authTokenPass = environment.authTokenPass;

    const authTokenKey = CryptoJS.enc.Base64.parse(environment.authTokenKey);
    const authTokenIv = CryptoJS.enc.Utf8.parse(environment.authTokenIv);

    const encryptedToken = CryptoJS.AES.encrypt(
      authTokenPass,
      authTokenKey,
      {
        iv: authTokenIv,
        mode: CryptoJS.mode.CBC
      }
    ).toString();

    console.log('Token gerado:', encryptedToken);

    // Aqui você pode armazenar o token no localStorage, ou usá-lo para chamadas HTTP
    localStorage.setItem('authToken', encryptedToken);
  }

}
