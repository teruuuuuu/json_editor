import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {Observable} from "rxjs/Observable";

import {JsonNumArray } from "../model/json-num-array"
import {JsonNumValue } from "../model/json-num-value"
import {JsonStrValue } from "../model/json-str-value"
import {JsonStrArray } from "../model/json-str-array"
import {JsonValue } from "../model/json-value"
import {JsonValueArray } from "../model/json-value-array"

import * as P from '../parser/parser-genrator'
import {StringParser} from "../parser/string-parser"
import { ParserError } from '@angular/compiler';
import { ParseSuccess, ParseResult } from '../parser/parser-result';

import {jsonParse} from '../json_parser/json_parser'

@Component({
  selector: 'json_editor', //ディレクティブのタグ名
  templateUrl: './index.html', //htmlテンプレートの読み込み
})
export class JsonEditorPage implements OnInit {
  jsonElement: JsonValueArray
  jsonStr: string = ""



  initVal():void {
    this.jsonElement = new JsonValueArray(new Array(this.emptyConfig1(), this.emptyConfig2(), this.emptyConfig3()))
    this.parseTest()
  }



  parseTest():void {
    // const str = "hello: ['world', '!', '!', 1, 2, 3]"
    const str = "[1, 2, 3]"
    jsonParse(str)
  }

  emptyConfig1(): JsonValue {
    const time1 = new JsonStrValue("00:00")
    const day1 = new JsonNumValue(0)
    const b1_1_p1 = new JsonStrValue(null)
    const b1_1_p2 = new JsonNumArray(new Array(1,2,3,4))
    const b1_1_m = new Map<string, JsonValue>()
    b1_1_m.set("p1", b1_1_p1)
    b1_1_m.set("p2", b1_1_p2)
    const bean1_1 = new JsonValue(b1_1_m)
    
    const t1_config_m = new Map<string, JsonValue>()
    t1_config_m.set("time", time1)
    t1_config_m.set("day", day1)
    t1_config_m.set("bean1", bean1_1)
    return new JsonValue(t1_config_m)
  }

  emptyConfig2(): JsonValue {
    const time1 = new JsonStrValue("07:00")
    const day1 = new JsonNumValue(3)
    const b1_1_p1 = new JsonStrValue("abc")
    const b1_1_p2 = new JsonNumValue(null)
    const b1_1_m = new Map<string, JsonValue>()
    b1_1_m.set("p1", b1_1_p1)
    b1_1_m.set("p2", b1_1_p2)
    const bean1_1 = new JsonValue(b1_1_m)
    
    const t1_config_m = new Map<string, JsonValue>()
    t1_config_m.set("time", time1)
    t1_config_m.set("day", day1)
    t1_config_m.set("bean1", bean1_1)
    return new JsonValue(t1_config_m)
  }

  emptyConfig3(): JsonValue {
    const time1 = new JsonStrValue("12:00")
    const day1 = new JsonNumValue(4)
    const b1_1_p1 = new JsonStrValue(null)
    const b1_1_p2 = new JsonNumValue(345)
    const b1_1_m = new Map<string, JsonValue>()
    b1_1_m.set("p1", b1_1_p1)
    b1_1_m.set("p2", b1_1_p2)
    const bean1_1 = new JsonValue(b1_1_m)
    
    const t1_config_m = new Map<string, JsonValue>()
    t1_config_m.set("time", time1)
    t1_config_m.set("day", day1)
    t1_config_m.set("bean1", bean1_1)
    return new JsonValue(t1_config_m)
  }
  constructor(
    // urlパラメータを取得するのに必要
    private route: ActivatedRoute) {
      this.initVal()
    }

  ngOnInit(): void {
    // console.info(this.jsonElement)
    // console.log(this.jsonElement.toString())
    // JSON.parse(this.jsonElement.toString())
    // console.log(this.jsonElement.c)
    // console.log(this.jsonElement.className())
    this.route.params.forEach((params: Params) => {  });
  }

  toJsonView(){
    this.jsonStr = this.jsonElement.toString()
  }
}
