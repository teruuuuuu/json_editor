import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {style} from '@angular/animations';

import {JsonValue} from '../../model/json-value'

@Component({
  selector: 'drop-down', //ディレクティブのタグ名
  styles: [`
    div {
      padding-left: 100px;
      color: "#F00";
    }
  `],
  templateUrl: './dropdown.html', //htmlテンプレートの読み込み
  styleUrls: [ './dropdown.css' ]
})
export class DropDownComponent implements OnInit {
  @Input() padding: number = 0;
  @Input() jsonValue: JsonValue = new JsonValue(new Map());
  @Input() isOpen: boolean = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // console.info(this.jsonValue)
    // console.info(this.padding)
  }

  isJsonNumArray = (jsonValue: JsonValue) => jsonValue.c === "JsonNumArray"
  isJsonNumValue = (jsonValue: JsonValue) => jsonValue.c === "JsonNumValue"
  isJsonStrArray = (jsonValue: JsonValue) => jsonValue.c === "JsonStrArray"
  isJsonStrValue = (jsonValue: JsonValue) => jsonValue.c === "JsonStrValue"
  isJsonValueArray = (jsonValue: JsonValue) => jsonValue.c === "JsonValueArray"
  isJsonValue = (jsonValue: JsonValue) => jsonValue.c === "JsonValue"

  paddingStr(i:number){
    return  i * 30 + "px";
  }
  
  openStatusChange(){
    this.isOpen = !this.isOpen
  }

  isChiledDisplayStyle(){
    return this.isOpen ? "" : "none";
  }

  changeVal(event:any){
    this.jsonValue.setValue(event.value)
  }
}
