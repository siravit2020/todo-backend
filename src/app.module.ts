import { TodoModule } from './modules/todo/todo.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: null,
      database: 'todo_db',
      synchronize: true,
      entities: ['dist/entities/*.entity{.ts,.js}'],
      timezone: 'utc',
    }),
    TodoModule,
  ],
})
export class AppModule {}
