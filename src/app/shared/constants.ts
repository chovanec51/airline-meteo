import { GroupedRows } from "./model/group.model";

export const ICAOCodeRegex: RegExp = /\b\w[A-Z]{3}\b/;
export const WMOCodeRegex: RegExp = /\b\w[A-Z]{1}\b/;
export const emptyGroupedRows: GroupedRows = {};