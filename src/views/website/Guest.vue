<template>
    <div class="guest">
		<el-col :span="24" class="toolbar">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" @click="create()">新建</el-button>
				</el-form-item>
			</el-form>
		</el-col>

        <el-table :data="list" stripe border style="width: 100%" ref="table">
            <el-table-column prop="ownedByGroup" label="用户名" width="200"></el-table-column>
            <el-table-column prop="headline" label="有效期" width="200"></el-table-column>
            <el-table-column prop="headline" label="邮箱"></el-table-column>
            <el-table-column prop="operation" label="操作" width="200">
                <!-- <template slot-scope="scope">
                    <el-button size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="del(scope.row.id)">删除</el-button>
                </template> -->
            </el-table-column>
        </el-table>

        <!-- <el-col :span="24" class="footerbar">
            <el-pagination class="pagination"
                background
                layout="prev, pager, next" 
                :total="total" 
                :page-size="pagesize"
                :current-page.sync="page"
                @current-change="handleCurrentChange">
            </el-pagination>
        </el-col> -->

        <el-dialog title="新建用户" :visible.sync="form.visible" :before-close="closeDialog">
            <el-form :model="form.fields" ref="form" :rules="form.rules" label-width="120px">
                <el-form-item label="用户名" prop="id">
                    <el-input v-model="form.fields.id" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="form.fields.email" placeholder="电子邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.fields.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <!-- <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input type="password" v-model="form.fields.email" placeholder="请再次输入密码"></el-input>
                </el-form-item> -->
                <el-form-item label="有效期" prop="expiresIn">
                    <el-input v-model="form.fields.expiresIn" placeholder="有效期"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="form.visible = false">取 消</el-button>
                <el-button type="primary" @click="save()">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api from '@/api/website/guest';

const fields = {
    id: '',
    email: '',
    password: '',
    // confirmPassword: '',
    expiresIn: ''
};

export default {
    data() {
        return {
            list: [],
            form: {
                visible: false,
                fields,
                rules: {
                    id: [
                        { required: true, message: '请输入用户名，3 到 30 个字符', trigger: 'blur' },
                        { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                    ]
                }
            }
        };
    },
    methods: {
        closeDialog(done) {
            this.$nextTick(() => this.$refs['form'].resetFields());
            done();
        },
        create() {
            this.form.fields = Object.assign({}, fields);
            this.form.visible = true;
            this.$nextTick(() => this.$refs['form'].resetFields());
        },
        async save() {
            const valid = await this.$refs['form'].validate().then(valid => valid).catch(() => false);

            if (valid) {
                await api.insert(this.form.fields);
                // this.loadList(this.page, this.pagesize);
                this.form.visible = false;
            }
        }
    }
};
</script>

<style lang="less">

</style>


