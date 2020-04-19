import React from "react";
import Questions from "./Questions";
import Question from "./Question";
import { Router, Redirect, navigate } from "@reach/router";
import AskQuestion from "./AskQuestion";
import PostAnswer from "./PostAnswer";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: []
    };
  }

  API_URL = '/api';

  componentDidMount() {
    this.getAllQuestions();
  }

  getAllQuestions() {
    fetch(`${this.API_URL}/questions`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          questions: data
        });
      });
  }

  getQuestion(slug) {
    return fetch(`${this.API_URL}/questions/${slug}`);
  }
  addQuestion(question) {
    fetch(`${this.API_URL}/questions`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(question)
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          questions: data
        });
      });
  }
  addAnswer(answer, slug) {
    fetch(`${this.API_URL}/questions/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(answer)
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          questions: data
        });
        navigate(`/questions/${slug}`);
      });
  }

  voteForAnswer(questionSlug, answerSlug, newVoteNumber) {
    fetch(`${this.API_URL}/questions/${questionSlug}/${answerSlug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ newVoteNumber: newVoteNumber })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          questions: data
        });
        navigate(`/questions/${questionSlug}`);
      });
  }

  render() {
    return (
      <Router>
        <Redirect from="/" to="/questions" noThrow />
        <Questions path="/questions" questions={this.state.questions} />
        <Question
          path="/questions/:questionSlug"
          getQuestion={slug => this.getQuestion(slug)}
          voteForAnswer={(questionSlug, answerSlug, newVoteNumber) =>
            this.voteForAnswer(questionSlug, answerSlug, newVoteNumber)
          }
        />
        <AskQuestion
          path="/questions/ask"
          addQuestion={question => this.addQuestion(question)}
        />
        <PostAnswer
          path="/questions/:questionSlug/post-answer"
          getQuestion={slug => this.getQuestion(slug)}
          addAnswer={(answer, slug) => this.addAnswer(answer, slug)}
        />
      </Router>
    );
  }
}

export default App;
