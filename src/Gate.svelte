<script lang="ts">
    type Waitable = Promise<any> | { wait(): Promise<any> };
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

{#await promise}
    <slot name="loading"/>
{:then _}
    <slot/>
{/await}
