<template>
  <div class="layout">
    <Layout>
        <Sider ref="side1">
            <submenu :menu="menu" @changeItem="change" :activeName="activeName"></submenu>
        </Sider>
        <Layout>
            <Header class="layout-header-bar">
                <headerbar></headerbar>
            </Header>
            <Content>
                <router-view/>
            </Content>
        </Layout>
    </Layout>
</div>
</template>

<script>
import submenu from './../../components/submenu.vue'
import headerbar from './../../components/header-bar.vue'
import { sessionStorage } from '@/lib/until'
export default {
    components: {
        submenu,
        headerbar
    },
    data () {
        return {
            menu: [
                {
                    name: 'one',
                    title: '人员管理',
                    children: [
                        {
                            name: 'personnel/user',
                            title: '用户管理'
                        },
                        {
                            name: 'personnel/auth',
                            title: '权限管理'
                        }
                    ]
                },
                {
                    name: 'one2',
                    title: '病患管理',
                    children: [
                        {
                            name: 'one-2',
                            title: '病患管理'
                        }
                    ]
                },
                {
                    name: 'one3',
                    title: '科室管理',
                    children: [
                        {
                            name: 'register1',
                            title: '急诊科'
                        },
                        {
                            name: 'login2',
                            title: '内科'
                        },
                        {
                            name: 'register3',
                            title: '外科'
                        },
                        {
                            name: 'register4',
                            title: '儿科'
                        },
                        {
                            name: 'register5',
                            title: '妇产科'
                        },
                        {
                            name: 'register6',
                            title: '肿瘤科'
                        }
                    ]
                },
                {
                    name: 'one4',
                    title: '药房管理',
                    children: [
                        {
                            name: 'login22',
                            title: '药房管理'
                        },
                        {
                            name: 'register31',
                            title: '药房人员'
                        }
                    ]
                },
                {
                    name: 'one5',
                    title: '床位管理',
                    children: [
                        {
                            name: 'login123',
                            title: '床位管理'
                        }
                    ]
                },
                {
                    name: 'one6',
                    title: '医疗费用管理',
                    children: [
                        {
                            name: 'login331',
                            title: '医疗费用管理'
                        }
                    ]
                },
                {
                    name: 'one7',
                    title: '医疗器械管理',
                    children: [
                        {
                            name: 'login1222',
                            title: '医疗器械管理'
                        }
                    ]
                }
            ],
            activeName: ''
        }
    },
    created() {
        let active =  sessionStorage.get('menu_item')
        this.activeName = active ? active : this.menu[0].children[0].name
        this.change(this.activeName)
    },
    methods: {
        collapsedSider () {
            this.$refs.side1.toggleCollapse();
        },
        change(name) {
            sessionStorage.set('menu_item', name)
            this.$router.push(`/${name}`)
        }
    },
}
</script>

<style lang='less' scoped>
.layout{
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
}
.layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.ivu-layout {
    height: 100%;
}
.layout-con{
    height: 100%;
    width: 100%;
}
.ivu-layout-content {
    border-radius: 4px;
    margin: 16px;
    background-color: #fff;
}
.ivu-layout-header {
    display: flex;
    flex-direction: row-reverse;
}
</style>