import {JsonValue} from "./json-value"

export class JsonValueArray extends JsonValue{
  public c = "JsonValueArray"
  constructor(public v:Array<JsonValue>) {super(new Map())}
  className = () => {return this.c}
  clone() { return new JsonValueArray(this.v); }
  toString = () => {
    var a = '['
    if(this.v.length >0){
      this.v.forEach(
        r=>
        a+=r.toString()+','
      )
      a = a.substr(0, a.length-1)
    }
    a += ']'
    return a
  }
}
  