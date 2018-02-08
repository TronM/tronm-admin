import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import Portfolio from '@/views/website/Portfolio';
import Blog from '@/views/website/Blog';
import Guest from '@/views/website/Guest';
import Message from '@/views/website/Message';

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
                {path: 'guest', name: '临时用户', icon: 'el-icon-tickets', component: Guest},
                {path: 'blog', name: '新闻博客', icon: 'el-icon-tickets', component: Blog},
                {path: 'portfolio', name: '案例展示', icon: 'el-icon-document', component: Portfolio},
                {path: 'message', name: '联系我们', icon: 'el-icon-document', component: Message}
            ]
        },
        {
            path: '/login',
            name: '登陆',
            hidden: true,
            component: Login
        }
    ]
});
