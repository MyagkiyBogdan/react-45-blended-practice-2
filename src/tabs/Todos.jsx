import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
    isEditing: false,
    currentTodo: {},
  };

  componentDidMount() {
    const parsedTodos = JSON.parse(localStorage.getItem('todos')) ?? [];
    this.setState({ todos: parsedTodos });
  }

  componentDidUpdate(prevProps, prevState) {
    const { todos } = this.state;

    if (prevState.todos !== todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  handleSubmit = data => {
    this.addTodo(data);
  };

  addTodo = text => {
    const todo = {
      id: nanoid(),
      text,
    };
    this.setState(prevState => ({ todos: [...prevState.todos, todo] }));
  };

  deleteTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  editTodo = todo => {
    this.setState({ isEditing: true, currentTodo: { ...todo } });
  };

  canselEditTodo = () => {
    this.setState({ isEditing: false });
  };

  handleInputEditChange = event => {
    const { currentTodo } = this.state;
    this.setState({
      currentTodo: { ...currentTodo, text: event.target.value },
    });
  };

  handleUpdateTodo = (id, updatedTodo) => {
    const { todos } = this.state;

    const updatedItem = todos.map(todo => {
      return todo.id === id ? updatedTodo : todo;
    });

    this.setState({
      isEditing: false,
      todos: updatedItem,
    });
  };

  handleEditFormUpdate = e => {
    e.preventDefault();

    const { currentTodo } = this.state;

    if (currentTodo.text.trim() === '') {
      return alert('Enter some text!');
    }

    this.handleUpdateTodo(currentTodo.id, currentTodo);
  };

  render() {
    const { todos, isEditing, currentTodo } = this.state;
    return (
      <>
        {isEditing ? (
          <EditForm
            onCansel={this.canselEditTodo}
            currentTodo={currentTodo}
            onChange={this.handleInputEditChange}
            onEdit={this.handleEditFormUpdate}
          />
        ) : (
          <SearchForm onSubmit={this.handleSubmit} />
        )}
        <Grid>
          {todos.map(({ id, text }, index) => (
            <GridItem key={id}>
              <Todo
                text={text}
                elementIndex={index + 1}
                handleDelete={() => this.deleteTodo(id)}
                handleEdit={() => this.editTodo({ id, text })}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
