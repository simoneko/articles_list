import React from 'react';
import Article from './Article';
import '../styles/ArticlesList.css';

const ArticlesList = ({ list, showArticle, currentID }) => {

  const listOfArticles = list.map(article =>
    <Article
      key={article.id}
      id={article.id}
      title={article.title}
      body={article.body}
      img={article.img.original_url}
      alt={article.img.description}
      showArticle={showArticle}
      currentID={currentID}
    />
  );

  return (
    <div className="articlesList">
      {listOfArticles}
    </div>
  )
}

export default ArticlesList;