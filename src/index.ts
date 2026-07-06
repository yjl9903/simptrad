import dict from './dict.json' with { type: 'json' };

let indexed = false;

const { simple, trad } = dict;
const simpToTrad = new Map<string, string>();
const tradToSimp = new Map<string, string>();

function ensureIndex() {
  if (indexed) return;
  for (let i = 0; i < simple.length; i++) {
    simpToTrad.set(simple[i], trad[i]);
  }
  for (let i = 0; i < trad.length; i++) {
    tradToSimp.set(trad[i], simple[i]);
  }
  indexed = true;
}

export function simpleToTrad(text: string) {
  if (!text) return '';

  ensureIndex();

  let res = '';
  for (let i = 0; i < text.length; i++) {
    res += simpToTrad.get(text[i]) ?? text[i];
  }

  return res;
}

export function tradToSimple(text: string) {
  if (!text) return '';

  ensureIndex();

  let res = '';
  for (let i = 0; i < text.length; i++) {
    res += tradToSimp.get(text[i]) ?? text[i];
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
