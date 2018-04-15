import {Parser} from './parser'
import {ParseResult, ParseSuccess, ParseFailer} from './parser-result'

export class EndParser implements Parser<any> {
    public constructor() {}
    parse(input: string):ParseResult<String> {
        if(input == ""){
            return new ParseSuccess(this, null, null, input);
        }
        return new ParseFailer(this, null, "expected: end, actual: " + input, input);
    }
}
