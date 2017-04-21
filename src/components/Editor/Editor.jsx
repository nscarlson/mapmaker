import React from 'react';
import Marked from 'marked';

export default class Editor extends React.Component {

  constructor (props) {
    super(props);

    this.state = {value: 'Type some *markdown* heeeere! '};

    this.onChange.bind(this);
    this.rawMarkup.bind(this);
  }

  onChange() {
    this.setState({value: this.refs.textarea.value});
  }

  rawMarkup(String str) {
    return { __html: Marked(this.state.value, {sanitize: true}) };
  }

  render() {
    return (
      <div className="MarkdownEditor">
        <h3>Input</h3>
        <textarea
          onChange={this.onChange.bind(this)}
          ref="textarea"
          defaultValue={this.state.value}
          style={{height: "490px", width: "100%", resize: "none"}}
        />
        <h3>Output Stuff</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.rawMarkup()}
        />
      </div>
    );
  }
}
