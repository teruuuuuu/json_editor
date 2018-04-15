import {Parser} from './parser'
import {ParseResult, ParseSuccess, ParseFailer} from './parser-result'

export class TripleParser implements Parser<[any, any, any]> {
    fhs: Parser<any>
    shs: Parser<any>
    ths: Parser<any>

    constructor(fhs: Parser<any>, shs: Parser<any>, ths: Parser<any>) {
        this.fhs = fhs
        this.shs = shs
        this.ths = ths
    }
  
    parse(input: string) :ParseResult<any> {
        const fresult:ParseResult<any>  = this.fhs.parse(input);
        if(fresult instanceof ParseSuccess) {
            const value1:ParseResult<any> = fresult.value
            var next = fresult.next
            const sresult:ParseResult<any>  = this.shs.parse(next);
            if(sresult instanceof ParseSuccess) {
                const value2:ParseResult<any> = sresult.value
                next = sresult.next
                const tresult:ParseResult<any>  = this.ths.parse(next);
                if(tresult instanceof ParseSuccess) {
                    const value3:ParseResult<any> = tresult.value
                    next = tresult.next
                    return new ParseSuccess<[any, any, any]>(this, [fresult, sresult, tresult], [value1, value2, value3],tresult.next);
                } else {
                    return new ParseFailer<any>(this, [fresult, sresult, tresult], next + " is not match", input);
                }
            } else {
                return new ParseFailer<any>(this, [fresult, sresult], next + " is not match", input);
            }
        } else {
            return new ParseFailer<any>(this, [fresult], next + " is not match", input);
        }
    }
}
