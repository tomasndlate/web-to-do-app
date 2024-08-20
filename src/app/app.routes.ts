import { Routes } from "@angular/router";
import { TaskCardComponent } from "./components/task-card/task-card.component";
import { TasksPageComponent } from "./pages/tasks/tasks-page.component";

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    loadChildren: () => import('./pages/tasks/tasks-page.module').then(module => module.TasksPageModule)
  },
  {
    path: '**',
    redirectTo: 'tasks'
  }
]
