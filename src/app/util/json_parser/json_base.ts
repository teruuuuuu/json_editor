export class JBase {
    toString = () => ""
}

export class JStr extends JBase {
    constructor(public v:String) {super()}
    toString = () => '"' + this.v + '"'
}

export class JNum extends JBase {
    constructor(public v:Number) {super()}
    toString = () => this.v.toString()
}

export class JBool extends JBase {
    constructor(public v:Boolean) {super()}
}

export class JArray extends JBase {
    constructor(public v:Array<JBase>) {super()}
    toString = () => "[\n" + this.v.join(',\n') + "\n]"
}

export class JPair extends JBase {
    constructor(public k: JStr, public v:JBase) {super()}
    toString = () => this.k.toString() + ":" + this.v.toString() + ''
}

export class JMember extends JBase {
    constructor(public v: Array<JBase>) {super()}
    toString = () => "{" + this.v.join(',\n') + "\n}"
}