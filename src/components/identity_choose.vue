<template>
    <div>
        <main_title />
        <div class="selection">请选择你的身份</div>
        <div class="boxs">
            <router-link to="/student" class="box student">
                <div class="box-content">我是学生</div>
            </router-link>
            <router-link to="/login" class="box admin">
                <div class="box-content">我是管理员</div>
            </router-link>
        </div>
    </div>
</template>

<script>
import main_title from './main_title.vue'
export default {
    name: 'identity_choose',
    components: { main_title },

}
</script>

<style>
.selection {
    font-size: 18px;
    margin-top: 40px;
    margin-bottom: 30px;
    color: #888;
}

.boxs {
    margin-top: 20px;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-around;
}

.box {
    display: inline-block;
    border: 1px solid transparent;
    width: 300px;
    height: 300px;
    line-height: 150px;
    margin: 10px;
    cursor: pointer;
    border-radius: 10px;
    transition: border-color 0.3s, transform 0.3s;
}

.student:hover {
    border-color: #333;
    transform: scale(1.05);
}

.admin:hover {
    border-color: red;
    transform: scale(1.05);
}

.box-content {
    font-size: 24px;
    font-weight: bold;
    color: white;
    position: relative;
    top: -30px;
}

.student {
    background-color: #87CEEB;
    background-image: url(../assets/student.png);
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 60%;
}

.admin {
    background-color: #003366;
    background-image: url(../assets/admin.png);
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 60%;
}
</style>