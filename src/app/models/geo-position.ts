export interface GeoPositionRes {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  EnglishName: string;
  PrimaryPostalCode: string;
  Region: Region;
  Country: Region;
  AdministrativeArea: AdministrativeArea;
  TimeZone: TimeZone;
  GeoPosition: GeoPosition;
  IsAlias: boolean;
  ParentCity: ParentCity;
  SupplementalAdminAreas: any[];
  DataSets: string[];
}


interface ParentCity {
  Key: string;
  LocalizedName: string;
  EnglishName: string;
}

interface GeoPosition {
  Latitude: number;
  Longitude: number;
  Elevation: Elevation;
}

interface Elevation {
  Metric: Metric;
  Imperial: Metric;
}

interface Metric {
  Value: number;
  Unit: string;
  UnitType: number;
}

interface TimeZone {
  Code: string;
  Name: string;
  GmtOffset: number;
  IsDaylightSaving: boolean;
  NextOffsetChange: string;
}

interface AdministrativeArea {
  ID: string;
  LocalizedName: string;
  EnglishName: string;
  Level: number;
  LocalizedType: string;
  EnglishType: string;
  CountryID: string;
}

interface Region {
  ID: string;
  LocalizedName: string;
  EnglishName: string;
}
