import { TodoDto } from './dto/todo.dto';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';
import { Repository } from 'typeorm';
import { TodoStatus } from 'src/constants/enum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}
  private readonly logger = new Logger();

  async getTodos(query?: string) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const response: TodoDto[] =
      query === 'status'
        ? await this.getTodosByStatus()
        : await this.getTodosByDate();
    console.log(2);
    return response;
  }

  async getTodosByStatus() {
    const response: TodoDto[] = await this.todoRepository.find({
      order: {
        status: 'DESC',
      },
    });
    return response;
  }

  async getTodosByDate() {
    const response: TodoDto[] = await this.todoRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    return response;
  }

  async getTodo(id: number) {
    try {
      const response = await this.todoRepository.findOne(id);
      return response;
    } catch (error) {
      throw new HttpException(
        'Get Todo Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createTodo(message: string) {
    try {
      const data: TodoDto = this.todoRepository.create({
        message,
        status: TodoStatus.TODO,
      });
      const todo = await this.todoRepository.save(data);
      return { success: true, todo };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Create Todo Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateTodo(id: number, body: TodoDto) {
    const { message, status } = body;
    const todo = await this.getTodo(id);
    if (!todo) throw new HttpException('Todo Not Found', HttpStatus.NOT_FOUND);
    try {
      const result = message
        ? await this.updateTodoMessage(id, message)
        : await this.updateTodoStatus(id, status);
      return result;
    } catch (error) {
      throw new HttpException(
        'Update Todo Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateTodoStatus(id: number, status: TodoStatus) {
    const result = await this.todoRepository.update(id, {
      status: status,
    });
    return { success: !!result.affected, status: status };
  }

  async updateTodoMessage(id: number, message: string) {
    const result = await this.todoRepository.update(id, {
      message: message,
    });
    return { success: !!result.affected };
  }

  async hide(id: number) {
    try {
      await this.todoRepository.softDelete(id);
      return { success: true };
    } catch (error) {
      throw new HttpException(
        'Hide Todo Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteTodo(id: number) {
    try {
      const result = await this.todoRepository.delete(id);
      return { success: !!result.affected };
    } catch (error) {
      throw new HttpException(
        'Delete Todo Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
