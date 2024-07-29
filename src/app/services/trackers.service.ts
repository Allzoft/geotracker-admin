import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Tracker } from '@interfaces/tracker';
import { environment } from '../environments/environment';
import { Observable, tap } from 'rxjs';
import moment from 'moment';

interface State {
  trackers: Tracker[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TrackersService {
  public env = environment;

  private http = inject(HttpClient);

  #state = signal<State>({
    loading: true,
    trackers: [],
  });

  public trackers = computed(() => this.#state().trackers);
  public loading = computed(() => this.#state().loading);

  public postTracker(tracker: Partial<Tracker>): Observable<Tracker> {
    return this.http
      .post<Tracker>(`${this.env.url_api}/trackers`, tracker)
      .pipe(
        tap((resTracker) => {
          const oldTracker = this.#state().trackers;
          oldTracker.push(resTracker);
          this.#state.set({
            loading: false,
            trackers: oldTracker,
          });
        })
      );
  }

  public getTrackers(dateStart: Date, dateEnd: Date): void {
    this.#state.set({
      loading: true,
      trackers: this.#state().trackers,
    });
    const filterStart = moment(dateStart).format('YYYY-MM-DD');
    const filterEnd = moment(dateEnd).format('YYYY-MM-DD');
    this.http
      .get<Tracker[]>(
        `${this.env.url_api}/trackers/bydates/${filterStart}/${filterEnd}`
      )
      .subscribe(
        (res) => {
          this.#state.set({
            loading: false,
            trackers: res,
          });
          localStorage.setItem(
            'trackers',
            JSON.stringify(this.#state().trackers)
          );
        },
        (error) => {
          this.#state.set({
            loading: false,
            trackers: [],
          });
        }
      );
  }

  public getOneTracker(id: number): Observable<Tracker> {
    return this.http.get<Tracker>(`${this.env.url_api}/trackers/${id}`);
  }

  public deleteTracker(id: number) {
    return this.http.delete(`${this.env.url_api}/trackers/${id}`).pipe(
      tap((_) => {
        this.#state.set({
          loading: false,
          trackers: this.trackers().filter((i) => i.id_tracker !== id),
        });
      })
    );
  }

  public updateTracker(id: number, tracker: Partial<Tracker>) {
    return this.http
      .patch<Tracker>(`${this.env.url_api}/trackers/${id}`, tracker)
      .pipe(
        tap((resTracker) => {
          const oldTracker = this.#state().trackers;
          const index = oldTracker.findIndex(
            (i) => i.id_tracker === resTracker.id_tracker
          );
          oldTracker[index] = resTracker;
          this.#state.set({
            loading: false,
            trackers: oldTracker,
          });
        })
      );
  }

  public updateTrackers(trackers: Tracker[]) {
    this.#state.set({
      loading: false,
      trackers,
    });
  }
}
