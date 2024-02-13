export interface Group {
  id: number;
  name: string;
  image: string;
  description: string;
  created_by_id: number;
  updated_by_id: number;
  services: Service[];
  locations: GroupLocation[];
}

interface Service {
  title: string;
  description: string;
}

export interface GroupLocation {
  email: string[];
  phoneNumbers: string[];
  address: string;
  coords: number[];
}
