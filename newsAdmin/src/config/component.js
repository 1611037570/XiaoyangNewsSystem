import Table from "@/components/Table/"
import Form from "@/components/Form/"
import Search from "@/components/Search/"
import Modal from "@/components/Modal/"

export default {
  install(Vue) {
    Vue.component(Table.name, Table)
    Vue.component(Form.name, Form)
    Vue.component(Search.name, Search)
    Vue.component(Modal.name, Modal)
  }
}
