import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
  let auth = inject(AngularFireAuth)
  let router = inject(Router)

  return auth.user.pipe(
    map(user => {
      if (!!user) {
        return true;
      }
      router.navigate(['login'])
      return false
    })
  )
};
