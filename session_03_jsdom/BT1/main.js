const btnAddStudent = document.getElementById('btnAddStudent');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancel = document.getElementById('btnCancel');
const btnSubmit = document.getElementById('btnSubmit');
const messageClose = document.getElementById('messageClose');
const btnConfirmYes = document.getElementById('btnConfirmYes');
const btnConfirmNo = document.getElementById('btnConfirmNo');

const studentModal = document.getElementById('studentModal');
const confirmModal = document.getElementById('confirmModal');

const studentForm = document.getElementById('studentForm');
const studentId = document.getElementById('studentId');
const studentName = document.getElementById('studentName');
const studentDob = document.getElementById('studentDob');
const studentClass = document.getElementById('studentClass');
const studentGrade = document.getElementById('studentGrade');
const studentEmail = document.getElementById('studentEmail');
const modalTitle = document.getElementById('modalTitle');

const messageArea = document.getElementById('messageArea');
const messageText = document.getElementById('messageText');

const totalStudents = document.getElementById('totalStudents');
const averageGrade = document.getElementById('averageGrade');

const studentTableBody = document.getElementById('studentTableBody');
const emptyRow = document.querySelector('.empty-row');

const confirmMessage = document.getElementById('confirmMessage');

let students = [];
let editingStudentId = null;
let deletingStudentId = null;
const STORAGE_KEY = 'students_data';

// Hiển thị thông báo
function showMessage(text, isError = false) {
    messageText.innerText = text;
    messageArea.classList.add('show');
    if (isError) {
        messageArea.classList.add('error');
    } else {
        messageArea.classList.remove('error');
    }

    // Tự động ẩn sau 5 giây
    setTimeout(() => {
        messageArea.classList.remove('show');
    }, 5000);
}

// Ẩn thông báo
function hideMessage() {
    messageArea.classList.remove('show');
}

// Mở modal thêm/sửa
function openModal(isEdit = false) {
    studentModal.classList.add('show');
    if (isEdit) {
        modalTitle.innerText = 'Cập Nhật Thông Tin Sinh Viên';
        btnSubmit.innerText = 'Cập Nhật';
    } else {
        modalTitle.innerText = 'Thêm Sinh Viên Mới';
        btnSubmit.innerText = 'Lưu Lại';
        resetForm();
    }
}

// Đóng modal
function closeModal() {
    studentModal.classList.remove('show');
    resetForm();
    editingStudentId = null;
}
// Reset form inputs
function resetForm() {
    studentForm.reset();
    studentId.focus();
}

// Cập nhật thống kê
function updateStatistics() {
    const count = students.length;
    totalStudents.innerText = count;
    if (count === 0) {
        averageGrade.innerText = '0.00';
    } else {
        const sum = students.reduce((acc, student) => acc + parseFloat(student.grade), 0);
        const avg = (sum / count).toFixed(2);
        averageGrade.innerText = avg;
    }
}

// Render bảng sinh viên
function renderStudents() {
    studentTableBody.innerHTML = '';
    
    if (students.length === 0) {
        studentTableBody.innerHTML = '<tr class="empty-row"><td colspan="7" class="text-center">Chưa có dữ liệu sinh viên</td></tr>';
        return;
    }
    
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.dob}</td>
            <td>${student.class}</td>
            <td>${parseFloat(student.grade).toFixed(2)}</td>
            <td>${student.email}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-small btn-edit" data-action="edit" data-id="${student.id}">Sửa</button>
                    <button class="btn-small btn-delete" data-action="delete" data-id="${student.id}">Xóa</button>
                </div>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Xử lý sự kiện click nút thêm sinh viên
btnAddStudent.addEventListener('click', () => {
    editingStudentId = null;
    openModal(false);
});

btnCloseModal.addEventListener('click', closeModal); // Đóng modal

btnCancel.addEventListener('click', closeModal); // Đóng modal

messageClose.addEventListener('click', hideMessage); // Ẩn thông báo

// Xử lý sự kiện submit form (thêm/sửa sinh viên)
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        id: studentId.value.trim(),
        name: studentName.value.trim(),
        dob: studentDob.value,
        class: studentClass.value.trim(),
        grade: studentGrade.value,
        email: studentEmail.value.trim()
    };

    // Dữ liệu không hợp lệ
    if (!validateForm(formData)) {
        return;
    }
    if (editingStudentId) {
        updateStudent(editingStudentId, formData);
    } else {
        addStudent(formData);
    }
});

