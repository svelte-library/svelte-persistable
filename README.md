# Persisted Svelte Stores

This package exposes a store which is persisted to storage and has typescript support.

## Usage

Install the package:

**npm**
```bash
npm install @svelte-library/svelte-persistable
```

**yarn**
```bash
yarn add @svelte-library/svelte-persistable
```

### 1. Define your store

`src/myStore.ts`
```typescript
import {persistable, Config, JsonTransformer} from '@svelte-library/svelte-persistable'; 

interface MyStore {
  message: string;
}

// a function which provides the default value.
// it is only executed when no value was found in store.
const getDefaultValue = (): MyStore => ({
  message: "Hello World!"
});

const storageConfig: Config<MyStore> = {
  // this key must be unique within your app as it is used to
  // persist the state
  key: 'myApp/myStore',

  // provide a storage.
  // by default, this is the localStorage
  storage: localStorage,

  // provide a (de)serialization function
  // be default, this is JSON.stringify/parse
  transform: JsonTransformer,
};

export const myStore = persistable<MyStore>(
  getDefaultValue,
  storageConfig
)
```

### 2. Add a Gate to your app

A gate prevents your app from starting until the persistable stores are done loading:

`src/App.svelte`
```sveltets
<script lang="ts">
  import {Gate} from '@svelte-library/svelte-persistable';
  import {MessageDisplay} from './MessageDisplay.svelte';
  import {MessageInput} from './MessageInput.svelte';
  import {myStore} from './myStore';
</script>

<Gate waitFor={myStore}>
  <MessageDisplay />
  <MessageInput />
</Gate>
```

### 3. Use the data from your store

You can use your store just like any other [readable](https://svelte.dev/tutorial/readable-stores):

`src/MessageDisplay.svelte`
```sveltets
<script lang="ts">
  import {myStore} from './myStore';
</script>

<p>Message: {$myStore.message}</p>
```

### 4. Write to your store

And finally, you can use your store just like any other [writable](https://svelte.dev/tutorial/writable-stores).

`src/MessageInput.svelte`
```scveltets
<script lang="ts">
  import {myStore} from './myStore';
</script>

<input bind:value={$myStore.message}>
```
