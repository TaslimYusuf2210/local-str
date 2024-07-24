///funtion to store to local storage
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const login = document.querySelector("#login");
const create = document.querySelector("#create");
const form = document.querySelector("#myform");
const table = document.querySelector("#mytable tbody");

document.addEventListener("DOMContentLoaded", () => {
  let arr = JSON.parse(localStorage.getItem("data")) || [];

  function loadTable() {
    console.log("table loaded");
    renderTable();
  }

  function renderTable() {
    console.log(table);
    table.innerHTML = arr
      .map((list, index) => createTable(list, index))
      .join("");
  }

  loadTable();

  function createTable(e) {
    return `
      <tr >
        <td>${e.firstName}<td/>
        <td>${e.lastName}<td/>
        <td>${e.email}<td/>
        <td>${e.password}<td/>
        <td class="toggleValue cursor-pointer">${e.toggle}<td/>
      </tr>
    `;
  }

  login.addEventListener("click", loadTable);

  const toggleValue = document.querySelectorAll(".toggleValue");

  console.log(toggleValue);

  function saveData(e) {
    e.preventDefault();

    const formData = {};
    formData.firstName = firstName.value;
    formData.lastname = lastName.value;
    formData.email = email.value;
    formData.password = password.value;
    formData.toggle = false;

    // let arr = JSON.parse(localStorage.getItem("data")) || [];
    if ((formData.email !== "") & (formData.password !== "")) {
      console.log(arr.length);
      if (arr.length > 0) {
        console.log("gggg");
        let checkEmailExist = arr.filter(
          (a) => a.email.toLowerCase() === formData.email.toLowerCase()
        );
        console.log(checkEmailExist);
        if (checkEmailExist.length > 0) {
          console.log("email exist");
          alert("account already created ");
          return;
        } else {
          arr.push(formData);
          localStorage.setItem("data", JSON.stringify(arr));
          alert("account created successfully");
        }
      } else {
        arr.push(formData);
        localStorage.setItem("data", JSON.stringify(arr));
        alert("account created successfully");
      }
    } else {
      console.log("nof data found in storage");
    }
    console.log(arr);
    console.log(password.value);
  }

  form.addEventListener("submit", saveData);

  toggleValue.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      console.log(index);

      arr[index].toggle = !arr[index].toggle;
      console.log(arr);
      localStorage.setItem("data", JSON.stringify(arr));
      location.reload();
    });
  });

  function passwordHandler(e) {
    e.preventDefault();
    let emailExist = arr.find((item) => item.email === email.value);
    console.log(emailExist)
    if(emailExist && emailExist.password.toLowerCase() === password.value.toLowerCase()){
      console.log('login successfully')
    } else {
      console.log('incorrect email or passwords')
    }
  }

  login.addEventListener("click", passwordHandler);
});
