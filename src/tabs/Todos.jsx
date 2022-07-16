import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
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

  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {todos.map(({ id, text }, index) => (
            <GridItem key={id}>
              <Todo
                text={text}
                elementIndex={index + 1}
                handleDelete={() => this.deleteTodo(id)}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
