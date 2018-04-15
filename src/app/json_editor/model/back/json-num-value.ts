import {JsonValue} from "./json-value"

export class JsonNumValue extends JsonValue {
    public c = "JsonNumValue"
    constructor(public v:number) {super(new Map())}
    clone() { return new JsonNumValue(this.v); }

    toString = () => {
        if(this.v == null){return 'null'}
        return '"' + String(this.v) + '"'
    }
    setValue = (val: string) => {
        if(val === ""){this.v=null}
        else{this.v=Number(val)}
    }
}
  