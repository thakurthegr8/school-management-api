const addUserBtn = document.querySelector("#add_user_btn");
const deleteUserBtn = document.querySelector("#delete_users_btn");
const addUserCancelSubmissionBtn = document.querySelector(
  "#add_user_cancel_submission"
);
const addUserDialog = document.querySelector("#add_user_dialog");
const addUserForm = document.querySelector("#addUserForm");
const userTableFormTable = document.querySelector("#users_table");

addUserBtn.addEventListener("click", () => {
  if (typeof addUserDialog.showModal === "function") {
    addUserDialog.showModal();
    addUserDialog.animate(
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

const addUserFormHandler = async (e) => {
  e.preventDefault();
  console.log(addUserForm);
  const accessToken = Cookies.get("secret_cookie");
  try {
    const formResponse = await axios.post(
      "/api/user",
      {
        first_name: addUserForm.first_name.value,
        last_name: addUserForm.last_name.value,
        email: addUserForm.email.value,
        gender: addUserForm.gender.value,
        age: addUserForm.age.value,
        role: addUserForm.role.value,
      },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const addedUserData = await formResponse.data;
    window.location.href = "/user";
  } catch (error) {
    console.log(error);
  }
};

const deleteUserFormHandler = (e) => {
  e.preventDefault();
  const usersToDelete = Object.values(userTableFormTable)
    .filter((item) => item.checked)
    .map((item) => item.value);
  if (usersToDelete.length !== 0) {
    deleteUserBtn.classList.remove("hidden");
  } else {
    deleteUserBtn.classList.add("hidden");
  }
};

const deleteUserBulk = async (e) => {
  const usersToDelete = Object.values(userTableFormTable)
    .filter((item) => item.checked)
    .map((item) => item.value);
  const accessToken = Cookies.get("secret_cookie");
  try {
    const formResponse = await axios.post(
      "/api/user/delete/bulk",
      {
        id: usersToDelete,
      },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const deletedUsersData = await formResponse.data;
    window.location.href = "/user";
  } catch (error) {
    console.log(error);
  }
};
deleteUserBtn.addEventListener("click", deleteUserBulk);

addUserForm.addEventListener("submit", addUserFormHandler);

addUserCancelSubmissionBtn.addEventListener("click", () => {
  if (typeof addUserDialog.showModal === "function") {
    addUserDialog.close();
    addUserDialog.animate(
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

userTableFormTable.addEventListener("change", deleteUserFormHandler);
