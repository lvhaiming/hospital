<template>
    <Menu ref="menu" accordion theme="dark" width="auto" @on-select="change" :active-name="activeNames">
        <submenuItem v-for="item in menu" :key="item.name" :menuItem="item"></submenuItem>
    </Menu>
</template>

<script>
import submenuItem from './submenu-item.vue'
import { sessionStorage } from '@/lib/until'
export default {
    components: {
        submenuItem
    },
    props: {},
    data() {
        return {
            menu: [],
            activeNames: ''
        }
    },
    created() {
        this.getMenus()},
    methods: {
        change(name) {
            this.$emit('changeItem', name)
        },
        getMenus() {
            this.$http.post("getMenus",{ professional: sessionStorage.get('hospital_user').professional }).then((res) => {
                this.menu = res.data.data;
                this.$nextTick(() => {
                    this.activeNames = this.$route.path.slice(1)
                    this.$refs.menu.updateOpened()
                    this.$refs.menu.updateActiveName()
                })
            });
        }
    }
}
</script>

<style>

</style>