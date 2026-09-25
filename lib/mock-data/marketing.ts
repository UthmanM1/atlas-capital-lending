export interface CampaignRow {
  campaign: string;
  spend: number;
  leads: number;
  qualified: number;
  applications: number;
  funded: number;
}

/** Illustrative/mock campaign performance. Does not represent actual Atlas performance. */
export const CAMPAIGNS: CampaignRow[] = [
  { campaign: "Rental Purchase", spend: 18400, leads: 142, qualified: 71, applications: 24, funded: 9 },
  { campaign: "Cash-Out", spend: 9600, leads: 63, qualified: 31, applications: 11, funded: 4 },
  { campaign: "Portfolio", spend: 7200, leads: 28, qualified: 17, applications: 7, funded: 3 },
  { campaign: "Broker", spend: 3100, leads: 19, qualified: 14, applications: 8, funded: 5 },
];

export function totalMarketing() {
  return CAMPAIGNS.reduce(
    (a, c) => ({
      spend: a.spend + c.spend,
      leads: a.leads + c.leads,
      qualified: a.qualified + c.qualified,
      applications: a.applications + c.applications,
      funded: a.funded + c.funded,
    }),
    { spend: 0, leads: 0, qualified: 0, applications: 0, funded: 0 }
  );
}
