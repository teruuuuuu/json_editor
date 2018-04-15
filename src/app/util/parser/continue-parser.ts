import {Parser} from './parser'
import {ParseResult, ParseSuccess, ParseFailer} from './parser-result'

export class ContinueParser implements Parser<any> {
    parser: Parser<any>

    constructor(parser: Parser<any>) {
        this.parser = parser
    }

  
    parse(input: string) :ParseResult<Array<any>> {
        var next: string  = input
        const values: Array<any> = new Array()
        const results: Array<ParseResult<any>> = new Array()
        while(true) {
            const previous = next;
            const result = this.parser.parse(next);
            if(result instanceof ParseSuccess) {
                values.push(result.value);
                results.push(result)
                next = result.next
            } else {
                var v = ""
                values.forEach(r=>{v+=r})
                return new ParseSuccess(this, results, v, previous);
            }
        }
    }
}
