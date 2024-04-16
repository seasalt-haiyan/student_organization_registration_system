<template>
    <div>
        <main_title />
        <el-form :model="form" :rules="rules" ref="formRef">
            <div class="personal-info">
                <h3>个人信息<span style="color: red;">*</span></h3>
                <el-form-item prop="studentId">
                    <el-input v-model="form.studentId" placeholder="请输入您的学号" class="element-width" clearable></el-input>
                </el-form-item>
                <el-form-item prop="name">
                    <el-input v-model="form.name" placeholder="请输入您的姓名" class="element-width" clearable></el-input>
                </el-form-item>
                <el-form-item prop="qq">
                    <el-input v-model="form.qq" placeholder="请输入您的qq号" class="element-width" clearable></el-input>
                </el-form-item>
                <el-form-item prop="phoneNum">
                    <el-input v-model="form.phoneNum" placeholder="请输入您的手机号" class="element-width" clearable></el-input>
                </el-form-item>
            </div>
            <div class="major-and-class">
                <h3>专业与班级<span style="color: red;">*</span></h3>
                <el-form-item prop="major">
                    <el-select v-model="form.major" placeholder="请选择您的专业" class="element-width" clearable>
                        <el-option v-for="major in majorData" :key="major.value" :value="major.value"
                            :label="major.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="className">
                    <el-select v-model="form.className" placeholder="请选择您的班级" class="element-width" clearable>
                        <el-option v-for="classItem in selectedMajorClasses" :key="classItem.value"
                            :value="classItem.value" :label="classItem.label">
                        </el-option>
                    </el-select>
                </el-form-item>

            </div>
            <div class="first-choice">
                <h3>第一志愿<span style="color: red;">*</span></h3>
                <el-form-item prop="organization1.organizationName">
                    <el-select v-model="form.organization1.organizationName" placeholder="请选择您的第一志愿组织" clearable
                        class="element-width">
                        <el-option v-for="organization in organizationData" :key="organization.value"
                            :value="organization.value" :label="organization.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="organization1.branch">
                    <el-select v-model="form.organization1.branch" placeholder="请选择您的第一志愿部门" class="element-width"
                        clearable>
                        <el-option v-for="branch in filteredFirstBranchOptions" :key="branch.value"
                            :value="branch.value" :label="branch.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="organization1.reason">
                    <el-input type="textarea" v-model="form.organization1.reason" placeholder="请输入您选择该部门的原因"
                        class="element-width"></el-input>
                </el-form-item>
            </div>
            <div class="second-choice">
                <h3>第二志愿</h3>
                <el-form-item prop="organization2.organizationName">
                    <el-select v-model="form.organization2.organizationName" placeholder="请选择您的第二志愿组织"
                        class="element-width" clearable>
                        <el-option v-for="organization in organizationData" :key="organization.value"
                            :value="organization.value" :label="organization.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="organization2.branch">
                    <el-select v-model="form.organization2.branch" placeholder="请选择您的第二志愿部门" class="element-width"
                        clearable>
                        <el-option v-for="branch in filteredSecondBranchOptions" :key="branch.value"
                            :value="branch.value" :label="branch.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="organization2.reason">
                    <el-input type="textarea" v-model="form.organization2.reason" placeholder="请输入您选择该部门的原因"
                        class="element-width"></el-input>
                </el-form-item>
            </div>
            <div class="isDispensing-switch">
                <h3>是否接受调剂</h3>
                <el-switch v-model="form.isDispensing" active-text="接受调剂" inactive-text="不接受调剂">
                </el-switch>
            </div>
            <br>
            <div class="submit-button">
                <el-form-item>
                    <el-button type="primary" class="element-width" style="border-radius: 5px;"
                        @click="submitForm()">立即发送</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>

</template>

<script>
import axios from 'axios';
import main_title from './main_title.vue'

