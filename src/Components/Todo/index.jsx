import React, { useEffect, useState, useContext } from 'react';
import { SettingsContext } from '../../Context/Settings';
import useForm from '../../hooks/form';
import Header from '../Header';
import Footer from '../Footer';
import List from '../List';
import {
  TextInput,
  Button,
  Group,
  Box,
  Slider,
  Pagination,
} from '@mantine/core';
import { v4 as uuid } from 'uuid';
import './Todo.scss';

const Todo = () => {
  const { display, isCompleted } = useContext(SettingsContext);
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);
  const [currentPage, setCurrentPage] = useState(1);

  // These are for the Pagination Component
  const itemsPerPage = display;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = list.slice(startIndex, endIndex);

  function addItem(item) {
    item.id = uuid();
    item.complete = isCompleted;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <div className="todo-container">
      <Header incomplete={incomplete} />
      <form onSubmit={handleSubmit}>
        <h2>Add To Do Item</h2>
        <Box maw={340} mx='auto'>
          <TextInput
            data-testid='todo-input'
            name='text'
            label='To Do Item'
            placeholder='Item Details'
            onChange={handleChange}
          />
          <TextInput
            data-testid='assign-input'
            mt='md'
            label='Assigned To'
            name='assignee'
            placeholder='Assignee Name'
            onChange={handleChange}
          />
          <Slider
            color='blue'
            onChange={handleChange}
            defaultValue={defaultValues.difficulty}
            min={1}
            max={5}
            name='difficulty'
            step={1}
            marks={[
              { value: 1, label: '1' },
              { value: 2, label: '2' },
              { value: 3, label: '3' },
              { value: 4, label: '4' },
              { value: 5, label: '5' },
            ]}
          />
          <Group justify='center' mt='xl'>
            <Button data-testid='submit-button' variant='outline' type='submit'>
              Add Item
            </Button>
          </Group>
        </Box>
      </form>

      {itemsToDisplay
        .filter((item) => !item.complete)
        .map((item, index) => (
          <List key={index} list={item} toggleComplete={toggleComplete} />
        ))}

      <Pagination
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '2rem',
        }}
        value={currentPage}
        onChange={setCurrentPage}
        total={Math.ceil(list.length / itemsPerPage)}
        size='sm'
      />
      <Footer />
    </div>
  );
};

export default Todo;