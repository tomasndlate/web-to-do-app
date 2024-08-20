import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private currentTasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor() {
    this.currentTasks = JSON.parse(localStorage.getItem('currentTasks') || '[]');
    this.emitUpdatedTasks();
  }

  addTask(title: string): number {
    const taskId = this.generateId();
    const newTask: Task = {
      id: taskId,
      title: title,
      description: '',
      dueDate: null,
      isChecked: false
    };
    this.currentTasks.push(newTask);
    this.emitUpdatedTasks();
    return taskId;
  }

  removeTask_ById(taskId: number) {
    this.currentTasks = this.currentTasks.filter(task => task.id != taskId);
    console.log(taskId)
    console.log(`title: ${this.currentTasks}`)
    console.log()
    this.emitUpdatedTasks();
  }

  updateTask(taskId: number, title: string, description: string, dueDate: Date | null, isChecked: boolean) {
    for (let task of this.currentTasks) {
      if (task.id === taskId) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.isChecked = isChecked;
        console.log(task)
      }
    }
    this.emitUpdatedTasks()
  }

  updateTask_Checked(taskId: number, checkedValue: boolean) {
    for (let task of this.currentTasks) {
      if (task.id === taskId) {
        task.isChecked = checkedValue;
        this.emitUpdatedTasks();
      }
    }
  }

  getTask_ById(taskId: number): Task | null {
    for (let task of this.currentTasks) {
      if (task.id === taskId) {
        return task;
      }
    }
    return null;
  }

  private emitUpdatedTasks() {
    localStorage.setItem('currentTasks', JSON.stringify(this.currentTasks));
    this.tasksSubject.next(this.currentTasks);
  }

  private generateId(): number {
    let currentId = parseInt(localStorage.getItem('currentId') || '0');
    currentId += 1;
    localStorage.setItem('currentId', currentId.toString());
    return currentId;
  }
}
