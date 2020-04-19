import React from "react";
import { render } from "@testing-library/react";
import Questions from "./Questions";

// Just some test data
const data = [
  {
    slug: "how-do-i-return-the-response-from-an-observable-in-angular-2",
    title: "How do I return the response from an Observable in Angular 2?",
    answers: [
      {
        text: "Observables are lazy so you have to subscribe to get the value.",
        votes: 5
      },
      { text: "You can use asyncPipe", votes: -2 },
      {
        text:
          "The reason that it's undefined is that you are making an asynchronous operation",
        votes: 3
      }
    ]
  },
  {
    slug: "i-have-another-question-what-is",
    title: "I have another question. What is..?",
    answers: [
      { text: "Answer 1", votes: 2 },
      { text: "Answer 2", votes: 3 },
      { text: "Answer 3", votes: 0 }
    ]
  },
  {
    slug: "what-is-this",
    title: "What IS this??",
    answers: [
      { text: "Answer 1", votes: 0 },
      { text: "Answer 2", votes: 1 }
    ]
  }
];

it("renders Questions with all titles", () => {
  const comp = <Questions questions={data} />;
  const { getByText } = render(comp);

  expect(getByText(data[0].title)).toBeInTheDocument();
  expect(getByText(data[1].title)).toBeInTheDocument();
  expect(getByText(data[2].title)).toBeInTheDocument();
});

it("does not render Question answers", () => {
  const comp = <Questions questions={data} />;
  const { queryByText } = render(comp);

  expect(queryByText(data[0].answers[0].text)).toBeNull();
  expect(queryByText(data[0].answers[1].text)).toBeNull();
  expect(queryByText(data[0].answers[2].text)).toBeNull();
});
