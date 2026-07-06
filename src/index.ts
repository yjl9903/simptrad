import dict from './dict.json' with { type: 'json' };

let indexed = false;

const { simple, trad } = dict;
const simpToTrad = new Map<string, string>();
const tradToSimp = new Map<string, string>();

function ensureIndex() {
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

  indexed || ensureIndex();

  let res = '';
  for (let i = 0; i < text.length; i++) {
    res += simpToTrad.get(text[i]) ?? text[i];
  }

  return res;
}

export function tradToSimple(text: string) {
  if (!text) return '';

  indexed || ensureIndex();

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

const halfSpaceCode = 32;
const fullSpaceCode = 12288;
const widthOffset = 65248;
const halfAsciiStart = 33;
const halfAsciiEnd = 126;
const fullAsciiStart = 65281;
const fullAsciiEnd = 65374;

const halfPunctuations = new Map([
  ['.', '。'],
  ['~', '～'],
  ['-', '─'],
  ['·', '・'],
  ['[', '【'],
  [']', '】'],
  ['｡', '。'],
  ['､', '、'],
  ['･', '・']
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
    const char = text[i];
    const punct = punctuation ? halfPunctuations.get(char) : undefined;
    if (punct) {
      res += punct;
      continue;
    }
    const code = text.charCodeAt(i);
    if (code === halfSpaceCode) {
      res += space ? String.fromCharCode(fullSpaceCode) : char;
    } else if (halfAsciiStart <= code && code <= halfAsciiEnd) {
      res += String.fromCharCode(code + widthOffset);
    } else {
      res += char;
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
    const char = text[i];
    const punct = punctuation ? fullPunctuations.get(char) : undefined;
    if (punct) {
      res += punct;
      continue;
    }
    const code = text.charCodeAt(i);
    if (code === fullSpaceCode) {
      res += space ? String.fromCharCode(halfSpaceCode) : char;
    } else if (fullAsciiStart <= code && code <= fullAsciiEnd) {
      res += String.fromCharCode(code - widthOffset);
    } else {
      res += char;
    }
  }

  return res;
}

export function clearPunctuation(text: string, replacement = '') {
  return text.replace(/\p{P}/gu, () => replacement);
}

export interface NormalizeOptions {
  /** 转换中文字符。默认为 'simp'；传 false 跳过转换。 */
  chinese?: 'simp' | 'trad' | false;

  /** 转换英文字母大小写。默认为 'lower'；传 false 跳过转换。 */
  case?: 'lower' | 'upper' | false;

  /** 替换 Unicode 标点。默认为 ''（删除）；传 false 跳过替换。 */
  punctuation?: false | string;

  /** 转换 ASCII 全角/半角字符。默认为 'half'；传 false 跳过转换。 */
  width?: 'full' | 'half' | false;
}

export function normalize(
  text: string,
  {
    chinese = 'simp',
    case: letterCase = 'lower',
    width = 'half',
    punctuation = ''
  }: NormalizeOptions = {}
) {
  let res = text;
  if (chinese === 'simp') res = tradToSimple(res);
  if (chinese === 'trad') res = simpleToTrad(res);
  if (letterCase === 'lower') res = res.toLowerCase();
  if (letterCase === 'upper') res = res.toUpperCase();
  if (punctuation !== false) res = clearPunctuation(res, punctuation);
  if (width === 'full') res = halfToFull(res, { space: true, punctuation: true });
  if (width === 'half') res = fullToHalf(res, { space: true, punctuation: true });
  return res;
}
