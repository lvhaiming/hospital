<template>
    <Menu ref="menu" accordion theme="dark" width="auto" @on-select="change" :active-name="activeNames">
        <submenuItem v-for="item in menu" :key="item.name" :menuItem="item"></submenuItem>
    </Menu>
</template>

<script>
import submenuItem from './submenu-item.vue'
export default {
    components: {
        submenuItem
    },
    props: {
        menu: {
            type: Array,
            default() {
                return []
            }
        },
        activeName: {
            type: String,
            default() {
                return ''
            }
        }
    },
    data() {
        return {
            activeNames: ''
        }
    },
    mounted() {
        this.setMenuActive(this.activeName)
    },
    methods: {
        change(name) {
            this.$emit('changeItem', name)
        },
        setMenuActive(name) {
            this.activeNames = name
            this.$nextTick(() => {
                this.$refs.menu.updateOpened()
                this.$refs.menu.updateActiveName()
            })
        }
    }
}
</script>

<style>

</style>