import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {style} from '@angular/animations';

import * as J from 'app/util/json_parser/json_base'

@Component({
  selector: 'json-array-view', //ディレクティブのタグ名
  styles: [``],
  templateUrl: './json-array-view.html', //htmlテンプレートの読み込み
  styleUrls: [ '../json-view.css' ]
})
export class JsonArrayView implements OnInit {
  @Input() jsonValue: J.JBase = new J.JBase()

  
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {}

}
