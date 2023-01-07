const addIcon = document.querySelector(".icon-class");
const todoInput = document.querySelector("#todo-input");
const todoUl = document.querySelector("#todo-ul");

// todos dizisini localStorage'daki veriler ile guncelle
// ? local dan alıp diziye yazma ,objeli stringi tekrar diziye yazmak icin parse
//! eger localStroge'de todos adinda bir item bulunmaz ise bos array atamasi yap.
let todos = JSON.parse(localStorage.getItem("LocalTodos")) || [];
console.log(todos);

const showSavedTodos = () => {
  todos.forEach((item) => {
    createTodoItem(item);
  });
};
showSavedTodos();

addIcon.addEventListener("click", () => {
  if (todoInput.value.trim() === "") {
    alert("Please,enter a todo");
  } else {
    const newTodo = {
      id: new Date().getTime(),
      completed: false,
      text: todoInput.value,
    };

    createTodoItem(newTodo);
    //? olusturulan todo lari dizide sakla
    todos.push(newTodo);

    // ? diziye attığımız todo lari simdi de local a atalım
    // ? eger dizi icinde obje varsa bu JSON formatıdır
    localStorage.setItem("LocalTodos", JSON.stringify(todos));
    // console.log(todos);
    todoInput.value = "";
  }
});

function createTodoItem(newTodo) {
  //? objeyi daha rahat kullanmak icin destruction yapıyoruz
  const { id, completed, text } = newTodo;

  //? li yi olustur
  const li = document.createElement("li");
  li.setAttribute("id", id);
  completed ? li.classList.add("checked") : "";
  // compled && li.classList.add("checked");

  //? okey ikonu olustur
  const okIcon = document.createElement("i");
  // <i class="fa-solid fa-circle"></i>;
  // okIcon.setAttribute("class", "fas fa-check");
  okIcon.setAttribute("class", "fa-solid fa-circle");
  li.appendChild(okIcon);

  //? li te text eklemek için önce p elementi olusturalım
  const newP = document.createElement("p");
  const pText = document.createTextNode(text);
  newP.appendChild(pText);
  li.appendChild(newP);

  //? delete icon olusturalim
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash");
  li.appendChild(deleteIcon);

  // ? olusturulan li elementlerini ul ye cocuk olarak atayalim
  todoUl.appendChild(li);
}

//! Ul elementinin cocuklarindan herhangi birisinden bir event gelirse
//! bunu tespit et ve gerekini yap. (Capturing)
todoUl.addEventListener("click", (event) => {
  // console.log(event.target);
  // ? tiklanan eventin id sini almak icin
  const id = event.target.parentElement.getAttribute("id");

  //!  event ,delete iconundan geldiyse
  if (event.target.classList.contains("fa-trash")) {
    //? delete butonunun parent'ini DOM'dan sil
    event.target.parentElement.remove();
    //? simdi de diziden sil
    //? aslında filterla ilgili id olmayan diziyi sectik ve tekrar diziye yazdırdık
    todos = todos.filter((item) => item.id !== Number(id));
    //? simdi de localstroga de guncelle
    localStorage.setItem("LocalTodos", JSON.stringify(todos));
  } //! event, bir okey butonundan geldi ise
  else if (event.target.classList.contains("fa-circle")) {
    //? ilgili li elementinde checked adinda bir class'i varsa bunu sil
    //?  aksi takdirde ekle (DOM)
    // event.target.parentElement.classList.toggle("checked");
    const toggleFunc = () => {
      const currentLi = event.target.parentElement;
      // console.log(currentLi);
      const chechkedStatus = currentLi.classList.contains("checked");
      if (chechkedStatus) {
        currentLi.classList.remove("checked");
      } else {
        currentLi.classList.add("checked");
      }
    };
    toggleFunc();
  }
});

// todo li ye basınca da üstünü çizsin
