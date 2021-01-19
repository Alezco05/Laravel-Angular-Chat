import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},

  {path: 'login', component:LoginComponent},

  {path: 'chat', component:ChatComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
