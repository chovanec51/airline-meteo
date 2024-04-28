import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function requiredFieldGroupValidator(fieldNames: string[]): ValidatorFn {
    return (
        form: AbstractControl<any, any>
    ): ValidationErrors | null => {
        let containsFilledField = false;
        
        for (const fieldName of fieldNames) {
            const control = form.get(fieldName);
            if (control && control.value) {
                containsFilledField = true;
                break;
            }
        }

        if (containsFilledField)
            return null;
        return {error: 'allFieldsEmpty'};
    }
}