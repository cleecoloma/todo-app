import React from 'react';
import { Card, Text, Badge, Button } from '@mantine/core';

function List(props) {
  const { list, toggleComplete } = props;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Card style={{ width:'60%', marginTop:'2rem' }} shadow='sm' padding='lg' radius='md' withBorder>
      <Badge color='pink' variant='light'>
        Complete: {list.complete.toString()}
      </Badge>

      <Text mt='md' fw={500}>
        {list.assignee}
      </Text>

      <Text mt='sm' size='sm' c='dimmed'>
        {list.text}
      </Text>

      <Text mt='sm' size='sm' c='dimmed'>
        Difficulty: {list.difficulty}
      </Text>

      <Button
        onClick={() => toggleComplete(list.id)}
        variant='light'
        color='blue'
        mt='md'
        radius='md'
      >
        Toggle Complete
      </Button>
    </Card>
    </div>
  );
}

export default List;
