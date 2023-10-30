import React, { useState } from 'react';
import { Card, Text, Badge, Button, Group } from '@mantine/core';

function List(props) {
  const { list, toggleComplete } = props;

  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
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
        fullWidth
        mt='md'
        radius='md'
      >
        Toggle Complete
      </Button>
    </Card>
  );
}

export default List;
