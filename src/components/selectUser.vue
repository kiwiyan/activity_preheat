<template>
    <div class="login-wrap">
        <div class="form">
            <div class="title"></div>
            <div class="item user-btn"></div>
            <div class="item not-user-btn"></div>
        </div>
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
            codeChange() {
                
            }
        }
    }
</script>

<style scoped lang="scss">
    .login-wrap {
        width: 100%;
        min-height: 100%;
        background: url(../../static/img/BG@2x.png) no-repeat 0 0/100% 100%;
        font-size: 16px;
        color: #fff;
        .form {
            width: 80%;
            margin: 0 auto;
            padding-top: 40%;
            text-align: center;
            .title {
                display: inline-block;
                margin-bottom: 0.15rem;
                width: 3.5rem;
                height: 0.8rem;
                background: url(../../static/img/select_user.png) no-repeat 0 0/100% 100%;
            }

            .item {
                box-sizing: border-box;
                margin: 0.13rem 0;
                width: 100%;
                height: 1.4rem;
                line-height: 0.55rem;
            }
            div.user-btn {
                margin-top: 0.6rem;
                
                background: url(../../static/img/user_btn.png) no-repeat 0 0/100% 100%;
            }
            div.not-user-btn {
                background: url(../../static/img/not_user_btn.png) no-repeat 0 0/100% 100%;
            }
        }
    }
</style>