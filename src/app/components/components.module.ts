import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavSideMenuComponent } from './nav-side-menu/nav-side-menu.component';
import { TaskTopicComponent } from './task-topic/task-topic.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavSideMenuComponent,
    TaskTopicComponent,
    TaskCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    NavSideMenuComponent,
    TaskTopicComponent,
    TaskCardComponent
  ]
})
export class ComponentsModule { }
