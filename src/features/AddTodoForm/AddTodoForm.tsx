import { type FC, type SyntheticEvent, useState } from 'react';
import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { localAddTodo } from "../../entities/todo/todoSlice.ts";

import styles from './AddTodoForm.module.css';

export const AddTodoForm: FC = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(localAddTodo(text));
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      <Input
        className={styles.inputField}
        placeholder="Youre todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
        Add Todo
      </Button>
    </form>
  );
};