import { Headers, Controller, Get, Inject, Res, Session, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginGuard } from './login.guard';
@Controller()
export class AppController {
  @Inject(JwtService)
  private jwtService: JwtService;
  constructor(private readonly appService: AppService) { }
  @Get('aaa')
  @UseGuards(LoginGuard)
  aaa() {
      return 'aaa';
  }
  
  @Get('bbb')
  @UseGuards(LoginGuard)
  bbb() {
      return 'bbb';
  }
  @Get()
  getHello(): Promise<string> {
    return this.appService.getHello();
  }
  @Get('ttt')
  ttt(@Headers('authorization') authorization: string, @Res({ passthrough: true }) response: Response) {
    if (authorization) {
      try {
        const token = authorization.split(' ')[1];
        const data = this.jwtService.verify(token);

        const newToken = this.jwtService.sign({
          count: data.count + 1
        });
        response.setHeader('token', newToken);
        return data.count + 1
      } catch (e) {
        console.log(e);
        throw new UnauthorizedException();
      }
    } else {
      const newToken = this.jwtService.sign({
        count: 1
      });

      response.setHeader('token', newToken);
      return 1;
    }
  }

  @Get('sss')
  sss(@Session() session) {
    console.log(session)
    session.count = session.count ? session.count + 1 : 1;
    return session.count;
  }
}
