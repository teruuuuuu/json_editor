import {JsonValue} from "./json-value"

export class JsonStrArray extends JsonValue {
    public c = "JsonNumValue"
    constructor(public v:Array<string>) {super(new Map())}
    clone() { return new JsonStrArray(this.v); }
    toString = () => {
        if(this.v == null){
            return 'null'
        }
        var a = '['
        if(this.v.length > 0){
            this.v.forEach(r=>a+='"'+r.toString()+'",')
        }
        a = a.substring(0, a.length-1) + "]"
        return a
    }
    setValue = (val: string) => {
        if(val === ""){this.v=null}
        else{
            var a = new Array<string>()
            val.split(",").forEach((v) => {a.push(v)})
            this.v=a
        }
    }
}
  