<template>
    <div id="app-fullscreen">
        <div class="login">
            <div class="logo">
                <img src="../assets/logo.png" alt="logo" width="100px">
            </div>
            <br>
            <div class="format">
                <h2>管理员登录</h2>
            </div>
            <el-form ref="form" :model="form" :rules="rules" class="login-form">
                <el-form-item prop="username" :error="formErrors.username">
                    <el-input v-model="form.username" class="element-width" placeholder="请输入您的用户名" clearable
                        prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="password" :error="formErrors.password">
                    <el-input type="password" v-model="form.password" class="element-width" placeholder="请输入您的密码"
                        show-password prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login" class="element-width">登录</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
import axios from 'axios';//引入axios
export default {
    name: 'admin_login',
    data() {
        return {
            form: {
                username: '',//用户名
                password: ''//密码
            },
            rules: {//表单验证规则
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ]

            },
            formErrors: {//表单错误信息(手动设置)
                username: '',
                password: ''
            },
        }
    },
    methods: {
        login() {//登录函数
            this.clearErrors();//清空错误信息
            this.$refs.form.validate((valid) => {
                if (valid) {
                    axios.post('http://101.43.254.115:11115/api/login', this.form)
                        .then(response => {
                            // 处理响应
                            switch (response.data.code) {
                                case '00000':
                                    this.$message({
                                        message: '登录成功',
                                        type: 'success'
                                    });
                                    this.clearErrors();
                                    localStorage.setItem('token', response.data.data.token);//将token存入localStorage
                                    this.$router.push('/admin');//跳转到管理员主页
                                    break;
                                case 'A1000'://用户名或密码不正确
                                    this.formErrors.username = '账号或密码不正确';
                                    this.formErrors.password = '账号或密码不正确';
                                    this.$refs.form.clearValidate();//清空表单验证
                                    break;
                            }
                        })
                        .catch(error => {
                            // 登录失败时显示错误消息
                            console.log(error);
                            this.$message({
                                message: '登录失败',
                                type: 'error'
                            });
                        });
                } else {
                    this.$message({
                        message: '您的输入有误！',
                        type: 'error'
                    });
                }
            });
        },
        clearErrors() {//清空错误信息
            this.formErrors.username = '';
            this.formErrors.password = '';
        }
    }
}

</script>

<style scoped>
#app-fullscreen {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #374865;
}

.login {
    width: 600px;
    height: 500px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
}

.element-width {
    width: 300px;
}

.login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
