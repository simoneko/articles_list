import React from 'react';
import '../styles/App.css';
import ArticlesList from './ArticlesList';
import axios from 'axios';


class App extends React.Component {

  state = {
    list: [],
    error: null,
    isLoaded: false,
    currentID: '',
    isArticleOpen: false,
    offset: 0
  }

  getArticles = async (offset) => {
    const query =
      `
      {
        articles(t: Article, limit: 10, offset: ${offset}) {
          id
          title
          body {
            data
          }
          img {
            original_url
            description
          }
        }
      }
    `;

    try {
      const response = await axios.post('https://mobileapi.wp.pl/v1/graphql', {
        query
      });

      this.setState(({
        isLoaded: true,
        list: [...this.state.list, ...response.data.data.articles],
      }))

    } catch (error) {
      this.setState(() => ({ error }))
    }
  }

  showArticle = (newID) => {
    this.setState({
      currentID: newID,
    })
  }

  getMore = () => {
    this.getArticles(this.state.offset + 10);
    this.setState({ offset: this.state.offset + 10 })
  }

  componentDidMount() {
    this.getArticles(0);
  }

  render() {
    const { error, isLoaded, list } = this.state;

    if (error) {
      console.log(error.response)
      return <div>{error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="App">
          <ArticlesList
            list={list}
            showArticle={this.showArticle}
            currentID={this.state.currentID}
            isArticleOpen={this.state.isArticleOpen}
          />
          <button onClick={this.getMore}>Załaduj kolejne 10 artykułów</button>
        </div>
      );
    }
  }
}

export default App;
