import { TodoStatus } from './../../../constants/enum';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class TodoDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  status?: TodoStatus;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  completeAt?: Date;
}
