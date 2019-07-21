import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Transition } from "react-spring/renderprops";
import '../styles/Article.css';

class Article extends React.Component {

  state = {
    isOpen: false
  }

  componentDidUpdate(prevProps) {
    if (
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
        <h1 className="title" onClick={() => {
          this.toggle();
        }}>{title}</h1>

        <Transition
          items={this.state.isOpen}
          config={{ duration: 300 }}
          from={{ height: 0, overflow: "hidden" }}
          enter={[{ height: "auto", overflow: "auto" }]}
          leave={{ height: 0, overflow: "hidden" }}
        >
          {isOpen =>
            isOpen && (props => <div style={props} className="content"><img className="articleImg" src={img} alt={alt} />{articleBody}</div>)
          }
        </Transition>
      </div>
    );
  }
}

export default Article;