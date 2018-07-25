<template>
    <div class="login-wrap">
        <div class="form">
            <div class="title"></div>
            <div class="item cellphone">
                <input placeholder="请输入手机号码" v-model="cellphone" />
            </div>
            <div class="item code">
                <input placeholder="请输入短信验证码" class="code-input" v-model="code" @input="codeChange" />
                <div class="code-btn" :class="{'code_sending': codeSending}" @touchstart="getPhoneCode">{{codeWord}}</div>
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
                cellphone: '',
                code: '',
                isSureWait: true,
                codeWord: '获取验证码',
                codeSending: false
            }
        },
        methods: {
            fuck() {
                // Toast('Upload Complete');
                MessageBox('Notice', 'You clicked the button');
            },
            getPhoneCode() {
                if (!this.codeSending) {
                    this.codeSending = true;
                    let time = 60;
                    this.codeWord = `重试(${time})`;
                    let timer = setInterval(() => {
                        time--;
                        this.codeWord = `重试(${time})`;

                        if (time <= 0) {
                            this.codeWord = '获取验证码';
                            this.codeSending = false;
                            clearInterval(timer);
                        }
                    }, 1000);
                }               
            
            },
            codeChange() {
                if (this.cellphone && this.code) {
                    this.isSureWait = false;
                }
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
                background: url(../../static/img/login_word.png) no-repeat 0 0/100% 100%;
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
            div.cellphone {
                display: inline-block;
                width: 94%;
                input {
                    padding: 0.2rem;
                    background-image: url(../../static/img/login_celllphone.png) ;
                }
            }
            div.code {
                input {
                    padding: 0.2rem;
                    background-image: url(../../static/img/login_code.png) ;
                }
            }
            .item {
                box-sizing: border-box;
                margin: 0.13rem 0;
                width: 100%;
                height: 0.7rem;
                line-height: 0.55rem;
            }
            .code {
                .code-input {
                    display: inline-block;
                    width: 59%;
                }
                .code-btn {
                    display: inline-block;
                    padding: 0.07rem 0;
                    width: 34%;
                    background: url(../../static/img/code_btn.png) no-repeat 0 0/100% 100%;
                    font-size: 12px;
                    color: #111;
                }
                .code_sending {
                    color: #999;
                }
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