// Nest JS
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

// Utils
import { errorSchema } from 'src/utils/app/error-schema';

// Entities
import { UserEntity } from './entities/user.entity';

// Services
import { UserService } from './user.service';

// Types
import { AuthorizationHeader } from 'src/types/common.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // ============================================= GET USER BY ID =============================================
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User Retrieved Successfully',
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
    schema: errorSchema(HttpStatus.INTERNAL_SERVER_ERROR),
  })
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.getUserFromDB({ where: { id } });
  }
}
