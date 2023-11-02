import React from 'react';
import { Card, Text, Badge, Button } from '@mantine/core';
import './List.scss';
import Auth from '../Auth/Auth';

function List(props) {
  const { list, toggleComplete } = props;

  return (
    <div className='list-container'>
      <Card
        className='card-container'
        shadow='sm'
        padding='lg'
        radius='md'
        withBorder
      >
        <Badge className='badge' variant='light'>
          Complete: {list.complete.toString()}
        </Badge>

        <Text className='assignee' mt='md' fw={500}>
          {list.assignee}
        </Text>

        <Text className='text' mt='sm' size='sm' c='dimmed'>
          {list.text}
        </Text>

        <Text className='difficulty' mt='sm' size='sm' c='dimmed'>
          Difficulty: {list.difficulty}
        </Text>

        <Auth capability={'update'}>
          <Button
            onClick={() => toggleComplete(list.id)}
            variant='light'
            color='blue'
            className='complete-button'
            radius='md'
          >
            Toggle Complete
          </Button>
        </Auth>
      </Card>
    </div>
  );
}

export default List;
