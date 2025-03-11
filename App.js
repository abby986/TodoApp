import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, View, Button, StatusBar } from 'react-native';
import { CheckBox } from '@rneui/themed';

const TaskItem = ({ item, toggleTask }) => (
  <View style={styles.taskItem}>
    <CheckBox
      checked={item.checked}
      onPress={() => toggleTask(item.key)}
      iconType="material-community"
      checkedIcon="checkbox-marked"
      uncheckedIcon="checkbox-blank-outline"
      checkedColor="purple"
    />
    <Text style={[styles.taskText, item.checked && styles.taskTextChecked]}>{item.title}</Text>
  </View>
);


export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([
    { key: '1', title: 'Task 1', checked: false },
    { key: '2', title: 'Task 2', checked: false },
    { key: '3', title: 'Task 3', checked: false },
    { key: '4', title: 'Task 4', checked: false }
  ]);

  const toggleTask = (key) => {
    setTasks(tasks.map(task => task.key === key ? { ...task, checked: !task.checked } : task));
  };

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { key: (tasks.length + 1).toString(), title: task, checked: false }]);
      setTask('');
    }
  };

  const renderItem = ({ item }) => {
    return <TaskItem item={item} toggleTask={toggleTask} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>User1234's Tasks</Text>
      <FlatList data={tasks} renderItem={renderItem} keyExtractor={item => item.key} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task here"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Add Task" onPress={addTask} color="purple" />
      </View>
    </SafeAreaView>
  );
}

//styles
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight || 0
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  taskText: {
    marginLeft: 10,
    fontSize: 16
  },
  taskTextChecked: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 45,
    justifyContent: 'center',
  },
  input: {

    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    width: '70%',
  }
});
