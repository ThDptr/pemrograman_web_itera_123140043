// ========== ES6+ Features: const, let, arrow functions, template literals ==========

// Seleksi DOM elements
const taskForm = document.getElementById("task-form")
const taskInput = document.getElementById("task-input")
const taskListContainer = document.getElementById("task-list-container")
const timeWidget = document.getElementById("time-widget")

// Array untuk menyimpan tasks (menggunakan let karena akan dimodifikasi)
let tasks = []

// ========== Class Task (ES6+ Class) ==========
class Task {
  constructor(text) {
    this.id = Date.now() // Unique ID menggunakan timestamp
    this.text = text
    this.createdAt = new Date().toLocaleString("id-ID")
  }
}

// ========== localStorage Functions ==========
const getTasksFromStorage = () => {
  const stored = localStorage.getItem("tasks")
  return stored ? JSON.parse(stored) : []
}

const saveTasksToStorage = (tasksArray) => {
  localStorage.setItem("tasks", JSON.stringify(tasksArray))
}

// ========== Fungsi Async/Await untuk Fetchning Greeting & Time ==========
const fetchGreeting = async () => {
  try {
    // Fetch waktu dari API publik
    const response = await fetch("https://worldtimeapi.org/api/ip")
    const data = await response.json()

    // Parse waktu
    const dateTime = new Date(data.datetime)
    const hours = dateTime.getHours()
    const timeString = dateTime.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })

    // Tentukan salam berdasarkan jam
    let greeting = ""
    if (hours < 12) {
      greeting = "Pagi"
    } else if (hours < 18) {
      greeting = "Sore"
    } else {
      greeting = "Malam"
    }

    // Tampilkan di time-widget (Template Literal)
    timeWidget.innerHTML = `
            <p>Selamat ${greeting}! 🎉</p>
            <p>Waktu saat ini: <strong>${timeString}</strong></p>
        `
  } catch (error) {
    console.error("Error fetching time:", error)
    timeWidget.innerHTML = `
            <p>Selamat datang di Personal Dashboard! ✨</p>
            <p>${new Date().toLocaleTimeString("id-ID")}</p>
        `
  }
}

// ========== Rendering Tasks (Template Literals & forEach) ==========
const renderTasks = () => {
  // Kosongkan container
  taskListContainer.innerHTML = ""

  // Jika tidak ada tasks, tampilkan pesan kosong
  if (tasks.length === 0) {
    taskListContainer.innerHTML =
      '<div class="empty-state">Belum ada tugas. Tambahkan tugas baru untuk memulai! 📝</div>'
    return
  }

  // Loop dan render setiap task (menggunakan forEach)
  tasks.forEach((task) => {
    // Menggunakan Template Literals untuk membuat HTML
    const taskHTML = `
            <div class="task-item" data-id="${task.id}">
                <p>${task.text}</p>
                <button class="delete-btn" title="Hapus tugas">×</button>
            </div>
        `

    // Insert HTML ke dalam container
    taskListContainer.insertAdjacentHTML("beforeend", taskHTML)
  })
}

// ========== Event Listeners ==========

// Event: Form Submit (Arrow Function & Event.preventDefault)
taskForm.addEventListener("submit", (event) => {
  event.preventDefault()

  const taskText = taskInput.value.trim()

  if (taskText === "") {
    alert("Silakan masukkan tugas!")
    return
  }

  // Buat instance baru dari class Task
  const newTask = new Task(taskText)

  // Tambahkan ke array tasks
  tasks.push(newTask)

  // Simpan ke localStorage
  saveTasksToStorage(tasks)

  // Render ulang tasks
  renderTasks()

  // Reset input
  taskInput.value = ""
  taskInput.focus()
})

// Event: Delete Task (Event Delegation dengan Arrow Function)
taskListContainer.addEventListener("click", (event) => {
  // Cek apakah yang diklik adalah tombol delete
  if (event.target.classList.contains("delete-btn")) {
    const taskItem = event.target.closest(".task-item")
    const taskId = Number.parseInt(taskItem.getAttribute("data-id"))

    // Filter array tasks (hapus tugas dengan id yang sesuai)
    tasks = tasks.filter((task) => task.id !== taskId)

    // Simpan ke localStorage
    saveTasksToStorage(tasks)

    // Render ulang
    renderTasks()
  }
})

// ========== Initialize saat DOM loaded (DOMContentLoaded) ==========
document.addEventListener("DOMContentLoaded", () => {
  // Load tasks dari localStorage
  tasks = getTasksFromStorage()

  // Render tasks di halaman
  renderTasks()

  // Fetch greeting dan waktu (Async/Await)
  fetchGreeting()
})
