<template>
    <div class="load-wrap">
        <div>loading... {{percent}}%</div>
    </div>
</template>

<script>
    export default {
        props: ['percent']
    }
</script>

<style scoped lang="scss">
    .load-wrap {
        width: 100%;
        height: 100%;
        
    }
</style>