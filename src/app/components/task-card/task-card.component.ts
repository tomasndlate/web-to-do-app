import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {

  task: Task | null = null;

  inputTitle: string = '';
  inputDescription: string = '';
  inputDueDate: Date | null = null;

  // CONFIRM BUTTONS DEFINITIONS
  isConfirmSave: boolean = false;
  isConfirmDelete: boolean = false;
  confirmDurationSave: number = 3000;
  confirmDurationDelete: number = 6000;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tasksService: TasksService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const taskIdString = params.get('taskId');
      if (taskIdString)
        this.onRouteIdUpdate(parseInt(taskIdString));
    });

  }

  private onRouteIdUpdate(newId: number) {
    this.task = this.tasksService.getTask_ById(newId);
    if (this.task) {
      this.inputTitle = this.task.title;
      this.inputDescription = this.task.description;
      this.inputDueDate = this.task.dueDate;
    }
    console.log(this.task)
  }

  saveTask() {
    if (this.task) {
      this.tasksService.updateTask(
        this.task.id,
        this.inputTitle,
        this.inputDescription,
        this.inputDueDate,
        this.task.isChecked
      );

      this.isConfirmSave = true;
      setTimeout( () => {
        this.isConfirmSave = false;
      }, this.confirmDurationSave)
    }
  }

  deleteTask() {
    this.isConfirmDelete = true;
    setTimeout( () => {
        this.isConfirmDelete = false;
    }, this.confirmDurationDelete);
  }

  confirmDeleteTask() {
    if (this.task) {
      this.tasksService.removeTask_ById(this.task.id);
      this.isConfirmDelete = false;
      this.router.navigate(['/tasks']);
    }
  }

}
