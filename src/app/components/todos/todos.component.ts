import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

interface TODO {
  userId?: number,
  id?: number,
  title: string,
  completed: boolean;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  public novoTodo = '';
  public retornoTodo: TODO = {
    title: '',
    completed: false
  }
  public todosAdicionados: TODO[] = [];
  public todos: TODO[] = [];

  constructor(private _todoService: TodoService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    if (this.novoTodo) this.todosAdicionados.unshift(this.retornoTodo);
    this._todoService.getTodos().subscribe(todos =>
      this.todos = this.todosAdicionados.concat(todos)
    );
  }

  public addTodo() {
    let todo: TODO = {
      userId: 1,
      title: this.novoTodo,
      completed: false
    }

    this._todoService.addTodo(todo).subscribe((data) => {
      this.retornoTodo = data;
      this.loadData();
      this.novoTodo = '';
    });
  }

  public updateTodo(todo: TODO, completed: boolean) {
    todo.completed = completed;
    this._todoService.updateTodo(todo).subscribe();
  }

  public deleteTodo(todo: TODO) {
    this.todos.splice(this.todos.findIndex(f => f.id === todo.id), 1);
    this._todoService.deleteTodo(todo.id!).subscribe();
  }
}
