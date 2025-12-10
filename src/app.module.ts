import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://adniadni04_db_user:adniadni04_db_user@cluster0.z2nxrca.mongodb.net/socials_db?appName=Cluster0',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
