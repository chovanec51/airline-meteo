import { RequestQueryParams } from "./request-query-params.model";

export interface RequestQuery {
    id: string,
    method: string,
    params: RequestQueryParams[]
}