export type GristProjectType = {
  visual?: string
  title: string
  subtitle: string | null | undefined
  localization: string
  geocoding?: { lat: number; long: number }
  localizationDescription?: string | null | undefined
  program?: string | null | undefined
  themes?: string[]
  objectives?: string
  specificities?: string
  description?: string
  budget?: number
  calendar?: string
  investors?: string
  localActorQuotes?: Quote[]
  investorQuotes?: Quote[]
  createdAt: string
}

type Quote = {
  image: string
  name: string
  text: string
}


export type DrupalProjectType =  {
  drupal_internal__nid: number;
  drupal_internal__vid: number;
  langcode: string;
  revision_timestamp: string;
  revision_log?: null;
  status: boolean;
  title: string;
  created: string;
  changed: string;
  promote: boolean;
  sticky: boolean;
  default_langcode: boolean;
  revision_translation_affected: boolean;
  metatag?: null;
  path: Path;
  field_agenda_txtfs?: FieldAgendaTxtfs | null;
  field_department_city_txtps?: string | null;
  field_description_txtps?: string | null;
  field_display_update_date: boolean;
  field_funding_txtpl?: string | null;
  field_geocoding?: FieldGeocoding | null | undefined;
  field_label_txt: string;
  field_localization_txtps?: string | null;
  field_metatags?: null;
  field_program_title_txtps?: string | null;
  field_program_txtps?: string | null;
  field_teaser_txtps?: string | null;
}
export interface Path {
  alias: string;
  pid: number;
  langcode: string;
}
export interface FieldGeocoding {
  address_name: string;
  street: string;
  zipcode: string;
  city: string;
  country: string;
  additional: string;
  lat: number;
  lon: number;
  feature: string;
}

export interface FieldAgendaTxtfs {
  value: string;
  format: string;
  processed: string;
}
