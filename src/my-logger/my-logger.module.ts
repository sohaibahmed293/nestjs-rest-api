import { ConsoleLogger, Module } from '@nestjs/common';
import { MyLoggerService } from './my-logger.service';

@Module({
    providers: [MyLoggerService],
    exports: [MyLoggerService]
})
export class MyLoggerModule extends ConsoleLogger {
}
