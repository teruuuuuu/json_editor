import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {Observable} from "rxjs/Observable";

import {JsonNumArray } from "../model/back/json-num-array"
import {JsonNumValue } from "../model/back/json-num-value"
import {JsonStrValue } from "../model/back/json-str-value"
import {JsonStrArray } from "../model/back/json-str-array"
import {JsonValue } from "../model/back/json-value"
import {JsonValueArray } from "../model/back/json-value-array"

import * as J from "app/util/json_parser/json_base"

import * as P from '../../util/parser/parser-genrator'
// import {StringParser} from "../parser/string-parser"
import { ParserError } from '@angular/compiler';
// import { ParseSuccess, ParseResult } from '../parser/parser-result';

import {jsonParse} from '../../util/json_parser/json_parser'

@Component({
  selector: 'json_editor', //ディレクティブのタグ名
  templateUrl: './index.html', //htmlテンプレートの読み込み
  styleUrls: [ './index.css' ]
})
export class JsonEditorPage implements OnInit {
  jsonValue: J.JBase = new J.JArray([])
  jsonStr: string = ""

  initVal():void {
    this.parseTest()
  }

  parseTest():void {
    // const str ='[1,2,{"1":[1,2,"a"]},"3", [ -5, [{"a": "b", "c": [1, 2, -32.3]}] ] ]'
    // const str = '[1,[2,3],4,{"5": [6]}]'
    const str = '[1,{"2":[3]},[-4, [{"5": [7,8]}]]]'
    // const str ='[{"1": [2]}]'
    this.jsonValue = jsonParse(str)
    
  }

  parse = () => {
    var ret = "";
    const a = document.getElementsByClassName("jsoneditor")[0].getElementsByTagName("span")
    for(var i = 0; i < a.length; i++){
      ret += a[i].innerHTML;
    }
    console.info(ret)
    this.jsonValue = jsonParse(ret)
    // location.reload()
    this.jsonValue = new J.JArray([])
    this.chRef.detectChanges()
  }

  constructor(
    // urlパラメータを取得するのに必要
    private route: ActivatedRoute,
    private chRef: ChangeDetectorRef) {
      this.initVal()
    }
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {  });
  }
}
