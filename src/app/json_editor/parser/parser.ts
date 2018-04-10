import {ParseResult} from './parser-result'


export interface Parser<T> {
    parse(input: string ):ParseResult<T>;
}

// export interface OuterParser<T> {
//     openParse(input: string ):ParseResult<T>;
//     closeParse(input: string ):ParseResult<T>;
// }