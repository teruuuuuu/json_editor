import {Parser} from './parser'
export interface ParseResult<T> {}

export class ParseSuccess<T> implements ParseResult<T> {
    parser: Parser<[any]>;
    childResult: ParseResult<T>;
    value: T;
    next: string;

    constructor(parser: Parser<[any]>, childResult: ParseResult<T>, value: T, next: string){
        this.parser = parser
        this.childResult = childResult
        this.value = value
        this.next = next
    }

    public toString(): string{
        return "Success(" + this.value + ", " + this.next + ")";
    }
}

export class ParseFailer<T> implements ParseResult<T> {
    parser: Parser<[any]>;
    parseResult: ParseResult<T>;
    message: string;
    next: string;

    constructor(parser: Parser<[any]>, parseResult: ParseResult<T>, message: string, next: string){
        this.parser = parser
        this.parseResult = parseResult
        this.message = message
        this.next = next
    }

    public toString(): string{
        return "Failer(" + this.message + ", " + this.next + ")";
    }
}