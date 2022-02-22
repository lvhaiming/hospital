<template>
    <Submenu :name="menuItem.name">
        <template slot="title">
            <Icon type="ios-navigate"></Icon>
            {{ menuItem.title }}
        </template>
        <MenuItem :name="item.name" v-for="item in menuItem.children" :key="item.name">{{ item.title }}</MenuItem>
    </Submenu>
</template>

<script>
export default {
    props: {
        menuItem: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>

<style>

</style>