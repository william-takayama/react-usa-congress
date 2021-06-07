export interface CongressMemberDetail {
  id: string;
  member_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: null;
  date_of_birth: Date;
  gender: string;
  url: string;
  times_topics_url: string;
  times_tag: string;
  govtrack_id: string;
  cspan_id: string;
  votesmart_id: string;
  icpsr_id: string;
  twitter_account: string;
  facebook_account: string;
  youtube_account: null;
  crp_id: string;
  google_entity_id: string;
  rss_url: null;
  in_office: boolean;
  current_party: string;
  most_recent_vote: Date;
  last_updated: string;
  roles: Role[];
}

export interface Role {
  congress: string;
  chamber: string;
  title: string;
  short_title: string;
  state: string;
  party: string;
  leadership_role: null;
  fec_candidate_id: string;
  seniority: string;
  district: string;
  at_large: boolean;
  ocd_id: string;
  start_date: Date;
  end_date: Date;
  office: null | string;
  phone: null | string;
  fax: null;
  contact_form: null;
  cook_pvi: null | string;
  dw_nominate: number;
  ideal_point: null;
  next_election: string;
  total_votes: number;
  missed_votes: number;
  total_present: number;
  senate_class: string;
  state_rank: string;
  lis_id: string;
  bills_sponsored: number;
  bills_cosponsored: number;
  missed_votes_pct: number;
  votes_with_party_pct: number;
  votes_against_party_pct: number;
  committees: Committee[];
  subcommittees: Committee[];
}

export interface Committee {
  name: string;
  code: string;
  api_uri: string;
  side?: Side;
  title?: Title;
  rank_in_party: number;
  begin_date: string;
  end_date: Date;
  parent_committee_id?: ParentCommitteeID;
}

export enum ParentCommitteeID {
  Hsag = "HSAG",
  Hsas = "HSAS",
  Hssm = "HSSM",
}

export enum Side {
  Majority = "majority",
  Minority = "minority",
}

export enum Title {
  Chair = "Chair",
  Member = "Member",
  RankingMember = "Ranking Member",
}
