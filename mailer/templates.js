const projectName = "School Management";

const addUser = (mailData) => {
  const { email, password } = mailData;
  return `
  <h1>${projectName}</h1>
  <h2>You've been added to our organisation</h2><br/>
  <span><strong>Email ID</strong></span><br/>
  <span>${email}</span><br/>
  <span><strong>Password</strong></span><br/>
  <span>${password}</span><br/>
  <p style="color:white;background:red;">Please do not share with someone.</p>
  `;
};
module.exports = { addUser };
