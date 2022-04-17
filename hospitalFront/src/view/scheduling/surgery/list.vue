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
            title: '外科',
            department: '3'
        }
    }
}
</script>

<style>

</style>