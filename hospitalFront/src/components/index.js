import HosTable from './hostipal-table.vue'
import SchedulingTable from './schedulingTable.vue'

const importComponent = Vue => {
    Vue.component('HosTable', HosTable)
    Vue.component('SchedulingTable', SchedulingTable)
}

export default importComponent