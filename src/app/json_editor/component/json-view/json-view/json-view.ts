import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {style} from '@angular/animations';

import * as J from 'app/util/json_parser/json_base'

@Component({
  selector: 'json-view', //ディレクティブのタグ名
  styles: [``],
  templateUrl: './json-view.html', //htmlテンプレートの読み込み
  styleUrls: [ '../json-view.css' ]
})
export class JsonView implements OnInit {
  @Input() padding: number = 0;
  @Input() jsonValue: J.JBase = new J.JBase()
  @Input() isOpen: boolean = true;

  
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.info(this.jsonValue)
    console.info(this.jsonValue instanceof J.JArray)
  }

  isJsonArray = () => this.jsonValue instanceof J.JArray
  isJsonObject = () => this.jsonValue instanceof J.JMember
  isJsonPair = () => this.jsonValue instanceof J.JPair
  isJsonStr = () => this.jsonValue instanceof J.JStr
  isJsonNum = () => this.jsonValue instanceof J.JNum
  isJsonBool = () => this.jsonValue instanceof J.JBool

  getBrastr(): String {
      return "{"
  }
  getBraend(): String {
    return "}"
  }

  isEqual = (a: any, b: any) => a === b
}
