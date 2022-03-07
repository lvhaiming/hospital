<template>
  <section>
      <Row>
          <Table border :columns="columns" :data="data"></Table>
          <Page
            class="page"
            :current.sync="page.pageNumber"
            :total="page.totalCount"
            :page-size="page.pageSize"
            show-total
            show-elevator
            @on-change="pageNoChange"
        />
      </Row>
  </section>
</template>

<script>
export default {
    props: {
        columns: {
            type: Array,
            default() {
                return []
            }
        },
        data: {
            type: Array,
            default() {
                return []
            }
        },
        page: {
            type: Object,
            default() {
                return this.$page()
            }
        }
    },
    data() {
        return {

        }
    },
    methods: {
        pageNoChange(pageNo) {
            this.page.pageNumber = pageNo
            this.$emit('changeNo', false)
        }
    }
}
</script>

<style>

</style>