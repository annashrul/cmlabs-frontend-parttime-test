export const AREA_FLAGS: Record<string, string> = {
  American: "🇺🇸", British: "🇬🇧", Canadian: "🇨🇦", Chinese: "🇨🇳",
  Croatian: "🇭🇷", Dutch: "🇳🇱", Egyptian: "🇪🇬", Filipino: "🇵🇭",
  French: "🇫🇷", Greek: "🇬🇷", Indian: "🇮🇳", Irish: "🇮🇪",
  Italian: "🇮🇹", Jamaican: "🇯🇲", Japanese: "🇯🇵", Kenyan: "🇰🇪",
  Malaysian: "🇲🇾", Mexican: "🇲🇽", Moroccan: "🇲🇦", Polish: "🇵🇱",
  Portuguese: "🇵🇹", Russian: "🇷🇺", Spanish: "🇪🇸", Thai: "🇹🇭",
  Tunisian: "🇹🇳", Turkish: "🇹🇷", Ukrainian: "🇺🇦", Vietnamese: "🇻🇳",
  Unknown: "🌍",
};

export interface RegionFilter {
  label: string;
  icon: string;
  countries: string[];
}

export const REGIONS: RegionFilter[] = [
  { label: "All", icon: "🌍", countries: [] },
  { label: "Asia", icon: "🌏", countries: ["Chinese", "Filipino", "Indian", "Japanese", "Malaysian", "Thai", "Vietnamese"] },
  { label: "Europe", icon: "🌍", countries: ["British", "Croatian", "Dutch", "French", "Greek", "Irish", "Italian", "Polish", "Portuguese", "Russian", "Spanish", "Ukrainian"] },
  { label: "Americas", icon: "🌎", countries: ["American", "Canadian", "Jamaican", "Mexican"] },
  { label: "Africa & Middle East", icon: "🌍", countries: ["Egyptian", "Kenyan", "Moroccan", "Tunisian", "Turkish"] },
];
