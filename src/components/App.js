import { Component } from 'react';
import { QuizList } from './QuizList/QuizList';
import initialQuizItems from '../data.json';
import { SearchBar } from './SearchBar/SearchBar';
import { QuizForm } from './QuizForm/QuizForm';

export class App extends Component {
  state = {
    quizItems: initialQuizItems,
    filters: {
      topic: '',
      level: 'all',
    },
  };

  deleteQuizItem = quizId => {
    this.setState(prevState => ({
      quizItems: prevState.quizItems.filter(quiz => quiz.id !== quizId),
    }));
  };

  changeFilter = (key, value) => {
    this.setState(prevState => ({
      // для вложеностей 2рівня
      filters: {
        ...prevState.filters,
        [key]: value,
      },
    }));
  };

  getVisibleItems = () => {
    const { quizItems, filters } = this.state;

    return quizItems.filter(quiz => {
      const topicFilter = filters.topic.toLocaleLowerCase();
      const hasTopic = quiz.topic.toLocaleLowerCase().includes(topicFilter);

      if (filters.level === 'all') {
        return hasTopic;
      }

      return hasTopic && quiz.level === filters.level;
    });
  };

  render() {
    const { filters } = this.state;
    const visibleItems = this.getVisibleItems();

    return (
      <div>
        <QuizForm />
        <SearchBar filters={filters} onChangeFilter={this.changeFilter} />
        <QuizList items={visibleItems} onDelete={this.deleteQuizItem} />
      </div>
    );
  }
}
