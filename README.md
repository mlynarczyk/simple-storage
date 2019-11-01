# LocalStorage

A simple localStorage wrapper, adding defaultValue and optional stringifying/parsing of passed values.

# Examples

```typescript
import { get, set, remove, clear } from './src/LocalStorage';

get('example_key'); // null
get('example_key', 3); // 3
set('example_key', { example: 'a' }); // true
get('example_key'); // {example: 'a'}
get('example_key', { useJSONParse: false }); // "{example: 'a'}"
remove('example_key'); // undefined
get('example_key'); // null
set('example_key', { example: 'a' }); // true
clear(); // undefined
get('example_key'); // null
```
