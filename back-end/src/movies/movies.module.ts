import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }),
  UserModule],
  providers: [MoviesService, MoviesResolver]
})
export class MoviesModule {}
