import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {style} from '@angular/animations';

import * as J from 'app/util/json_parser/json_base'

@Component({
  selector: 'json-str-view', //ディレクティブのタグ名
  styles: [``],
  templateUrl: './json-str-view.html', //htmlテンプレートの読み込み
  styleUrls: [ '../json-view.css' ]
})
export class JsonStrView implements OnInit {
  @Input() padding: number = 0;
  @Input() jsonValue: J.JBase = new J.JBase()

  
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }
}
