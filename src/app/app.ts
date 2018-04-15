import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// コンポーネントとURLを関連づける
const routes: Routes = [
  { path: '', redirectTo: 'json_editor', pathMatch: 'full'},
  { path: 'json_editor', loadChildren: 'app/json_editor/module/json_editor.module'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppComponent {}
