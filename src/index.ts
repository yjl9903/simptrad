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
