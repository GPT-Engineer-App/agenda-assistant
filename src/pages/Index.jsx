import { useState } from 'react';
import { Box, Button, Checkbox, Container, Flex, Heading, Input, List, ListItem, Text, useToast } from '@chakra-ui/react';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        description: "Please enter a task before adding.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { text: input, completed: false }]);
    setInput('');
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <Container maxW="container.md" py={8}>
      <Flex direction="column" gap={4}>
        <Heading mb={4}>Todo App</Heading>
        <Flex as="nav">
          <Button mr={2}>Home</Button>
          {/* Future navigation buttons can be added here */}
        </Flex>
        <Flex mt={4} mb={4}>
          <Input placeholder="Add a new task" value={input} onChange={handleInputChange} />
          <Button colorScheme="blue" ml={2} onClick={addTask}>Add Task</Button>
        </Flex>
        <List spacing={3}>
          {tasks.map((task, index) => (
            <ListItem key={index} d="flex" justifyContent="space-between" alignItems="center">
              <Flex alignItems="center">
                <Checkbox mr={2} onChange={() => toggleTaskCompletion(index)} />
                <Text as={task.completed ? 's' : undefined}>{task.text}</Text>
              </Flex>
              <Button colorScheme="red" onClick={() => deleteTask(index)}>Delete</Button>
            </ListItem>
          ))}
        </List>
      </Flex>
    </Container>
  );
};

export default Index;