import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('Authentication Token');
  if(token != null && ['POST', 'PUT', 'GET', 'DELETE'].includes(req.method)){
    req = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
