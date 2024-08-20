import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent {

  @ViewChild('newTaskInput') newTaskInput!: ElementRef<HTMLDivElement>;

  tasksList: Task[] = [];

  newTaskTitle: string = '';

  constructor(private tasksService: TasksService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks(){
    this.tasksService.tasks$.subscribe({
      next: (tasks) => {
        tasks.sort( (a, b) => {
          if (a.dueDate === null) return -1;
          if (b.dueDate === null) return 1;
          if (typeof a.dueDate === 'string' && typeof b.dueDate === 'string')
            return Date.parse(a.dueDate) - Date.parse(b.dueDate);
          return a.dueDate.getTime() - b.dueDate.getTime();
        } )
        this.tasksList = tasks;
        console.log(this.tasksList)
      },
      error: err => console.error('An error occurred :', err),
    })
  }

  addTask(){
    const taskId = this.tasksService.addTask(this.newTaskTitle);
    this.newTaskTitle = '';
    this.router.navigate(['/tasks', taskId]);
  }

  addTask_ByEnter() {
    if (this.newTaskTitle.length > 0) {
      this.addTask();
      this.newTaskInput.nativeElement.blur()
    }
  }

  isEqualDateAsPrevious(index: number): boolean{
    if (index === 0) return false;

    const currentTaskDate = this.tasksList[index].dueDate;
    const previousTaskDate = this.tasksList[index - 1].dueDate;

    if (currentTaskDate === previousTaskDate) return true;

    if (currentTaskDate != null && previousTaskDate != null) {

      const currentTaskMonth = new Date(currentTaskDate).getMonth();
      const previousTaskMonth = new Date(previousTaskDate).getMonth();

      if (currentTaskMonth === previousTaskMonth) return true;
    }
    return false;
  }

  getMonthOfTask(index: number): string {
    const currentTaskDateRaw = this.tasksList[index].dueDate;

    if (currentTaskDateRaw != null) {

      const currentTaskDate = new Date(currentTaskDateRaw);
      const formatter = new Intl.DateTimeFormat('en-US', { month: 'long' });

      return formatter.format(currentTaskDate);
    }

    return 'System Error'
  }
}
