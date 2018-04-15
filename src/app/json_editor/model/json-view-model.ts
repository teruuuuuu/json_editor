import { JBase } from "../../util/json_parser/json_base";

export class JsonViewModel {
    constructor() {} 
    // toString = () => {return ""}
    color = () => {return "#222"}
}

export class JsonLineViewModel {
    constructor(public v:Array<Array<JsonViewModel>>) {} 
    
    toString = () => {
        var ret = ""
        this.v.forEach(s => {
            if ( s instanceof Array ) {
                s.forEach(c => {
                    ret += c.toString()
                })
                ret += "\n"
            }
        })
        return ret
    }
    color = () => {return "#222"}
}

export class JsonViewItemModel extends JsonViewModel {
    constructor(public v:String) {super()}
    toString = () => {
        return this.v
    }
    color = () => {return "#222"}
}

export class JsonViewNumModel extends JsonViewModel {
    constructor(public v:number) {super()}
    toString = () => {
        return this.v
    }
    color = () => {return "green"}
}

export class JsonViewStrModel extends JsonViewModel {
    constructor(public v:String) {super()}
    toString = () => {
        return this.v
    }
    color = () => {return "red"}
}