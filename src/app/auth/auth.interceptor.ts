import {Injectable, Injector} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';


@Injectable()
export class AuthInterceptor  implements HttpInterceptor {
  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user= this.userService.currentUser;
    if(user.token)
    {
      req = req.clone({
        setHeaders:{
          access_token: user.token
        }
      })
    }
    return next.handle(req);
  }
}
