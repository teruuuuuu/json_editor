import {JsonValue} from "./json-value"

export class JsonStrArray extends JsonValue {
    public c = "JsonNumValue"
    constructor(public v:Array<string>) {super(new Map())}
    clone() { return new JsonStrArray(this.v); }
    toString = () => {
        if(this.v == null){
            return 'null'
        }
        var a = ''
        this.v.forEach(r=>a+='"'+r+'",')
        return a
    }
}
  