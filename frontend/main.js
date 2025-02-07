const SERVER_URL = 'http://localhost:3000'

async function serverAddStudents(obj) {
  let response = await fetch(SERVER_URL + '/api/students', {
    method: "POST",
    headers: { 'Content-Type': 'applicion/json'},
    body: JSON.stringify(obj),
  })

  let data = await response.json()

  return data
}



async function serverGetStudents() {
  let response = await fetch(SERVER_URL + '/api/students', {
    method: "GET",
    headers: { 'Content-Type': 'applicion/json'}
  })

  let data = await response.json()

  return data
}

let serverData = await serverGetStudents();

let studentsList = []

if (serverData !== null) {
  studentsList = serverData
}

async function serverDeleteStudents(id) {
  let response = await fetch(SERVER_URL + '/api/students/' + id, {
    method: "DELETE"
  })

  let data = await response.json()

  return data
}



async function createStudentObject() {
  // Создание объекта на основе значений из ввода
  let newStudentObj = {
      name: document.getElementById("name").value.trim(),
      lastname: document.getElementById("lastname").value.trim(),
      surname: document.getElementById("surname").value.trim(),
      birthday: new Date(document.getElementById("birthday").value), // Преобразуем в объект Date
      faculty: document.getElementById("faculty").value.trim(),
      studyStart: new Date(document.getElementById("studyStart").value).getFullYear() // Преобразуем в объект Date
  };

  
  let serverDataObj = await serverAddStudents (newStudentObj)
  serverDataObj = new Date(serverDataObj.birthday)
  console.log(studentsList)
  studentsList.push(serverDataObj)
  // render(studentsList)
}

// Обработка события нажатия на кнопку
document.getElementById("submit-button").addEventListener("click", function() {
  let studentData = createStudentObject(); // Получаем объект данных студента
  
  console.log(studentData); 
});



// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.




function formatDate(date) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  
  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;
  
  var yy = date.getFullYear();
  if (yy < 10) yy = '0' + yy;
  
  return dd + '.' + mm + '.' + yy;
}
// const studentsList = [
//   {
//     name: "Иван",
//     surname: "Андреевич",
//     lastname: "Иванович",
//     birthday: new Date(1998, 5, 15),
//     studyStart: 2017,
//     faculty: "Физика",
//   },
//   {
//     name: "Елена",
//     surname: "Борисова",
//     lastname: "Александровна",
//     birthday: new Date(1999, 8, 28),
//     studyStart: 2022,
//     faculty: "Математика",
//   },
//   {
//     name: "Алексей",
//     surname: "Петров",
//     lastname: "Сергеевич",
//     birthday: new Date(2000, 2, 10),
//     studyStart: 2018,
//     faculty: "Информатика",
//   },
//   {
//     name: "Марина",
//     surname: "Войтенко",
//     lastname: "Сергеевна",
//     birthday: new Date(2002, 3, 11),
//     studyStart: 2022,
//     faculty: "Информатика",
//   },
//   {
//     name: "Алексей",
//     surname: "Петров",
//     lastname: "Сергеевич",
//     birthday: new Date(2005, 9, 9),
//     studyStart: 2018,
//     faculty: "Программирование",
//   },
// ];

// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

// Вынес переменную в область видимости для всего кода для дальнейшей работы со списком     
const studentList = document.getElementById("student-list");

function getStudentItem(studentObj) {
  const studentItem = document.createElement("tr");
  studentList.appendChild(studentItem);

  const surnameCell = document.createElement("td");
  surnameCell.textContent =
    studentObj.surname + " " + studentObj.name + " " + studentObj.lastname; // Здесь объединяю ФИО в 1 колонку
  studentItem.appendChild(surnameCell);

  const birthdayCell = document.createElement("td");
  const birthday = new Date(studentObj.birthday);
  const age = new Date().getFullYear() - birthday.getFullYear(); // Просчитываю возраст студентов от текущей даты отнимаю возраст
  birthdayCell.textContent = `${formatDate(birthday)} (${age} лет)`;
  studentItem.appendChild(birthdayCell);

  const studyStartCell = document.createElement("td");
  const endYear = studentObj.studyStart + 4;
  const currentYear = new Date().getFullYear();
  const course =
    endYear > currentYear ? currentYear - studentObj.studyStart : "закончил";
  studyStartCell.textContent = `${studentObj.studyStart}-${endYear} (${
    course === "закончил" ? "закончил" : course + " курс"
  })`; // Проверка студента на года обучения с выводом настоящего курса и фразой закончил если студент выпустился
  studentItem.appendChild(studyStartCell);

  const facultyCell = document.createElement("td");
  facultyCell.textContent = studentObj.faculty;
  studentItem.appendChild(facultyCell);

  const Delete = document.createElement("td")
  const btnDelete = document.createElement("button")

  btnDelete.classList.add("btn", "btn-danger", "w-100")
  btnDelete.textContent = "Удалить"

  btnDelete.addEventListener("click", async function() {
    await serverDeleteStudents(studentObj.id)
    studentItem.remove()
  })

  Delete.append(btnDelete)
  studentItem.appendChild(Delete)

  return studentItem;
}

// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

// Логика рендера всех студентов с использованием цикла forEach.
function renderStudentsTable(studentsArray) {
  studentList.innerHTML = "";
  studentsArray.forEach((student) => {
    const studentItem = getStudentItem(student);
    studentList.appendChild(studentItem);
  });
}
renderStudentsTable(studentsList);

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.

