<template>
    <div class="portfolio" ref="database">
		<el-col :span="24" class="toolbar">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" @click="create()">新建</el-button>
				</el-form-item>
				<el-form-item>
                    <el-input v-model="filters.tag" placeholder="输入标签名称" @keyup.enter.native="search()">
                        <template slot="prepend">标签</template>
                        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                    </el-input>
				</el-form-item>
			</el-form>
		</el-col>

        <el-table :data="list" stripe border style="width: 100%" ref="table">
            <el-table-column label="公开" width="80" align="center">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.isPublish" @change="changePublish(scope.row.id)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="headline" label="标题"></el-table-column>
            <el-table-column prop="operation" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-col :span="24" class="footerbar">
            <el-pagination class="pagination"
                background
                layout="prev, pager, next" 
                :total="total" 
                :page-size="pagesize"
                :current-page.sync="page"
                @current-change="handleCurrentChange">
            </el-pagination>
        </el-col>

        <el-dialog :title="form.editId === 0 ? '新建' : '修改'" :visible.sync="form.visible" width="80%">
            <el-form :model="form.fields" ref="form" :rules="form.rules" label-width="120px">
                <el-form-item label="标题" prop="headline">
                    <el-input v-model="form.fields.headline" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="tag">
                    <el-tag :key="tag1" v-for="tag1 in form.fields.tag" closable @close="closeTag(tag1)">{{tag1}}</el-tag>
                    <el-input class="input-new-tag" v-if="tagVisible" v-model="tagValue" ref="formTagInput" size="small" @keyup.enter.native="saveTag()" @blur="saveTag()"></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showTag()">+ New Tag</el-button>
                </el-form-item>
                 <el-form-item label="PC链接地址" prop="browseUrl.pc">
                    <el-input placeholder="请输入链接地址" v-model="form.fields.browseUrl.pc">
                        <template slot="prepend">Http://</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="h5链接地址" prop="browseUrl.h5">
                    <el-input placeholder="请输入链接地址" v-model="form.fields.browseUrl.h5">
                        <template slot="prepend">Http://</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="头图" prop="headlineImage">
                    <el-upload
                    class="avatar-uploader"
                    name="avatar"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="addHeadlineImage">
                    <img v-if="form.fields.headlineImage" :src="form.fields.headlineImage" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="正文" prop="body">
                    <Editor v-model="form.fields.body"></Editor>
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
import Editor from '@/components/Editor.vue'; // 调用编辑器
import api from '@/api/website/portfolio';
import config from '@/config';

const fields = {
    headline: '',
    body: '',
    headlineImage: '',
    isPublish: false,
    tag: [],
    browseUrl: {
        h5: '',
        pc: ''
    }
};

export default {
    components: {Editor},
    data() {
        return {
            ...config,
            list: [],
            total: 30,
            page: 1,
            tagVisible: false,                  // 标签
            tagValue: '',                       // 标签值
            filters: {
                tag: ''
            },
            form: {
                visible: false,
                editId: 0,
                fields,
                rules: {
                    headline: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 1, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
                    ]
                }
            }
        };
    },
    created() {
        this.loadList(this.page, this.pagesize);
    },
    methods: {
        async loadList(page, pagesize) {
            // const { total, list } = await api.list({page, pagesize});
            const list = await api.list({page, pagesize, filters: this.filters});
            this.list = list;
        },
        search() {
            console.log(112233);
            this.loadList(1, this.pagesize);
        },
        handleCurrentChange(page) {
            this.loadList(page, this.pagesize);
        },
        async save() {
            const valid = await this.$refs['form'].validate().then(valid => valid).catch(() => false);

            if (valid) {
                await (this.form.editId === 0 ? api.insert(this.form.fields) : api.update(this.form.editId, this.form.fields));
                this.loadList(this.page, this.pagesize);
                this.form.visible = false;
            }
        },
        create() {
            this.form.editId = 0;
            this.form.fields = Object.assign({}, fields);
            this.form.visible = true;
            this.$nextTick(() => this.$refs['form'].resetFields());
        },
        edit(row) {
            this.form.editId = row.id;
            this.form.fields = Object.assign({}, row);
            this.form.visible = true;
            this.$nextTick(() => this.$refs['form'].clearValidate());
        },
        async del(id) {
            const valid = await this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => true).catch(() => false);

            if (valid) {
                await api.del(id);
                this.loadList(this.page, this.pagesize);
            }
        },
        showTag() {
            this.tagVisible = true;
            this.$nextTick(() => this.$refs['formTagInput'].$refs.input.focus());
        },
        saveTag() {
            if (this.tagValue && this.form.fields.tag.indexOf(this.tagValue) === -1) {
                this.form.fields.tag.push(this.tagValue);
            }
            this.tagVisible = false;
            this.tagValue = '';
        },
        closeTag(tag) {
            this.form.fields.tag.splice(this.form.fields.tag.indexOf(tag), 1);
        },
        addHeadlineImage(response) {
            const path = response.data.path + '/' + response.data.filename;
            this.form.fields.headlineImage = path;
        }
    }
};
</script>

<style lang="less">
.portfolio {
    .el-tag + .el-tag, .el-tag + .button-new-tag, .el-tag + .input-new-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        vertical-align: bottom;
        top: 1px;

        input {
            font-size: 12px;
        }
    }

    .avatar-uploader {
        height: 88px;

        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 158px;
            height: 88px;
            line-height: 88px;
            text-align: center;
        }
    }

    .avatar {
        width: 158px;
        height: 88px;
        display: block;
    }
}

</style>