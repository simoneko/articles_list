import React from 'react';
import '../styles/App.css';
import ArticlesList from './ArticlesList';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { Offline, Online } from "react-detect-offline";
import Off from './Off';


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
      console.log(error);
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
      return (
        <div>
          <Online><div id="error" >{error.message}</div></Online>
          <Offline ><Off /></Offline>
        </div>
      )
    } else if (!isLoaded) {
      return (
        <div id="loader" >
          <Loader
            type="CradleLoader"
            color="#00BFFF"
            height="100"
            width="100"
          />
        </div>
      )

    } else {
      return (
        <div className="App">
          <ArticlesList
            list={list}
            showArticle={this.showArticle}
            currentID={this.state.currentID}
            isArticleOpen={this.state.isArticleOpen}
          />
          <button id="getMore" onClick={this.getMore}>Załaduj kolejne 10 artykułów</button>
        </div>
      );
    }
  }
}

export default App;
