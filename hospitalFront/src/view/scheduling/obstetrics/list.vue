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
            title: '妇产科',
            department: '5'
        }
    }
}
</script>

<style>

</style>