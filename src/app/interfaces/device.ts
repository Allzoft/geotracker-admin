import { User } from "./user";

export enum TypeDevice {
  PERFIL_DE_FACEBOOK = 'Perfil de facebook',
  CUENTA_DE_WHATSAPP = 'Cuenta de whatsapp',
  CUENTA_DE_TELEGRAM = 'Cuenta de telegram',
  OTRO = 'Otro',
}

export interface Device {
  id_device:number;
  name:string;
  created_by_user:number;
  type_device: TypeDevice;
  info: string;
  user?: User
}
