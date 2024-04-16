<template>
    <div class="main">
        <!-- 表格 -->
        <el-table v-if="!isLoading && !isEmpty" :data="tableData" stripe style="width: 100% ;" height="459"
            size="medium">
            <el-table-column prop="id" label="序号" width="60" fixed>
            </el-table-column>
            <el-table-column prop="studentId" label="学号" width="100">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="100">
            </el-table-column>
            <el-table-column prop="className" label="班级" width="100">
            </el-table-column>
            <el-table-column prop="qq" label="qq" width="150">
            </el-table-column>
            <el-table-column prop="phoneNum" label="电话" width="150">
            </el-table-column>
            <el-table-column prop="organizationName1" label="第一志愿" width="150">
            </el-table-column>
            <el-table-column prop="branch1" label="第一志愿部门" width="150">
            </el-table-column>
            <el-table-column prop="reason1" label="第一志愿原因" width="200">
            </el-table-column>
            <el-table-column prop="organizationName2" label="第二志愿" width="150">
            </el-table-column>
            <el-table-column prop="branch2" label="第二志愿部门" width="150">
            </el-table-column>
            <el-table-column prop="reason2" label="第二志愿原因" width="200">
            </el-table-column>
            <el-table-column prop="isDispensing" label="是否接受调剂" width="160">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.isDispensing" type="success">接受调剂</el-tag>
                    <el-tag v-else type="info">不接受调剂</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="right" width="150" fixed="right">
                <template v-slot:header>
                    <el-input size="mini" placeholder="输入关键字搜索" v-model="searchQuery" @input="startSearchTimer" />
                </template>
                <template v-slot:default="scope">
                    <el-button size="mini"
                        @click="handleEdit(scope.$index, scope.row); dialogFormVisible = true">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 加载部分 -->
        <div v-if="isLoading" class="skeleton-wrapper">
            <el-skeleton :rows="12" animated>
                <el-skeleton-item variant="text" :row="1" :style="{ height: '50px' }"></el-skeleton-item>
                <el-skeleton-item variant="text" :row="1" :style="{ height: '50px' }"></el-skeleton-item>
                <el-skeleton-item variant="text" :row="1" :style="{ height: '50px' }"></el-skeleton-item>
                <el-skeleton-item variant="text" :row="1" :style="{ height: '50px' }"></el-skeleton-item>
                <el-skeleton-item variant="text" :row="1" :style="{ height: '50px' }"></el-skeleton-item>
                <el-skeleton-item variant="text" :row="1" :style="{ height: '50px' }"></el-skeleton-item>
                <el-skeleton-item variant="text" :row="1" :style="{ height: '50px' }"></el-skeleton-item>
                <el-skeleton-item variant="text" :row="1" :style="{ height: '50px' }"></el-skeleton-item>
                <el-skeleton-item variant="text" :row="1" :style="{ height: '50px' }"></el-skeleton-item>
                <el-skeleton-item variant="text" :row="1" :style="{ height: '50px' }"></el-skeleton-item>
                <el-skeleton-item variant="text" :row="1" :style="{ height: '50px' }"></el-skeleton-item>
                <el-skeleton-item variant="text" :row="1" :style="{ height: '50px' }"></el-skeleton-item>
            </el-skeleton>
        </div>
        <!-- 空页面 -->
        <el-empty v-if="!isLoading && isEmpty" description="暂无数据"></el-empty>
        <!-- 页码 -->
        <div class="page">
            <el-pagination v-if="!isLoading && !isEmpty" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15]"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalItem">
            </el-pagination>
        </div>
        <!-- 对话框 -->
        <el-dialog title="修改学生信息" :visible.sync="dialogFormVisible">
            <div class="dialog-content">
                <el-form :model="form" label-width="110px" :rules="rules" ref="formRef">
                    <h2>个人信息</h2>
                    <el-form-item label="学号" prop="studentId">
                        <el-input v-model="form.studentId" disabled style="width: 192.5px;"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="form.name" label="姓名" placeholder="请输入姓名" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="qq号" prop="qq">
                        <el-input v-model="form.qq" label="qq号" placeholder="请输入qq号" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phoneNum">
                        <el-input v-model="form.phoneNum" label="手机号" placeholder="请输入手机号" clearable></el-input>
                    </el-form-item>
                    <h2>专业与班级</h2>
                    <el-form-item label="专业" prop="major">
                        <el-select v-model="form.major" placeholder="请选择专业" clearable>
                            <el-option v-for="major in majorData" :key="major.value" :label="major.label"
                                :value="major.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级" prop="className">
                        <el-select v-model="form.className" placeholder="请选择班级" clearable>
                            <el-option v-for="classItem in selectedClasses" :key="classItem.value"
                                :label="classItem.label" :value="classItem.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <h2>第一志愿</h2>
                    <el-form-item label="第一志愿组织" prop="organizationName1">
                        <el-select v-model="form.organizationName1" placeholder="请选择第一志愿组织" clearable>
                            <el-option v-for="organization in organizationData" :key="organization.value"
                                :label="organization.label" :value="organization.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="第一志愿部门" prop="branch1">
                        <el-select v-model="form.branch1" placeholder="请选择第一志愿部门" clearable>
                            <el-option v-for="Item in filteredFirstBranchOptions" :key="Item.value" :label="Item.label"
                                :value="Item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="第一志愿原因" prop="reason1">
                        <el-input type="textarea" v-model="form.reason1" placeholder="请输入您选择该部门的原因" clearable
                            style="width: 192.5px; "></el-input>
                    </el-form-item>
                    <h2>第二志愿</h2>
                    <el-form-item label="第二志愿组织" prop="organizationName2">
                        <el-select v-model="form.organizationName2" placeholder="请选择第二志愿组织" clearable>
                            <el-option v-for="organization in organizationData" :key="organization.value"
                                :label="organization.label" :value="organization.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="第二志愿部门" prop="branch2">
                        <el-select v-model="form.branch2" placeholder="请选择第二志愿部门" clearable>
                            <el-option v-for="Item in filteredSecondBranchOptions" :key="Item.value" :label="Item.label"
                                :value="Item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="第二志愿原因" prop="reason2">
                        <el-input type="textarea" v-model="form.reason2" placeholder="请输入您选择该部门的原因" clearable
                            style="width: 192.5px;"></el-input>
                    </el-form-item>
                    <h2>是否接受调剂</h2>
                    <el-switch v-model="form.isDispensing" active-text="接受调剂" inactive-text="不接受调剂">
                    </el-switch>

                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEdit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'//引入axios
