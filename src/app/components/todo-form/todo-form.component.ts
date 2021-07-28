import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.sass'],
})
export class TodoFormComponent {
  todoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoForm = fb.group({
      name: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(255)]),
      ],
    });
  }

  onSubmit() {
    if (this.todoForm.invalid) {
      return;
    }

    // reset to init state
    this.todoForm.reset();
    debugger;
  }
}
