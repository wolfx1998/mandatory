import React from "react";
import { Link } from "@reach/router";

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: {
        title: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this._asyncRequest = this.props
      .getQuestion(this.props.questionSlug)
      .then(response => {
        console.log(response);
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

  handleChange(index, event) {
    if (event.target.checked) {
      this.props.voteForAnswer(
        this.state.question.slug,
        this.state.question.answers[index].slug,
        Number(this.state.question.answers[index].voteNumber) + 1
      );

      let newQuestion = this.state.question;
      newQuestion.answers[index].voteNumber++;
      this.setState({
        question: newQuestion
      });
    } else {
      this.props.voteForAnswer(
        this.state.question.slug,
        this.state.question.answers[index].slug,
        Number(this.state.question.answers[index].voteNumber) - 1
      );
      let newQuestion = this.state.question;
      newQuestion.answers[index].voteNumber--;
      this.setState({
        question: newQuestion
      });
    }
  }

  render() {
    console.log(this.state.question);

    if (this.state.question === null) {
      return "Loading";
    } else {
      let answers = [];
      if (this.state.question.answers) {
        this.state.question.answers.sort((a, b) => b.voteNumber - a.voteNumber);
        this.state.question.answers.forEach((answer, index) => {
          answers.push(
            <div key={index}>
              <h4>Answer {index + 1}</h4>
              <p>{answer.title}</p>
              <p>
                This answer is correct according to {answer.voteNumber}{" "}
                developers
              </p>

              <form>
                <label>Vote</label>
                <input
                  type="checkbox"
                  value
                  onChange={e => this.handleChange(index, e)}
                ></input>
              </form>
            </div>
          );
        });
      }
      return (
        <div className="question">
          <h2 className="question__title">{this.state.question.title}</h2>
          <div className="question__answers">{answers}</div>

          <Link to="post-answer">
            <div>You know the answer?</div>
          </Link>

          <Link to="/">Go back</Link>
        </div>
      );
    }
  }
}

export default Question;
