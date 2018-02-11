import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';

import { routedComponents, JsonEditorRoutingModule } from './json_editor-routing.module';
import {DropDownComponent} from '../component/dropdown/dropdown'


@NgModule({
  imports: [SharedModule, JsonEditorRoutingModule],
  declarations: [routedComponents, DropDownComponent]
})
export default class InputViewModule {}
