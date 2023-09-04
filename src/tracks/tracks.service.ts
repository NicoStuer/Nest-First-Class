import { Injectable } from '@nestjs/common';
import { Tracks } from './tracks.interface';

const BASE_URL = 'http://localhost:3030/tracks/';
@Injectable()
export class TracksService {
  async getTracks(): Promise<Tracks[]> {
    const res = await fetch(BASE_URL);
    const parsed = res.json();
    return parsed;
  }

  async getTrackById(id: number): Promise<Tracks> {
    const res = await fetch(BASE_URL + id);
    const parsed = await res.json();
    return parsed;
  }

  async createTrack(track: Tracks): Promise<Tracks> {
    const id = await this.setId();
    const { title, duration, artist } = track;
    const newTrack = { id, title, duration, artist };
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTrack),
    });
    const parsed = res.json();
    return parsed;
  }

  async deleteTrackById(id: number) {
    const res = await fetch(BASE_URL + id, {
      method: 'DELETE',
    });
    const parsed = await res.json();
    return parsed;
  }

  private async setId(): Promise<number> {
    const tracks = await this.getTracks();
    const id = tracks.pop().id + 1;
    return id;
  }
}
