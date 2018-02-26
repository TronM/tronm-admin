<template>
    <el-form :model="form.fields" ref="form" class="login">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="form.fields.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="form.fields.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="login()">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import api from '@/api/website/login';

export default {
    data() {
        return {
            checked: true,
            form: {
                fields: {
                    username: 'rita',
                    password: 'admin'
                }
            }
        };
    },
    methods: {
        async login() {
            const res = await api.login({ username: this.form.fields.username, password: this.form.fields.password });
            if (res === 'error') {
                this.$notify.error({
                    title: '错误',
                    message: '登陆失败'
                });
            } else {
                this.$router.push({ path: '/' });
            }
        }
    }
};
</script>

<style lang="less">
@import '../assets/style/config.less';

.login {
    margin: 180px auto;
    width: 350px;
    padding: 15px 35px;
    background: #fff;
    border: 1px solid @color-border1;
    border-radius: 5px;
    box-shadow: 0 0 25px #cac6c6;

    h3 {
        text-align: center;
    }

    .remember {
        margin-bottom: 35px;
    }
}
</style>


