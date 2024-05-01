import { OPMETResponseResult } from "./opmet-response-result.model";

export interface GroupedRows {
    [stationId: string]: OPMETResponseResult[]
}

export interface GroupHeader {
    stationId: string;
    isGroupBy: boolean;
}