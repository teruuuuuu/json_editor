import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JsonEditorPage } from '../page/index';

const routes: Routes =  [
    { path: '',    component: JsonEditorPage }
];
export const routedComponents = [ JsonEditorPage];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsonEditorRoutingModule {}
