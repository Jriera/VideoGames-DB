import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { forkJoin, Observable } from 'rxjs';
import {
  APIResponse,
  Game,
  ScreenshotResponse,
  TrailerResponse,
} from '../models';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }
    return this.http.get<APIResponse<Game>>(`${environment.BASE_URL}/games`, {
      params: params,
    });
  }

  getGameScreenshots(id: number): Observable<ScreenshotResponse> {
    const gameScreenshotRequest = this.http.get<ScreenshotResponse>(
      `${environment.BASE_URL}/games/${id}/screenshots`
    );
    return gameScreenshotRequest;
  }

  getGameTrailers(id: number): Observable<TrailerResponse> {
    const gameTrailerRequest = this.http.get<TrailerResponse>(
      `${environment.BASE_URL}/games/${id}/movies`
    );
    return gameTrailerRequest;
  }

  getGameDetails(id: number): Observable<Game> {
    

    const gameInfoRequest = this.http.get<Game>(`${environment.BASE_URL}/games/${id}`);

    return gameInfoRequest;
  }
}
