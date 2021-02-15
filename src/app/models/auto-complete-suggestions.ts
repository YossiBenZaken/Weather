export interface AutoCompleteSuggestions {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: Country;
  AdministrativeArea: Country;
}

interface Country {
  ID: string;
  LocalizedName: string;
}
