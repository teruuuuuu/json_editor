import {Parser} from './parser'
import {ParseResult, ParseSuccess, ParseFailer} from './parser-result'

// 特定の文字列以外を読み込む
export class StopWordParser implements Parser<Array<string>> {
    stopWords: Array<string>;
    public constructor(stopWords: Array<string>) {
        this.stopWords = stopWords;
    }

    words(input:string):string {
        const indexs = this.stopWords
          .map(s=>{return Number(input.indexOf(s))})
          .filter(i=>{return i >= 0})
          .sort((a:number, b:number) => {return a - b})
        
        switch (indexs.length) {
          case 0:
           return input
          default:
            return input.substring(0, indexs[0])
        }
    }


    parse(input: string):ParseResult<String> {
        const muchString = this.words(input)
        if (muchString.length > 0 ){
            return new ParseSuccess(this, null, muchString, input.substring(muchString.length))
        } else {
            return new ParseFailer<any>(this, null, " much stop word: " + this.stopWords.toString(), input);    
        }
    }
}
