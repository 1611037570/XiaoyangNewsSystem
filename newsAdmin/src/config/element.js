import {
  Button,
  Form,
  FormItem,
  Input,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  Submenu,
  MenuItem,
  Table,
  TableColumn,
  pagination,
  Row,
  Col,
  Select,
  DatePicker,
  Message,
  MessageBox,
  Dialog,
  Option,
  Image,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar
} from "element-ui"

const components = [
  Button,
  Form,
  FormItem,
  Input,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  Submenu,
  MenuItem,
  Table,
  TableColumn,
  pagination,
  Row,
  Col,
  Select,
  DatePicker,
  Dialog,
  Option,
  Image,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar
]

export default {
  Message,
  MessageBox,
  install: function (Vue) {
    components.forEach((cpn) => Vue.component(cpn.name, cpn))
  }
}
