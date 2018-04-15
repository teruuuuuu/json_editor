import {JsonValue} from "./json-value"

export class JsonStrValue extends JsonValue{
    public c = "JsonStrValue"
    constructor(public v:string) {super(new Map())}
    clone() { return new JsonStrValue(this.v); }
    toString = () => {
        if(this.v == null){return 'null'}
        return '"' + this.v + '"'
    }
    setValue = (val: string) => {
        if(val === ""){this.v=null}
        else{this.v=val}
    }
}
  