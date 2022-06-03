import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateTodoDto } from './dto';
import { TodosService } from './services/todos.service';
import { Todo } from './interfaces/todo.interfaces';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  async createProduct(@Res() response, @Body() todo: Todo) {
    const newProduct = await this.todosService.create(todo);
    return response.status(HttpStatus.CREATED).json({
      newProduct,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const todos = await this.todosService.findAll();
    return response.status(HttpStatus.OK).json({
      todos,
    });
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() todo: Todo) {
    const updatedProduct = await this.todosService.update(id, todo);
    return response.status(HttpStatus.OK).json({
      updatedProduct,
    });
  }
}
