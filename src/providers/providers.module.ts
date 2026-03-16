import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_IN, JWT_KEY } from 'src/auth/constants/jwt.constants';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provider]),
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: {
        expiresIn: EXPIRES_IN,
      },
      global: true,
    }),
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService, AuthGuard],
})
export class ProvidersModule {}
