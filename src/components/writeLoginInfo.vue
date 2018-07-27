<template>
    <div class="login-wrap">
        <div class="form">
            <div class="title"></div>
            <div class="item i-input">
                <input placeholder="昵称" v-model="nickname" />
            </div>
            <div class="item i-input">
                <input placeholder="真实姓名(验证员工)" v-model="name" />
            </div>
            <div class="item i-input">
                <input placeholder="华晨宝马员工号码(验证员工)" v-model="staffCode" />
            </div>
            <div class="item confirm" :class="{'confirm_wait': isSureWait}"></div>
        </div>
    </div>
</template>

<script>
    import { MessageBox, Toast } from 'mint-ui';
    export default {
        data() {
            return {
                nickname: '',
                name: '',
                staffCode: '',
                isSureWait: true
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
                background: url(../../static/img/all_info.png) no-repeat 0 0/100% 100%;
            }
            input {
                display: block;
                width: 100%;
                height: 100%;
                border: none;
                background: transparent no-repeat 0 0/100% 100%; 
                &::-webkit-input-placeholder{
                    color: #888;
                }
                
            }
            div.i-input {
                display: inline-block;
                width: 94%;
                input {
                    padding: 0.2rem;
                    background-image: url(../../static/img/login_celllphone.png) ;
                }
            }
            .item {
                box-sizing: border-box;
                margin: 0.13rem 0;
                width: 100%;
                height: 0.7rem;
                line-height: 0.55rem;
            }
            div.confirm {
                margin-top: 0.6rem;
                height: 1.4rem;
                background: url(../../static/img/sure1_btn.png) no-repeat 0 0/100% 100%;
            }
            div.confirm_wait {
                background: url(../../static/img/sure2_btn.png) no-repeat 0 0/100% 100%;
            }
        }
    }
</style>