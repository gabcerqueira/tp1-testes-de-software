import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';

//Validação de rotas autorizadas pelo token jwt e validação
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //constructor(private readonly influxdb: InfluxdbService)
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return payload;
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
