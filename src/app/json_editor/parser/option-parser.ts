import {Parser} from './parser'
import {ParseResult, ParseSuccess, ParseFailer} from './parser-result'

export class OptionParser implements Parser<[any]> {
    ps: Parser<any>

    constructor(ps: Parser<any>) {
        this.ps = ps
    }

    parse(input: string) :ParseResult<any> {
        const psresult:ParseResult<any>  = this.ps.parse(input);
        if(psresult instanceof ParseSuccess) {
            const value1:ParseResult<any> = psresult.value
            return new ParseSuccess<any>(this, psresult, value1,psresult.next);    
        } else {
            return new ParseSuccess<any>(this, psresult, null,input);
        }
    }
}
