
import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let cpassword = AC.get('cpassword').value; // to get value in input tag
        if(password != cpassword) {
            console.log('false');
            AC.get('cpassword').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            return null
        }
    }
}