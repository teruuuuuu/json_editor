import {Parser} from "./parser"
import {StringParser} from "./string-parser"
import {SeqParser} from "./seq-parser"
import {TripleParser} from "./triple-parser"
import { ContinueParser } from "app/json_editor/parser/continue-parser";
import {OptionParser} from "./option-parser"
import {OrParser} from "./or-parser"
import {EndParser} from "./end-parser"
import {StopWordParser} from "./stop-word-parser"
import { ContinuePlusParser } from "app/json_editor/parser/continue-plus-parser";
// import { BracketParser } from "app/json_editor/parser/bracket-parser";
// import { RecurrentParser } from "app/json_editor/parser/recurrent-parser";

export function string(literal:string) {
    return new StringParser(literal)
}

export function seq( lps: Parser<any>, rps: Parser<any>) {
    return new SeqParser(lps, rps)
}

export function triplet( fps: Parser<any>, sps: Parser<any>, tps: Parser<any>) {
    return new TripleParser(fps, sps, tps)
}

export function continues(parser: Parser<any>) {
    return new ContinueParser(parser)
}

export function option(parser: Parser<any>) {
    return new OptionParser(parser)
}

export function or(psArray: Array<Parser<any>>) {
    return new OrParser(psArray)
}

export function end() {
    return new EndParser()
}

export function stop(stopWords: Array<string>) {
    return new StopWordParser(stopWords)
}

export function plus(parser: Parser<any>) {
    return new ContinuePlusParser(parser)
}

// export function bracket(op: Parser<any>, cl: Parser<any>) {
//     return new BracketParser(op, cl)
// }

// export function recurrent(recParsers: Array<OuterParser<any>>, innerParser: Parser<any>) {
//     return new RecurrentParser(recParsers, innerParser)
// }
