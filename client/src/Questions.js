import React from "react";
import { Link } from "@reach/router";

class Questions extends React.Component {
  render() {
    let questions = [];
    this.props.questions.forEach(question => {
      questions.push(
        <Link to={question.slug} key={question.slug}>
          <div className="question">
            <h2 className="question__title">{question.title}</h2>
            <div className="question__additional-info">
              <div className="question__additional-info-answers">
                Answers: {question.answers.length}
              </div>
              {(() => {
                if (question.solved) {
                  return (
                    <div className="question__additional-info-solved">
                      Solved
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </Link>
      );
    });

    return (
      <div>
        <div className="questions">{questions}</div>
        <div className="questions">
          You didn't find the answer of your question?
          <Link to="ask"> Ask a question</Link>
        </div>
      </div>
    );
  }
}

export default Questions;
