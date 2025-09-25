import { Status } from "@/types/Status";
import { Issue } from "./Issue";
import { Recommendation } from "./Recommendation";

export interface ShipData {
    id: string;
    shipName: string;
    shipType: string;
    status: Status;
    statusLabel: string;
    issues: Issue[];
    recommendations: Recommendation;
}
