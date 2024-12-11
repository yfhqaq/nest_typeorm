import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: "mysql", // 使用mysql类型
      host: "localhost",
      port: 3306,
      username: "root",
      password: "yang", // 设置你的密码
      database: "practice", // 数据库名
      synchronize: true,
      logging: true,
      entities: [User], // 实体类
      migrations: [],
      subscribers: [],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
