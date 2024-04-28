import { OPMETResponseResult } from "./opmet-response-result.model";

export interface OPMETResponse {
    error: Error | null,
    id: string,
    result: OPMETResponseResult[],
}