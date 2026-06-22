import type { FC } from "react";
import { Button, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { Todo } from "../../entities/todo/types.ts";

import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: FC<TodoItemProps> = ({todo}) => {

  return (
    <div className={styles.itemCard}>
      <Checkbox
        checked={todo.completed}
        onClick={() => {
          console.log('toggle')
        }}
      >
        <span className={`${todo.completed ? styles.completedText : ''}`}>
          {todo.title}
        </span>
      </Checkbox>

      <Button
        className={styles.deleteBtn}
        type="text"
        danger
        icon={<DeleteOutlined />}
        onClick={() => {
          console.log('delete')
        }}
      />
    </div>
  );
};