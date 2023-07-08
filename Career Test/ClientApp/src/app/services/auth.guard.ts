import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    private readonly LOGIN_ROUTE = "/login"

    constructor(private authService: AuthService, private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let token = this.authService.getToken();
        if (!token){
            this.router.navigate([this.LOGIN_ROUTE], { queryParams: { returnUrl: state.url }});
            return false;
        }

        let acceptedRoles: string[] | null = route.data.roles; //Роли которые имеют доступ к данному компоненту

        if (acceptedRoles) {
            let roles = this.authService.getRoles();
            if (roles) {
                return roles.filter(x => acceptedRoles?.includes(x)).length > 0;
            }
            return false;
        }

        return true
    }
}
