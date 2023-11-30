import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, AsyncValidatorFn, FormControl, FormGroup } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({providedIn: 'root'})
export class UniqueUsername implements AsyncValidator {
 
    constructor(private authService: AuthService){}

    validate = (control: AbstractControl)=>{
        const {value} = control;
        return this.authService.userNameAvailable(value)
        .pipe(
            map((value)=>{
                if (value.available) {
                    return null;
                }else{
                    return{response: 'negative'}
                }
            }),
            catchError((err)=>{
                if (err.error.username) {
                    return of({nonUniqueUsername: true});//of(object) -> stworz nową Observable z objectu
                }else{
                    return of({noInternetConnection:true})
                }
            })

        );
    }


}