export default {
    name: 'admin_student',
    data() {
        return {
            tableData: [],//表格数据
            currentPage: 1,//当前页码
            pageSize: 10,//每页显示条数
            totalItem: 0,//总条数
            isLoading: true,//加载状态
            isEmpty: false,//是否为空
            form: {},//表单数据
            searchQuery: '', // 搜索关键字
            dialogFormVisible: false,//对话框显示状态
            searchTimer: null,//搜索定时器
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
            ],//专业数据
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
            ],//组织数据
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
                organizationName1: [
                    { required: true, message: '第一志愿组织不能为空', trigger: 'change' }
                ],
                branch1: [
                    { required: true, message: '第一志愿部门不能为空', trigger: 'change' }
                ],
                reason1: [
                    { required: true, message: '您选择该部门的原因不能为空', trigger: 'blur' }
                ],

            }//基本表单验证规则
        }
    },
    created() {//页面加载时加载数据
        this.loadData(false)
    },
    methods: {
        loadData(isSearch = false) {//加载数据
            this.isLoading = true;
            let apiURL = 'http://101.43.254.115:11115/get/allForm'
            let params = {
                page: this.currentPage,
                numPerPage: this.pageSize
            }//请求参数
            if (isSearch) {
                apiURL = 'http://101.43.254.115:11115/get/searchForm';
                params.keyWord = this.searchQuery;
            }
            axios.get(apiURL, {
                params: params,
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }).then(res => {
                this.isLoading = false
                if (res.data.code === '00000') {
                    this.tableData = res.data.data.data
                    this.totalItem = res.data.data.total
                    if (isSearch) {
                        this.isEmpty = false;
                    } else {
                        this.isEmpty = this.tableData.length === 0;
                    }
                }
                else {
                    this.$message.error("加载失败")
                    this.isEmpty = true
                    this.isLoading = false
                }

            }).catch(err => {
                console.log(err);
                this.isEmpty = true;
                this.isLoading = false;
                this.$message.error('请求失败，请检查网络');
            })
        },
        handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.loadData(this.searchQuery !== '');//判断是否搜索
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.loadData(this.searchQuery !== '');//判断是否搜索
        },
        handleEdit(index, row) {
            this.form = Object.assign({}, row)//深拷贝，避免影响原数据
            this.dialogFormVisible = true;
        },
        submitEdit() {//提交修改
            this.$refs.formRef.validate((valid) => {//表单验证
                if (valid) {
                    this.PackageForm = {//封装表单数据
                        studentId: this.form.studentId,
                        name: this.form.name,
                        qq: this.form.qq,
                        phoneNum: this.form.phoneNum,
                        major: this.form.major,
                        className: this.form.className,
                        organization1: {
                            organizationName: this.form.organizationName1,
                            branch: this.form.branch1,
                            reason: this.form.reason1
                        },
                        organization2: {
                            organizationName: this.form.organizationName2,
                            branch: this.form.branch2,
                            reason: this.form.reason2
                        },
                        isDispensing: this.form.isDispensing
                    }
                    this.$confirm('确认修改该学生信息吗吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        axios.post('http://101.43.254.115:11115/api/post/form', this.PackageForm).then(res => {
                            switch (res.data.code) {
                                case '00000':
                                    this.$message.success('修改成功')
                                    this.dialogFormVisible = false;
                                    this.loadData(false)
                                    break
                                case 'A0400':
                                    this.$message.error('前端传参错误')
                                    this.dialogFormVisible = false;
                                    break
                                case 'A0501':
                                    this.$message.error('服务器出现故障')
                                    this.dialogFormVisible = false;
                                    break
                            }
                        }).catch(err => {
                            console.log(err);
                            this.$message.error('请求失败，请检查网络')
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消修改'
                        });
                    });
                } else {
                    this.$message({
                        type: 'warning',
                        message: '您的输入有误，请检查！'
                    });
                }
                return false;
            }
            )
        },
        handleDelete(index, rowData) {
            this.$confirm('确认删除这名学生的信息吗?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.post('http://101.43.254.115:11115/deleteForm', {
                    studentId: rowData.studentId
                }, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                    .then(response => {
                        if (response.data.code === '00000') {
                            console.log(response)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.loadData(false);
                        } else {
                            this.$message.error('删除失败: ' + response.data.message);
                            console.log(response)
                        }
                    })
                    .catch(error => {
                        this.$message.error('网络错误，删除失败');
                        console.log(error);
                    });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        startSearchTimer() {//防抖操作，避免请求次数过多
            // 清除之前的定时器
            clearTimeout(this.searchTimer);

            // 启动新的定时器
            this.searchTimer = setTimeout(() => {
                // 在定时器回调中执行搜索操作
                this.search();
            }, 500); // 在用户停止输入500毫秒后执行搜索操作，可以根据需要调整时间
        },
        search() {
            this.currentPage = 1;
            this.loadData(true);
        }
    },
    computed: {
        //查找专业对应班级
        selectedClasses() {
            const selectedMajorData = this.majorData.find(major_in => major_in.value === this.form.major);
            return selectedMajorData ? selectedMajorData.children : [];
        },
        //查找第一志愿对应下属部门
        selectedOrganizationBranch() {
            const selectedOrganizationData = this.organizationData.find(organization => organization.value === this.form.organizationName1);
            return selectedOrganizationData ? selectedOrganizationData.children : [];
        },
        //查找第二志愿对应下属部门
        selectedSecondOrganizationBranch() {
            const selectedOrganizationData = this.organizationData.find(organization => organization.value === this.form.organizationName2);
            return selectedOrganizationData ? selectedOrganizationData.children : [];

        },
        //过滤，保证选择过的部门不再显示
        filteredFirstBranchOptions() {
            const org = this.organizationData.find(o => o.value === this.form.organizationName1);
            if (!org) return [];
            const branches = org.children;
            return this.form.branch2 ? branches.filter(b => b.value !== this.form.branch2) : branches;
        },
        filteredSecondBranchOptions() {
            const org = this.organizationData.find(o => o.value === this.form.organizationName2);
            if (!org) return [];
            const branches = org.children;
            return this.form.branch1 ? branches.filter(b => b.value !== this.form.branch1) : branches;
        },
        secondVolunteerRules() {
            if (this.form.organizationName2) {  // 检查是否选择了第二志愿组织
                return {
                    branch2: [
                        { required: true, message: '第二志愿部门不能为空', trigger: 'change' }
                    ],
                    reason2: [
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
    }

}
</script>

<style scoped>
.main {
    background: white;
    padding: 20px;
    height: 500px;
}

.el-pagination {
    margin-top: 15px;
    text-align: end;
}

.skeleton-wrapper {
    padding: 20px;
    background: white;
}

.el-empty {
    padding: 100px 0;
    height: 459px;
}

.dialog-footer {
    text-align: right;
}

.el-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.el-form-item {
    position: relative;
    left: -45px
}

.dialog-content {
    max-height: 400px;
    overflow-y: auto;
    padding: 20px;
}
</style>