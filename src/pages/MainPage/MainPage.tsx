import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AddTodoForm } from "../../features/AddTodoForm/AddTodoForm.tsx";
import TodoList from "../../features/TodoList/TodoList.tsx";
import type { AppDispatch, RootState } from "../../app/store.ts";
import { fetchTodos } from "../../entities/todo/todoSlice.ts";
import { Typography } from "antd";
import styles from "./MainPage.module.css";

const {Title} = Typography;

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {todos} = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className={styles.mainContainer}>
      <Title className={styles.title} level={1}>Todo App</Title>
      <AddTodoForm />
      <TodoList list={todos} />
    </div>
  );
};

export default MainPage;