import React from "react";
import { Link, navigate } from "@reach/router";

class AskQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newQuestion: {
        slug: "",
        title: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="ask-question">
        <form onSubmit={this.handleSubmit}>
          <div className="ask-question__question">
            <label htmlFor="question">Question</label>
            <input
              value={this.state.newQuestion.title}
              name="question"
              type="text"
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="ask-question__submit-button">
            <input type="submit" value="Ask"></input>
          </div>
        </form>
        <Link to="/questions">Go back</Link>
      </div>
    );
  }
  handleChange(event) {
    this.setState({
      newQuestion: {
        title: event.target.value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.newQuestion.title) {
      this.props.addQuestion({
        title: this.state.newQuestion.title
      });
      this.setState({
        newQuestion: {
          title: ""
        }
      });
      navigate("/");
    }
  }
}

export default AskQuestion;
