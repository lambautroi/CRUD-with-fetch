var courseApi = 'http://localhost:3000/posts';

function start() {
  getCourses(renderCourses);
  handleCreateForm();
}
start();

//Funtions get API (read) -->get
function getCourses(callback) {
  fetch(courseApi)
    .then((res) => res.json())
    .then(callback);
  // callback = function renderCourses(courses){}
}

//Funtions creater API  --> POST
function createCourses(data, callback) {
  fetch(courseApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(callback);
}
//Funtions delete API  --> DELETE
function deleteCourses(id) {
  fetch(courseApi + '/' + id, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then(function (course) {
      var coursesId = document.querySelector('.course-' + id);
      if (coursesId) coursesId.remove();
    });
}
//Funtions update API  --> PUT/PATCH

// hàm xử lí lấy data render ra web
function renderCourses(courses) {
  var listCoursesBlock = document.querySelector('#list-courses');

  var htmls = courses.map((course) => {
    return `
            <li class="course-${course.id}">
                <h3 class = "course-name">${course.name}</h3>
                <p class = "course-description">${course.description}</p>
                <button onclick = "deleteCourses(${course.id})">X</button>
            </li>
            `;
  });
  listCoursesBlock.innerHTML = htmls.join('');
}

// hàm xử lí tạo mới 1 form = nhập input (create)
function handleCreateForm() {
  var createButton = document.querySelector('#createButton');
  createButton.onclick = () => {
    var nameInput = document.querySelector('input[name="name"]').value;
    var descriptionInput = document.querySelector(
      'input[name="description"]'
    ).value;

    createCourses(
      {
        name: nameInput,
        description: descriptionInput,
      },
      () => {
        getCourses(renderCourses);
      }
    );
  };
}
