import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validCodesValidator(codeRegex: RegExp): ValidatorFn {
    return (
        control: AbstractControl<any, any>
    ): ValidationErrors | null => {
        if (!control.value)
            return null;
    
        const invalidCodes: string[] = [];
        const codes: string[] = (control.value as string).trim().split(' ');
        
        for (const code of codes) {
            if (code.trim().match(codeRegex) === null)
                invalidCodes.push(code);
        }
        
        if (invalidCodes.length === 0)
            return null;
        return {invalidCodes: invalidCodes};
    }
}
 