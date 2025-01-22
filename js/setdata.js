import { db } from "./firebase.js";
import { collection, addDoc, getDocs, getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


// JSON data
const quizData = { 
    "subject": "GitHub",
    "questions": [
      {
        "question": "What does the command 'git reset --hard' do?",
        "answers": [
          "It resets the current branch to the latest commit",
          "It deletes all untracked files in the working directory",
          "It resets the commit history and the working directory to a previous state",
          "It resets the repository to the state of a specific commit"
        ],
        "correct_answer": "It resets the commit history and the working directory to a previous state"
      },
      {
        "question": "Which command is used to delete a branch both locally and remotely in Git?",
        "answers": [
          "git branch -d <branch_name>",
          "git branch -D <branch_name>",
          "git push origin --delete <branch_name>",
          "git branch -d <branch_name> && git push origin --delete <branch_name>"
        ],
        "correct_answer": "git branch -d <branch_name> && git push origin --delete <branch_name>"
      },
      {
        "question": "What is the purpose of 'git rebase' in Git?",
        "answers": [
          "To merge changes from one branch into another",
          "To apply commits from one branch onto another branch, replaying the changes",
          "To create a new commit history",
          "To remove commits from the history"
        ],
        "correct_answer": "To apply commits from one branch onto another branch, replaying the changes"
      },
      {
        "question": "What does 'git cherry-pick <commit_hash>' do?",
        "answers": [
          "It merges changes from the given commit into the current branch",
          "It removes the given commit from the current branch",
          "It adds the given commit as a tag",
          "It applies the changes from the given commit to the current branch"
        ],
        "correct_answer": "It applies the changes from the given commit to the current branch"
      },
      {
        "question": "What does the command 'git stash' do?",
        "answers": [
          "It commits changes to the repository without pushing them",
          "It temporarily saves changes that are not yet committed",
          "It pushes changes to a remote repository",
          "It deletes the untracked files"
        ],
        "correct_answer": "It temporarily saves changes that are not yet committed"
      },
      {
        "question": "What is the effect of 'git pull --rebase'?",
        "answers": [
          "It pulls changes and merges them with the current branch",
          "It pulls changes and rebases the current branch on top of the fetched changes",
          "It reverts local changes to the latest commit",
          "It fetches the latest changes without modifying the local branch"
        ],
        "correct_answer": "It pulls changes and rebases the current branch on top of the fetched changes"
      },
      {
        "question": "How do you check which branches are available in a remote repository?",
        "answers": [
          "git branch -a",
          "git branch -r",
          "git remote -v",
          "git branches"
        ],
        "correct_answer": "git branch -r"
      },
      {
        "question": "What is the function of 'git bisect'?",
        "answers": [
          "To find the commit where a bug was introduced by performing a binary search",
          "To list all the commits between two branches",
          "To remove a specific commit from the branch history",
          "To merge branches in a safe way"
        ],
        "correct_answer": "To find the commit where a bug was introduced by performing a binary search"
      },
      {
        "question": "What is a 'merge conflict' in Git?",
        "answers": [
          "When two branches are merged successfully without any issues",
          "When Git cannot automatically resolve differences between two commits during a merge",
          "When you try to commit a file that has already been committed",
          "When Git pushes changes to a remote repository"
        ],
        "correct_answer": "When Git cannot automatically resolve differences between two commits during a merge"
      },
      {
        "question": "What does 'git fetch' do?",
        "answers": [
          "It fetches the latest changes from the remote repository and merges them",
          "It fetches the latest changes from the remote repository without merging them",
          "It updates the local repository with the latest commit",
          "It downloads all changes from the repository, including branches and tags"
        ],
        "correct_answer": "It fetches the latest changes from the remote repository without merging them"
      }
    ]
  }
  
    

// Function to push all questions into a single document
async function pushQuizDataToSingleDoc() {
  try {
    const docRef = doc(db, "hardlevel", "github"); // Reference to the 'quizData' document in 'easylevel' collection
    await setDoc(docRef, quizData); // Add the entire JSON object to the document
    console.log("Quiz data added successfully to a single document!");
  } catch (error) {
    console.error("Error adding quiz data: ", error);
  }
}

// Call the function
pushQuizDataToSingleDoc();