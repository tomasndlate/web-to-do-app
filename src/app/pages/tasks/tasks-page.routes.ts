import { Routes } from "@angular/router";
import { TaskCardComponent } from "src/app/components/task-card/task-card.component";
import { TasksPageComponent } from "./tasks-page.component";

export const TasksRoutes: Routes = [
  {
    path: '',
    component: TasksPageComponent,
    children: [
      {
        path: ':taskId',
        component: TaskCardComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },
]
