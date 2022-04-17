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
            title: '内科',
            department: '2'
        }
    }
}
</script>

<style>

</style>