<template>
  <div class="layout">
    <Layout>
        <Sider ref="side1">
            <submenu @changeItem="change"></submenu>
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
export default {
    components: {
        submenu,
        headerbar
    },
    data () {
        return {}
    },
    created() {
        
    },
    methods: {
        change(name) {
            this.$router.push(`/${name}`)
        },
        
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