export interface EventRequestDto {
  Name: string;
  EventTypeId: number;
  ModalityId: number;
  VirtualPlatformLink?: string | null;
  StartDate: string | Date; // ISO string o Date
  EndDate: string | Date; // ISO string o Date
  // AddressesNew: AddressDto[];
  // AddressesToDelete: number[];
  ImagesNew: UploadImage[];
  ImagesToDelete: number[];
}                                        

export interface UploadImage {
  ID?: number;
  File: File;
  Caption?: string | null;
  IsMain?: boolean;
}

export interface AddressDto {
  Id?: number;
  Line1: string;
  Line2?: string | null;
  CityId: number;
}

export interface EventResp{
  message: string;
}