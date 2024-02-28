export interface Funeraria {
  id: number;
  name: string;
  subTitle: string;
  image: string;
  deaths: FunerariaDeath[];
  description: string;
  created_by_id: number;
  updated_by_id: number;
  serviceDescription: string;
  services: FunerariaService[];
  contacts: FunerariaContacts;
  locations: FunerariaLocation[];
  qas: FunerariaQA[];
}

export interface FunerariaDeath {
  image: string;
  name: string;
  date: string;
}

export interface FunerariaService {
  title: string;
  description: string;
  image: string;
}

export interface FunerariaContacts {
  email: string[];
  phoneNumbers: string[];
  fixPhoneNumbers: string[];
}

export interface FunerariaLocation {
  address: string;
  coords: number[];
}

export interface FunerariaQA {
  question: string;
  answer: string;
}
