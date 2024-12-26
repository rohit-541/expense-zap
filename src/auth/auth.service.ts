import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService implements CanActivate{
    constructor(private jwtService:JwtService){}

    async canActivate(context: ExecutionContext):Promise<boolean>{
        const request = context.switchToHttp().getRequest();

        const token = request.headers.authorization;
        if(!token){
            throw new UnauthorizedException('Unauthorized');
        }
        try {
            const result = await this.jwtService.verifyAsync(token,{
                secret:process.env.SECRETKEY
            })
            request.email = result.email; 
            return result;
        } catch (error) {
            throw new UnauthorizedException("Invalid Token");
        }
    }
}

