import {Parser} from '../parser/parser'
import * as P from '../parser/parser-genrator'
import { ParseSuccess, ParseResult } from '../parser/parser-result';

const sqParer = P.string("'")
const sqStop = P.stop(new Array("'"))
const dqParer = P.string('"')
const dqStop = P.stop(new Array('"'))

const coParer = P.string(":")
const coStop = P.stop(new Array(":"))
const spSeq = P.continues(P.string(" "))
const cmParse = P.string(",")

const wordParse = P.bracket(dqParer, dqStop, dqParer)
const numParse =  P.plus(P.or(arryToParsers(Array("1","2","3","4","5","6","7","8","9","0"))))
const floatingParse = P.seq(numParse, P.option(P.seq(P.string("."),numParse)))
const nullParse = P.string("null")
const trueParse = P.string("true")
const falseParse = P.string("false")

const valueParse = P.or([wordParse, floatingParse, nullParse, trueParse, falseParse])
const arrayParse = P.bracket(
    P.string("[")
    , P.option(P.seq(
        valueParse,
        P.continues(P.seq(
            P.bracket(  spSeq,   cmParse,   spSeq), 
            valueParse))))
    ,P.string("]"))
const valueWithArrayParse = P.or([valueParse, arrayParse])

const keyParser = P.bracket(spSeq, wordParse, spSeq)
const memberParse = P.bracket(keyParser, coParer, P.bracket(spSeq, valueWithArrayParse, spSeq))
const membersParse = P.seq(memberParse, P.continues(P.seq(
    P.bracket(spSeq, cmParse, spSeq),
    memberParse
)))

const objParse = P.bracket(P.seq(spSeq, P.string("{")), membersParse, P.seq(P.string("}"), spSeq))

const jsonParser = P.or([objParse, valueWithArrayParse])
const parsers = [  sqParer,   sqStop,   coParer,   coStop,   spSeq,   cmParse,   wordParse,   arrayParse,   objParse]

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
