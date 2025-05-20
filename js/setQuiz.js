import { db } from "./firebase.js";
import {
  getDatabase,
  ref,
  get,
  child,
  set,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Function to set quiz data in the database
  function setQuiz(quiz) {
    // Changed parameter name to 'quiz' since we're passing the quiz object
    const quizRef = ref(db, "quizzes/" + quiz.id);
    set(quizRef, {
      title: quiz.title,
      description: quiz.description,
      difficulty: quiz.difficulty.map((level) => ({
        level: level.level,
        questions: level.questions.map((question) => ({
          question: question.question,
          options: question.options,
          correct_answer: question.correct_answer,
        })),
      })),
    })
      .then(() => {
        console.log("Quiz data set successfully");
      })
      .catch((error) => {
        console.error("Error setting quiz data:", error);
      });
  }

  const quizContainer = {
    id: "1",
    title: "HTML",
    image: "https://example.com/images/html.png",
    description: "Test your HTML knowledge",
    difficulty: [
      {
        level: "easy",
        questions: [
          {
            question: "What does HTML stand for?",
            options: [
              "Hyper Text Markup Language",
              "High Text Markup Language",
              "Hyper Tabular Markup Language",
              "Hyperlinks and Text Markup Language",
            ],
            correct_answer: "Hyper Text Markup Language",
          },
          {
            question: "Who is making the Web standards?",
            options: [
              "Mozilla",
              "Microsoft",
              "Google",
              "The World Wide Web Consortium",
            ],
            correct_answer: "The World Wide Web Consortium",
          },
          {
            question:
              "Choose the correct HTML element for the largest heading:",
            options: ["<head>", "<h6>", "<h1>", "<heading>"],
            correct_answer: "<h1>",
          },
          {
            question:
              "What is the correct HTML element for inserting a line break?",
            options: ["<break>", "<br>", "<lb>", "<line>"],
            correct_answer: "<br>",
          },
          {
            question:
              "Which HTML attribute specifies an alternate text for an image?",
            options: ["title", "alt", "src", "longdesc"],
            correct_answer: "alt",
          },
          {
            question: "How can you make a numbered list?",
            options: ["<ul>", "<ol>", "<list>", "<dl>"],
            correct_answer: "<ol>",
          },
          {
            question: "How can you make a bulleted list?",
            options: ["<ul>", "<ol>", "<dl>", "<list>"],
            correct_answer: "<ul>",
          },
          {
            question: "Which element is used for a hyperlink?",
            options: ["<a>", "<link>", "<href>", "<hyper>"],
            correct_answer: "<a>",
          },
          {
            question: "Which tag is used to define an image?",
            options: ["<image>", "<img>", "<pic>", "<src>"],
            correct_answer: "<img>",
          },
          {
            question: "HTML files are saved with which extension?",
            options: [".html", ".ht", ".xml", ".web"],
            correct_answer: ".html",
          },
        ],
      },
      {
        level: "medium",
        questions: [
          {
            question: "What is the correct HTML for creating a hyperlink?",
            options: [
              "<a>http://example.com</a>",
              "<a href='http://example.com'>Example</a>",
              "<link>http://example.com</link>",
              "<href>example</href>",
            ],
            correct_answer: "<a href='http://example.com'>Example</a>",
          },
          {
            question: "Which tag is used to create a checkbox?",
            options: [
              "<checkbox>",
              "<input type='check'>",
              "<input type='checkbox'>",
              "<check>",
            ],
            correct_answer: "<input type='checkbox'>",
          },
          {
            question: "How can you open a link in a new tab?",
            options: [
              "target='_blank'",
              "newwindow='yes'",
              "open='new'",
              "href='newtab'",
            ],
            correct_answer: "target='_blank'",
          },
          {
            question: "What is the correct way to comment in HTML?",
            options: [
              "// comment",
              "/* comment */",
              "<!-- comment -->",
              "# comment",
            ],
            correct_answer: "<!-- comment -->",
          },
          {
            question: "Which tag is used to define a table?",
            options: ["<table>", "<tab>", "<tbl>", "<t>"],
            correct_answer: "<table>",
          },
          {
            question: "Which tag defines a table row?",
            options: ["<tr>", "<td>", "<th>", "<row>"],
            correct_answer: "<tr>",
          },
          {
            question: "What tag defines a cell in a table?",
            options: ["<tr>", "<td>", "<th>", "<cell>"],
            correct_answer: "<td>",
          },
          {
            question: "Which HTML element defines emphasized text?",
            options: ["<i>", "<italic>", "<em>", "<strong>"],
            correct_answer: "<em>",
          },
          {
            question: "Which tag is used to create a dropdown list?",
            options: [
              "<dropdown>",
              "<select>",
              "<input type='dropdown'>",
              "<option>",
            ],
            correct_answer: "<select>",
          },
          {
            question:
              "Which attribute is used to make an input field mandatory?",
            options: ["required", "validate", "mandatory", "mustfill"],
            correct_answer: "required",
          },
        ],
      },
      {
        level: "hard",
        questions: [
          {
            question:
              "Which HTML5 element provides pronunciation guidance for East Asian characters?",
            options: ["<bdo>", "<rt>", "<ruby>", "<rp>"],
            correct_answer: "<ruby>",
          },
          {
            question: "What is the purpose of the <fieldset> element?",
            options: [
              "To group related form elements",
              "To define a field",
              "To create input fields",
              "To make a form responsive",
            ],
            correct_answer: "To group related form elements",
          },
          {
            question: "Which tag represents the result of a calculation?",
            options: ["<result>", "<output>", "<calc>", "<compute>"],
            correct_answer: "<output>",
          },
          {
            question: "Which tag is used to define navigation links?",
            options: ["<nav>", "<menu>", "<link>", "<navigate>"],
            correct_answer: "<nav>",
          },
          {
            question: "Which element is used to embed video content in HTML5?",
            options: ["<video>", "<media>", "<embed>", "<movie>"],
            correct_answer: "<video>",
          },
          {
            question: "Which tag is used for marking up contact information?",
            options: ["<address>", "<contact>", "<info>", "<footer>"],
            correct_answer: "<address>",
          },
          {
            question: "What does the <canvas> element do?",
            options: [
              "Displays text",
              "Draws graphics",
              "Plays music",
              "Stores data",
            ],
            correct_answer: "Draws graphics",
          },
          {
            question:
              "Which element is used to define a caption for a <figure>?",
            options: ["<figcaption>", "<caption>", "<legend>", "<describe>"],
            correct_answer: "<figcaption>",
          },
          {
            question: "What does the <bdi> element do?",
            options: [
              "Isolates text for bidirectional formatting",
              "Bold italic text",
              "Breaks data into inline format",
              "Defines base direction",
            ],
            correct_answer: "Isolates text for bidirectional formatting",
          },
          {
            question: "Which HTML5 API allows drawing 2D graphics?",
            options: ["Canvas", "SVG", "DOM", "GeoLocation"],
            correct_answer: "Canvas",
          },
        ],
      },
    ],
  };

  const setQuizBtn = document.getElementById("set-quiz-btn");
  setQuizBtn.addEventListener("click", () => {
    setQuiz(quizContainer);
    console.log("btn work");
  });
});
