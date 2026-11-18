/**
 * Reusable Quiz Component for Lessons
 * Enforces immediate feedback without clues.
 */
function initQuiz(containerId, questions) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  questions.forEach((q, qIndex) => {
    const qDiv = document.createElement("div");
    qDiv.className = "quiz-question";

    const qTitle = document.createElement("div");
    qTitle.className = "question-text";
    qTitle.textContent = `${qIndex + 1}. ${q.question}`;
    qDiv.appendChild(qTitle);

    const optList = document.createElement("div");
    optList.className = "option-list";

    const feedback = document.createElement("div");
    feedback.className = "quiz-feedback";

    q.options.forEach((optText, optIndex) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = optText;

      btn.addEventListener("click", () => {
        // Disable all buttons in this question
        const allBtns = optList.querySelectorAll(".quiz-option");
        allBtns.forEach(b => b.disabled = true);

        if (optIndex === q.correct) {
          btn.classList.add("correct");
          feedback.className = "quiz-feedback show success";
          feedback.innerHTML = `<strong>Correct!</strong> ${q.explanation}`;
        } else {
          btn.classList.add("incorrect");
          allBtns[q.correct].classList.add("correct");
          feedback.className = "quiz-feedback show error";
          feedback.innerHTML = `<strong>Incorrect.</strong> ${q.explanation}`;
        }
      });

      optList.appendChild(btn);
    });

    qDiv.appendChild(optList);
    qDiv.appendChild(feedback);
    container.appendChild(qDiv);
  });
}
