import type { FC } from "react";
import { Button, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { Todo } from "../../entities/todo/types.ts";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store.ts";
import { deleteTodo, toggleTodo } from "../../entities/todo/todoSlice.ts";

import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: FC<TodoItemProps> = ({todo}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={styles.itemCard}>
      <Checkbox
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo))}
      >
        <span className={`${todo.completed ? styles.completedText : ''}`}>
          {todo.title}
        </span>
      </Checkbox>

      <Button
        className={styles.deleteBtn}
        danger
        icon={<DeleteOutlined />}
        style={{paddingInline: '14px'}}
        onClick={() => dispatch(deleteTodo(todo.id))}
      />
    </div>
  );
};