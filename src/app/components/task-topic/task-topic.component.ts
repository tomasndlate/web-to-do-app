import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-topic',
  templateUrl: './task-topic.component.html',
  styleUrls: ['./task-topic.component.css']
})
export class TaskTopicComponent {

  @ViewChild('checkbox') checkbox!: ElementRef<HTMLInputElement>;

  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() dueDate!: Date;
  @Input() isChecked: boolean = false;

  constructor(private tasksService: TasksService) {}

  ngAfterViewInit() {
    if (this.checkbox) {
      this.checkbox.nativeElement.checked = this.isChecked;
    }
  }

  updateCheckedValue() {
    this.tasksService.updateTask_Checked(this.id, this.checkbox.nativeElement.checked);
  }
}
