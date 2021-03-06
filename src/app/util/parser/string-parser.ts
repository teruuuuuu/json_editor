import {Parser} from './parser'
import {ParseResult, ParseSuccess, ParseFailer} from './parser-result'

export class StringParser implements Parser<string> {
    literal: string;
    public constructor(literal: string) {
        this.literal = literal;
    }
  
    getLiteral():String{
      return this.literal;
    }

    parse(input: string):ParseResult<String> {
        if(input.startsWith(this.literal)){
            return new ParseSuccess(this, null, this.literal, input.substring(this.literal.length))
        }
        return new ParseFailer(this, null, "expect: " + this.literal, input);
    }
}
