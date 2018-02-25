<template>
    <div class="vue-quill-editor">
        <!--富文本编辑器组件-->
         <quill-editor
            v-model="content"
            :options="editorOptions"
        ></quill-editor>
    </div>
</template>
<script>
import {quillEditor} from 'vue-quill-editor'; // 调用编辑器
import config from '@/config';
import {quillRedefine} from '@/helper/editor-config';
// import {editorOptions} from '../helper/editor-config';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
    components: {quillEditor},
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            editorOptions: null
        };
    },
    created() {
        let self = this;
        this.editorOptions = quillRedefine({
            // theme: 'bubble',
            // 图片上传的设置
            uploadConfig: {
                action: config.upload.url,  // 必填参数 图片上传地址
                // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
                // 你必须把返回的数据中所包含的图片地址 return 回去
                res: (res) => {
                    return config.server.img + '/' + res.data.path + '/' + res.data.filename;
                },
                name: config.upload.name,  // 图片上传参数名
                success() {
                    self.$notify.success({message: '上传成功'});
                }
            }
        });
    },
    computed: {
        content: {
            get: function get() {
                return this.value;
            },
            set: function set(value) {
                this.$emit('input', value);
            }
        }
    }
};
</script>

<style lang="less">
@import '../assets/style/config.less';

.vue-quill-editor {
    // border:1px solid @color-border1;
    // border-radius: 4px;
}

.quill-editor {
    // height: 30vh;
}

// .ql-editor {
//     height:20rem;
// }
</style>
