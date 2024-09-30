document.addEventListener("DOMContentLoaded", () => {
  // Get elements for add and edit modals
  const newTaskButton = document.querySelector(".newtask");
  const taskAddModal = document.getElementById("taskAddModal");
  const taskEditModal = document.getElementById("taskEditModal");
  const closeAddModalButton = document.getElementById("closeModal");
  const closeEditModalButton = document.getElementById("closeEditModal");
  const cancelAddButton = document.getElementById("cancelButton");
  const cancelEditButton = document.getElementById("cancelEditButton");

  // Show modal when clicking on "新規作成" button (add new task)
  newTaskButton.addEventListener("click", (event) => {
    event.preventDefault();
    taskAddModal.classList.remove("hidden"); // Hiển thị modal thêm mới
  });

  // Add event listeners to edit buttons (open edit modal)
  const editButtons = document.querySelectorAll(".fa-pencil");
  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const taskId = button.getAttribute("data-task-id"); // Lấy task_id từ data attribute

      // Fetch task data và điền vào modal edit
      fetch(`get_task_data.php?task_id=${taskId}`)
        .then(response => response.json())
        .then(data => {
          // Điền dữ liệu vào các trường trong modal edit
          document.querySelector('input[name="edit_task_id"]').value = data.task_id;
          document.querySelector('input[name="edit_title"]').value = data.title;
          document.querySelector('input[name="edit_time_start"]').value = data.time_start;
          document.querySelector('input[name="edit_time_end"]').value = data.time_end;
          document.querySelector('textarea[name="edit_description"]').value = data.description;

          // Hiển thị modal edit
          taskEditModal.classList.remove("hidden");
        });
    });
  });

  // Add event listener to close add modal button
  closeAddModalButton.addEventListener("click", () => {
    taskAddModal.classList.add("hidden");
  });

  // Add event listener to close edit modal button
  closeEditModalButton.addEventListener("click", () => {
    taskEditModal.classList.add("hidden");
  });

  // Add event listener to cancel buttons for both modals
  cancelAddButton.addEventListener("click", () => {
    taskAddModal.classList.add("hidden");
  });

  cancelEditButton.addEventListener("click", () => {
    taskEditModal.classList.add("hidden");
  });
  
  // Xử lý sự kiện khi click vào checkbox để gạch ngang hoặc bỏ gạch ngang
  document.querySelectorAll(".toggle-complete").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const taskText = this.parentElement.querySelector(".task-text");
      if (this.checked) {
        taskText.classList.add("line-through", "text-gray-400");
      } else {
        taskText.classList.remove("line-through", "text-gray-400");
      }
    });
  });

  // Xử lý sự kiện khi click vào icon ngôi sao
  document.querySelectorAll(".star-icon").forEach((star) => {
    star.addEventListener("click", function () {
      const taskText =
        this.parentElement.parentElement.querySelector(".task-text");
      // Toggle màu ngôi sao
      this.classList.toggle("text-yellow-300");
      // Toggle màu chữ của task
      if (this.classList.contains("text-yellow-300")) {
        taskText.classList.add("text-yellow-200");
      } else {
        taskText.classList.remove("text-yellow-200");
      }
    });
  });

  // Handle eye icon click to redirect to task detail page
  const viewButtons = document.querySelectorAll(".fa-eye");
  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "../detail/detail.php"; // Redirect to the detail page
    });
  });

  // Handle filter modal
  const filterModal = document.getElementById("filterModal");
  const filterButton = document.querySelector(".fa-sliders-h");
  const applyButton = document.getElementById("applyButton");
  const resetButton = document.getElementById("resetButton");

  filterButton.addEventListener("click", function () {
    filterModal.classList.remove("hidden");
  });

  applyButton.addEventListener("click", function () {
    filterModal.classList.add("hidden");
  });

  resetButton.addEventListener("click", function () {
    filterModal.classList.add("hidden");
  });

  // Handle status dropdown in filter modal
  const statusButton = document.getElementById("statusButton");
  const statusDropdown = document.getElementById("statusDropdown");
  const statusText = document.getElementById("statusText");
  const dropdownItems = statusDropdown.querySelectorAll("li");

  // Hiển thị hoặc ẩn dropdown khi nhấn vào button
  statusButton.addEventListener("click", function () {
    statusDropdown.classList.toggle("hidden");
  });

  // Cập nhật giá trị khi chọn trong dropdown
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      statusText.innerText = this.getAttribute("data-value");
      statusDropdown.classList.add("hidden");
    });
  });

  // Đóng dropdown khi nhấn ra ngoài
  window.addEventListener("click", function (e) {
    if (!statusButton.contains(e.target)) {
      statusDropdown.classList.add("hidden");
    }
  });

  // Handle form submission for adding new tasks
  const taskAddForm = document.querySelector("form");
  const createButton = taskAddForm.querySelector("button[type='submit']");

  createButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const title = taskAddForm.querySelector("input[name='title']").value;
    const timeStart = taskAddForm.querySelector("input[name='time_start']").value;
    const timeEnd = taskAddForm.querySelector("input[name='time_end']").value;
    const description = taskAddForm.querySelector("textarea[name='description']").value;

    // Gửi dữ liệu qua AJAX (Fetch API)
    const response = await fetch("./add_task.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        title: title,
        description: description,
        time_start: timeStart,
        time_end: timeEnd,
      }),
    });

    const result = await response.json();

    if (result.status === "success") {
      alert("タスクが正常に追加されました。");
      // Ẩn modal sau khi lưu thành công
      taskAddModal.classList.add("hidden");
      // Tải lại trang để cập nhật danh sách task mới (hoặc tự thêm vào danh sách)
      window.location.reload();
    } else {
      alert("エラーが発生しました。再度お試しください。");
    }
  });
});