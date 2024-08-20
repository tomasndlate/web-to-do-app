import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksPageComponent } from './tasks-page.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';
import { TasksRoutes } from './tasks-page.routes';

@NgModule({
  declarations: [TasksPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild(TasksRoutes)
  ],
  exports: [TasksPageComponent]
})
export class TasksPageModule { }
