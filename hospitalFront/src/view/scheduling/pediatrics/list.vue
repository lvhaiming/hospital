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
            title: '儿科',
            department: '4'
        }
    }
}
</script>

<style>

</style>