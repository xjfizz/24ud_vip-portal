<template>
    <el-button :loading="downloadLoading" type="primary" @click="handleDownload">导出 Excel</el-button>
</template>

<script>
    export default {
        name: 'ExportExcel',
        props: {
            list: {
                required: true,
                type: Array
            },
            tHeader: {
                required: true,
                type: Array
            },
            tValue: {
                required: true,
                type: Array
            },
            filename: {
                type: String,
                default: '物流监控'
            }
        },
        data() {
            return {
                downloadLoading: false,
                autoWidth: true,
                bookType: 'xlsx'
            }
        },
        methods: {
            handleDownload() {
                if(this.list.length === 0) {
                    return this.$message({
                        type: "warning",
                        message: '当前未选中任何数据!'
                    })
                }
                this.downloadLoading = true
                import('./Export2Excel').then(excel => {
                    const data = this.formatJson(this.tValue, this.list)
                    excel.export_json_to_excel({
                        header: this.tHeader,
                        data,
                        filename: this.filename,
                        autoWidth: this.autoWidth,
                        bookType: this.bookType
                    })
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    return v[j]
                }))
            }
        }
    }
</script>
