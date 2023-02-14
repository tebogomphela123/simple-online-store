import { CacheModule,
         Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt"
import * as redisStore  from 'cache-manager-redis-store';

@Module({ 
    imports: [
        JwtModule.register({
            secret: 'secrete',
            signOptions: {expiresIn: '1d'}
          }),
          CacheModule.register<any>({
            store: redisStore,
            host: 'redis',
            ttl: 1800,
            port: 6479,
          }),
    ],
    exports: [JwtModule, CacheModule]
})
export class SharedservicesModule {
}
