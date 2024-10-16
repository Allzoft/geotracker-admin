import { Device } from './device';
import { User } from './user';
export enum TypeState {
  RASTREO = 'Rastreo',
}

export enum TypeURLTracker {
  PERSONAS_CERCANAS = 'Personas cercanas',
  GOOGLE_DRIVE = 'Google drive',
  GRUPO_DE_WHATSAPP_FALSO = 'Grupo de whatsapp falso',
  GRUPO_DE_WHATSAPP_REAL = 'Grupo de whatsapp real',
  GRUPO_DE_TELEGRAM = 'Grupo de telegram',
  ZOOM = 'Z oom',
  GOOGLE_RECAPTCHA = 'Google recaptcha',
}

export interface Tracker {
  id_tracker: number;
  stateIdState: number;
  deviceIdDevice: number;
  type_url: TypeURLTracker;
  os: string;
  platform: string;
  cpuCores: number;
  ram: number;
  gpuVendor: string;
  gpu: string;
  resolution: string;
  browser: string;
  publicIp: string;
  continent: string;
  country: string;
  created_by_user: number;
  region: string;
  city: string;
  tracker_date: Date;
  org: string;
  isp: string;
  latitude: string;
  longitude: string;
  accuracy: string;
  altitude: string;
  direction: string;
  speed: string;
  device?: Device;
  status?: number;
  user?: User;
  state?: State;
  created_at?: Date;
  updated_at?: Date;
}

export interface State {
  id_state: number;
  name: string;
  type: TypeState;
  priority: number;
  color: string;
  status: number;
  created_at: Date;
  updated_at: Date;
  trackers: Tracker[];
}
