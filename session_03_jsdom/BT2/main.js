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
    // Phase 3/4: Duyệt mảng tasks và tạo HTML
    if (!elements.tasksList) return;
    // clear container
    elements.tasksList.innerHTML = '';

    if (!tasks || tasks.length === 0) {
        // re-attach empty state
        if (elements.emptyState) elements.tasksList.appendChild(elements.emptyState);
        return;
    }

    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task-card' + (task.completed ? ' completed' : '');
        card.dataset.id = task.id;

        // checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = !!task.completed;

        // content
        const content = document.createElement('div');
        content.className = 'task-content';

        const header = document.createElement('div');
        header.className = 'task-header';

        const title = document.createElement('div');
        title.className = 'task-title';
        title.innerText = task.title || '(Không có tiêu đề)';

        const priority = document.createElement('div');
        priority.className = 'task-priority ' + (task.priority ? ('priority-' + task.priority) : 'priority-medium');
        priority.innerText = (task.priority === 'high' ? 'Cao' : task.priority === 'low' ? 'Thấp' : 'Trung bình');

        header.appendChild(title);
        header.appendChild(priority);

        const desc = document.createElement('div');
        desc.className = 'task-description';
        desc.innerText = task.description || '';

        content.appendChild(header);
        if (task.description) content.appendChild(desc);

        if (task.deadline) {
            const dl = document.createElement('div');
            dl.className = 'task-deadline';
            dl.innerHTML = '<strong>Hạn:</strong> ' + task.deadline;
            content.appendChild(dl);
        }

        // actions
        const actions = document.createElement('div');
        actions.className = 'task-actions';

        const btnEdit = document.createElement('button');
        btnEdit.className = 'task-btn task-btn-edit';
        btnEdit.type = 'button';
        btnEdit.dataset.id = task.id;
        btnEdit.innerText = 'Sửa';

        const btnDelete = document.createElement('button');
        btnDelete.className = 'task-btn task-btn-delete';
        btnDelete.type = 'button';
        btnDelete.dataset.id = task.id;
        btnDelete.innerText = 'Xóa';

        actions.appendChild(btnEdit);
        actions.appendChild(btnDelete);

        // assemble
        card.appendChild(checkbox);
        card.appendChild(content);
        card.appendChild(actions);

        elements.tasksList.appendChild(card);
    });
}

// Cập nhật thống kê
function updateStatistics() {
    if (!elements.statTotal) return;
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    elements.statTotal.innerText = total;
    elements.statCompleted.innerText = completed;
    elements.statPending.innerText = pending;
}

// Lưu dữ liệu vào localStorage
function saveTasks() {
    try {
        localStorage.setItem('bt2_tasks', JSON.stringify(tasks));
    } catch (e) {
        // ignore
    }
}

// Tải dữ liệu từ localStorage
function loadTasks() {
    try {
        const data = localStorage.getItem('bt2_tasks');
        tasks = data ? JSON.parse(data) : [];
    } catch (e) {
        tasks = [];
    }
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Loaded');
    console.log('📋 Elements retrieved:', elements);
    console.log('📋 Ready for Phase 3: Event handling');

    // cập nhật tiêu đề ứng dụng
    if (elements.appTitle) elements.appTitle.innerText = '📋 Quản lý Công việc';
    if (elements.btnAddTask) elements.btnAddTask.innerText = '+ Thêm công việc';

    // kết nối sự kiện UI cơ bản
    elements.btnAddTask && elements.btnAddTask.addEventListener('click', openAddModal);
    elements.btnCloseModal && elements.btnCloseModal.addEventListener('click', closeModal);
    elements.btnCancelForm && elements.btnCancelForm.addEventListener('click', closeModal);
    elements.notificationClose && elements.notificationClose.addEventListener('click', hideNotification);
    if (elements.modalOverlay) elements.modalOverlay.addEventListener('click', closeModal);

    // kết nối sự kiện cho form
    if (elements.taskForm) {
        elements.taskForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const title = elements.inputTitle.value.trim();
            const description = elements.inputDescription.value.trim();
            const deadline = elements.inputDeadline.value || '';
            const priority = elements.inputPriority.value || 'medium';

            if (!title) {
                showNotification('Tiêu đề không được để trống', 'error');
                return;
            }

            if (editingTaskId) {
                // cập nhật
                const idx = tasks.findIndex(t => String(t.id) === String(editingTaskId));
                if (idx > -1) {
                    tasks[idx].title = title;
                    tasks[idx].description = description;
                    tasks[idx].deadline = deadline;
                    tasks[idx].priority = priority;
                    showNotification('Cập nhật công việc thành công');
                }
            } else {
                // tạo mới
                const newTask = { id: Date.now(), title, description, deadline, priority, completed: false };
                tasks.unshift(newTask);
                showNotification('Thêm công việc thành công');
            }

            saveTasks();
            renderTasks();
            updateStatistics();
            closeModal();
        });
    }

    // kết nối sự kiện cho danh sách công việc
    if (elements.tasksList) {
        // click cho edit/delete
        elements.tasksList.addEventListener('click', function (e) {
            const editBtn = e.target.closest('.task-btn-edit');
            const deleteBtn = e.target.closest('.task-btn-delete');
            if (editBtn) {
                const id = editBtn.dataset.id;
                const task = tasks.find(t => String(t.id) === String(id));
                if (task) {
                    elements.inputTitle.value = task.title || '';
                    elements.inputDescription.value = task.description || '';
                    elements.inputDeadline.value = task.deadline || '';
                    elements.inputPriority.value = task.priority || 'medium';
                    editingTaskId = id;
                    elements.modalTitle.innerText = 'Sửa công việc';
                    elements.taskModal.classList.remove('hidden');
                    elements.inputTitle.focus();
                }
                return;
            }

            if (deleteBtn) {
                const id = deleteBtn.dataset.id;
                if (confirm('Bạn có chắc muốn xóa công việc này?')) {
                    tasks = tasks.filter(t => String(t.id) !== String(id));
                    saveTasks();
                    renderTasks();
                    updateStatistics();
                    showNotification('Xóa công việc thành công');
                }
                return;
            }
        });

        // change cho checkbox
        elements.tasksList.addEventListener('change', function (e) {
            const cb = e.target.closest('.task-checkbox');
            if (cb) {
                const card = cb.closest('.task-card');
                const id = card && card.dataset && card.dataset.id;
                const idx = tasks.findIndex(t => String(t.id) === String(id));
                if (idx > -1) {
                    tasks[idx].completed = !!cb.checked;
                    saveTasks();
                    renderTasks();
                    updateStatistics();
                }
            }
        });
    }

    // Load persisted tasks
    loadTasks();
    renderTasks();
    updateStatistics();

    showNotification('Phase 3: Kết nối sự kiện cơ bản đã sẵn sàng');
});
