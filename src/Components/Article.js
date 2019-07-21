import React from 'react';
import '../styles/Article.css';
import ReactHtmlParser from 'react-html-parser';

class Article extends React.Component {

  state = {
    isOpen: false
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currentID &&
      prevProps.currentID !== this.props.currentID &&
      this.props.id !== this.props.currentID
    ) {
      this.setState({ isOpen: false });
    }
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
    this.props.showArticle(this.props.id)
  }

  render() {
    const { title, body, img, alt } = this.props;

    const articleBody = body.map(p => { return ReactHtmlParser(p.data) })

    return (
      <div className="article">
        <h1 onClick={this.toggle}>{title}</h1>
        {/* <img src={img} alt={alt} /> */}
        {this.state.isOpen && articleBody}
      </div>
    );
  }
}

export default Article;