import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private _http: HttpClient) { }


  private getApiTodo() {
    return 'https://jsonplaceholder.typicode.com/todos'
  }

  public getTodos() {
    return this._http.get<any[]>(this.getApiTodo().toString());
  }

  public addTodo(todo: any) {
    return this._http.post<any>(this.getApiTodo().toString(), todo);
  }

  public updateTodo(todo: any) {
    return this._http.put<any>(this.getApiTodo().toString().concat('/' + todo.id), todo);
  }

  public deleteTodo(codigoTodo: number) {
    return this._http.delete<void>(this.getApiTodo().toString().concat('/' + codigoTodo));
  }
}
