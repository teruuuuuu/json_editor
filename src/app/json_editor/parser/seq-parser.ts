import {Parser} from './parser'
import {ParseResult, ParseSuccess, ParseFailer} from './parser-result'

export class SeqParser implements Parser<[any, any]> {
    lhs: Parser<any>
    rhs: Parser<any>

    constructor(lhs: Parser<any>, rhs: Parser<any>) {
        this.lhs = lhs
        this.rhs = rhs
    }

  
    parse(input: string) :ParseResult<any> {
        const lresult:ParseResult<any>  = this.lhs.parse(input);
        if(lresult instanceof ParseSuccess) {
            const value1:ParseResult<any> = lresult.value
            var next = lresult.next
            const rresult:ParseResult<any>  = this.rhs.parse(next);
            if(rresult instanceof ParseSuccess) {
                const value2:ParseResult<any> = rresult.value
                return new ParseSuccess<[any, any]>([value1, value2],
                    rresult.next
                );
            } else {
                return new ParseFailer<any>(next + " is not match", input);
            }
            
        } else {
            return new ParseFailer<any>(next + " is not match", input);
        }
    }
}
