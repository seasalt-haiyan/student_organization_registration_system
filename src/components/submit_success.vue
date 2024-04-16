<template>
    <div>
        <main_title />
        <div class="title">
            <h2>提交成功！</h2>
            <br>
            <h4>您的第一志愿为: {{ requestForm.organization1.organizationName }} - {{ requestForm.organization1.branch }} </h4>
            <h4 v-if="hasOrganization2">您的第二志愿为: {{ requestForm.organization2.organizationName }} - {{
                requestForm.organization2.branch }}</h4>
            <br>
            <h5>提交成功！{{ countdown }}秒后自动返回首页。</h5>
        </div>
    </div>
</template>

<script>
import main_title from './main_title.vue'
export default {
    name: 'submit_success',
    components: { main_title },
    data() {
        return {
            requestForm: {
                studentId: '',//学号
                name: '',//姓名
                qq: '',//qq
                phoneNum: '',//电话号
                major: '',//专业
                className: '',//班级
                organization1: {
                    organizationName: '',//第一志愿组织
                    branch: '',//第一志愿部门
                    reason: '',//第一志愿理由
                },
                organization2: {
                    organizationName: '',//第二志愿组织
                    branch: '',//第二志愿部门
                    reason: '',//第二志愿理由}
                },
                isDispensing: false,//是否接受调剂
            },
            countdown: 0,
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$bus.$on('sendData', (data) => {
                vm.requestForm = data;
            })
        })
    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.$bus.$off('sendData');  // 清理事件监听器
    },
    mounted() {
        this.countDown();
    },
    computed: {
        hasOrganization2() {
            return this.requestForm.organization2 && this.requestForm.organization2.organizationName;
        }
    },
    methods: {
        countDown() {
            this.countdown = 5;
            this.timer = setInterval(() => {
                this.countdown--;
                if (this.countdown === 0) {
                    clearInterval(this.timer);
                    this.$router.push('/');
                }
            }, 1000);
        }
    },

}
</script>
<style scoped>
.title {
    text-align: center;
    margin-left: 40px;
}
</style>