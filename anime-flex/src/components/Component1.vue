<template>
    <div>
        <h1>Hello Vue.js</h1>
        <h3>my name is {{ name }}</h3>
    </div>
</template>

<script>
    export default {
        name: 'component1',
        
        data() {
            return {
                name: 'Matt'
            }
        }
    }
</script>