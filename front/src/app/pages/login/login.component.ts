import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit() {
    const { username, password } = this.loginForm.value;

    // Aqui simula a geração do token, substitua conforme sua lógica
    const authTokenPass = environment.authTokenPass;
    const authTokenKey = CryptoJS.enc.Base64.parse(environment.authTokenKey);
    const authTokenIv = CryptoJS.enc.Utf8.parse(environment.authTokenIv);

    const encryptedToken = CryptoJS.AES.encrypt(authTokenPass, authTokenKey, {
      iv: authTokenIv,
      mode: CryptoJS.mode.CBC
    }).toString();

    localStorage.setItem('authToken', encryptedToken);

    // Redireciona para o dashboard
    this.router.navigate(['/dashboard']);
  }
}