const studentForm = document.getElementById("student-form");

// Блок с сообщением об ошибке валидации
const errorMessage = document.getElementById("error-message");
errorMessage.textContent = "";

// Валидация по кнопке
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const surNameInput = document.getElementById("surname");
  const nameInput = document.getElementById("name");
  const lastnameInput = document.getElementById("lastname");
  const birthdayInput = document.getElementById("birthday");
  const studyStartInput = document.getElementById("studyStart");
  const facultyInput = document.getElementById("faculty");

  const surname = surNameInput.value.trim();
  const name = nameInput.value.trim();
  const lastname = lastnameInput.value.trim();
  const birthday = new Date(birthdayInput.value);
  const studyStart = parseInt(studyStartInput.value);
  const faculty = facultyInput.value.trim();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const minBirthdayDate = new Date(1900, 0, 1);
  const minstudyStart = 2000;

  // Переменная для валидации
  let isValid = true;
  // Переменная хранит начальное состояние текста ошибки.
  let errorMessageText = "";

  // Реализация проверок

  // На пустоту
  if (
    surname === "" ||
    name === "" ||
    lastname === "" ||
    birthday === "Invalid Date" ||
    studyStart === NaN ||
    faculty === ""
  ) {
    isValid = false;
    errorMessageText = "Все поля обязательны для заполнения!";
  }
  // Дата рождения по диапазону
  else if (birthday < minBirthdayDate || birthday > currentDate) {
    isValid = false;
    errorMessageText =
      "Дата рождения должна быть в диапазоне от 01.01.1900 до текущей даты";
  }
  // Год начала обучения
  else if (studyStart < minstudyStart || studyStart > currentYear) {
    isValid = false;
    errorMessageText =
      "Год начала обучения должен быть в диапазоне от 2000 до текущего года";
  }

  if (isValid) {
    const studentData = {
      surname,
      name,
      lastname,
      birthday,
      studyStart,
      faculty,
    };

    // Добавляем нового студента в массив
    studentsList.push(studentData);

    // Рисуем в списке нового студента
    renderStudentsTable(studentsList);

    // Очистка полей формы добавления студента
    surNameInput.value = "";
    nameInput.value = "";
    lastnameInput.value = "";
    birthdayInput.value = "";
    studyStartInput.value = "";
    facultyInput.value = "";

    errorMessage.textContent = "";
  } else {
    errorMessage.textContent = errorMessageText;
  }
});

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

// Получаем DOM элементы по ID
const fio = document.getElementById("fio");
const birthDate = document.getElementById("birthDate");
const trainingYears = document.getElementById("trainingYears");
const faculty = document.getElementById("faculty");

// Переменная для указания направления
let sortDirection = true;

// Сортировки массива принимает 3 параметра. Массив, по какому критерию и направление сортировки.
const sortUsers = (studentsList, prop, sortDirection) =>
  studentsList.sort((a, b) =>
    sortDirection ? (a[prop] > b[prop] ? 1 : -1) : a[prop] < b[prop] ? 1 : -1
  );

// Сортировка по фамилии
fio.addEventListener("click", () => {
  sortUsers(studentsList, "surname", sortDirection);
  renderStudentsTable(studentsList);
  sortDirection = !sortDirection;
});

// Сортировка по дате рождения
birthDate.addEventListener("click", () => {
  sortUsers(studentsList, "birthDate", sortDirection);
  renderStudentsTable(studentsList);
  sortDirection = !sortDirection;
});

// Сортировка по годам обучения
trainingYears.addEventListener("click", () => {
  sortUsers(studentsList, "studyStart", sortDirection);
  renderStudentsTable(studentsList);
  sortDirection = !sortDirection;
});

// Сортировка по факультету
faculty.addEventListener("click", () => {
  sortUsers(studentsList, "faculty", sortDirection);
  renderStudentsTable(studentsList);
  sortDirection = !sortDirection;
});

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.

// Получаю 2ю форму в переменную
const filterForm = document.getElementById("filter-form");

// Функция для фильтрации
function filterStudents(student, filter) {
  return student.filter((student) => {
    const fullName = `${student.surname} ${student.name} ${student.lastname}`;
    const endYear = student.studyStart + 4;
    return (
      fullName.toLowerCase().includes(filter.name.toLowerCase()) &&
      student.faculty
        .toLowerCase()
        .includes(filter.faculty.toLowerCase()) &&
      (filter.studyStart ? student.studyStart === filter.studyStart : true) &&
      (filter.endYear ? endYear === filter.endYear : true)
    );
  });
}

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const filterName = document.getElementById("filter-name");
  const filterfaculty = document.getElementById("filter-faculty");
  const filterstudyStart = document.getElementById("filter-studyStart");
  const filterEndYear = document.getElementById("filter-endYear");

  const filter = {
    name: filterName.value.trim(),
    faculty: filterfaculty.value.trim(),
    studyStart: filterstudyStart.value
      ? parseInt(filterstudyStart.value)
      : undefined,
    endYear: filterEndYear.value ? parseInt(filterEndYear.value) : undefined,
  };

  const filteredStudentList = filterStudents(studentsList, filter);
  renderStudentsTable(filteredStudentList);
  console.log(1);
});
