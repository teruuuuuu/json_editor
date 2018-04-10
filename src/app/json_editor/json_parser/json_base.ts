export class JBase {}

export class JStr extends JBase {
    constructor(public v:String) {super()}
}

export class JNum extends JBase {
    constructor(public v:Number) {super()}
}

export class JBool extends JBase {
    constructor(public v:Boolean) {super()}
}

export class JArray extends JBase {
    constructor(public v:Array<JBase>) {super()}
}

export class JPair extends JBase {
    constructor(public k: JStr, public v:JBase) {super()}
}

export class JMember extends JBase {
    constructor(public v: Array<JBase>) {super()}
}