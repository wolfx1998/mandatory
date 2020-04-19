import React from "react";
import { Link, navigate } from "@reach/router";

class PostAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newAnswer: "",
      question: {
        title: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this._asyncRequest = this.props
      .getQuestion(this.props.questionSlug)
      .then(response => {
        this._asyncRequest = null;
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          question: data
        });
      });
  }
  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (this.state.question === null) {
      return "Loading";
    } else {
      return (
        <div className="post-answer">
          <h2>{this.state.question.title}</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="post-answer__answer">
              <label htmlFor="answer">Answer</label>
              <textarea
                value={this.state.newAnswer}
                name="answer"
                onChange={this.handleChange}
              ></textarea>
            </div>
            <div className="post-answer__submit-button">
              <input type="submit" value="Post"></input>
            </div>
          </form>
          <Link to="/questions">Go back</Link>
        </div>
      );
    }
  }
  handleChange(event) {
    this.setState({
      newAnswer: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.newAnswer) {
      let answerObj = {
        title: this.state.newAnswer,
        voteNumber: 0
      };

      this.props.addAnswer(answerObj, this.state.question.slug);
      this.setState({
        newAnswer: ""
      });
      navigate("/questions");
    }
  }
}

export default PostAnswer;
