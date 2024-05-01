import { createAction, props } from "@ngrx/store";
import { GroupedRows } from "../model/group.model";


export const fillReport = createAction(
    '[Report] fill',
    props<{reportData: GroupedRows}>()
);