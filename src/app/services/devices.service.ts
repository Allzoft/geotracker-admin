import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { Device } from "@interfaces/device";
import { environment } from "../environments/environment";
import { Observable, tap } from "rxjs";

interface State {
  devices: Device[],
  loading: boolean
}

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  public env = environment;

  private http = inject(HttpClient);

  #state = signal<State>({
    loading: true,
    devices: [],
  })

  public devices = computed(() => this.#state().devices);
  public loading = computed(() => this.#state().loading);

  public postDevice(device: Partial<Device>): Observable<Device> {
    return this.http.post<Device>(`${this.env.url_api}/devices`, device).pipe(
      tap((resDevice) => {
        const oldDevice = this.#state().devices;
        oldDevice.push(resDevice);
        this.#state.set({
          loading: false,
          devices: oldDevice,
        });
      })
    );
  }

  public getDevices(): void {
    this.#state.set({
      loading: true,
      devices: this.#state().devices,
    });
    this.http.get<Device[]>(`${this.env.url_api}/devices`).subscribe(
      (res) => {
        this.#state.set({
          loading: false,
          devices: res,
        });
        localStorage.setItem('devices', JSON.stringify(this.#state().devices));
      },
      (error) => {
        this.#state.set({
          loading: false,
          devices: [],
        });
      }
    );
  }


  public getOneDevice(id: number): Observable<Device> {
    return this.http.get<Device>(`${this.env.url_api}/devices/${id}`);
  }

  public deleteDevice(id: number) {
    return this.http.delete(`${this.env.url_api}/devices/${id}`).pipe(
      tap((_) => {
        this.#state.set({
          loading: false,
          devices: this.devices().filter((i) => i.id_device !== id),
        });
      })
    );
  }

  public updateDevice(id: number, device: Partial<Device>) {

    return this.http.patch<Device>(`${this.env.url_api}/devices/${id}`, device).pipe(
      tap((resDevice) => {
        const oldDevice = this.#state().devices;
        const index = oldDevice.findIndex((i) => i.id_device === resDevice.id_device);
        oldDevice[index] = resDevice;
        this.#state.set({
          loading: false,
          devices: oldDevice,
        });
      })
    );
  }

  public updateDevices(devices: Device[]) {
    this.#state.set({
      loading: false,
      devices,
    });
  }
}
