<template>
  <section>
      <h3 class="page-title">这是标题2</h3>
      <HosTable
        @changeNo="changeNo"
        :page="page"
        :columns="columns"
        :data="data"
      ></HosTable>
  </section>
</template>

<script>
export default {
    data() {
        return {
            page: {
                pageNumber: 1,
                pageSize: 20,
                totalCount: 100
            },
            columns: [
                {
                    title: 'Name',
                    key: 'name',
                    width: 100,
                    fixed: 'left'
                },
                {
                    title: 'Age',
                    key: 'age',
                },
                {
                    title: 'Province',
                    key: 'province'
                },
                {
                    title: 'City',
                    key: 'city'
                },
                {
                    title: 'Address',
                    key: 'address'
                },
                {
                    title: 'Postcode',
                    key: 'zip'
                },
                {
                    title: 'Action',
                    key: 'action',
                    fixed: 'right',
                    width: 120,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                }
                            }, 'View'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                }
                            }, 'Edit')
                        ]);
                    }
                }
            ],
            data: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    province: 'America',
                    city: 'New York',
                    zip: 100000
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'Washington, D.C. No. 1 Lake Park',
                    province: 'America',
                    city: 'Washington, D.C.',
                    zip: 100000
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    province: 'Australian',
                    city: 'Sydney',
                    zip: 100000
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    province: 'Canada',
                    city: 'Ottawa',
                    zip: 100000
                }
            ]
        }
    },
    methods: {
        changeNo(pageNo) {
            this.page.pageNumber = pageNo
            console.log('this.page :>> ', this.page);
        }
    }
}
</script>

<style>

</style>