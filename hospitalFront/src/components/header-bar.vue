<template>
  <Dropdown @on-click="loginout">
        <a href="javascript:void(0)" style="color: #515a6e;">
            <Icon style="margin-top:-2px;" type="ios-contact" size="22"/>
            <span class="text">{{ user.name }}&nbsp;/&nbsp;{{ PROFESSIONAL[user.professional] }}</span>
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
            <DropdownItem name="loginout">
                <span>退出登录</span>
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
import { sessionStorage } from '@/lib/until'
import { PROFESSIONAL } from '@/lib/enums'
export default {
    data() {
        return {
            user: {},
            PROFESSIONAL
        }
    },
    created(){
        this.user = sessionStorage.get('hospital_user')
    },
    methods: {
        loginout() {
            this.$Modal.confirm({
                title: `确认退出登录？`,
                width: '520',
                onOk: () => {
                    this.$router.push('/')
                    sessionStorage.del('hospital_user')
                },
            })
        }
    }
}
</script>

<style scoped lang="less">
.text {
    margin-left: 3px;
    vertical-align: middle;
}
</style>