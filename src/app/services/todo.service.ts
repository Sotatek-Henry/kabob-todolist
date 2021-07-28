import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToDoDto } from '../models/todo';
import { TODO_KEY } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos$ = new BehaviorSubject<ToDoDto[]>([]);
  readonly _todos: Observable<ToDoDto[]>;

  constructor() {
    this._todos = this.todos$.asObservable();
    this.handleLocalStorage();
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

  toggleSelected(id: number) {
    const todos = this.todos.map(
      (todo) =>
        ({
          ...todo,
          selected: todo.id === id ? !todo.selected : todo.selected,
        } as ToDoDto)
    );

    this.todos$.next(todos);
  }

  handleLocalStorage(): void {
    // get data from localstorage to init
    const storeData = localStorage.getItem(TODO_KEY);
    const todos = storeData ? JSON.parse(storeData) : [];

    this.todos$.next(todos);

    // listen and save data to localStorage
    this.todos$.subscribe((data) => {
      localStorage.setItem(TODO_KEY, JSON.stringify(data));
    });
  }
}
