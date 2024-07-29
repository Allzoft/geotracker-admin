import { Device } from './device';
import { User } from './user';
export enum TypeState {
  RASTREO = 'Rastreo',
}
export interface Tracker {
  id_tracker: number;
  stateIdState: number;
  deviceIdDevice: number;
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
  org: string;
  isp: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: string;
  direction: string;
  speed: string;
  device?: Device;
  status?: number;
  user?: User;
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
