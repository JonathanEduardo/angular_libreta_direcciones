export interface Contact {
  current_page:   number;
  data:           data[];
  first_page_url: string;
  from:           number;
  last_page:      number;
  last_page_url:  string;
  links:          Link[];
  next_page_url:  string;
  path:           string;
  per_page:       number;
  prev_page_url:  null | string;
  to:             number;
  total:          number;
}

export interface data {
  id:         number;
  name:       string;
  created_at: Date;
  updated_at: Date;
}

export interface Link {
  url:    null | string;
  label:  string;
  active: boolean;
}
