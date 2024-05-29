export interface ContactDetail {
  res:  string;
  data: Data;
}

export interface Data {
  id:            number;
  name:          string;
  created_at:    Date;
  updated_at:    Date;
  phone_numbers: InfoContact[];
  emails:        InfoContact[];
  addresses:     InfoContact[];
}

export interface InfoContact {
  id:            number;
  contact_id:    number;
  address?:      string;
  created_at?:    Date;
  updated_at?:    Date;
  email?:        string;
  phone_number?: string;
}
