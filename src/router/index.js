import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Portfolio from '@/views/website/Portfolio';
import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

// 一个空模板，方便子节点使用
// const Root = Vue.component('root', {
//     template: '<router-view></router-view>'
// });

export default new Router({
    routes: [
        {
            path: '',
            name: '官网',
            component: Home,
            icon: 'el-icon-setting',
            children: [
                {path: 'database', name: '临时用户', icon: 'el-icon-tickets', component: HelloWorld},
                {path: 'database', name: '新闻博客', icon: 'el-icon-tickets', component: HelloWorld},
                {path: 'portfolio', name: '案例展示', icon: 'el-icon-document', component: Portfolio},
                {path: 'file', name: '联系我们', icon: 'el-icon-document', component: HelloWorld}
            ]
        }
    ]
});
