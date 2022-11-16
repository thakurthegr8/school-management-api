const updateSubjectBtn = document.querySelectorAll(".update_subject_btn");
const updateSubjectCancelSubmissionBtn = document.querySelector(
  "#update_subject_cancel_submission"
);
const updateSubjectDialog = document.querySelector("#update_subject_dialog");
const updateSubjectCodeForm = document.querySelector("#updateSubjectCodeForm");
const updateSubjectNameForm = document.querySelector("#updateSubjectNameForm");
updateSubjectBtn.forEach((item) =>
  item.addEventListener("click", () => {
    openDialog(updateSubjectDialog);
  })
);

updateSubjectCancelSubmissionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closeDialog(updateSubjectDialog);
});