// Xử lý sự kiện click vào bảng sinh viên (Sửa/Xóa)
studentTableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-small')) {
        const action = e.target.dataset.action;
        const id = e.target.dataset.id;
        if (action === 'edit') {
            handleEditClick(id);
        } else if (action === 'delete') {
            handleDeleteClick(id);
        }
    }
});

// Xử lý sự kiện click nút sửa
function handleEditClick(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;    
    // Tải dữ liệu sinh viên vào form
    studentId.value = student.id;
    studentName.value = student.name;
    studentDob.value = student.dob;
    studentClass.value = student.class;
    studentGrade.value = student.grade;
    studentEmail.value = student.email;
    editingStudentId = id;
    openModal(true);
}

// Xác nhận xóa sinh viên
function handleDeleteClick(id) {
    deletingStudentId = id;
    const student = students.find(s => s.id === id);
    confirmMessage.innerText = `Bạn có chắc chắn muốn xóa sinh viên "${student.name}"?`;
    confirmModal.classList.add('show');
}

// Xác nhận xóa sinh viên - Yes
btnConfirmYes.addEventListener('click', () => {
    if (deletingStudentId) {
        deleteStudent(deletingStudentId);
        confirmModal.classList.remove('show');
    }
});

// Xác nhận xóa sinh viên - No
btnConfirmNo.addEventListener('click', () => {
    deletingStudentId = null;
    confirmModal.classList.remove('show');
});

// Kiểm tra validate của dữ liệu biểu mẫu
function validateForm(data) {
    // Check trùng id khi điền form thêm sinh viên
    if (!editingStudentId && students.some(s => s.id === data.id)) {
        showMessage('Mã sinh viên này đã tồn tại!', true);
        return false;
    }
    
    // Check xem có thiếu trường nào không
    if (!data.id || !data.name || !data.dob || !data.class || !data.grade || !data.email) {
        showMessage('Vui lòng điền đầy đủ tất cả các trường!', true);
        return false;
    }
    
    // Điểm phải từ 0-10
    const gradeNum = parseFloat(data.grade);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 10) {
        showMessage('Điểm phải từ 0 đến 10!', true);
        return false;
    }
    
    // Check form email có hợp lệ không
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showMessage('Email không hợp lệ!', true);
        return false;
    }
    
    return true;
}

// Thêm sinh viên mới
function addStudent(data) {
    students.push(data);
    saveStudents();
    renderStudents();
    updateStatistics();
    closeModal();
    showMessage('Thêm sinh viên thành công!');
}

// Cập nhật thông tin sinh viên
function updateStudent(id, newData) {
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return;
    
    students[index] = newData;
    saveStudents();
    renderStudents();
    updateStatistics();
    closeModal();
    showMessage('Cập nhật thông tin sinh viên thành công!');
}

// Xóa sinh viên
function deleteStudent(id) {
    students = students.filter(s => s.id !== id);
    saveStudents();
    renderStudents();
    updateStatistics();
    showMessage('Xóa sinh viên thành công!');
}

// Lưu danh sách sinh viên vào localStorage
function saveStudents() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

// Tải danh sách sinh viên từ localStorage
function loadStudents() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        try {
            students = JSON.parse(data);
        } catch (e) {
            console.error('Error loading students:', e);
            students = [];
        }
    } else {
        // Tải dữ liệu mẫu
        students = [
            {
                id: 'SV001',
                name: 'Nguyễn Văn A',
                dob: '2003-05-15',
                class: 'CNTT01',
                grade: 8.5,
                email: 'nguyenvana@example.com'
            },
            {
                id: 'SV002',
                name: 'Trần Thị B',
                dob: '2003-07-20',
                class: 'CNTT01',
                grade: 9.0,
                email: 'tranthib@example.com'
            },
            {
                id: 'SV003',
                name: 'Lê Minh C',
                dob: '2003-03-10',
                class: 'CNTT02',
                grade: 7.5,
                email: 'leminch@example.com'
            }
        ];
        saveStudents();
    }
}

// Khởi tạo
function init() {
    loadStudents();
    renderStudents();
    updateStatistics();
    
    console.log('✓ Student Management System initialized');
    console.log('✓ Loaded', students.length, 'students');
}

// Đảm bảo DOM đã sẵn sàng trước khi khởi tạo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
