import {ParseResult} from './parser-result'


export interface Parser<T> {
    parse(input: string ):ParseResult<T>;
}
