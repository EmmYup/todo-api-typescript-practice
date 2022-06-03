import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from '../schemas/todo.schema';
// import { Todo } from '../interfaces/todo.interfaces';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(Todo: Todo): Promise<Todo> {
    const newTodo = new this.todoModel(Todo);
    return newTodo.save();
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoModel.find().exec();
  }

  async update(id, Todo: Todo): Promise<Todo> {
    return await this.todoModel.findByIdAndUpdate(id, Todo, { new: true });
  }
}
