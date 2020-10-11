## Strng-Contractor

[![Actions Status](https://github.com/revilossor/string-contractor/workflows/String-Contractor/badge.svg)](https://github.com/revilossor/string-contractor/actions)

Takes a string and works out augmentations with different contractions. This includes full expansions and contractions, as well as all possible combinations of either.

For example ```I am sure it's a good example``` will contract to ```I'm sure it's a good example```. It will expand to
```
I am sure it has a good example
I am sure it is a good example
```
since *it's* could mean *it is* or *it has*. All possible combinations gives us

```
I'm sure it's a good example
I'm sure it has a good example
I'm sure it is a good example
I am sure it's a good example
I am sure it has a good example
I am sure it is a good example
```

### Using it

#### In *typescript*

```typescript
import StringContractor from 'string-contractor'

const stringContractor = new StringContractor()

const input = "I am sure it's a good example"

stringContractor.contract(input)
stringContractor.expand(input)
stringContractor.all(input)
```

#### In *javascript*

```javascript
const StringContractor = require('string-contractor').default

const stringContractor = new StringContractor()

const input = "I am sure it's a good example"

stringContractor.contract(input)
stringContractor.expand(input)
stringContractor.all(input)
```

### Data Source

The data for the contractions comes from a slightly modified form of [the wikipedia list](https://en.wikipedia.org/wiki/Wikipedia:List_of_English_contractions)
