import {JsonValue} from "./json-value"

export class JsonNumArray extends JsonValue {
    public c = "JsonNumArray"
    constructor(public v:Array<number>) {super(new Map())}
    clone() { return new JsonNumArray(this.v); }
    toString = () => {
        if(this.v == null){
            return 'null'
        }
        var a = ''
        this.v.forEach(r=>a+=+'"'+r+'",')
        return a
    }
}
  