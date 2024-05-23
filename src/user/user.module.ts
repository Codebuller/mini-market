import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MariaModule } from 'src/maria/maria.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    forwardRef(()=>AuthModule),
    MariaModule
  ],
  exports:[UserService]
})
export class UserModule {}
