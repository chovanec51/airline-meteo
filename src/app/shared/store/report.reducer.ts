import { createReducer, on } from "@ngrx/store";
import { fillReport } from "./report.actions";
import { GroupedRows } from "../model/group.model";
import { emptyGroupedRows } from "../constants";

const initialState: GroupedRows = emptyGroupedRows;

export const ReportReducer = createReducer(
    initialState,
    on(fillReport, (state: GroupedRows, action) => {
        return {...action.reportData};
    })
);