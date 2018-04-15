import {Parser} from './parser'
import {ParseResult, ParseSuccess, ParseFailer} from './parser-result'

export class ContinuePlusParser implements Parser<any> {
    parser: Parser<any>

    constructor(parser: Parser<any>) {
        this.parser = parser
    }

  
    parse(input: string) :ParseResult<Array<any>> {
        var next: string  = input
        const values: Array<any> = new Array()
        while(true) {
            const previous = next;
            const result = this.parser.parse(next);
            if(result instanceof ParseSuccess) {
                values.push(result.value);
                next = result.next
            } else {
                var v = ""
                values.forEach(r=>{v+=r})
                if(v.length == 0){
                    return new ParseFailer(this, result, "not much", input);
                } else {
                    return new ParseSuccess(this, result, v, previous);
                }
            }
        }
    }
}
