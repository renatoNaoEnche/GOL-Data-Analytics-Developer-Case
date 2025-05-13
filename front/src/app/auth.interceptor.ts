// src/app/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

const secretKey = 'sua_chave_secreta';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const encryptedToken = localStorage.getItem('authToken');

  if (encryptedToken) {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${decryptedToken}`
      }
    });
  }

  return next(req);
};