export default {
    name: 'student_submit',
    components: { main_title },
    data() {
        return {
            form: {
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
            //专业信息
            majorData: [
                {
                    value: "计算机科学与技术",
                    label: "计算机科学与技术",
                    children: [
                        { value: "一班", label: "一班" },
                        { value: "二班", label: "二班" }
                    ]
                },
                {
                    value: "信息安全",
                    label: "信息安全",
                    children: [
                        { value: "一班", label: "一班" },
                        { value: "二班", label: "二班" }
                    ]
                },
                {
                    value: "物联网",
                    label: "物联网",
                    children: [
                        { value: "一班", label: "一班" },
                        { value: "二班", label: "二班" }
                    ]
                },
                {
                    value: "数据科学与大数据技术",
                    label: "数据科学与大数据技术",
                    children: [
                        { value: "一班", label: "一班" },
                        { value: "二班", label: "二班" }
                    ]
                },
                {
                    value: "计算机科学与技术（合作）",
                    label: "计算机科学与技术（合作）",
                    children: [
                        { value: "一班", label: "一班" },
                        { value: "二班", label: "二班" }
                    ]
                }
            ],
            //组织信息
            organizationData: [
                {
                    value: "科技协会",
                    label: "科技协会",
                    children: [
                        {
                            value: "科技协会",
                            label: "科技协会",
                        },
                    ],
                },
                {
                    value: "团委",
                    label: "团委",
                    children: [
                        {
                            value: "组织部",
                            label: "组织部",
                        },
                        {
                            value: "宣传部",
                            label: "宣传部",
                        },
                    ],
                },
                {
                    value: "学生会",
                    label: "学生会",
                    children: [
                        {
                            value: "办公室",
                            label: "办公室",
                        },
                        {
                            value: "学习部",
                            label: "学习部",
                        },
                        {
                            value: "宣传部",
                            label: "宣传部",
                        },
                    ],
                },
                {
                    value: "勤工助学中心",
                    label: "勤工助学中心",
                    children: [
                        {
                            value: "管理部",
                            label: "管理部",
                        },
                        {
                            value: "活动部",
                            label: "活动部",
                        },
                    ],
                },
                {
                    value: "新闻中心",
                    label: "新闻中心",
                    children: [
                        {
                            value: "摄影协会",
                            label: "摄影协会",
                        },
                        {
                            value: "新媒体部",
                            label: "新媒体部",
                        },
                        {
                            value: "记者团",
                            label: "记者团",
                        },
                    ],
                },
            ],
            basicRules: {
                studentId: [
                    { required: true, message: '学号不能为空', trigger: 'blur' },
                    { pattern: /^\d{8}$/, message: '请输入正确的学号', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' },
                    { pattern: /^[A-Za-z\s\u4e00-\u9fa5]+$/, message: '请输入正确的姓名', trigger: 'blur' }
                ],
                qq: [
                    { required: true, message: 'QQ号不能为空', trigger: 'blur' },
                    { pattern: /^\d+$/, message: '请输入正确的qq号', trigger: 'blur' }
                ],
                phoneNum: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                    { pattern: /^\d{11}$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                major: [
                    { required: true, message: '专业不能为空', trigger: 'change' }
                ],
                className: [
                    { required: true, message: '班级不能为空', trigger: 'change' }
                ],
                'organization1.organizationName': [
                    { required: true, message: '第一志愿组织不能为空', trigger: 'change' }
                ],
                'organization1.branch': [
                    { required: true, message: '第一志愿部门不能为空', trigger: 'change' }
                ],
                'organization1.reason': [
                    { required: true, message: '您选择该部门的原因不能为空', trigger: 'blur' }
                ],

            }
        }

    },
    computed: {
        //查找专业对应班级
        selectedMajorClasses() {
            const selectedMajorData = this.majorData.find(major_in => major_in.value === this.form.major);
            return selectedMajorData ? selectedMajorData.children : [];
        },
        //查找第一志愿对应下属部门
        selectedOrganizationBranch() {
            const selectedOrganizationData = this.organizationData.find(organization => organization.value === this.form.organization1.organizationName);
            return selectedOrganizationData ? selectedOrganizationData.children : [];
        },
        //查找第二志愿对应下属部门
        selectedSecondOrganizationBranch() {
            const selectedOrganizationData = this.organizationData.find(organization => organization.value === this.form.organization2.organizationName);
            return selectedOrganizationData ? selectedOrganizationData.children : [];

        },
        //过滤，保证选择过的部门不再显示
        filteredFirstBranchOptions() {
            const org = this.organizationData.find(o => o.value === this.form.organization1.organizationName);
            if (!org) return [];
            const branches = org.children;
            return this.form.organization2.branch ? branches.filter(b => b.value !== this.form.organization2.branch) : branches;
        },
        filteredSecondBranchOptions() {
            const org = this.organizationData.find(o => o.value === this.form.organization2.organizationName);
            if (!org) return [];
            const branches = org.children;
            return this.form.organization1.branch ? branches.filter(b => b.value !== this.form.organization1.branch) : branches;
        },
        secondVolunteerRules() {
            if (this.form.organization2.organizationName) {  // 检查是否选择了第二志愿组织
                return {
                    'organization2.branch': [
                        { required: true, message: '第二志愿部门不能为空', trigger: 'change' }
                    ],
                    'organization2.reason': [
                        { required: true, message: '您选择该部门的原因不能为空', trigger: 'blur' }
                    ]
                };
            } else {
                return {};  // 如果没有选择第二志愿组织，返回空规则对象
            }
        },
        rules() {
            return {
                ...this.basicRules,
                ...this.secondVolunteerRules
            };
        }


    },
    methods: {
        submitForm() {
            this.$refs.formRef.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定提交', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        console.log(this.form);
                        axios.post('http://101.43.254.115:11115/api/post/form', this.form).then(response => {
                            switch (response.data.code) {
                                case '00000':
                                    console.log('提交成功');
                                    this.$message({
                                        type: 'success',
                                        message: '提交成功!'
                                    });
                                    this.$router.push('/success'); // 成功 - 跳转到成功页面
                                    console.log("组件创建");
                                    this.$nextTick(() => {
                                        this.$bus.$emit('sendData', this.form);
                                        console.log("已经发送");
                                    })
                                    break;
                                case 'A0400':
                                    this.$message({
                                        type: 'warning',
                                        message: '前端传参错误，提交失败！'
                                    });
                                    break;
                                case 'A0500':
                                    this.$message({
                                        type: 'warning',
                                        message: '服务端出现故障，提交失败！'
                                    });
                                    break;
                            }
                        }).catch(error => {
                            console.error('请求失败:', error);
                            this.$message({
                                type: 'warning',
                                message: '提交失败！'
                            });
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                } else {
                    this.$message({
                        type: 'warning',
                        message: '您的输入有误，请检查！'
                    });
                    return false;
                }
            });
        },
    }
}

</script>

<style scoped>
.element-width {
    width: 300px;
    border-radius: 10px;

}

.el-form-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 保证标签和输入框对齐 */
}
</style>