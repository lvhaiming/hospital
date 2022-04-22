<template>
    <section class="content">
        <h3 class="page-title">权限修改</h3>
        <Form :label-width="150" ref="message" style="margin-top: 20px;width: 400px;" >
            <FormItem label="权限" >
                <Tree :data="data" show-checkbox multiple ref="tree"></Tree>
            </FormItem>
            <FormItem>
                <Button @click="cancel" style="margin-right: 20px;">
                    取消
                </Button>
                <Button @click="submit" type="primary">
                    确定
                </Button>
            </FormItem>
        </Form>
        
        
    </section>
</template>
<script>
    export default {
        data () {
            return {
                data: []
            }
        },
        created() {
            this.getTree()
            this.getTrees()
        },
        methods: {
            getTree () {
                
            },
            getTrees() {
                this.$http.post("/getAllMenus", {}).then((res) => {
                    let menu = res.data.data;
                    this.$http.post("/getPersonalTree", { professional: this.$route.query.id }).then((data) => {
                        let professional = data.data.data[0].professional_auth.split(',')
                        menu.map((item) => {
                            item.children.forEach(list => {
                                if (professional.indexOf(list.id.toString()) > -1) {
                                    list.checked = true
                                }
                            })
                        })
                        this.data = menu
                    });
                });
            },
            cancel() {
                this.$router.go(-1)
            },
            submit() {
                let data = []
                this.$refs.tree.getCheckedAndIndeterminateNodes().forEach(item => {
                    data.push(item.id)
                })
                data = data.join(',')
                this.$http.post("/updateAuth",{ professional: this.$route.query.id, auth: data }).then((res) => {
                    if (res.data.code === '0000') {
                        this.$Message.success(res.data.msg);
                        this.cancel()
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                });
            },
        }
    }
</script>
