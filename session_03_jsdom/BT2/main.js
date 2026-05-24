let tasks = [];                    // Mảng lưu danh sách công việc
let editingTaskId = null;          // ID của công việc đang sửa (null = thêm mới)
const elements = {
    // Header
    appTitle: document.getElementById('app-title'),
    appSubtitle: document.getElementById('app-subtitle'),

    // thông báo
    notification: document.getElementById('notification'),
    notificationMessage: document.getElementById('notification-message'),
    notificationClose: document.getElementById('notification-close'),

    // Bảng điều khiển
    btnAddTask: document.getElementById('btn-add-task'),
    statTotal: document.getElementById('stat-total'),
    statCompleted: document.getElementById('stat-completed'),
    statPending: document.getElementById('stat-pending'),

    // Danh sách công việc
    tasksList: document.getElementById('tasks-list'),
    emptyState: document.getElementById('empty-state'),

    // Modal
    taskModal: document.getElementById('task-modal'),
    modalTitle: document.getElementById('modal-title'),
    btnCloseModal: document.getElementById('btn-close-modal'),
    taskForm: document.getElementById('task-form'),
    inputTitle: document.getElementById('input-title'),
    inputDescription: document.getElementById('input-description'),
    inputDeadline: document.getElementById('input-deadline'),
    inputPriority: document.getElementById('input-priority'),
    btnCancelForm: document.getElementById('btn-cancel-form'),
    btnSaveTask: document.getElementById('btn-save-task')
};

// Hiển thị thông báo
function showNotification(message, type = 'success') {
    // Phase 2: Lấy phần tử và thay đổi nội dung
    // Phase 3: Gắn sự kiện đóng
}

// Ẩn thông báo
function hideNotification() {
    // Phase 2: Ẩn phần tử
}

// Mở modal form (thêm mới)
function openAddModal() {
    // Phase 2: Hiển thị modal
}

// Mở modal form (sửa)
function openEditModal(taskId) {
    // Phase 2: Hiển thị modal và nạp dữ liệu
}

// Đóng modal form
function closeModal() {
    // Phase 2: Ẩn modal
}

// Reset form về trạng thái ban đầu
function resetForm() {
    // Phase 2: Xóa giá trị input
}

// Render danh sách công việc
function renderTasks() {
    // Phase 4: Duyệt mảng tasks và tạo HTML
}

// Cập nhật thống kê
function updateStatistics() {
    // Phase 4: Tính toán và hiển thị số liệu
}

// Lưu dữ liệu vào localStorage
function saveTasks() {
    // Phase 5: localStorage.setItem(...)
}

// Tải dữ liệu từ localStorage
function loadTasks() {
    // Phase 5: const data = localStorage.getItem(...); tasks = JSON.parse(data) || [];
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Loaded');
    console.log('📋 Elements retrieved:', elements);
    console.log('📋 Ready for Phase 2: Basic DOM manipulation');
});
