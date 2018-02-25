import {Parser} from './parser'
import {ParseResult, ParseSuccess, ParseFailer} from './parser-result'

export class OrParser implements Parser<[Array<any>]> {
    psArray: Array<Parser<any>>
    constructor(psArray: Array<Parser<any>>) {
        this.psArray = psArray
    }

    parse(input: string) :ParseResult<any> {
        for(const i in this.psArray) {
            const psresult = this.psArray[i].parse(input)
            if(psresult instanceof ParseSuccess) {
                return new ParseSuccess<any>(this, psresult, psresult.value, psresult.next);    
            }
        }
        return new ParseFailer<any>(this, null, null,input);
    }
}
