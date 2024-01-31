import {
  getNumberOfGrades,
  getFirstGrade,
  getLastGrade,
  getAverageGrade,
} from "./stats.js";

// элемент формы
const gradesForm = document.querySelector("#grades-form");

// элемент ввода
const yourGrade = document.querySelector("#your-grade");

// содержимое таблицы
const tbody = document.querySelector("#stats-table tbody");

// история оценок
const gradesList = document.querySelector(".grades-list");

// массив оценок
const grades = [1, 2, 3, 4, 5];

/**
 *
 * @param {array} grades - массив оценок
 */
function render(grades) {
  tbody.innerHTML = `<tr>
  <td>${getNumberOfGrades(grades) ?? "0"}</td>
  <td>${getFirstGrade(grades) ?? "0"}</td>
  <td>${getLastGrade(grades) ?? "0"}</td>
  <td>${getAverageGrade(grades)}</td>
  </tr>`;

  showAndUpdateGradesHistory(grades); // показ истории оценок
}

gradesForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newGrade = Number.parseInt(yourGrade.value, 10);

  grades.push(newGrade);

  showNotification("Новая оценка добавлена!");

  yourGrade.value = "";

  render(grades);
});

/**
 *
 * @param {string} message - текстовое сообщение
 */
function showNotification(message) {
  const element = document.createElement("div");

  element.classList.add("notification", "is-show");

  element.innerHTML = message;

  element.style.backgroundColor = "#2b8379"
  element.style.color = "#fff"
  element.style.padding = "4px"

  document.body.appendChild(element);
  // document.body.insertAdjacentHTML("beforeend", element);

  setTimeout(() => {
    element.classList.remove("is-show");
  }, 3000);
}
/**
 *
 * @param {string} message - текстовое сообщение
 */
function showNotificationErrore(message) {
  const element = document.createElement("div");

  element.classList.add("notification", "is-show");

  element.innerHTML = message;

  element.style.backgroundColor = "#970e3d"
  element.style.color = "#fff"
  element.style.padding = "4px"

  document.body.appendChild(element);
  // document.body.insertAdjacentHTML("beforeend", element);

  setTimeout(() => {
    element.classList.remove("is-show");
  }, 3000);
}

function showAndUpdateGradesHistory(grades) {
  gradesList.innerHTML = "";

  grades.forEach(function (grade, index) {
    // gradesList.innerHTML += `
    //   <li class="grade" data-grade="${index}">
    //   ${grade}
    //   <button onclick="onEditHandler()" class="btn-edit">Edit</button>
    //   <button onclick="onDeleteHandler()" class="btn-edit">Cancel</button>
    // </li>
    // `;

    const listItemHTML = `
      <li class="grade" data-grade="${index}">
        ${grade}
        <button data-action=edit class="btn-edit">Edit</button>
        <button data-action=delete class="btn-edit">Delete</button>
      </li>
    `;

    gradesList.insertAdjacentHTML("beforeend", listItemHTML); // вставка в конец родителя

    const listItem = gradesList.querySelector(`[data-grade="${index}"]`); // получение тега li
    const editButton = listItem.querySelector("[data-action=edit]"); // получение кнопки редактирования
    const deleteButton = listItem.querySelector("[data-action=delete]"); // получение кнопки удаления

    //добавил css свойства для украшения
    deleteButton.style.backgroundColor = "#970e3d"
    deleteButton.style.color = "#fff"
    deleteButton.style.border = "none"

    editButton.style.backgroundColor = "#2b8379"
    editButton.style.color = "#fff"
    editButton.style.border = "none"


    editButton.addEventListener("click", function () {
      onEditHandler(index);
    });

    deleteButton.addEventListener("click", function () {
      onDeleteHandler(index);
    });
  });
}

/**
 * Функция редактирования оценки
 * @param {string} key - data атрибут элемента
 */
function onEditHandler(key) {
  console.log("Edit grade at index:", key);
  let element = document.querySelector('.notification')
  const newGrade = prompt(`Редактируемая оценка: ${grades[key]}`);
    //добавил запрет на устоновку отрицательного значения
  if (newGrade < 0) {  
    return showNotificationErrore("нельзя установить отрицательную оценку!");
  }
  if (newGrade !== null && newGrade !== "") {
    grades[key] = +newGrade;

    console.log(grades);
    render(grades);
    showNotification("Оценка изменена!");
  }
}
/**
 * Функция редактирования оценки
 * @param {string} key - data атрибут элемента
 */


/**
 * Функция удаления оценки
 * @param {string} key - data атрибут элемента
 */
function onDeleteHandler(key) {
  const confirmationMessage = "Вы действительно хотите удалить оценку?";

  const isConfirmed = confirm(confirmationMessage);

  if (isConfirmed) {
    grades.splice(key, 1);

    showNotification("Оценка удалена!");

    render(grades); // показ измененных оценок
  }
}


render(grades); // первичная отрисовка
