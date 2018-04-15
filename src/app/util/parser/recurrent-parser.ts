// import {Parser, OuterParser} from './parser'
// import {ParseResult, ParseSuccess, ParseFailer} from './parser-result'

// export class RecurrentParser implements Parser<[Array<OuterParser<any>>, Parser<any>]> {
//     recParsers: Array<OuterParser<any>>
//     innerParser: Parser<any>

//     constructor(recParsers: Array<OuterParser<any>>, innerParser: Parser<any>) {
//         this.recParsers = recParsers
//         this.innerParser = innerParser
//     }

//     recurrent(next: string): ParseResult<any> {
//         const failResult: Array<ParseResult<any>> = new Array()
//         const result = this.innerParser.parse(next)
//         // if ( result instanceof ParseSuccess){
//         //     return new ParseSuccess(this, result, result.value, result.next)
//         // } else {
//         //     failResult.push(result)
//         // }

//         this.recParsers.forEach(rp => {
//             const oresult:ParseResult<any>  = rp.openParse(next);
//             if(oresult instanceof ParseSuccess ){
//                 const inresult:ParseResult<any>  = this.recurrent(oresult.next)
//                 if(inresult instanceof ParseSuccess) {
//                     const cresult:ParseResult<any>  = rp.closeParse(inresult.next)
//                     if(cresult instanceof ParseSuccess) {
//                         return new ParseSuccess(this, [oresult, inresult, cresult], 
//                             [oresult.value, inresult.value, cresult.value], cresult.next)
//                     } else {
//                         failResult.push(cresult)
//                     }
//                 } else {
//                     failResult.push(inresult)
//                 }
//             } else {
//                 failResult.push(oresult)
//             }
//         })
//         return new ParseFailer<any>(this, failResult, next + " is not match", next);
//     }

//     parse(input: string) :ParseResult<any> {
//         return this.recurrent(input)
//     }
// }
