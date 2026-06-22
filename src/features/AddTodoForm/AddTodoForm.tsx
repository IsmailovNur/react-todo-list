import { type FC, type SyntheticEvent, useState } from 'react';
import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, fetchTodos } from "../../entities/todo/todoSlice.ts";
import type { AppDispatch, RootState } from "../../app/store.ts";

import styles from './AddTodoForm.module.css';

export const AddTodoForm: FC = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading} = useSelector((state: RootState) => state.todo);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;

    try {
      await dispatch(addTodo(text));
      await dispatch(fetchTodos());
      setText('');
    } catch (err) {
      console.error("Failed to add todos", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      <Input
        className={styles.inputField}
        placeholder="Your todo..."
        value={text}
        disabled={isLoading}
        onChange={(e) => setText(e.target.value)}
      />

      <Button
        className={styles.formBtn}
        type="primary"
        htmlType="submit"
        icon={<PlusOutlined />}
        loading={isLoading}
      >
        Add Todo
      </Button>
    </form>
  );
};