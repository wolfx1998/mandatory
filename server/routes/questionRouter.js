import express from "express";
import Question from "../models/questionModel";

const questionRouter = express.Router();
(async _ => {
  questionRouter
    .route("/")
    .get((req, res) => {
      Question.find({}, (err, questions) => {
        res.json(questions);
      });
    })
    .post((req, res) => {
      new Question({
        slug: string_to_slug(req.body.title),
        title: req.body.title,
        answers: [],
        solved: false
      }).save(() => {
        Question.find({}, (err, questions) => {
          res.json(questions);
        });
      });
    });

  questionRouter
    .route("/:slug")
    .get((req, res) => {
      const slug = req.params.slug;
      Question.findOne({ slug: slug }, (err, question) => {
        res.json(question);
      });
    })
    .put((req, res) => {
      const slug = req.params.slug;

      let answer = req.body;
      answer.slug = string_to_slug(answer.title);

      Question.findOneAndUpdate(
        { slug: slug },
        { $push: { answers: answer } },
        () => {
          Question.find({}, (err, questions) => {
            res.json(questions);
          });
        }
      );
    });

  questionRouter.route("/:questionSlug/:answerSlug").put((req, res) => {
    const questionSlug = req.params.questionSlug;
    const answerSlug = req.params.answerSlug;
    const newVote = req.body.newVoteNumber;

    Question.findOne({ slug: questionSlug }, (err, question) => {
      if (err) {
        console.error(err);
      }

      let questionToUpdate = (question.answers.find(
        answer => answer.slug === answerSlug
      )["voteNumber"] = newVote);

      Question.findOneAndUpdate(
        { slug: questionSlug },
        { $set: { answers: question.answers } },
        () => {
          Question.find({}, (err, questions) => {
            res.json(questions);
          });
        }
      );
      // question.save(() => {
      //   Question.find({}, (err, questions) => {
      //     res.json(questions);
      //   });
      // });
    });
  });
})();

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}
export default questionRouter;
