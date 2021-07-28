import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ToDoDto } from '../models/todo';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addTodo should add a new todo', () => {
    service.addTodo('foo');

    service._todos.subscribe((data) => {
      expect(data.length).toEqual(1);
      expect(data[0].name).toEqual('foo');
    });
  });

  describe('removeTodo', () => {
    const todoList = [
      {
        id: 1,
        name: 'foo',
      },
      {
        id: 2,
        name: 'bar',
      },
    ] as ToDoDto[];

    it('should remove todo item according Id', () => {
      service['todos$'].next(todoList);
      service.removeTodo(1);
      service._todos.subscribe((data) => {
        expect(data).toEqual([todoList[1]]);
      });
    });
  });
});
