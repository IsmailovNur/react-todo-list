import type { Todo } from "../../entities/todo/types.ts";
import type { FC } from "react";
import { TodoItem } from "../TodoItem/TodoItem.tsx";

import styles from "./TodoList.module.css";

interface TodoListProps {
  list: Todo[];
}

const TodoList: FC<TodoListProps> = ({list}) => {

  return (
    <div>
      {list.length > 0 ? (
        list.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))
      ) : (
        <div className={styles.emptyState}>No tasks found...</div>
      )}
    </div>
  );
};

export default TodoList;