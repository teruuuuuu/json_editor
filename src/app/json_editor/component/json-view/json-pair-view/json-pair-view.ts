import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {style} from '@angular/animations';

import * as J from 'app/util/json_parser/json_base'

@Component({
  selector: 'json-pair-view', //ディレクティブのタグ名
  styles: [``],
  templateUrl: './json-pair-view.html', //htmlテンプレートの読み込み
  styleUrls: [ '../json-view.css' ]
})
export class JsonPairView implements OnInit {
  @Input() padding: number = 0;
  @Input() jsonValue: J.JBase = new J.JBase()
  @Input() isOpen: boolean = true;

  
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }
}
