import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToDoDto } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos$ = new BehaviorSubject<ToDoDto[]>([]);
  readonly _todos: Observable<ToDoDto[]>;

  constructor() {
    this._todos = this.todos$.asObservable();
  }

  get todos(): ToDoDto[] {
    return this.todos$.value;
  }

  addTodo(name: string): void {
    const newTodo = new ToDoDto(name);
    this.todos$.next([...this.todos, newTodo]);
  }

  removeTodo(id: number): void {
    const todos = this.todos.filter((todo) => todo.id !== id);
    this.todos$.next(todos);
  }
}
