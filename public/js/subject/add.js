const addSubjectBtn = document.querySelector("#add_subject_btn");
const addSubjectCancelSubmissionBtn = document.querySelector(
  "#add_subject_cancel_submission"
);
const addSubjectDialog = document.querySelector("#add_subject_dialog");
const addSubjectForm = document.querySelector("#addSubjectForm");
const subjectTableFormTable = document.querySelector("#subjects_table");

addSubjectBtn.addEventListener("click", () => {
  if (typeof addSubjectDialog.showModal === "function") {
    addSubjectDialog.showModal();
    addSubjectDialog.animate(
      [
        // keyframes
        { transform: "scale(0)" } /*0%*/,
        {
          transform: "scale(1)",
          offset: 0.3,
        },
      ],
      {
        // timing options
        duration: 1000,
      }
    );
  } else {
    alert("Dialog box is not supported by this browser");
  }
});


const addSubjectFormHandler = async (e) => {
  e.preventDefault();
  console.log(addSubjectForm);
  const accessToken = Cookies.get("secret_cookie");
  try {
    const formResponse = await axios.post(
      "/api/subject",
      {
        code: addSubjectForm.code.value,
        name: addSubjectForm.name.value,
      },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const addedSubjectData = await formResponse.data;
    window.location.href = "/subject";
  } catch (error) {
    console.log(error);
  }
};

const deleteSubjectFormHandler = (e) => {
  e.preventDefault();
  const subjectsToDelete = Object.values(subjectTableFormTable)
    .filter((item) => item.checked)
    .map((item) => item.value);
  if (subjectsToDelete.length !== 0) {
    deleteSubjectBtn.classList.remove("hidden");
  } else {
    deleteSubjectBtn.classList.add("hidden");
  }
};

addSubjectForm.addEventListener("submit", addSubjectFormHandler);

addSubjectCancelSubmissionBtn.addEventListener("click", () => {
  if (typeof addSubjectDialog.showModal === "function") {
    addSubjectDialog.close();
    addSubjectDialog.animate(
      [
        // keyframes
        { transform: "scale(0)" } /*0%*/,
        {
          transform: "scale(1)",
          offset: 0.3,
        },
      ],
      {
        // timing options
        duration: 1000,
      }
    );
  } else {
    alert("Dialog box is not supported by this browser");
  }
});


subjectTableFormTable.addEventListener("change", deleteSubjectFormHandler);
