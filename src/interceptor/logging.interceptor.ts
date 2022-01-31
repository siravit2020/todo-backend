import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const receiveTime = Date.now();
    return next.handle().pipe(
      tap(() =>
        this.logger.log(
          JSON.stringify({
            request: {
              medthod: req.method,
              url: req.url,
              param: req.query,
              body: req.body,
            },
            response: {
              status: statusCode,
              time: Date.now() - receiveTime,
            },
          }),
        ),
      ),
    );
  }
}
