import { Controller, Get } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('info')
  async getTokenInfo() {
    return await this.tokenService.getTokenInfo();
  }
}
