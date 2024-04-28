import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validCodesValidator(codeRegex: RegExp): ValidatorFn {
    return (
        control: AbstractControl<any, any>
    ): ValidationErrors | null => {
        if (!control.value)
            return null;
    
        const invalidCodes: string[] = [];
        const codes: string[] = (control.value as string).split(' ');
        
        for (const code of codes) {
            if (code.toUpperCase().match(codeRegex) === null)
                invalidCodes.push(code);
        }
        
        if (invalidCodes.length === 0)
            return null;
        return {invalidCodes: invalidCodes};
    }
}
 