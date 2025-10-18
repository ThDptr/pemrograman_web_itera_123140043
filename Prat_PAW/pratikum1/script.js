// ============================================
// APLIKASI MANAJEMEN TUGAS MAHASISWA
// ============================================

// Manajemen State
let tasks = []
let currentFilter = null
let currentSearchTerm = ""
let editingTaskId = null
let deleteTaskId = null
let detailTaskId = null

// Inisialisasi Aplikasi
document.addEventListener("DOMContentLoaded", () => {
  loadTasks()
  renderTasks()
  setupEventListeners()
  updateStats()
})

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
  // Menangani pengiriman form
  document.getElementById("taskForm").addEventListener("submit", handleFormSubmit)

  // Filter berdasarkan tingkat kesulitan
  document.querySelectorAll(".difficulty-box").forEach((box) => {
    box.addEventListener("click", () => {
      const filter = box.dataset.filter
      if (currentFilter === filter) {
        clearFilter()
      } else {
        currentFilter = filter
        updateDifficultyBoxes()
        renderTasks()
      }
    })
  })

  // Pencarian tugas
  document.getElementById("searchInput").addEventListener("input", (e) => {
    currentSearchTerm = e.target.value.toLowerCase()
    renderTasks()
  })
}

// ============================================
// PENANGANAN FORM
// ============================================

function handleFormSubmit(e) {
  e.preventDefault()

  // Bersihkan pesan error sebelumnya
  clearErrors()

  // Ambil nilai dari form
  const course = document.getElementById("course").value.trim()
  const title = document.getElementById("title").value.trim()
  const description = document.getElementById("description").value.trim()
  const difficulty = document.getElementById("difficulty").value
  const deadline = document.getElementById("deadline").value

  // Validasi input
  let isValid = true

  if (!course) {
    showError("courseError", "Mata kuliah tidak boleh kosong")
    isValid = false
  }

  if (!title) {
    showError("titleError", "Nama tugas tidak boleh kosong")
    isValid = false
  }

  if (!difficulty) {
    showError("difficultyError", "Pilih tingkat kesulitan")
    isValid = false
  }

  if (!deadline) {
    showError("deadlineError", "Deadline harus dipilih")
    isValid = false
  } else {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (deadlineDate < today) {
      showError("deadlineError", "Deadline tidak boleh tanggal lampau")
      isValid = false
    }
  }

  if (!isValid) return

  // Buat atau perbarui tugas
  if (editingTaskId) {
    updateTask(editingTaskId, { course, title, description, difficulty, deadline })
    editingTaskId = null
    document.getElementById("cancelEditBtn").style.display = "none"
  } else {
    createTask({ course, title, description, difficulty, deadline })
  }

  // Reset form
  document.getElementById("taskForm").reset()
  showSuccessMessage("Tugas berhasil disimpan!")
  renderTasks()
  updateStats()
}

// ============================================
// OPERASI CRUD TUGAS
// ============================================

function createTask(taskData) {
  // Buat tugas baru dengan ID unik
  const task = {
    id: Date.now().toString(),
    ...taskData,
    completed: false,
    createdAt: new Date().toISOString(),
  }

  tasks.push(task)
  saveTasks()
}

function updateTask(id, taskData) {
  // Perbarui data tugas yang sudah ada
  const taskIndex = tasks.findIndex((t) => t.id === id)
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...taskData }
    saveTasks()
  }
}

function deleteTask(id) {
  // Hapus tugas dari daftar
  tasks = tasks.filter((t) => t.id !== id)
  saveTasks()
}

function toggleTaskCompletion(id) {
  // Tandai tugas sebagai selesai atau belum selesai
  const task = tasks.find((t) => t.id === id)
  if (task) {
    task.completed = !task.completed
    saveTasks()
  }
}

// ============================================
// FUNGSI EDIT
// ============================================

function editTask(id) {
  // Isi form dengan data tugas untuk diedit
  const task = tasks.find((t) => t.id === id)
  if (!task) return

  document.getElementById("course").value = task.course
  document.getElementById("title").value = task.title
  document.getElementById("description").value = task.description
  document.getElementById("difficulty").value = task.difficulty
  document.getElementById("deadline").value = task.deadline

  // Tampilkan tombol batal edit
  editingTaskId = id
  document.getElementById("cancelEditBtn").style.display = "block"

  // Scroll ke form
  document.querySelector(".sticky").scrollIntoView({ behavior: "smooth" })
}

