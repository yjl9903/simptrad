# simptrad

[![version](https://img.shields.io/npm/v/simptrad?label=simptrad)](https://www.npmjs.com/package/simptrad) [![CI](https://github.com/yjl9903/simptrad/actions/workflows/ci.yml/badge.svg)](https://github.com/yjl9903/simptrad/actions/workflows/ci.yml)

简体字和繁体字转换。

## Usage

```bash
npm i simptrad
```

```ts
import { simpleToTrad, tradToSimple } from 'simptrad'

const t1 = `子曰：「学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知，而不愠，不亦君子乎？」`
const t2 = `子曰：「學而時習之，不亦說乎？有朋自遠方來，不亦樂乎？人不知，而不慍，不亦君子乎？」`

console.log(simpleToTrad(t1))
console.log(tradToSimple(t2))
```

## License

MIT License © 2023 [XLor](https://github.com/yjl9903)
