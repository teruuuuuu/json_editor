export class JsonValue {
    public c = "JsonValue"
    constructor(public e:Map<String, JsonValue>) {}
    public className = () => {return this.c}
    clone() { return new JsonValue(this.e); }
    mapToKeys = () => {
      const ret = new Array()
      this.e.forEach((v,k) => {ret.push(k)})
      return ret
    }
    toString = () => {
      var a = '{'
      var b = []
      if(this.e.size > 0){
        this.e.forEach((value, key) => 
          {if(value !== null && value.toString() !== "null") b.push(key)}
      )}

      if(b.length > 0){
        b.forEach((key) => {
          a += '"'+key+'"' + ':' + this.e.get(key).toString() + ','
        })
        // this.e.forEach((value, key) => {
        //   a += '"'+key+'"' + ':' + value.toString() + ','
        // })
        a = a.substring(0, a.length-1)
      }
      a += '}'
      return a
    }
    setValue = (val: string) => {}
  }
  