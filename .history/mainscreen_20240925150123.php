<!DOCTYPE html>

<?php
require('db_config.php');
?>

<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GetItDone Task List</title>
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    />
    <script src="./mainscreen.js" defer></script>
  </head>
  <body class="bg-gray-50">
    <!-- Header Section -->
    <header class="bg-white shadow p-4 flex justify-between items-center">
      <div class="flex items-center">
        <h1 class="text-3xl font-bold text-blue-600">GetItDone</h1>
      </div>
      <div class="flex items-center">
        <span class="text-gray-700 mr-4"
          >KietCT <span class="text-sm text-gray-500">(Admin)</span></span
        >
      </div>
    </header>

    <!-- Main Section -->
    <main class="container mx-auto mt-8">
      <div class="flex justify-between">
        <!-- Task List -->
        <div class="w-2/3 bg-white p-4 shadow rounded-lg">
          <div class="flex justify-between items-center mb-4">
            <!-- Task List Title -->
            <h2 class="text-xl font-bold">タスク一覧</h2>

            <div class="flex items-center space-x-4">
              <!-- Filter Icon -->
              <button class="text-blue-500 hover:text-gray-700">
                <i class="fas fa-sliders-h"></i>
              </button>

              <!-- Search Input with Icon -->
              <div class="relative">
                <input
                  type="text"
                  class="border rounded-lg pl-10 pr-3 py-2 w-64"
                  placeholder="タスクを入力してください"
                />
                <!-- Search Icon -->
                <i
                  class="fas fa-search absolute left-3 top-3 text-gray-500"
                ></i>
              </div>

              <!-- New Task Button -->
              <button
                class="newtask bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                + 新規作成
              </button>
            </div>
          </div>

          <!-- Task Group 1 -->
          <div class="mb-4 border-t pt-4">
            <h3 class="font-bold text-gray-700">28/08/2024</h3>

            <!-- Task 1 -->
            <div class="flex justify-between items-center space-x-4 my-2">
              <div class="flex items-center space-x-4">
                <input
                  type="checkbox"
                  class="form-checkbox h-5 w-5 toggle-complete"
                />
                <span class="task-text">タスク 1</span>
              </div>
              <div class="flex space-x-2">
                <button class="text-blue-500 hover:text-blue-700">
                  <i class="fa fa-eye"></i>
                </button>
                <button class="text-gray-500 hover:text-gray-700">
                  <i class="fa fa-pencil"></i>
                </button>
                <button class="text-red-500 hover:text-red-700">
                  <i class="fa fa-trash"></i>
                </button>
                <button class="text-gray-500 hover:text-yellow-300 star-icon">
                  <i class="fa fa-star"></i>
                </button>
              </div>
            </div>

            <!-- Task 2 -->
            <div class="flex justify-between items-center space-x-4 my-2">
              <div class="flex items-center space-x-4">
                <input
                  type="checkbox"
                  class="form-checkbox h-5 w-5 toggle-complete"
                />
                <span class="task-text">タスク 2</span>
              </div>
              <div class="flex space-x-2">
                <button class="text-blue-500 hover:text-blue-700">
                  <i class="fa fa-eye"></i>
                </button>
                <button class="text-gray-500 hover:text-gray-700">
                  <i class="fa fa-pencil"></i>
                </button>
                <button class="text-red-500 hover:text-red-700">
                  <i class="fa fa-trash"></i>
                </button>
                <button class="text-gray-500 hover:text-yellow-300 star-icon">
                  <i class="fa fa-star"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Task Group 2 -->
          <div class="mb-4 border-t pt-4">
            <h3 class="font-bold text-gray-700">29/08/2024</h3>

            <!-- Task 1 -->
            <div class="flex justify-between items-center space-x-4 my-2">
              <div class="flex items-center space-x-4">
                <input
                  type="checkbox"
                  class="form-checkbox h-5 w-5 toggle-complete"
                />
                <span class="task-text">タスク 1</span>
              </div>
              <div class="flex space-x-2">
                <button class="text-blue-500 hover:text-blue-700">
                  <i class="fa fa-eye"></i>
                </button>
                <button class="text-gray-500 hover:text-gray-700">
                  <i class="fa fa-pencil"></i>
                </button>
                <button class="text-red-500 hover:text-red-700">
                  <i class="fa fa-trash"></i>
                </button>
                <button class="text-gray-500 hover:text-yellow-300 star-icon">
                  <i class="fa fa-star"></i>
                </button>
              </div>
            </div>

            <!-- Task 2 -->
            <div class="flex justify-between items-center space-x-4 my-2">
              <div class="flex items-center space-x-4">
                <input
                  type="checkbox"
                  class="form-checkbox h-5 w-5 toggle-complete"
                />
                <span class="task-text">タスク 2</span>
              </div>
              <div class="flex space-x-2">
                <button class="text-blue-500 hover:text-blue-700">
                  <i class="fa fa-eye"></i>
                </button>
                <button class="text-gray-500 hover:text-gray-700">
                  <i class="fa fa-pencil"></i>
                </button>
                <button class="text-red-500 hover:text-red-700">
                  <i class="fa fa-trash"></i>
                </button>
                <button class="text-gray-500 hover:text-yellow-300 star-icon">
                  <i class="fa fa-star"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Task Completion Summary -->
        <div
          id="task-summary"
          class="w-1/3 bg-grey-900 p-6 rounded-lg shadow-lg ml-4"
        >
          <h3 class="font-bold text-gray-700">28/08/2024:</h3>
          <ul class="list-disc pl-5">
            <li>完了タスク: <span class="text-blue-500">1/2</span></li>
            <li>スタータスク: <span class="text-blue-500">0</span></li>
          </ul>

          <h3 class="font-bold text-gray-700 mt-4 border-t pt-4">
            29/08/2024:
          </h3>
          <ul class="list-disc pl-5">
            <li>完了タスク: <span class="text-blue-500">2/3</span></li>
            <li>スタータスク: <span class="text-blue-500">1</span></li>
          </ul>
        </div>

        <!-- Task Add Modal -->
        <div
          id="taskAddModal"
          class="fixed z-50 inset-0 overflow-y-auto hidden"
        >
          <div
            class="flex items-center justify-center min-h-screen bg-black bg-opacity-50"
          >
            <div class="relative bg-white w-96 p-6 rounded-lg shadow-lg">
              <!-- Close Button -->
              <button
                id="closeModal"
                class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <i class="fas fa-times"></i>
              </button>

              <!-- Modal Title -->
              <h2 class="text-2xl font-bold mb-4">タスク追加</h2>

              <!-- Form -->
              <form>
                <!-- Task Title -->
                <input
                  type="text"
                  placeholder="タイトルが入力してください"
                  class="title w-full border border-gray-300 p-2 rounded-lg mb-4"
                />

                <!-- Date Pickers -->
                <div class="flex justify-between space-x-4 mb-4">
                  <div class="w-1/2 relative">
                    <i
                      class="fas fa-clock absolute left-3 top-3 text-gray-500"
                    ></i>
                    <input
                      type="text"
                      placeholder="Tue Sep 10"
                      class="w-full pl-10 border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div class="w-1/2 relative">
                    <i
                      class="fas fa-clock absolute left-3 top-3 text-gray-500"
                    ></i>
                    <input
                      type="text"
                      placeholder="Tue Sep 10"
                      class="w-full pl-10 border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                </div>

                <!-- Task Description -->
                <textarea
                  placeholder="ディスクリプが入力してください"
                  class="w-full border border-gray-300 p-2 rounded-lg mb-4"
                  rows="4"
                ></textarea>

                <!-- Buttons -->
                <div class="flex justify-between">
                  <button
                    type="button"
                    class="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mr-2"
                  >
                    作成
                  </button>
                  <button
                    type="button"
                    class="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg w-full"
                    id="cancelButton"
                  >
                    キャンセル
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Filter Modal -->
        <div
          id="filterModal"
          class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center hidden"
        >
          <div class="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 class="text-xl font-bold mb-4">フィルターオプション</h2>

            <!-- Status Dropdown -->
            <div class="mb-4 relative">
              <label class="block text-gray-700 font-semibold"
                >ステータス</label
              >
              <button
                id="statusButton"
                class="bg-gray-200 border border-gray-300 p-2 w-full text-left rounded-lg flex justify-between items-center"
              >
                <span id="statusText">全ステータス</span>
                <i class="fas fa-chevron-down"></i>
              </button>

              <ul
                id="statusDropdown"
                class="absolute bg-white border border-gray-300 rounded-lg w-full hidden mt-1 z-10"
              >
                <li
                  class="p-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                  data-value="全ステータス"
                >
                  全ステータス
                </li>
                <li
                  class="p-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                  data-value="完了"
                >
                  完了
                </li>
                <li
                  class="p-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                  data-value="未完了"
                >
                  未完了
                </li>
              </ul>
            </div>

            <!-- Date Picker -->
            <div class="flex items-center mb-4">
              <i class="fas fa-calendar mr-2"></i>
              <span>締め切り</span>
            </div>

            <!-- Star Task Checkbox -->
            <div class="flex items-center mb-4">
              <input type="checkbox" id="starTask" class="mr-2" />
              <label for="starTask">スタータスク</label>
            </div>

            <!-- Buttons -->
            <div class="flex justify-between">
              <button
                id="resetButton"
                class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                リセット
              </button>
              <button
                id="applyButton"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                適用
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Icons FontAwesome -->
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
  </body>
</html>
