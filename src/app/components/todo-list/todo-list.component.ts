import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoDto } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass'],
})
export class TodoListComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  get todos$(): Observable<ToDoDto[]> {
    return this.todoService._todos;
  }

  remove(item: ToDoDto): void {
    this.todoService.removeTodo(item.id);
  }

  toggleSelect(item: ToDoDto): void {
    this.todoService.toggleSelected(item.id);
  }

  trackByFn(_, item: ToDoDto) {
    return item.id;
  }
}
