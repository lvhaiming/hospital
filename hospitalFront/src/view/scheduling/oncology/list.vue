<template>
  <Base :tit="title" :department="department"></Base>
</template>

<script>
import Base from './../base.vue'
export default {
    components: {
        Base
    },
    data() {
        return {
            title: '肿瘤科',
            department: '6'
        }
    }
}
</script>

<style>

</style>