function cancelEdit() {
  // Batalkan proses edit
  editingTaskId = null
  document.getElementById("taskForm").reset()
  document.getElementById("cancelEditBtn").style.display = "none"
  clearErrors()
}

// ============================================
// FUNGSI HAPUS
// ============================================

function openDeleteConfirm(id) {
  // Buka modal konfirmasi hapus
  deleteTaskId = id
  document.getElementById("confirmModal").classList.add("active")
}

function closeConfirmModal() {
  // Tutup modal konfirmasi
  document.getElementById("confirmModal").classList.remove("active")
  deleteTaskId = null
}

function confirmDelete() {
  // Konfirmasi dan hapus tugas
  if (deleteTaskId) {
    deleteTask(deleteTaskId)
    closeConfirmModal()
    renderTasks()
    updateStats()
  }
}

// ============================================
// FUNGSI DETAIL TUGAS (FITUR BARU)
// ============================================

function showTaskDetail(id) {
  // Tampilkan detail tugas di modal
  const task = tasks.find((t) => t.id === id)
  if (!task) return

  detailTaskId = id

  // Isi konten modal dengan detail tugas
  const detailContent = document.getElementById("detailContent")
  detailContent.innerHTML = `
    <div class="detail-row">
      <span class="detail-label">Mata Kuliah:</span>
      <span class="detail-value">${escapeHtml(task.course)}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Nama Tugas:</span>
      <span class="detail-value">${escapeHtml(task.title)}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Deskripsi:</span>
      <span class="detail-value">${escapeHtml(task.description || "-")}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Tingkat:</span>
      <span class="detail-value">
        <span class="difficulty-${task.difficulty.toLowerCase()} px-3 py-1 rounded-full text-xs font-semibold">
          ${task.difficulty}
        </span>
      </span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Deadline:</span>
      <span class="detail-value">${formatDate(task.deadline)}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Status:</span>
      <span class="detail-value">${task.completed ? "✓ Selesai" : "⏳ Belum Selesai"}</span>
    </div>
  `

  // Buka modal detail
  document.getElementById("detailModal").classList.add("active")
}

function closeDetailModal() {
  // Tutup modal detail
  document.getElementById("detailModal").classList.remove("active")
  detailTaskId = null
}

// ============================================
// RENDERING
// ============================================

