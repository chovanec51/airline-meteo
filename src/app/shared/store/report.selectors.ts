import { createSelector } from "@ngrx/store";
import { OPMETResponseResult } from "../model/opmet-response-result.model";
import { GroupHeader, GroupedRows } from "../model/group.model";


export const selectReportData = (state: {reportData: GroupedRows}) => state.reportData;

export const selectOutputData = createSelector(
    selectReportData,
    (state: GroupedRows) => {
        const outputData: (OPMETResponseResult | GroupHeader)[] = [];

        for (const stationId in state) {
            outputData.push({stationId: stationId, isGroupBy: true});
            state[stationId].forEach(row => outputData.push(row));
        }

        return outputData;
    }
);
