<template>
    <el-container style="height: 100vh;">

        <!-- 头部区域 -->
        <el-header class="header">
            <div style="display: flex; align-items: center;"><img src="../assets/logo.png" alt="logo" class="logo">
                <div class="title">学生组织报名管理系统</div>
            </div>

            <el-dropdown class="avatar-dropdown" trigger="click">
                <span class="el-dropdown-link">
                    <el-avatar :src="require('../assets/logo.png')"></el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleLogout" style="color: #F56C6C;">
                        <i class="el-icon-switch-button"></i>
                        登出
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>

        <!-- 主体内容区域，包括侧边栏和主要内容 -->
        <el-container>

            <!-- 侧边栏区域 -->
            <el-aside width="200px" class="nav">
                <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#3a4863" text-color="#fff"
                    active-text-color="#409EFF" router>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span style="color: white;">学生信息管理</span>
                        </template>
                        <el-menu-item index="/admin/student">
                            <router-link to="/admin/student">学生信息管理</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <!-- 主要内容区域 -->
            <el-main>
                <el-page-header @back="goback" content="返回首页" v-if="!showDefaultView">
                </el-page-header>
                <div class="default-view" v-if="showDefaultView">
                    <h1>欢迎来到学生组织报名管理系统</h1>
                    <p>请从左侧菜单选择一个选项以开始你的操作。</p>
                </div>
                <div class="content" v-if="!showDefaultView">
                    <router-view></router-view>
                </div>
            </el-main>

        </el-container>
    </el-container>
</template>
<script>
export default {
    name: 'admin_main',
    methods: {
        handleLogout() {
            this.$confirm('确认退出登录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                localStorage.removeItem('token');
                this.$router.push('/login');
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出'
                });
            });
        },
        goback() {
            this.$router.push('/admin');
        }
    },

    computed: {
        showDefaultView() {
            return this.$route.path === '/admin';
        },
    },
    beforeRouteEnter(to, from, next) {
        if (localStorage.getItem('token')) {
            next();
        } else {
            next('/login');
        }
    }
}
</script>

<style scoped>
.header {
    background: #3a4863;
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 0;
    justify-content: space-between;
}

.logo {
    height: 40px;
}

.title {
    font-size: 25px;
    margin-left: 20px;
    color: white;
}

.nav {
    background-color: #3a4863;
    color: #fff;
    padding: 0;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100vh;
    /* 让侧边栏填满剩余的高度 */
}

.el-main {
    background: #eaedf0;
    padding: 30px;

}

.default-view {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    /* 确保.default-view宽度撑满父容器 */
}

.default-view h1 {
    margin-bottom: 1rem;
}

.default-view p {
    color: #666;
    margin: 0 auto;
    width: fit-content;
    /* 设置宽度只适应内容的宽度 */
}

a {
    text-decoration: none;
    color: inherit;
}

.content {
    margin: 20px;
    height: 500px;
    background: red;
}
</style>