function renderTasks() {
  // Render daftar tugas ke tabel
  const tableBody = document.getElementById("taskTableBody")

  // Filter tugas berdasarkan tingkat kesulitan
  let filteredTasks = tasks

  if (currentFilter) {
    filteredTasks = filteredTasks.filter((t) => t.difficulty === currentFilter)
  }

  // Filter tugas berdasarkan pencarian
  if (currentSearchTerm) {
    filteredTasks = filteredTasks.filter(
      (t) =>
        t.title.toLowerCase().includes(currentSearchTerm) ||
        t.course.toLowerCase().includes(currentSearchTerm) ||
        t.description.toLowerCase().includes(currentSearchTerm),
    )
  }

  // Urutkan berdasarkan deadline
  filteredTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))

  // Tampilkan pesan kosong jika tidak ada tugas
  if (filteredTasks.length === 0) {
    tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-8">
                    <div class="empty-state">
                        <div class="empty-state-icon">📋</div>
                        <p>${currentFilter ? `Tidak ada tugas dengan tingkat ${currentFilter}` : "Tidak ada tugas. Tambahkan tugas baru untuk memulai!"}</p>
                    </div>
                </td>
            </tr>
        `
    return
  }

  // Render setiap tugas ke tabel
  tableBody.innerHTML = filteredTasks
    .map(
      (task) => `
        <tr class="${task.completed ? "completed" : ""}" onclick="showTaskDetail('${task.id}')">
            <td onclick="event.stopPropagation(); toggleTaskCompletion('${task.id}'); renderTasks(); updateStats();">
                <input 
                    type="checkbox" 
                    class="checkbox-custom" 
                    ${task.completed ? "checked" : ""}
                >
            </td>
            <td class="task-name">${escapeHtml(task.title)}</td>
            <td>${escapeHtml(task.course)}</td>
            <td>
                <span class="difficulty-${task.difficulty.toLowerCase()} px-3 py-1 rounded-full text-xs font-semibold">
                    ${task.difficulty}
                </span>
            </td>
            <td>${formatDate(task.deadline)}</td>
            <td onclick="event.stopPropagation();">
                <button class="icon-btn" onclick="editTask('${task.id}')" title="Edit">✏️</button>
                <button class="icon-btn delete" onclick="openDeleteConfirm('${task.id}')" title="Hapus">🗑️</button>
            </td>
        </tr>
    `,
    )
    .join("")
}

// ============================================
// STATISTIK & PROGRESS
// ============================================

function updateStats() {
  // Hitung total tugas, tugas selesai, dan tugas belum selesai
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.completed).length
  const incompleteTasks = totalTasks - completedTasks

  // Perbarui jumlah tugas belum dikerjakan
  document.getElementById("incompleteCount").textContent = incompleteTasks

  // Hitung dan perbarui progress
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)
  document.getElementById("progressPercent").textContent = progressPercent + "%"

  // Perbarui sudut progress circle (360 derajat = 100%)
  const angle = (progressPercent / 100) * 360
  document.getElementById("progressCircle").style.setProperty("--progress-angle", angle + "deg")

  // Hitung jumlah tugas per tingkat kesulitan
  const hardCount = tasks.filter((t) => t.difficulty === "Hard").length
  const mediumCount = tasks.filter((t) => t.difficulty === "Medium").length
  const easyCount = tasks.filter((t) => t.difficulty === "Easy").length

  document.getElementById("countHard").textContent = hardCount
  document.getElementById("countMedium").textContent = mediumCount
  document.getElementById("countEasy").textContent = easyCount

  updateDifficultyBoxes()
}

function updateDifficultyBoxes() {
  // Perbarui status aktif pada kotak filter tingkat kesulitan
  document.querySelectorAll(".difficulty-box").forEach((box) => {
    const filter = box.dataset.filter
    if (currentFilter === filter) {
      box.classList.add("active")
    } else {
      box.classList.remove("active")
    }
  })
}

// ============================================
// FILTER & PENCARIAN
// ============================================

function clearFilter() {
  // Bersihkan semua filter dan pencarian
  currentFilter = null
  currentSearchTerm = ""
  document.getElementById("searchInput").value = ""
  updateDifficultyBoxes()
  renderTasks()
}

// ============================================
// PENYIMPANAN DATA - localStorage dengan JSON
// ============================================

function saveTasks() {
  // Simpan tugas ke localStorage dalam format JSON
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTasks() {
  // Muat tugas dari localStorage
  const stored = localStorage.getItem("tasks")

  if (stored) {
    try {
      tasks = JSON.parse(stored)
    } catch (e) {
      console.error("Error parsing tasks from localStorage:", e)
      tasks = []
    }
  } else {
    // Data awal jika localStorage kosong
    tasks = [
      {
        id: "1",
        course: "Algoritma",
        title: "Implementasi Sorting",
        description: "Buat program sorting dengan berbagai metode",
        difficulty: "Hard",
        deadline: getDateString(7),
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        course: "Basis Data",
        title: "Query SQL Lanjutan",
        description: "Membuat query dengan JOIN dan subquery",
        difficulty: "Medium",
        deadline: getDateString(5),
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        course: "Web Development",
        title: "Membuat Form HTML",
        description: "Membuat form dengan validasi dasar",
        difficulty: "Easy",
        deadline: getDateString(3),
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]
    saveTasks()
  }
}

// ============================================
// FUNGSI UTILITY
// ============================================

function formatDate(dateString) {
  // Format tanggal ke format lokal Indonesia
  const date = new Date(dateString)
  const options = { year: "numeric", month: "short", day: "numeric" }
  return date.toLocaleDateString("id-ID", options)
}

function getDateString(daysFromNow) {
  // Dapatkan string tanggal N hari dari sekarang
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString().split("T")[0]
}

function escapeHtml(text) {
  // Escape HTML untuk mencegah XSS
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

function showError(elementId, message) {
  // Tampilkan pesan error
  document.getElementById(elementId).textContent = message
}

function clearErrors() {
  // Bersihkan semua pesan error
  document.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = ""
  })
}

function showSuccessMessage(message) {
  // Tampilkan pesan sukses sementara
  const successDiv = document.getElementById("successMessage")
  successDiv.innerHTML = `<div class="success-message">${message}</div>`
  setTimeout(() => {
    successDiv.innerHTML = ""
  }, 3000)
}
