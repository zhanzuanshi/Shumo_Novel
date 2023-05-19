import {
  Container,
  Button,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Table,
  TableColumn,
  Pagination,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Select,
  Option,
} from "element-ui";
import Vue from "vue";
let pulgins = [
  Container,
  Button,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Table,
  TableColumn,
  Pagination,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Select,
  Option,
];
function getElement() {
  pulgins.forEach((item) => {
    return Vue.use(item);
  });
}
getElement();
