import { NgModule }             from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';

import { routedComponents, JsonEditorRoutingModule } from './json_editor-routing.module';
import {DropDownComponent} from '../component/dropdown/dropdown'
import {JsonViewContent} from '../component/json-view/json-view-content'
import {JsonView} from '../component/json-view/json-view/json-view'
import {JsonArrayView} from '../component/json-view/json-array-view/json-array-view'
import {JsonObjectView} from '../component/json-view/json-object-view/json-object-view'
import {JsonPairView} from '../component/json-view/json-pair-view/json-pair-view'
import {JsonStrView} from '../component/json-view/json-str-view/json-str-view'
import {JsonNumView} from '../component/json-view/json-num-view/json-num-view'
import {JsonEdit} from '../component/json-edit/json-edit'


@NgModule({
  imports: [SharedModule, JsonEditorRoutingModule],
  declarations: [routedComponents, DropDownComponent, JsonViewContent, JsonView, JsonArrayView, 
    JsonObjectView, JsonPairView, JsonStrView, JsonNumView, JsonEdit]
})
export default class InputViewModule {}
