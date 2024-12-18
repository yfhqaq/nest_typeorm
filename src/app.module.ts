import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { createClient } from 'redis';
import { JwtModule } from '@nestjs/jwt';
import { Permission } from './user/entities/Permission.entity';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';


@Module({
  imports: [UserModule,
    JwtModule.register({
      global: true,
      secret: 'yang',
      signOptions: {
        expiresIn: '7d'
      }
    }),
    TypeOrmModule.forRoot({
      type: "mysql", // 使用mysql类型
      host: "localhost",
      port: 3306,
      username: "root",
      password: "yang", // 设置你的密码
      database: "acl_test", // 数据库名
      synchronize: true,
      logging: true,
      entities: [
        User, Permission
      ],
      migrations: [],
      subscribers: [],
    }),
    AaaModule,
    BbbModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379
          }
        });
        await client.connect();
        return client;
      }
    }
  ],
})
export class AppModule { }
