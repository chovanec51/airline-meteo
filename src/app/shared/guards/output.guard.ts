import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectReportData } from "../store/report.selectors";
import { GroupedRows } from "../model/group.model";
import { emptyGroupedRows } from "../constants";


export const outputGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Promise<UrlTree | boolean> => {
    const router = inject(Router);
    const store = inject(Store<{reportData: GroupedRows}>);

    return new Promise((resolve, reject) => {
        store.select(selectReportData).subscribe({
            next: data => {
                if (data === emptyGroupedRows)
                    resolve(router.createUrlTree(['/form']));
                else
                    resolve(true);
            }
        });
    }) 
}