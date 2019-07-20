import React from 'react';
import '../styles/App.css';
import ArticlesList from './ArticlesList';
import axios from 'axios';


class App extends React.Component {

  state = {
    articles: [
      {
        id: 1,
        title: "Article 1",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, consequatur."
      },
      {
        id: 2,
        title: "Article 2",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, consequatur."
      },
      {
        id: 3,
        title: "Article 3",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, consequatur."
      }
    ],
    list: [],
    error: null,
    isLoaded: false,
    open: ''
  }

  getArticles = async (query) => {
    try {
      const response = await axios.post('https://mobileapi.wp.pl/v1/graphql', {
        query
      });

      this.setState(({
        isLoaded: true,
        list: response.data.data.articles
      }))

    } catch (error) {
      this.setState(() => ({ error }))
    }
  }



  componentDidMount() {

    const query =
      `
        {
          articles(t: Article, limit: 10) {
            id
            title
            body {
              data
            }
          }
        }
      `;

    this.getArticles(query);



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
          <ArticlesList list={list} />

          {console.log(list)}

        </div>
      );
    }
  }
}

export default App;
