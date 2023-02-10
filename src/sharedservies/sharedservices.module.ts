import { CacheModule, Module, Redirect } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt"
import { RedisClientOptions, RedisClientType, RedisFunctions, RedisModules } from '@redis/client';
import { RedisStore, redisStore } from 'cache-manager-redis-store';
import { config } from 'process';
import { RedisScripts } from 'redis';
import { Broadcaster } from 'typeorm/subscriber/Broadcaster';

@Module({ 
    imports: [
        JwtModule.register({
            secret: 'secrete',
            signOptions: {expiresIn: '1d'}
          }),
          CacheModule.register<any>({
            Store:  redisStore,
            host: 'localhost',
            port: 6379,
          }),
    ],
    exports: [JwtModule]
})
export class SharedservicesModule {
}
