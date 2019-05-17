<template>
    <div>
        <div class="text">
           <quill-editor 
                v-model="content" 
                ref="myQuillEditor" 
                :options="editorOption" 
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
            </quill-editor>
        </div>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
export default {
    data(){
        return{
            content:'文本编辑',
            editorOption:{}
        }
    },
    methods:{
        onEditorBlur(e){//失去焦点事件
          console.log(e)
        },
        onEditorFocus(e){//获得焦点事件
          console.log(e)
        },
        onEditorChange(e){//内容改变事件
          console.log(e)
        },
        submitForm(){
            this.$message({
                type:'success',
                message:'提交成功'
            })   
        }
    }
}
</script>

<style lang='scss' scoped>
.text{
    margin: 40px;
}
.quill-editor{
    height: 300px;
}
.el-button{
    margin: 40px 0 0 45%;
}
</style>
