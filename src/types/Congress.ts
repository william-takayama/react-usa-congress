import { CongressMemberDetail } from "./CongressMemberDetail";
import { CongressMemberLeavingOffice } from "./CongressMemberLeavingOffice";
import { CongressMembersResult } from "./CongressMembers";

export type Chamber = "senate" | "house";

export type CongressResponse = {
  copyright: string;
  results:
    | CongressMembersResult[]
    | CongressMemberDetail[]
    | CongressMemberLeavingOffice[];
  status: string;
};
