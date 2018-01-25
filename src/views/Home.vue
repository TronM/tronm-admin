<template>
    <el-container class="app-container">
        <el-header>创睦互动</el-header>
        <el-container>
            <el-aside>
                <el-menu router :default-openeds="['官网']">
                    <template v-for="(item, index) in $router.options.routes">

                        <!-- 无二级子节点 -->
                        <el-menu-item v-if="!item.children" :index="item.path" :key="index">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </el-menu-item>

                        <!-- 有二级子节点 -->
                        <el-submenu v-if="item.children" :index="item.name" :key="index">
                            <template slot="title"><i :class="item.icon"></i><span>{{ item.name }}</span></template>                            
                            <template v-for="(item1, index1) in item.children">
                                <!-- 无三级菜单 -->
                                <el-menu-item v-if="!item1.children" :index="`${item.path}/${item1.path}`" :key="index1"><i :class="item1.icon"></i>{{ item1.name }}</el-menu-item>

                                <!-- 有三级菜单 -->
                                <template v-if="item1.children">
                                    <el-submenu :index="item1.name" :key="index1">
                                        <template slot="title"><i :class="item1.icon"></i><span>{{ item1.name }}</span></template>
                                        <el-menu-item
                                            v-for="(item2, index2) in item1.children"
                                            :index="`${item.path}/${item1.path}/${item2.path}`"
                                            :key="index2">
                                            <i :class="item2.icon"></i>{{ item2.name }}
                                        </el-menu-item>
                                    </el-submenu>
                                </template>
                            </template>
                        </el-submenu>
                        <!--  -->
                    </template>
                </el-menu>
            </el-aside>
            <el-main>
                <el-col :span="24" class="breadcrumb">
                    <strong class="title">{{$route.name}}</strong>
                    <el-breadcrumb separator="/" class="breadcrumb-inner">
                        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
                <transition name="fade" mode="out-in">
                    <router-view/>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default { };
</script>

<style lang="less">
@import '../assets/style/config.less';

.app-container {
    flex-direction: column;
    height: 100vh;

    >header {
        flex: 0 0 60px;
        line-height: 60px;
        background-color: @color-primary;
        color:#fff;
    }

    >section {

        >aside {
            flex: 0 0 200px;

            >ul {
                height: 100%;
            }
        }
    }
}

.breadcrumb {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
</style>