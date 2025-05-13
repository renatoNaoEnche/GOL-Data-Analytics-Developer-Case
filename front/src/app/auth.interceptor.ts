import { HttpInterceptorFn } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');

  if (token) {
    const key = CryptoJS.enc.Base64.parse(environment.authTokenKey);
    const iv = CryptoJS.enc.Utf8.parse(environment.authTokenIv);
    const bytes = CryptoJS.AES.decrypt(token, key, { iv, mode: CryptoJS.mode.CBC });
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${decryptedToken}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
