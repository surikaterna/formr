const rMatch = (re, process) => {
  return {
    match: (stream) => re.test(stream),
    process
  }
}

const rExtract = (re) => (token, stream) => {
  const match = stream.match(re);
  token.text = match[1];
  token.length = match[0].length;
}

const rToken = re => rMatch(re, rExtract(re));
const feeder = (startChar, endChar) => (token, stream) => {
  let pos = 0;
  let end;
  let count = 0;
  while (!end) {
    switch (stream[pos++]) {
      case startChar: count++; break;
      case endChar:
        count--;
        if (!count) {
          end = pos;
        }
      break;
    }
  }
  token.length = end;
  token.text = stream.substring(1, end - 1);
}

export const TokenTypes = {
  '>': rMatch(/^>/, null),
  assign: rToken(/^(=)/),
  expression: rMatch(/^{/, feeder('{', '}')),
  comment: rToken(/^<!--(.*?)-->/),
  startTag: rToken(/^<([A-Za-z][A-Za-z0-9]*)[\s|>]/),
  literal: rToken(/^[A-Za-z]+/),
  string: rToken(/^"(?:[^"\\]|\\.)*"/),
  endTag: rToken(/\/>|<\/(.+?)>/)
}

export default class JsxLexer {
  constructor(jsx) {
    this._jsx = jsx;
    this._pos = 0;
    this._stream = jsx;
    this['>'] = function () {
      this._fwd(1);
      return this.peek();
    }
  }
  peek() {
    let token;
    for (let type in TokenTypes) {
      if (TokenTypes.hasOwnProperty(type)) {
        if (TokenTypes[type].match(this._stream)) {
          const process = TokenTypes[type].process;
          if (!process) {
            //skip char if no process method
            this._fwd(type.length);
          } else {
            token = { type };
            if (process(token, this._stream));
            break;
          }
        }
      }
    }
    if (!token) {
      throw new Error('Jsx Lexing error: ' + this._stream);
    }
    return token;
  }

  startTag(token) {
    const res = this._stream.match(TokenTypes.startTag);
    token.text = res[1];
    token.length = res[0].length;
  }

  comment(token) {
    var end = this._stream.indexOf('-->');
    token.length = end - this._pos + 3;
    token.text = this._stream.substring(4, end);
    return token;
  }

  isNext(tokenType) {
    return this.peek().type===tokenType;
  } 

  next() {
    const token = this.peek();
    this._fwd(token.length);
    return token;
  }

  _fwd(length) {
    this._pos += length;
    this._stream = this._stream.substring(length);
  }
}

