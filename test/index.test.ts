import { describe, expect, it } from 'vitest';

import { simpleToTrad, tradToSimple, halfToFull, fullToHalf } from '../src';

describe('simp and trad', () => {
  it('should work', () => {
    const t1 = `子曰：「学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知，而不愠，不亦君子乎？」`;
    const t2 = `子曰：「學而時習之，不亦說乎？有朋自遠方來，不亦樂乎？人不知，而不慍，不亦君子乎？」`;
    expect(simpleToTrad(t1)).toBe(t2);
    expect(tradToSimple(t2)).toBe(t1);
    expect(tradToSimple(simpleToTrad(t1))).toBe(t1);
    expect(simpleToTrad(tradToSimple(t2))).toBe(t2);
  });
});

describe('half and full', () => {
  it('should work', () => {
    const t1 = `子曰：「学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知，而不愠，不亦君子乎？」`;
    const t2 = `子曰:「学而时习之,不亦说乎?有朋自远方来,不亦乐乎?人不知,而不愠,不亦君子乎?」`;
    expect(fullToHalf(t1)).toBe(t2);
    expect(halfToFull(t2)).toBe(t1);
    expect(halfToFull(fullToHalf(t1))).toBe(t1);
    expect(fullToHalf(halfToFull(t2))).toBe(t2);
  });

  it('all characters', () => {
    const lines = [
      '！ ＂ ＃ ＄ ％ ＆ ＇ （ ） ＊ ＋ ， － ． ／',
      '! " # $ % & \' ( ) * + , - . /',
      '０ １ ２ ３ ４ ５ ６ ７ ８ ９ ： ； ＜ ＝ ＞ ？',
      '0 1 2 3 4 5 6 7 8 9 : ; < = > ?',
      '＠ Ａ Ｂ Ｃ Ｄ Ｅ Ｆ Ｇ Ｈ Ｉ Ｊ Ｋ Ｌ Ｍ Ｎ Ｏ',
      '@ A B C D E F G H I J K L M N O',
      'Ｐ Ｑ Ｒ Ｓ Ｔ Ｕ Ｖ Ｗ Ｘ Ｙ Ｚ ［ ＼ ］ ＾ ＿',
      'P Q R S T U V W X Y Z [ \\ ] ^ _',
      '｀ ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ',
      '` a b c d e f g h i j k l m n o',
      'ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ ｛ ｜ ｝ ～ ｟',
      'p q r s t u v w x y z { | } ~ ｟',
      '｠ ｡ ｢ ｣ ､ ･ ｦ ｧ ｨ ｩ ｪ ｫ ｬ ｭ ｮ ｯ',
      '｠ ｡ ｢ ｣ ､ ･ ｦ ｧ ｨ ｩ ｪ ｫ ｬ ｭ ｮ ｯ',
      'ｰ ｱ ｲ ｳ ｴ ｵ ｶ ｷ ｸ ｹ ｺ ｻ ｼ ｽ ｾ ｿ',
      'ｰ ｱ ｲ ｳ ｴ ｵ ｶ ｷ ｸ ｹ ｺ ｻ ｼ ｽ ｾ ｿ',
      'ﾀ ﾁ ﾂ ﾃ ﾄ ﾅ ﾆ ﾇ ﾈ ﾉ ﾊ ﾋ ﾌ ﾍ ﾎ ﾏ',
      'ﾀ ﾁ ﾂ ﾃ ﾄ ﾅ ﾆ ﾇ ﾈ ﾉ ﾊ ﾋ ﾌ ﾍ ﾎ ﾏ',
      'ﾐ ﾑ ﾒ ﾓ ﾔ ﾕ ﾖ ﾗ ﾘ ﾙ ﾚ ﾛ ﾜ ﾝ ﾞ ﾟ',
      'ﾐ ﾑ ﾒ ﾓ ﾔ ﾕ ﾖ ﾗ ﾘ ﾙ ﾚ ﾛ ﾜ ﾝ ﾞ ﾟ',
      'ﾡ ﾢ ﾣ ﾤ ﾥ ﾦ ﾧ ﾨ ﾩ ﾪ ﾫ ﾬ ﾭ ﾮ ﾯ',
      'ﾡ ﾢ ﾣ ﾤ ﾥ ﾦ ﾧ ﾨ ﾩ ﾪ ﾫ ﾬ ﾭ ﾮ ﾯ',
      'ﾰ ﾱ ﾲ ﾳ ﾴ ﾵ ﾶ ﾷ ﾸ ﾹ ﾺ ﾻ ﾼ ﾽ ﾾ',
      'ﾰ ﾱ ﾲ ﾳ ﾴ ﾵ ﾶ ﾷ ﾸ ﾹ ﾺ ﾻ ﾼ ﾽ ﾾ',
      'ￂ ￃ ￄ ￅ ￆ ￇ   ￊ ￋ ￌ ￍ ￎ ￏ',
      'ￂ ￃ ￄ ￅ ￆ ￇ   ￊ ￋ ￌ ￍ ￎ ￏ',
      'ￒ ￓ ￔ ￕ ￖ ￗ   ￚ ￛ ￜ',
      'ￒ ￓ ￔ ￕ ￖ ￗ   ￚ ￛ ￜ',
      '￠ ￡ ￢ ￣ ￤ ￥ ￦  ￨ ￩ ￪ ￫ ￬ ￭ ￮',
      '￠ ￡ ￢ ￣ ￤ ￥ ￦  ￨ ￩ ￪ ￫ ￬ ￭ ￮'
    ];

    expect(fullToHalf(lines[0])).toBe(lines[1]);
    expect(halfToFull(lines[1])).toBe(lines[0]);

    expect(fullToHalf(lines[2])).toBe(lines[3]);
    expect(halfToFull(lines[3])).toBe(lines[2]);

    expect(fullToHalf(lines[4])).toBe(lines[5]);
    expect(halfToFull(lines[5])).toBe(lines[4]);

    expect(fullToHalf(lines[6])).toBe(lines[7]);
    expect(halfToFull(lines[7])).toBe(lines[6]);

    expect(fullToHalf(lines[8])).toBe(lines[9]);
    expect(halfToFull(lines[9])).toBe(lines[8]);

    expect(fullToHalf(lines[10])).toBe(lines[11]);
    expect(halfToFull(lines[11])).toBe(lines[10]);

    expect(fullToHalf(lines[12])).toBe(lines[13]);
    expect(halfToFull(lines[13])).toBe(lines[12]);

    expect(fullToHalf(lines[14])).toBe(lines[15]);
    expect(halfToFull(lines[15])).toBe(lines[14]);

    expect(fullToHalf(lines[16])).toBe(lines[17]);
    expect(halfToFull(lines[17])).toBe(lines[16]);

    expect(fullToHalf(lines[18])).toBe(lines[19]);
    expect(halfToFull(lines[19])).toBe(lines[18]);

    expect(fullToHalf(lines[20])).toBe(lines[21]);
    expect(halfToFull(lines[21])).toBe(lines[20]);

    expect(fullToHalf(lines[22])).toBe(lines[23]);
    expect(halfToFull(lines[23])).toBe(lines[22]);

    expect(fullToHalf(lines[24])).toBe(lines[25]);
    expect(halfToFull(lines[25])).toBe(lines[24]);

    expect(fullToHalf(lines[26])).toBe(lines[27]);
    expect(halfToFull(lines[27])).toBe(lines[26]);

    expect(fullToHalf(lines[28])).toBe(lines[29]);
    expect(halfToFull(lines[29])).toBe(lines[28]);
  });
});
