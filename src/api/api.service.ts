import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpService,
    private configService: ConfigService,
  ) {}

  headersRequest = {
    'Content-Type': 'application/json', // afaik this one is not needed
    Authorization: `Bearer ${this.configService.get<string>('THEMOVIEDB_ACCESSTOKEN')}`,
  };

  async getCurrentMoviePlaying() {
    return this.http
      .get(
        `${this.configService.get<string>('THEMOVIEDB_URI')}movie/now_playing?language=en-US&page=1`,
        { headers: this.headersRequest },
      )
      .pipe(map((res) => res.data?.results))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }
}
