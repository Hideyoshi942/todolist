document.addEventListener("DOMContentLoaded", () => {
  // Hàm để thêm hoặc xóa gạch ngang trên task
  function toggleTaskComplete(checkbox) {
    const taskText = checkbox.parentElement.querySelector(".task-text");
    const isChecked = checkbox.checked;

    if (isChecked) {
      taskText.classList.add("line-through", "text-gray-400");
    } else {
      taskText.classList.remove("line-through", "text-gray-400");
    }

    // Cập nhật trạng thái vào cơ sở dữ liệu qua AJAX
    const taskId = checkbox.getAttribute("data-task-id");
    const checkedStatus = isChecked ? 1 : 0;

    fetch("mainscreenController.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `task_id=${taskId}&checked=${checkedStatus}`,
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }

  // Hàm để toggle ngôi sao (star) task
  function toggleStar(starIcon) {
    const taskText =
      starIcon.parentElement.parentElement.querySelector(".task-text");
    starIcon.classList.toggle("text-yellow-300");

    if (starIcon.classList.contains("text-yellow-300")) {
      taskText.classList.add("text-yellow-200");
    } else {
      taskText.classList.remove("text-yellow-200");
    }
  }

  // Hiển thị modal thêm task mới
  function showTaskAddModal() {
    document.getElementById("taskAddModal").classList.remove("hidden");
  }

  // Ẩn modal thêm task mới
  function hideTaskAddModal() {
    document.getElementById("taskAddModal").classList.add("hidden");
  }

  function showTaskEditModal(taskId) {
    // Reset các trường trong modal trước khi thực hiện yêu cầu AJAX
    document.querySelector("input[name='edit_task_id']").value = "";
    document.querySelector("input[name='edit_title']").value = "";
    document.querySelector("textarea[name='edit_description']").value = "";
    document.querySelector("input[name='edit_time_start']").value = "";
    document.querySelector("input[name='edit_time_end']").value = "";

    // Hiển thị spinner và ẩn nội dung modal trước khi bắt đầu tải dữ liệu
    document.getElementById("loadingSpinner").classList.remove("hidden");
    document.querySelector("form").classList.add("hidden");

    // Gửi yêu cầu AJAX để lấy thông tin task từ database dựa trên task_id
    fetch(`mainscreenController.php?task_id=${taskId}`)
      .then((response) => response.json())
      .then((task) => {
        // Điền thông tin của task vào modal khi dữ liệu đã sẵn sàng
        document.querySelector("input[name='edit_task_id']").value =
          task.task_id;
        document.querySelector("input[name='edit_title']").value = task.title;
        document.querySelector("textarea[name='edit_description']").value =
          task.description;

        // Gán dữ liệu vào input type="date" theo định dạng yyyy-mm-dd
        document.querySelector("input[name='edit_time_start']").value =
          task.time_start;
        document.querySelector("input[name='edit_time_end']").value =
          task.time_end;

        // Ẩn spinner và hiển thị nội dung form sau khi đã tải xong dữ liệu
        document.getElementById("loadingSpinner").classList.add("hidden");
        document.querySelector("form").classList.remove("hidden");

        // Hiển thị modal sau khi đã nhận được dữ liệu
        document.getElementById("taskEditModal").classList.remove("hidden");
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
        // Ẩn spinner nếu có lỗi xảy ra
        document.getElementById("loadingSpinner").classList.add("hidden");
      });
  }

  // Hàm định dạng ngày từ "yyyy-mm-dd" thành "dd-mm-yyyy"
  function formatDate(dateString) {
    if (dateString) {
      const parts = dateString.split("-"); // Tách ngày theo dấu '-'
      return `${parts[2]}-${parts[1]}-${parts[0]}`; // Đổi thứ tự từ yyyy-mm-dd thành dd-mm-yyyy
    }
    return ""; // Nếu không có dữ liệu, trả về chuỗi rỗng
  }

  // Ẩn modal chỉnh sửa task
  function hideTaskEditModal() {
    document.getElementById("taskEditModal").classList.add("hidden");
  }

  // Lưu thay đổi task sau khi chỉnh sửa
  function saveTaskEdit(event) {
    event.preventDefault();
    const taskId = document.querySelector("input[name='edit_task_id']").value;
    const title = document.querySelector("input[name='edit_title']").value;
    const description = document.querySelector(
      "textarea[name='edit_description']"
    ).value;
    const timeStart = document.querySelector(
      "input[name='edit_time_start']"
    ).value;
    const timeEnd = document.querySelector("input[name='edit_time_end']").value;

    fetch("mainscreenController.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `task_id=${taskId}&edit_task=1&title=${title}&description=${description}&time_start=${timeStart}&time_end=${timeEnd}`,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => console.error("Error:", error));

    hideTaskEditModal();
  }

  // Xóa task với xác nhận từ người dùng
  function deleteTask(trashIcon) {
    const taskId = trashIcon
      .closest("form")
      .querySelector("input[name='task_id']").value;
    const userConfirmed = confirm("Bạn có muốn xóa task này không?");

    if (userConfirmed) {
      fetch("mainscreenController.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `task_id=${taskId}&delete_task=1`,
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          window.location.reload();
        })
        .catch((error) => console.error("Error:", error));
    }
  }

  // Hiển thị modal filter
  function showFilterModal() {
    document.getElementById("filterModal").classList.remove("hidden");
  }

  // Ẩn modal filter
  function hideFilterModal() {
    document.getElementById("filterModal").classList.add("hidden");
  }

  // Dropdown trạng thái filter
  function toggleStatusDropdown() {
    const statusDropdown = document.getElementById("statusDropdown");
    statusDropdown.classList.toggle("hidden");
  }

  // Cập nhật trạng thái từ dropdown
  function updateStatusText(item) {
    document.getElementById("statusText").innerText =
      item.getAttribute("data-value");
    document.getElementById("statusDropdown").classList.add("hidden");
  }

  // Điều hướng đến trang chi tiết khi nhấn vào icon "mắt"
  function viewTaskDetails(taskId) {
    window.location.href = `../detail/detail.php?task_id=${taskId}`;
  }

  // Sự kiện: Toggle trạng thái hoàn thành của task
  document.querySelectorAll(".toggle-complete").forEach((checkbox) => {
    checkbox.addEventListener("change", () => toggleTaskComplete(checkbox));
  });

  // Sự kiện: Toggle ngôi sao (star) của task
  document.querySelectorAll(".star-icon").forEach((starIcon) => {
    starIcon.addEventListener("click", () => toggleStar(starIcon));
  });

  // Sự kiện: Hiển thị và ẩn modal thêm task
  document
    .querySelector(".newtask")
    .addEventListener("click", showTaskAddModal);
  document
    .getElementById("closeModal")
    .addEventListener("click", hideTaskAddModal);
  document
    .getElementById("cancelButton")
    .addEventListener("click", hideTaskAddModal);

  // Sự kiện: Hiển thị modal chỉnh sửa khi click icon pencil
  document.querySelectorAll(".fa-pencil").forEach((editIcon) => {
    editIcon.addEventListener("click", (event) => {
      event.preventDefault();
      const taskId = editIcon
        .closest(".task-container")
        .querySelector("input[name='task_id']").value;
      showTaskEditModal(taskId);
    });
  });

  // Sự kiện: Lưu thông tin sau khi chỉnh sửa task
  document
    .getElementById("saveEditButton")
    .addEventListener("click", saveTaskEdit);
  document
    .getElementById("closeEditModal")
    .addEventListener("click", hideTaskEditModal);
  document
    .getElementById("cancelEditButton")
    .addEventListener("click", hideTaskEditModal);

  // Sự kiện: Xóa task
  document.querySelectorAll(".fa-trash").forEach((trashIcon) => {
    trashIcon.addEventListener("click", (event) => {
      event.preventDefault();
      deleteTask(trashIcon);
    });
  });

  // Sự kiện: Hiển thị và ẩn filter modal
  document
    .querySelector(".fa-sliders-h")
    .addEventListener("click", showFilterModal);
  document
    .getElementById("applyButton")
    .addEventListener("click", hideFilterModal);
  document
    .getElementById("resetButton")
    .addEventListener("click", hideFilterModal);

  // Sự kiện: Toggle dropdown trạng thái
  document
    .getElementById("statusButton")
    .addEventListener("click", toggleStatusDropdown);

  // Cập nhật trạng thái từ dropdown
  document.querySelectorAll("#statusDropdown li").forEach((item) => {
    item.addEventListener("click", () => updateStatusText(item));
  });

  // Đóng dropdown nếu click ra ngoài
  window.addEventListener("click", (e) => {
    if (!document.getElementById("statusButton").contains(e.target)) {
      document.getElementById("statusDropdown").classList.add("hidden");
    }
  });

  // Sự kiện: Xem chi tiết task khi nhấn vào icon "mắt"
  document.querySelectorAll(".fa-eye").forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", function () {
      const taskId = this.closest(".task-container").querySelector(
        "input[name='task_id']"
      ).value;
      viewTaskDetails(taskId);
    });
  });

  // Sự kiện: Hiển thị modal chỉnh sửa khi click icon pencil (dành cho nút với class "edit-task-button")
  document.querySelectorAll(".edit-task-button").forEach((editIcon) => {
    editIcon.addEventListener("click", (event) => {
      event.preventDefault();
      const taskId = editIcon.getAttribute("data-task-id");
      showTaskEditModal(taskId);
    });
  });
});