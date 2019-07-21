import React from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { Offline, Online } from "react-detect-offline";

import ArticlesList from './ArticlesList';
import Off from './Off';

import '../styles/App.css';

class App extends React.Component {

  state = {
    list: [],
    error: null,
    isLoaded: false,
    currentID: '',
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
      this.setState(() => ({ error, isLoaded: true }))
      setTimeout(() => {
        this.setState({ error: null })
      }, 8000);
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

    if (!isLoaded) {
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
          {error && <div>
            <Online><div id="error" >{error.message}</div></Online>
            <Offline ><Off /></Offline>
          </div>}
          <ArticlesList
            list={list}
            showArticle={this.showArticle}
            currentID={this.state.currentID}
          />
          <button id="getMore" onClick={this.getMore}>{list.length ? "Załaduj kolejne 10 artykułów" : "Załaduj artykuły"}</button>
        </div>
      );
    }
  }
}

export default App;