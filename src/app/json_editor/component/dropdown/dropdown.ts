import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


import {JsonValue} from '../../model/json-value'

@Component({
  selector: 'drop-down', //ディレクティブのタグ名
  templateUrl: './dropdown.html', //htmlテンプレートの読み込み
  styleUrls: [ './dropdown.css' ]
})
export class DropDownComponent implements OnInit {

  @Input() jsonValue: JsonValue = new JsonValue(new Map());

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.info(this.jsonValue)
  }

  isJsonNumArray = (jsonValue: JsonValue) => jsonValue.c === "JsonNumArray"
  isJsonNumValue = (jsonValue: JsonValue) => jsonValue.c === "JsonNumValue"
  isJsonStrArray = (jsonValue: JsonValue) => jsonValue.c === "JsonStrArray"
  isJsonStrValue = (jsonValue: JsonValue) => jsonValue.c === "JsonStrValue"
  isJsonValueArray = (jsonValue: JsonValue) => jsonValue.c === "JsonValueArray"
  isJsonValue = (jsonValue: JsonValue) => jsonValue.c === "JsonValue"
  
}
