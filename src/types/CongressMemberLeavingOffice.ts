export interface CongressMemberLeavingOffice {
  congress: string;
  chamber: string;
  num_results: number;
  offset: number;
  members: LeavingOfficeMember[];
}

export interface LeavingOfficeMember {
  id: string;
  api_uri: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: null;
  party: string;
  state: string;
  district: number;
  begin_date: string;
  end_date: string;
  status: string;
  note: string;
}
