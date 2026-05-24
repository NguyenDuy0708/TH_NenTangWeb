let tasks = [];                    // Mảng lưu danh sách công việc
let editingTaskId = null;          // ID của công việc đang sửa (null = thêm mới)
let elements = {
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

// modal overlay (để đóng modal khi click ra ngoài)
elements.modalOverlay = document.querySelector('#task-modal .modal-overlay');

// bộ đếm thời gian cho thông báo tự động ẩn
let _notificationTimer = null;

// Hiển thị thông báo
function showNotification(message, type = 'success') {
    if (!elements.notification || !elements.notificationMessage) return;

    elements.notificationMessage.innerText = message; // cài đặt thông điệp

    elements.notification.dataset.type = type; // cài đặt màu sắc/trạng thái bằng thuộc tính dữ liệu hoặc lớp

    elements.notification.classList.remove('hidden');// hiển thị

    // tự động ẩn sau 4s
    clearTimeout(_notificationTimer);
    _notificationTimer = setTimeout(() => {
        hideNotification();
    }, 4000);
}

// Ẩn thông báo
function hideNotification() {
    if (!elements.notification) return;
    elements.notification.classList.add('hidden');
    elements.notificationMessage.innerText = '';
    elements.notification.dataset.type = '';
    clearTimeout(_notificationTimer);
}

// Mở modal form (thêm mới)
function openAddModal() {
    if (!elements.taskModal) return;
    editingTaskId = null;
    elements.modalTitle.innerText = 'Thêm công việc mới';
    resetForm();
    elements.taskModal.classList.remove('hidden');
    // focus first input
    setTimeout(() => elements.inputTitle && elements.inputTitle.focus(), 120);
}

// Mở modal form (sửa)
function openEditModal(taskId) {
    if (!elements.taskModal) return;
    editingTaskId = taskId;
    elements.modalTitle.innerText = 'Sửa công việc';
    // data loading will be implemented in Phase 4
    elements.taskModal.classList.remove('hidden');
}

// Đóng modal form
function closeModal() {
    if (!elements.taskModal) return;
    elements.taskModal.classList.add('hidden');
    resetForm();
}

// Reset form về trạng thái ban đầu
function resetForm() {
    if (!elements.taskForm) return;
    elements.taskForm.reset();
    editingTaskId = null;
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
    // Cập nhật nội dung tĩnh
    if (elements.appTitle) elements.appTitle.innerText = '📋 Quản lý Công việc (Phase 2)';
    if (elements.btnAddTask) elements.btnAddTask.innerText = '+ Thêm công việc';

    // Gán sự kiện cho các nút
    elements.btnAddTask && elements.btnAddTask.addEventListener('click', openAddModal);
    elements.btnCloseModal && elements.btnCloseModal.addEventListener('click', closeModal);
    elements.btnCancelForm && elements.btnCancelForm.addEventListener('click', closeModal);
    elements.notificationClose && elements.notificationClose.addEventListener('click', hideNotification);

    // modal overlay close
    if (elements.modalOverlay) {
        elements.modalOverlay.addEventListener('click', closeModal);
    }

    // Gán sự kiện cho form
    if (elements.taskForm) {
        elements.taskForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // demo behavior for Phase 2
            showNotification('Form submitted (demo) — Phase 2', 'success');
            closeModal();
        });
    }

    // thông báo sẵn sàng
    showNotification('Phase 2 ready: you can open the modal and submit the form.');
});
