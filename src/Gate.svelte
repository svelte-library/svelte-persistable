<script lang="ts">
    type Waitable = Promise<any> | { wait(): Promise<any> };
    /**
     * A promise or array of promised which should be awaited before continuing
     * with the execution of the app.
     * The values in this property may either be simple Promises or Persistables.
     */
    export let waitFor: Waitable | Waitable[] = [];

    function toPromise(value: Waitable) {
        if ('wait' in value) {
            return value.wait();
        } else {
            return value;
        }
    }

    let promise: Promise<any>;
    $: promise = Array.isArray(waitFor) ? Promise.all(waitFor.map(toPromise)) : toPromise(waitFor);
</script>

<!--
@component
A Gate is used to wait for promises to resolve before continuing with the execution of the app.
It is very useful when you want to:

 - wait for assets to load
 - wait for status checks to complete
 - perform any async action

before the app loads.

Usage:
```tsx
const myStore = persistable(...);

<Gate waitFor={myStore}>
  <MyApp />
</Gate>
```
-->
{#await promise}
    <slot name="loading"/>
{:then _}
    <slot/>
{/await}
