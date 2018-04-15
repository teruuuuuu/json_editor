// import {Parser, OuterParser} from './parser'
// import {ParseResult, ParseSuccess, ParseFailer} from './parser-result'

// export class BracketParser implements OuterParser<[any, any]> {
//     ops: Parser<any>
//     cps: Parser<any>
//     // TODO セパレータを扱えるようにする

//     constructor(ops: Parser<any>, cps: Parser<any>) {
//         this.ops = ops
//         this.cps = cps
//     }

//     openParse(input: string) :ParseResult<any> {
//         const result:ParseResult<any>  = this.ops.parse(input)
//         if(result instanceof ParseSuccess) {
//             return new ParseSuccess(this.ops, result, result.value, result.next)
//         } else if (result instanceof ParseFailer){
//             return new ParseFailer(this.ops, result, result.message, input)
//         }
//         return new ParseFailer(this.ops, result, null, input)
//     }
  
//     closeParse(input: string) :ParseResult<any> {
//         const result:ParseResult<any>  = this.ops.parse(input)
//         if(result instanceof ParseSuccess) {
//             return new ParseSuccess(this.cps, result, result.value, result.next)
//         } else if (result instanceof ParseFailer){
//             return new ParseFailer(this.cps, result, result.message, input)
//         }
//         return new ParseFailer(this.cps, result, null, input)
//     }
// }
