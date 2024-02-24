interface ProfileMedia {
  id: number;
  mediable_id: number;
  mediable_type: string;
  url: string;
  name: string;
  file_name: string;
  file_type: string;
  file_size: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface VendorCardProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  properties: any; // Update this based on the actual type of properties
  profileMedia: any;
}

export interface IProfileDetails {
  vendorName: string;
  phone: string;
  password: string;
  profileMedia: any;
  image: any;
  email: string;
  properties: any;
}

export const profileDetailsInitValues: IProfileDetails = {
  vendorName: "",
  phone: "",
  image: "",
  profileMedia: '',
  password: "",
  email: "",
  properties: '',
};
