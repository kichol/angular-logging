import { AbstractControl, Validator } from "@angular/forms";
import { Injectable } from "@angular/core";


@Injectable({providedIn: 'root'})
export class MatchPassword implements Validator{
    validate(control: AbstractControl){ //może byc zarówno form group jak i form control!
        const {password,passwordConfirmation} = control.value;
        if (password == passwordConfirmation) {
            return null;
        }else{
            return { passwordsDontMatch: true};

        }

    }
}

