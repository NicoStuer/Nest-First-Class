import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Tracks } from './tracks.interface';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getTraks(): Promise<Tracks[]> {
    return this.tracksService.getTracks();
  }

  @Get('/:id')
  getTrackById(@Param('id') id: number): Promise<Tracks> {
    return this.tracksService.getTrackById(id);
  }

  @Post()
  createTrack(@Body() body): Promise<any> {
    return this.tracksService.createTrack(body);
  }

  @Delete('/:id')
  deleteTrackById(@Param('id') id: number): Promise<void> {
    return this.tracksService.deleteTrackById(id);
  }
}
