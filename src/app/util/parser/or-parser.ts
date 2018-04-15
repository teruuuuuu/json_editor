import {Parser} from './parser'
import {ParseResult, ParseSuccess, ParseFailer} from './parser-result'

export class OrParser implements Parser<[Array<any>]> {
    psArray: Array<Parser<any>> = new Array()
    constructor(psArray: Array<Parser<any>>) {
        this.psArray = psArray
    }
    addParser(parser: Parser<any>): void {
        this.psArray.push(parser)
    }

    parse(input: string) :ParseResult<any> {
        const results: Array<ParseResult<any>> = new Array()
        for(const i in this.psArray) {
            const psresult = this.psArray[i].parse(input)
            if(psresult instanceof ParseSuccess) {
                return new ParseSuccess<any>(this, psresult, psresult.value, psresult.next);    
            } else {
                results.push(psresult)
            }
        }
        return new ParseFailer<any>(this, results, null,input);
    }
}
