import {Parser} from '../parser/parser'
import * as P from '../parser/parser-genrator'
import { ParseSuccess, ParseResult, ParseFailer } from '../parser/parser-result';
import { ParserError } from '@angular/compiler';

import {JBase, JMember, JArray, JPair, JStr, JNum, JBool} from './json_base';

const dqParer = P.string('"')
const dqStop = P.stop(new Array('"'))
const wordParse = P.triplet(dqParer, dqStop, dqParer)

const intParse =  P.plus(P.or(arryToParsers(Array("1","2","3","4","5","6","7","8","9","0"))))
const floatingParse = P.seq(intParse, P.option(P.seq(P.string("."),intParse)))
const numParse = P.seq(P.option(P.string("-")), floatingParse)

const nullParse = P.string("null")
const trueParse = P.string("true")
const falseParse = P.string("false")

const valueParser = P.or([wordParse, numParse, nullParse, trueParse, falseParse])

const spSeq = P.continues(P.string(" "))
const cmParse = P.string(",")
const elementsParser = P.seq(valueParser, P.continues(P.seq(P.triplet(spSeq, cmParse, spSeq), valueParser)))

const aoParser = P.triplet(spSeq, P.string("["), spSeq)
const acParser = P.triplet(spSeq, P.string("]"), spSeq)
const arrayParser = P.triplet(aoParser, P.option(elementsParser), acParser)
valueParser.addParser(arrayParser)

const coParer = P.string(":")
const pairParser = P.seq(P.seq(P.triplet(spSeq, wordParse, spSeq), coParer), P.triplet(spSeq, valueParser, spSeq))
const membersParser = P.seq(pairParser, P.continues(P.seq(P.triplet(spSeq, cmParse, spSeq), pairParser)))

const objParser = P.triplet(P.triplet(spSeq, P.string("{"), spSeq), P.option(membersParser), P.triplet(spSeq, P.string("}"), spSeq))
valueParser.addParser(objParser)

const jsonParser = P.seq(valueParser, P.seq(spSeq, P.end()))

export function jsonParse(str: string): JBase {
    const strnoline = str.replace("\r","").replace("\n","")
    const result  = jsonParser.parse(strnoline)
    return semanticVal(result)
}

function arryToParsers(strings: Array<string>){
    return strings.map(s=> {return P.string(s)})
}

function getVal(parseResult: ParseSuccess<any>): String {
    if (parseResult.parser ==   wordParse){
        if(parseResult.value instanceof Array){
            return parseResult.value[1];
        }
    } else if (parseResult.parser ==   numParse){
        if(parseResult.value instanceof Array) {
            return getSeqVal(parseResult.value)
        } else {
            return parseResult.value
        }
        
    }
    return "";
}

function getSeqVal(resultArray: Array<any>): String {
    var ret = ""
    resultArray.filter(r => r !== null ).forEach((r) => {
        if (r instanceof Array){
            ret += getSeqVal(r)
        } else {
            ret += r.toString();
        }
    })
    return ret
}

function semanticVal(parseResult: ParseResult<any>):JBase {
    if (parseResult instanceof ParseSuccess){
        const parser = parseResult.parser;
        if (parser == jsonParser){
            return semanticVal(parseResult.childResult[0])
        } else if (parser == valueParser) {
            return semanticVal(parseResult.childResult)
        } else if (parser == objParser) {
            return semanticVal(parseResult.childResult[1].childResult)
        } else if (parser == membersParser){
            const m = Array<JBase>();
            m.push(semanticVal(parseResult.childResult[0]))
            if (parseResult.childResult instanceof Array && parseResult.childResult.length > 1 
                && parseResult.childResult[1].childResult instanceof Array ) {
                    parseResult.childResult[1].childResult.forEach(r=>
                        m.push(semanticVal(r.childResult[1])
                    ))
            }
            return new JMember(m);
        } else if(parser == pairParser) {
            const key = new JStr(parseResult.childResult[0].childResult[0].childResult[1].value[1])
            const v = semanticVal(parseResult.childResult[1].childResult[1])
            return new JPair(key, v)
        } else if (parser == arrayParser) {
            if (parseResult.childResult[1].childResult instanceof ParseFailer){
                return new JArray(new Array())
            }
            return semanticVal(parseResult.childResult[1].childResult)
        } else if (parser == elementsParser) {
            const m = Array<JBase>();
            m.push(semanticVal(parseResult.childResult[0].childResult))
            if (parseResult.childResult instanceof Array && parseResult.childResult.length > 1 
                && parseResult.childResult[1].childResult instanceof Array ) {
                    parseResult.childResult[1].childResult.forEach(r=>
                        m.push(semanticVal(r.childResult[1].childResult))
                    )
            }
            return new JArray(m)
        } else if (parser == wordParse ) {
            return new JStr(getVal(parseResult))
        } else if (parser == numParse) {
            return new JNum(Number(getVal(parseResult)))
        } else if (parser == trueParse) {
            return new JBool(true)
        } else if (parser == falseParse) {
            return new JBool(false)
        } 
    }
    return null;
}