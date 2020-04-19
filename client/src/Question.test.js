import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Question from "./Question";

// Some test data for the tests.
const question = {
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
};

it("renders the actual question", async () => {
  const comp = (
    <Question
      getQuestion={slug => {
        return Promise.resolve({ json: () => Promise.resolve(question) });
      }}
    />
  );
  const { getByText, getByLabelText } = render(comp);
  await waitFor(() => expect(getByText(question.title)).toBeInTheDocument());
});

// it("renders all answers for a Question", () => {
//   const comp = (
//     <Question
//       getQuestion={slug =>
//         new Promise((resolve, reject) => {
//           resolve(quesiton);
//         })
//       }
//     />
//   );
//   const { getByText, getByLabelText } = render(comp);
//   expect(getByText(question.answers[0].text)).toBeInTheDocument();
//   expect(getByText(question.answers[1].text)).toBeInTheDocument();
//   expect(getByText(question.answers[2].text)).toBeInTheDocument();
// });

// it('calls "handleVote" when the voting button is clicked', () => {
//   const handleVote = jest.fn();
//   const comp = (
//     <Question getQuestion={id => question} handleVote={handleVote} />
//   );
//   const { getAllByText } = render(comp);
//   fireEvent.click(getAllByText(/upvote/i)[0]);
//   expect(handleVote).toHaveBeenCalled();
// });
