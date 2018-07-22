<template>
    <div>
        <div></div>

        <mt-button type="default"  @click="fuck">default</mt-button>
    </div>
</template>

<script>
    import { MessageBox, Toast } from 'mint-ui';
    export default {
        data() {
            return {

            }
        },
        methods: {
            fuck() {
                // Toast('Upload Complete');
                MessageBox('Notice', 'You clicked the button');
            }
        }
    }
</script>

<style scoped>

</style>