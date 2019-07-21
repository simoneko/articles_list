import React from 'react';
import Article from './Article';
import '../styles/ArticlesList.css';

const ArticlesList = (props) => {

  const listOfArticles = props.list.map(article =>
    <Article
      key={article.id}
      id={article.id}
      title={article.title}
      body={article.body}
      img={article.img.original_url}
      alt={article.img.description}
      showArticle={props.showArticle}
      currentID={props.currentID}
    />
  );

  return (

    <div className="articlesList">
      {listOfArticles}
    </div>
  )
}

export default ArticlesList;



