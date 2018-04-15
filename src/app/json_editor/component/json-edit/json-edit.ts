import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {style} from '@angular/animations';

import * as V from 'app/json_editor/model/json-view-model'
import * as J from 'app/util/json_parser/json_base'
import { JsonView } from '../json-view/json-view/json-view';

@Component({
  selector: 'json-edit', //ディレクティブのタグ名
  styles: [``],
  templateUrl: './json-edit.html', //htmlテンプレートの読み込み
  styleUrls: [ './json-edit.css']
})
export class JsonEdit implements OnInit {
  @Input() jsonView: V.JsonLineViewModel = 
    new V.JsonLineViewModel(new Array<Array<V.JsonViewModel>>())
  @Input() jsonValue: J.JBase = new J.JBase()

  
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.info(this.jsonValue)
    this.jsonView = new V.JsonLineViewModel(this.jsonVal2View(this.jsonValue,  0, 0))
    console.info(this.jsonView)
    console.info(this.jsonView.toString())
  }

  jsonVal2View = (jsonValue: J.JBase, indent: number, nextIndent: number): Array<Array<V.JsonViewModel>> => {
    const jv = new Array<Array<V.JsonViewModel>>()
    if( jsonValue instanceof J.JMember ) {
      jv.push([new V.JsonViewItemModel(this.spRepeat(nextIndent)), new V.JsonViewStrModel("{")])
      jsonValue.v.forEach(c => {
        this.jsonVal2View(c, indent , indent).forEach(v => {jv.push(v)})
      })
      jv.push([new V.JsonViewItemModel(this.spRepeat(indent)), new V.JsonViewStrModel("}")])
      return jv
    } else if( jsonValue instanceof J.JPair ) {
      const v = this.jsonVal2View(jsonValue.v,  indent, 0)
      for(var i = 0; i < v.length; i++ ) {
        if(i == 0) {
          jv.push(this.arryMerge([new V.JsonViewItemModel(this.spRepeat(indent)), 
            new V.JsonViewStrModel(jsonValue.k.toString()), new V.JsonViewItemModel(":")], v[i]) )
        } else {
          jv.push(v[i])
        }
      }
      return jv
    } else if( jsonValue instanceof J.JArray ) {
      jv.push([new V.JsonViewItemModel(this.spRepeat(nextIndent)), new V.JsonViewItemModel("[")])
      jsonValue.v.forEach((value, i, array) => {
        this.jsonVal2View(value, indent + 1, indent + 1).forEach((v, j, carry) => {
          if ( i < array.length -1 &&  j == carry.length - 1){ 
            v.push(new V.JsonViewItemModel(","))
            jv.push(v)
          } else {
            jv.push(v)
          }
        })
      })
      jv.push([new V.JsonViewItemModel(this.spRepeat(indent)), new V.JsonViewItemModel("]")])
      return jv
    } else if( jsonValue instanceof J.JStr ) {
      jv.push([new V.JsonViewItemModel(this.spRepeat(nextIndent)), new V.JsonViewStrModel('"' + jsonValue.v + '"')])
      return jv
    } else if( jsonValue instanceof J.JNum ) {
      jv.push([new V.JsonViewItemModel(this.spRepeat(nextIndent)), new V.JsonViewNumModel(Number(jsonValue.v))])
      return jv
    }
  }

  arryMerge = (a1: Array<V.JsonViewModel>, a2: Array<V.JsonViewModel>) => {
    a2.forEach(v => {
      a1.push(v)
    })
    return a1
  }
  spRepeat = (num: number) => {return this.strRepeat("  ", num)}
  strRepeat = (str: String, num: number) => {
    var ret = "";
    for(var i = 0; i < num; i++){ret += str}
    return ret
  }
}
