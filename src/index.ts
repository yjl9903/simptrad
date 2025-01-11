import { simple, trad } from './dict.json';

const simpId = new Map<string, number>();
const tradId = new Map<string, number>();

for (let i = 0; i < simple.length; i++) {
  simpId.set(simple[i], i);
}
for (let i = 0; i < trad.length; i++) {
  tradId.set(trad[i], i);
}

export function simpleToTrad(text: string) {
  if (!text) return '';
  let res = '';
  for (let i = 0; i < text.length; i++) {
    if (simpId.has(text[i])) {
      res += trad[simpId.get(text[i])!];
    } else {
      res += text[i];
    }
  }
  return res;
}

export function tradToSimple(text: string) {
  if (!text) return '';
  let res = '';
  for (let i = 0; i < text.length; i++) {
    if (tradId.has(text[i])) {
      res += simple[tradId.get(text[i])!];
    } else {
      res += text[i];
    }
  }
  return res;
}

export interface HalfFullOptions {
  space?: boolean;

  punctuation?: boolean;
}

const halfPunctuations = new Map([
  ['.', '。'],
  ['~', '～'],
  ['-', '─'],
  ['·', '・'],
  ['[', '【'],
  [']', '】']
]);
const fullPunctuations = new Map([
  ['。', '.'],
  ['～', '~'],
  ['─', '-'],
  ['・', '·'],
  ['【', '['],
  ['】', ']'],
  ['“', '"'],
  ['”', '"'],
  ['‘', `'`],
  ['’', `'`],
  ['、', ',']
]);

export function halfToFull(
  text: string,
  { space = false, punctuation = false }: HalfFullOptions = {}
) {
  if (!text) return '';
  let res = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code === 32) {
      res += space ? String.fromCharCode(12288) : text[i];
    } else if (code < 127) {
      res += String.fromCharCode(code + 65248);
    } else {
      if (punctuation) {
        res += halfPunctuations.get(text[i]) ?? text[i];
      } else {
        res += text[i];
      }
    }
  }
  return res;
}

export function fullToHalf(
  text: string,
  { space = false, punctuation = false }: HalfFullOptions = {}
) {
  if (!text) return '';
  let res = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code == 12288) {
      res += space ? String.fromCharCode(32) : text[i];
    } else if (65280 < code && code < 65375) {
      res += String.fromCharCode(code - 65248);
    } else {
      if (punctuation) {
        res += fullPunctuations.get(text[i]) ?? text[i];
      } else {
        res += text[i];
      }
    }
  }
  return res;
}
