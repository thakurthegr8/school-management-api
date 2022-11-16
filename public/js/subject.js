const addSubjectBtn = document.querySelector("#add_subject_btn");
const updateSubjectBtn = document.querySelectorAll(".update_subject_btn");
const deleteSubjectBtn = document.querySelector("#delete_subject_btn");
const addSubjectCancelSubmissionBtn = document.querySelector(
  "#add_subject_cancel_submission"
);
// update_subject_cancel_submission
const updateSubjectCancelSubmissionBtn = document.querySelector(
  "#update_subject_cancel_submission"
);
const addSubjectDialog = document.querySelector("#add_subject_dialog");
const updateSubjectDialog = document.querySelector("#update_subject_dialog");
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

updateSubjectBtn.forEach((item) =>
  item.addEventListener("click", (e) => {
    e.preventDefault();
    if (typeof updateSubjectDialog.showModal === "function") {
      updateSubjectDialog.showModal();
      updateSubjectDialog.animate(
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
  })
);

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

const deleteSubjectBulk = async (e) => {
  const subjectsToDelete = Object.values(subjectTableFormTable)
    .filter((item) => item.checked)
    .map((item) => item.value);
  const accessToken = Cookies.get("secret_cookie");
  try {
    const formResponse = await axios.post(
      "/api/subject/delete/bulk",
      {
        id: subjectsToDelete,
      },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const deletedSubjectsData = await formResponse.data;
    window.location.href = "/subject";
  } catch (error) {
    console.log(error);
  }
};
deleteSubjectBtn.addEventListener("click", deleteSubjectBulk);

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

updateSubjectCancelSubmissionBtn.addEventListener("click", () => {
  if (typeof updateSubjectDialog.showModal === "function") {
    updateSubjectDialog.close();
    updateSubjectDialog.animate(
      [
        // keyframes
        { transform: "scale(0)" } /*0%*/,
        {
          transform: "scale(1)",
          offset: 1,
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
