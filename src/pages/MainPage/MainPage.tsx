import { Typography } from "antd";
import { AddTodoForm } from "../../features/AddTodoForm/AddTodoForm.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store.ts";
import TodoList from "../../features/TodoList/TodoList.tsx";

import styles from "./MainPage.module.css";

const {Title} = Typography;

const MainPage = () => {

  const todos = useSelector((state: RootState) => state.todo.todos);

  return (
    <div className={styles.mainContainer}>
      <Title className={styles.title} level={1}>Todo App</Title>
      <AddTodoForm />
      <TodoList list={todos} />
    </div>
  );
};

export default MainPage;