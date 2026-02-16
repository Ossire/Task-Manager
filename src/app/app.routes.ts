import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Taskdetail } from './components/taskdetail/taskdetail';
import { Tasklist } from './components/tasklist/tasklist';
import { Errorpage } from './components/errorpage/errorpage';
import { Notfoundpage } from './components/notfoundpage/notfoundpage';
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'tasklist', component: Tasklist },
  { path: 'tasklist/:id', component: Taskdetail },
  { path: '**', component: Notfoundpage },
];
