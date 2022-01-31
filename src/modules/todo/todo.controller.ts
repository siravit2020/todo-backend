import { TodoDto } from './dto/todo.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('create')
  async create(@Body(new ValidationPipe()) body: TodoDto) {
    return await this.todoService.createTodo(body.message);
  }

  @Put('update/:id')
  async updateStatus(
    @Param('id') id: number,
    @Body(new ValidationPipe()) body: TodoDto,
  ) {
    console.log(body);
    return await this.todoService.updateTodo(id, body);
  }

  @Get('all')
  async getTodos(@Query('queryType') query: string) {
    return await this.todoService.getTodos(query);
  }

  @Delete('delete/:id')
  async deleteTodo(@Param('id') id: number) {
    return await this.todoService.deleteTodo(id);
  }
}
