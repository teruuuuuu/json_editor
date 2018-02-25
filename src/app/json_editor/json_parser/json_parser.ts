import {Parser} from '../parser/parser'
import * as P from '../parser/parser-genrator'
import { ParseSuccess, ParseResult } from '../parser/parser-result';

const sqParer = P.string("'")
const sqStop = P.stop(new Array("'"))
const coParer = P.string(":")
const coStop = P.stop(new Array(":"))
const spSeq = P.continues(P.string(" "))
const cmParer = P.string(",")

const wordParse = P.bracket(sqParer, sqStop, sqParer)
const numParse =  P.plus(P.or(arryToParsers(Array("1","2","3","4","5","6","7","8","9","0"))))


const arrayParse = P.bracket(
    P.string("[")
    , P.option(P.seq(
        P.or([numParse, wordParse]),
        P.continues(P.seq(
            P.bracket(  spSeq,   cmParer,   spSeq), 
            P.or([numParse, wordParse])))))
    ,P.string("]"))

const attributePaser = P.seq(P.seq(  coStop,   coParer), P.seq(  spSeq,   arrayParse))


const jsonParser = P.or([attributePaser, arrayParse])
const parsers = [  sqParer,   sqStop,   coParer,   coStop,   spSeq,   cmParer,   wordParse,   arrayParse,   attributePaser]

export function jsonParse(str: string): void {
    const strnoline = str.replace("\r","").replace("\n","")
    
      resultSeq(jsonParser.parse(strnoline))
}

function resultSeq(parseResult: ParseResult<any>):void {
    console.info(parseResult)
    if (parseResult instanceof ParseSuccess){
        showVal(parseResult)

      const childResult = parseResult.childResult
      if (childResult instanceof Array){
        childResult.forEach(child => {
          if (child instanceof ParseSuccess){
              resultSeq(child)
          }
        }) 
      } else if (childResult instanceof ParseSuccess){
          resultSeq(childResult)
      }
    }
}

function showVal(parseResult: ParseSuccess<any>) {
    if (parseResult.parser ==   wordParse){
        if(parseResult.value instanceof Array){
            console.log("word vlue=" + parseResult.value[1])
        }
    } else if (parseResult.parser ==   numParse){
        console.log("num vlue=" + parseResult.value.toString())
    }
}


function arryToParsers(strings: Array<string>){
    return strings.map(s=> {return P.string(s)})
}
