const dialogCloser = document.querySelectorAll(".close_dialog");
const dialogs = document.querySelectorAll("dialog");
dialogCloser.forEach((item) =>
  item.addEventListener("click", () => {
    dialogs.forEach((dialogItem) => closeDialog(dialogItem));
  })
);

const openDialog = (formRef) => {
  if (typeof formRef.showModal === "function") {
    formRef.showModal();
    formRef.animate(
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
};

const closeDialog = (formRef) => {
  if (typeof formRef.showModal === "function") {
    formRef.close();
    formRef.animate(
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
};
