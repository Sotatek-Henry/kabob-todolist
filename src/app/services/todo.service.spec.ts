import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ToDoDto } from '../models/todo';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  const todoList = [
    {
      id: 1,
      name: 'foo',
      selected: false,
    },
    {
      id: 2,
      name: 'bar',
      selected: true,
    },
  ] as ToDoDto[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
    service['todos$'].next([]);
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

  it('removeTodo should remove todo item according Id', () => {
    service['todos$'].next(todoList);
    service.removeTodo(1);
    service._todos.subscribe((data) => {
      expect(data).toEqual([todoList[1]]);
    });
  });

  it("toggleSelected should toggle todo's selected property", fakeAsync(() => {
    service['todos$'].next(todoList);
    service.toggleSelected(1);
    service.toggleSelected(2);

    flushMicrotasks();

    service._todos.subscribe((data) => {
      expect(data[0].selected).toEqual(true);
      expect(data[1].selected).toEqual(false);
    });
  }));
});
