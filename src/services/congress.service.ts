import axios from "axios";
import { Chamber } from "../types/Congress";
import { CongressMemberDetail } from "../types/CongressMemberDetail";
import { CongressMemberLeavingOffice } from "../types/CongressMemberLeavingOffice";
import { CongressMembersResult } from "../types/CongressMembers";

const BASE_URL = "https://api.propublica.org/congress/v1";

type CongressService = {
  getMembersBySessionAndChamber: (
    session?: number,
    chamber?: Chamber
  ) => Promise<CongressMembersResult["members"] | undefined>;
  getMember: (id: string) => Promise<CongressMemberDetail | undefined>;
  getMemberLeavingOffice: (
    session?: number,
    chamber?: Chamber
  ) => Promise<CongressMemberLeavingOffice["members"] | undefined>;
};

export const congressService: CongressService = {
  async getMembersBySessionAndChamber(session = 115, chamber = "senate") {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/${session}/${chamber}/members.json`,
        {
          headers: {
            "content-type": "application/json",
            "X-API-Key": "d0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr",
          },
        }
      );

      const { results }: { results: CongressMembersResult[] } = data;

      return results[0]?.members;
    } catch (e) {
      console.error(e);
    }
  },
  async getMember(id: string) {
    try {
      const { data } = await axios.get(`${BASE_URL}/members/${id}.json`, {
        headers: {
          "content-type": "application/json",
          "X-API-Key": "d0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr",
        },
      });

      const { results }: { results: CongressMemberDetail[] } = data;

      return results[0];
    } catch (e) {
      console.error(e);
    }
  },
  async getMemberLeavingOffice(session = 115, chamber = "senate") {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/${session}/${chamber}/members/leaving.json`,
        {
          headers: {
            "content-type": "application/json",
            "X-API-Key": "d0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr",
          },
        }
      );

      const { results }: { results: CongressMemberLeavingOffice[] } = data;

      return results[0]?.members;
    } catch (e) {
      console.error(e);
    }
  },
};
