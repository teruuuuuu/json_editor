import {JsonValue} from "./json-value"

export class JsonNumArray extends JsonValue {
    public c = "JsonNumArray"
    constructor(public v:Array<number>) {super(new Map())}
    clone() { return new JsonNumArray(this.v); }
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
            var a = new Array<number>()
            val.split(",").forEach((v) => {a.push(Number(v))})
            this.v=a
        }
    }
}
  