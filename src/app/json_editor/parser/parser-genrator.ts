import {Parser} from "./parser"
import {StringParser} from "./string-parser"
import {SeqParser} from "./seq-parser"
import { ManyParser } from "app/json_editor/parser/many-parser";

export function string(literal:string) {
    return new StringParser(literal)
}

export function seq( lps: Parser<any>, rps: Parser<any>) {
    return new SeqParser(lps, rps)
}

export function many( parser: Parser<any>) {
    return new ManyParser(parser)
}