import React from 'react';
import '../styles/Article.css';
import ReactHtmlParser from 'react-html-parser';
import { Collapse } from 'react-collapse';

class Article extends React.Component {

  state = {
    id: this.props.id,
    title: this.props.title,
    body: this.props.body,
    isOpened: false
  }

  showArticle = () => {
    this.setState({
      isOpened: !this.state.isOpened
    })

  }


  render() {

    const { title, body, isOpened } = this.state;


    const articleBody = body.map(p => { return ReactHtmlParser(p.data) })
    return (
      <div className="article">
        <h1 onClick={() => this.showArticle()} >{title}</h1>
        <Collapse isOpened={isOpened} >
          {articleBody}
        </Collapse>
      </div>
    );
  }
}

export default Article;