// Lấy danh sách tất cả tài khoản
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Lấy thông tin tài khoản đang đăng nhập
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
}

// -------------------------------------------------------------
// 1. ĐĂNG KÝ TÀI KHOẢN MỚI (TRỐNG DỮ LIỆU BAN ĐẦU)
// -------------------------------------------------------------
function registerUser() {
    const fullname = document.getElementById('fullname').value.trim();
    const studentId = document.getElementById('student-id').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!fullname || !studentId || !password || !confirmPassword) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }

    const users = getUsers();
    const isExist = users.some(user => user.studentId === studentId);

    if (isExist) {
        alert('Mã số sinh viên này đã được đăng ký!');
        return;
    }

    // Khởi tạo tài khoản mới hoàn toàn CHƯA CÓ DỮ LIỆU (0 tín chỉ, 0.0 GPA)
    const newUser = {
        fullname: fullname,
        studentId: studentId,
        password: password,
        stats: {
            credits: 0,
            totalCredits: 138,
            gpa: 0.0,
            gpa4: 0.00,
            rank: "Chưa xếp loại",
            passed: 0,
            failed: 0,
            breakdown: { đạiCương: 0, cơSởNgành: 0, chuyênNgành: 0, cònLại: 138 },
            modulesProgress: { m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0 },
            gpaTrend: [0, 0, 0, 0, 0],
            gradesList: [] // Tài khoản mới sẽ có danh sách bảng điểm trống
        }
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Đăng ký thành công! Đang chuyển đến trang Đăng nhập...');
    window.location.href = 'index.html';
}

// -------------------------------------------------------------
// 2. ĐĂNG NHẬP
// -------------------------------------------------------------
function loginUser() {
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value;

    if (!usernameInput || !passwordInput) {
        alert('Vui lòng nhập tên đăng nhập và mật khẩu!');
        return;
    }

    const users = getUsers();
    const userFound = users.find(user => user.fullname === usernameInput || user.studentId === usernameInput);

    if (!userFound) {
        alert('Tài khoản không tồn tại! Vui lòng đăng ký.');
        return;
    }

    if (userFound.password !== passwordInput) {
        alert('Mật khẩu không chính xác!');
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(userFound));

    alert(`Đăng nhập thành công! Chào mừng ${userFound.fullname}`);
    window.location.href = 'dashboard.html';
}

// -------------------------------------------------------------
// 3. HIỂN THỊ DỮ LIỆU DASHBOARD (dashboard.html)
// -------------------------------------------------------------
if (window.location.pathname.includes('dashboard.html')) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        alert('Vui lòng đăng nhập để truy cập!');
        window.location.href = 'index.html';
    } else {
        document.getElementById('display-fullname').textContent = currentUser.fullname;
        document.getElementById('display-mssv').textContent = `MSSV: ${currentUser.studentId}`;

        const stats = currentUser.stats || {};
        const totalCreds = stats.totalCredits || 138; // Nếu undefined thì tự chuyển thành 138
        const currentCreds = stats.credits || 0;

        // SỬA LỖI Ở ĐÂY: Thêm fallback totalCreds để hiển thị 0/138
        document.getElementById('val-credits').textContent = `${currentCreds}/${totalCreds}`;
        document.getElementById('val-gpa').textContent = (stats.gpa || 0).toFixed(1);
        document.getElementById('val-rank').textContent = stats.rank || "Chưa xếp loại";
        document.getElementById('val-passed').textContent = stats.passed || 0;
        document.getElementById('val-failed').textContent = stats.failed || 0;

        // Biểu đồ Donut (Tín chỉ)
        const breakdown = stats.breakdown || { đạiCương: 0, cơSởNgành: 0, chuyênNgành: 0, cònLại: totalCreds };
        const ctxDonut = document.getElementById('creditChart').getContext('2d');
        new Chart(ctxDonut, {
            type: 'doughnut',
            data: {
                labels: ['Đại cương', 'Cơ sở ngành', 'Chuyên ngành', 'Còn lại'],
                datasets: [{
                    data: [
                        breakdown.đạiCương || 0, 
                        breakdown.cơSởNgành || 0, 
                        breakdown.chuyênNgành || 0, 
                        breakdown.cònLại || totalCreds
                    ],
                    backgroundColor: ['#4285F4', '#EA4335', '#FBBC05', '#E0E0E0'],
                    borderWidth: 0
                }]
            },
            options: { cutout: '72%', plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false }
        });

        // Biểu đồ Line (Xu hướng GPA)
        const ctxLine = document.getElementById('gpaTrendChart').getContext('2d');
        new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5'],
                datasets: [{
                    data: stats.gpaTrend || [0, 0, 0, 0, 0],
                    borderColor: '#4285f4', backgroundColor: '#4285f4', borderWidth: 3, tension: 0.4
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { y: { min: 0, max: 10, ticks: { stepSize: 2.00 } }, x: { grid: { display: false } } },
                plugins: { legend: { display: false } }
            }
        });
    }
}

// -------------------------------------------------------------
// 4. HIỂN THỊ DỮ LIỆU KHUNG CTĐT (program.html)
// -------------------------------------------------------------
if (window.location.pathname.includes('program.html')) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        alert('Vui lòng đăng nhập để truy cập!');
        window.location.href = 'index.html';
    } else {
        document.getElementById('display-fullname').textContent = currentUser.fullname;
        document.getElementById('display-mssv').textContent = `MSSV: ${currentUser.studentId}`;

        const stats = currentUser.stats || {};
        const totalCreds = stats.totalCredits || 138; // Mặc định 138 tín chỉ
        const credits = stats.credits || 0;
        const remainingCredits = totalCreds - credits;
        const completionPercent = Math.round((credits / totalCreds) * 100);
        const remainingPercent = 100 - completionPercent;

        // Điền lại các thông số widget
        document.getElementById('prog-total-credits').textContent = totalCreds;
        document.getElementById('prog-completed-credits').textContent = credits;
        document.getElementById('prog-remaining-credits').textContent = remainingCredits;
        document.getElementById('prog-gpa-val').textContent = (stats.gpa4 || 0).toFixed(2);

        document.getElementById('fill-completed-widget').style.width = `${completionPercent}%`;
        document.getElementById('percent-completed-widget').textContent = `${completionPercent}%`;

        document.getElementById('fill-remaining-widget').style.width = `${remainingPercent}%`;
        document.getElementById('percent-remaining-widget').textContent = `${remainingPercent}%`;
    }
}

// -------------------------------------------------------------
// 5. HIỂN THỊ CHI TIẾT MÔN TOÁN - KHTN (module-math.html)
// -------------------------------------------------------------
if (window.location.pathname.includes('module-math.html')) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Vui lòng đăng nhập để truy cập!');
        window.location.href = 'index.html';
    } else {
        document.getElementById('display-fullname').textContent = currentUser.fullname;
        document.getElementById('display-mssv').textContent = `MSSV: ${currentUser.studentId}`;

        // Danh sách môn học chuẩn theo hình
        const courseData = [
            { stt: "1", code: "MTH00021", name: "Vi tích phân 1", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" },
            { stt: "2", code: "MTH00022", name: "Vi tích phân 2", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "TQ:<br>Vi tích phân 1" },
            { stt: "3", code: "MTH00035", name: "Đại số tuyến tính", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" },
            { stt: "4", code: "MTH00044", name: "Xác suất thống kê", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" },
            { stt: "5", code: "MTH00045", name: "Toán rời rạc", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" },
            { stt: "6", code: "MTH00050", name: "Toán học tổ hợp", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" },
            { stt: "7", isHeader: true, name: "Chọn 1 học phần (4 tín chỉ) trong các học phần sau:" },
            { stt: "", code: "ENV00001", name: "Môi trường đại cương", tc: 2, type: "TC", lt: 30, th: 0, bt: 0, req: "" },
            { stt: "", code: "ENV00003", name: "Con người và môi trường", tc: 2, type: "TC", lt: 30, th: 0, bt: 0, req: "" }
        ];

        const grades = currentUser.stats.mathGrades || {};
        const tbody = document.getElementById('course-table-body');
        
        let passedCreds = 0, passedCourses = 0, failedCourses = 0;
        const totalCreds = 36; 
        const totalCourses = 10;

        // Render Table
        courseData.forEach(c => {
            const tr = document.createElement('tr');
            if (c.isHeader) {
                tr.innerHTML = `<td>${c.stt}</td><td colspan="9" class="group-header">${c.name}</td>`;
            } else {
                const status = grades[c.code] || "Chưa học";
                let statusClass = 'st-chua-hoc';
                let displayStatus = status.toUpperCase();

                if (status === "ĐẠT" || status === "Đạt") { 
                    statusClass = 'st-dat'; 
                    passedCreds += c.tc; 
                    passedCourses++; 
                }
                else if (status === "Đang học") { 
                    statusClass = 'st-dang-hoc'; 
                    displayStatus = "Đang học"; 
                }
                else if (status === "CHƯA ĐẠT" || status === "Chưa đạt") { 
                    statusClass = 'st-chua-dat'; 
                    failedCourses++; 
                }
                else { displayStatus = "Chưa học"; }

                tr.innerHTML = `
                    <td>${c.stt}</td>
                    <td>${c.code}</td>
                    <td>${c.name}</td>
                    <td>${c.tc}</td>
                    <td>${c.type}</td>
                    <td>${c.lt}</td><td>${c.th}</td><td>${c.bt}</td>
                    <td>${c.req}</td>
                    <td class="td-status ${statusClass}">${displayStatus}</td>
                `;
            }
            tbody.appendChild(tr);
        });

        // Update Progress Bar
        const percent = Math.round((passedCreds / totalCreds) * 100) || 0;
        document.getElementById('math-progress-fill').style.width = percent + '%';
        document.getElementById('math-progress-text').textContent = percent + '%';
        
        // Update Chart Labels
        document.getElementById('chart-percent-text').textContent = percent + '%';
        document.getElementById('leg-cred-passed').textContent = `${passedCreds} tín chỉ`;
        document.getElementById('leg-cred-not').textContent = `${totalCreds - passedCreds} tín chỉ`;
        document.getElementById('leg-course-passed').textContent = `${passedCourses} môn`;
        document.getElementById('leg-course-failed').textContent = `${failedCourses} môn`;

        // Render Charts
        new Chart(document.getElementById('chartCredits').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Đã học', 'Chưa học'],
                datasets: [{ data: [passedCreds, totalCreds - passedCreds], backgroundColor: ['#00c853', '#2962ff'], borderWidth: 0 }]
            },
            options: { cutout: '75%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });

        new Chart(document.getElementById('chartCourses').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Đạt', 'Chưa đạt', 'Khác'],
                datasets: [{ data: [passedCourses, failedCourses, totalCourses - passedCourses - failedCourses], backgroundColor: ['#00c853', '#f44336', '#e0e0e0'], borderWidth: 0 }]
            },
            options: { cutout: '75%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });
    }
}

if (window.location.pathname.includes('grades.html')) {
    let currentGradeScale = '10'; // Trạng thái hệ điểm hiện tại (mặc định hệ 10)

    // Hàm chuyển đổi điểm hệ 10 sang hệ 4 và hệ chữ
    function convertGrade(score10, targetScale) {
        if (targetScale === '10') return score10.toFixed(1);

        let score4 = 0.0, letter = 'F';
        if (score10 >= 8.5) { score4 = 4.0; letter = 'A'; }
        else if (score10 >= 8.0) { score4 = 3.5; letter = 'B+'; }
        else if (score10 >= 7.0) { score4 = 3.0; letter = 'B'; }
        else if (score10 >= 6.5) { score4 = 2.5; letter = 'C+'; }
        else if (score10 >= 5.5) { score4 = 2.0; letter = 'C'; }
        else if (score10 >= 5.0) { score4 = 1.5; letter = 'D+'; }
        else if (score10 >= 4.0) { score4 = 1.0; letter = 'D'; }

        return targetScale === '4' ? score4.toFixed(1) : letter;
    }

    let currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Vui lòng đăng nhập!'); window.location.href = 'index.html';
    } else {
        // --- 1. HÀM RENDER DỮ LIỆU ---
        function renderGrades() {
            document.getElementById('display-fullname').textContent = currentUser.fullname;
            document.getElementById('display-mssv').textContent = `MSSV: ${currentUser.studentId}`;
            
            const userGrades = currentUser.stats.gradesList || [];
            const tbody = document.getElementById('grades-table-body');
            tbody.innerHTML = '';
            
            let totalPassed = 0, totalFailed = 0, regCredits = 0, earnedCredits = 0;
            let sumScore = 0;
            
            if (userGrades.length === 0) {
                tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:30px;">Chưa có dữ liệu</td></tr>`;
            } else {
                userGrades.forEach((g, index) => {
                    tbody.innerHTML += `
                        <tr>
                            <td>${index + 1}</td><td>${g.year}</td><td>${g.sem}</td><td>${g.code}</td>
                            <td style="font-weight: 500; text-align: left;">${g.name}</td>
                            <td>${g.tc}</td><td style="font-weight: 600;">${convertGrade(g.score, currentGradeScale)}</td>
                            <td>${g.status}</td><td style="font-size: 12px;">${g.note}</td>
                            <!-- Cột icon sửa thêm vào cuối -->
                            <td class="col-edit-action" style="display: none;">
                                <button class="edit-icon-btn" onclick="editCourse(${index})">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </button>
                            </td>
                        </tr>`;
                    
                    let tc = parseInt(g.tc);
                    regCredits += tc;
                    if(g.status === "Đ") {
                        totalPassed++; earnedCredits += tc;
                        sumScore += (g.score * tc);
                    } else { totalFailed++; }
                });
            }

            // Tính GPA mới
            let newGPA = earnedCredits > 0 ? (sumScore / earnedCredits) : 0;
            currentUser.stats.gpa = newGPA;
            currentUser.stats.gpa4 = newGPA * 0.4;
            
            document.getElementById('val-gpa-display').textContent = newGPA.toFixed(1);
            document.getElementById('val-reg-credits').textContent = regCredits;
            document.getElementById('val-earned-credits').textContent = earnedCredits;
            document.getElementById('val-pass-count').textContent = `${totalPassed} / ${userGrades.length} môn`;
            document.getElementById('val-fail-count').textContent = `${totalFailed} / ${userGrades.length} môn`;
        }

        renderGrades(); // Gọi lần đầu

        // --- XỬ LÝ SỰ KIỆN MENU CHỌN HỆ ĐIỂM ---
        const scaleSelector = document.getElementById('grade-scale-selector');
        const scaleMenu = document.getElementById('scale-dropdown-menu');
        const currentScaleText = document.getElementById('current-scale-text');

        if (scaleSelector && scaleMenu) {
            // Mở/đóng menu khi click vào tiêu đề cột Điểm
            if (scaleSelector && scaleMenu) {
                // Mở/đóng menu và tính toán tọa độ
                scaleSelector.addEventListener('click', (e) => {
                    e.stopPropagation(); 
                    
                    if (scaleMenu.style.display === 'none' || scaleMenu.style.display === '') {
                        scaleMenu.style.display = 'flex';
                        
                        // Lấy tọa độ thực tế của nút chọn hệ điểm trên màn hình
                        const rect = scaleSelector.getBoundingClientRect();
                        
                        // Gán vị trí fixed nằm ngay dưới nút
                        scaleMenu.style.top = (rect.bottom + 8) + 'px';
                        scaleMenu.style.left = (rect.left + rect.width / 2) + 'px';
                        scaleMenu.style.transform = 'translateX(-50%)';
                    } else {
                        scaleMenu.style.display = 'none';
                    }
                });

                // Ẩn menu khi cuộn chuột (để menu không bị trôi nổi)
                window.addEventListener('scroll', () => {
                    scaleMenu.style.display = 'none';
                }, true); 

                document.addEventListener('click', () => {
                    scaleMenu.style.display = 'none';
                });

                document.querySelectorAll('.scale-option').forEach(option => {
                    option.addEventListener('click', (e) => {
                        e.stopPropagation();
                        currentGradeScale = e.target.dataset.scale; 
                        currentScaleText.textContent = e.target.textContent; 
                        scaleMenu.style.display = 'none'; 
                        renderGrades(); 
                        
                        if (document.querySelector('.col-edit-action') && document.querySelector('.col-edit-action').style.display !== 'none') {
                            toggleEditMode(true);
                        }
                    });
                });
            }

            // Ẩn menu khi click ra ngoài bảng
            document.addEventListener('click', () => {
                scaleMenu.style.display = 'none';
            });

            // Khi người dùng chọn 1 hệ điểm
            document.querySelectorAll('.scale-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Cập nhật hệ điểm mới
                    currentGradeScale = e.target.dataset.scale; 
                    currentScaleText.textContent = e.target.textContent; 
                    scaleMenu.style.display = 'none'; // Ẩn menu
                    renderGrades(); // Vẽ lại toàn bộ bảng điểm với giá trị mới
                    
                    // Nếu đang ở chế độ sửa thì kích hoạt lại các cột sửa
                    if (document.querySelector('.col-edit-action') && document.querySelector('.col-edit-action').style.display !== 'none') {
                        toggleEditMode(true);
                    }
                });
            });
        }

        // --- 2. XỬ LÝ MODAL ---
        const modal = document.getElementById('manual-modal');
        const colInput = document.getElementById('m-cols');
        const scoreContainer = document.getElementById('m-score-inputs');
        
        let selectedSem = "1";
        let selectedType = "";

        // Mở/Đóng Modal
        document.getElementById('btn-add-manual').addEventListener('click', () => {
            modal.style.display = 'flex'; 
            scoreContainer.innerHTML = '';
            document.getElementById('m-year').value = ''; // Đặt về rỗng để hiển thị "Ví dụ: 25 - 26"
            document.getElementById('m-code').value = '';
            document.getElementById('m-cols').value = '';
        });
        document.getElementById('btn-cancel-modal').addEventListener('click', () => modal.style.display = 'none');

        // Chọn Pill buttons
        document.querySelectorAll('#m-sem-group .pill-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('#m-sem-group .pill-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active'); selectedSem = e.target.dataset.val;
            });
        });
        document.querySelectorAll('#m-type-group .pill-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('#m-type-group .pill-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active'); selectedType = e.target.dataset.val;
            });
        });

        // Tự động sinh cột điểm với giới hạn min/max
        function generateScoreInputs(num) {
            scoreContainer.innerHTML = '';
            for(let i = 0; i < num; i++) {
                scoreContainer.innerHTML += `
                    <div class="score-col">
                        <span>%</span>
                        <input type="number" class="score-input-mini w-input" min="1" max="100" placeholder="30">
                        <span>Điểm</span>
                        <input type="number" class="score-input-mini s-input" min="0" max="10" step="0.1" placeholder="9.0">
                    </div>`;
            }
        }

        // Bắt sự kiện ngay khi người dùng gõ phím vào ô "Nhập số cột điểm"
        colInput.addEventListener('input', (e) => {
            let val = parseInt(e.target.value);
            // Nếu người dùng xóa trống hoặc nhập số <= 0 thì ẩn các cột nhập điểm
            if (isNaN(val) || val <= 0) {
                scoreContainer.innerHTML = ''; 
            } else {
                // Giới hạn tối đa 5 cột để không bị tràn modal
                if (val > 5) {
                    val = 5;
                    e.target.value = 5;
                }
                generateScoreInputs(val);
            }
        });

        // Nút Thêm học phần (Tính điểm & Lưu toàn bộ mảng chi tiết)
        document.getElementById('btn-submit-course').addEventListener('click', () => {
            const yearVal = document.getElementById('m-year').value || '25 - 26';
            const codeVal = document.getElementById('m-code').value.trim().toUpperCase() || 'PHY00001';

            if (currentUser.stats.gradesList && currentUser.stats.gradesList.length > 0) {
                const isDuplicate = currentUser.stats.gradesList.some(course => course.code === codeVal);
                if (isDuplicate) {
                    alert(`Lỗi: Mã học phần "${codeVal}" đã tồn tại trong bảng điểm! Vui lòng kiểm tra lại.`);
                    return; // Dừng tiến trình, không cho tạo
                }
            }

            // Lấy tất cả ô nhập % và điểm trong modal Thêm
            const wInputs = document.querySelectorAll('#m-score-inputs .w-input, #m-score-inputs .score-col input:nth-child(2)');
            const sInputs = document.querySelectorAll('#m-score-inputs .s-input, #m-score-inputs .score-col input:nth-child(4)');

            if (wInputs.length === 0) {
                alert('Vui lòng nhập số cột điểm!');
                return;
            }

            let finalScore = 0;
            let totalWeight = 0;
            let scoresList = [];

            for (let i = 0; i < wInputs.length; i++) {
                const wVal = wInputs[i].value.trim();
                const sVal = sInputs[i].value.trim();

                if (wVal === '' || sVal === '') {
                    alert(`Vui lòng nhập đầy đủ trọng số và điểm cho cột số ${i + 1}!`);
                    return;
                }

                const w = parseFloat(wVal);
                const s = parseFloat(sVal);

                if (isNaN(w) || isNaN(s) || w < 1 || w > 100 || s < 0 || s > 10) {
                    alert(`Dữ liệu nhập ở cột ${i + 1} không hợp lệ!`);
                    return;
                }

                finalScore += (w / 100) * s;
                totalWeight += w;
                
                // Lưu rõ từng object { weight, score }
                scoresList.push({ weight: w, score: s });
            }

            if (Math.round(totalWeight) !== 100) {
                alert(`Tổng trọng số hiện tại là ${totalWeight}%. Vui lòng điều chỉnh lại để tổng bằng 100%!`);
                return;
            }

            let courseName = "Học phần tự chọn";
            let credits = 4;
            if (codeVal === "PHY00001") { courseName = "Vật lý đại cương 1"; credits = 3; }
            else if (codeVal.startsWith("CSC")) { courseName = "Môn chuyên ngành"; }
            else if (codeVal.startsWith("MTH")) { courseName = "Toán chuyên ngành"; }

            // Đối tượng học phần được bổ sung colsCount & scoresList
            const newCourse = {
                year: yearVal,
                sem: selectedSem,
                code: codeVal,
                name: courseName,
                tc: credits,
                score: Math.round(finalScore * 10) / 10,
                status: finalScore >= 5.0 ? "Đ" : "CĐ",
                note: selectedType,
                colsCount: wInputs.length,
                scoresList: scoresList
            };

            if (!currentUser.stats.gradesList) {
                currentUser.stats.gradesList = [];
            }
            currentUser.stats.gradesList.push(newCourse);
            
            // Lưu vào localStorage
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let uIndex = users.findIndex(u => u.studentId === currentUser.studentId);
            if (uIndex > -1) {
                users[uIndex] = currentUser;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }

            modal.style.display = 'none';
            renderGrades();
        });

        const btnEditMode = document.getElementById('btn-edit');
        const btnFinishEdit = document.getElementById('btn-finish-edit');
        const finishContainer = document.getElementById('finish-edit-container');

        // Hàm bật/tắt hiển thị cột sửa, nút Hoàn thành và Khóa các chức năng khác
        function toggleEditMode(isEditing) {
            // 1. Ẩn/hiện cột icon sửa
            const editCols = document.querySelectorAll('.col-edit-action');
            editCols.forEach(col => {
                col.style.display = isEditing ? 'table-cell' : 'none';
            });

            // 2. Ẩn/hiện nút "Hoàn thành"
            if (finishContainer) {
                finishContainer.style.display = isEditing ? 'flex' : 'none';
            }

            // 3. Khóa/Mở khóa các nút chức năng khác trên thanh công cụ
            const toolbarButtons = document.querySelectorAll('.grades-toolbar button');
            toolbarButtons.forEach(btn => {
                btn.disabled = isEditing; // Vô hiệu hóa nút
                if (isEditing) {
                    btn.style.opacity = '0.5'; // Làm mờ nút
                    btn.style.cursor = 'not-allowed'; // Đổi icon chuột thành dấu cấm
                    btn.style.pointerEvents = 'none'; // Chặn hoàn toàn thao tác click
                } else {
                    btn.style.opacity = '1'; // Phục hồi hiển thị
                    btn.style.cursor = 'pointer';
                    btn.style.pointerEvents = 'auto';
                }
            });
        }

        // Sự kiện khi bấm nút "Sửa"
        if (btnEditMode) {
            btnEditMode.addEventListener('click', () => {
                toggleEditMode(true);
            });
        }

        // Sự kiện khi bấm nút "Hoàn thành"
        if (btnFinishEdit) {
            btnFinishEdit.addEventListener('click', () => {
                toggleEditMode(false);
            });
        }

        // --- LOGIC CHO MODAL SỬA ---
        const editModal = document.getElementById('edit-modal');
        let editingIndex = -1; // Lưu vị trí môn đang sửa

        // Hàm mở modal Sửa và nạp lại chính xác dữ liệu cũ đã lưu
        window.editCourse = function(index) {
            editingIndex = index;
            const course = currentUser.stats.gradesList[index];
            if (!course) return;

            // 1. Fill thông tin cơ bản
            document.getElementById('e-year').value = course.year || '25 - 26';
            document.getElementById('e-code').value = course.code || '';
            
            // 2. Chọn nút Học kì
            document.querySelectorAll('#e-sem-group .pill-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.val == course.sem);
            });

            // 3. Chọn nút Loại học phần
            document.querySelectorAll('#e-type-group .pill-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.val === (course.note || ''));
            });

            // 4. Lấy danh sách điểm cũ (nếu học phần cũ chưa có mảng scoresList thì tự tạo từ điểm tổng)
            let existingScores = course.scoresList;
            if (!existingScores || existingScores.length === 0) {
                existingScores = [{ weight: 100, score: course.score }];
            }

            const count = course.colsCount || existingScores.length;
            document.getElementById('e-cols').value = count;

            // 5. Sinh giao diện và điền dữ liệu điểm cũ
            generateEditScoreInputs(count, existingScores);

            editModal.style.display = 'flex';
        };

        // Bắt sự kiện chọn Học kì và Loại học phần trong modal Sửa
        document.querySelectorAll('#e-sem-group .pill-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('#e-sem-group .pill-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        document.querySelectorAll('#e-type-group .pill-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('#e-type-group .pill-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Đóng modal sửa
        document.getElementById('btn-cancel-edit').addEventListener('click', () => {
            editModal.style.display = 'none';
            editingIndex = -1;
        });

        // Hàm sinh ô nhập điểm Modal Sửa (Hiển thị đầy đủ % và Điểm cũ)
        function generateEditScoreInputs(num, scoresList = []) {
            const container = document.getElementById('e-score-inputs');
            container.innerHTML = '';
            let defaultWeight = Math.floor(100 / num);
            let html = '';

            for (let i = 0; i < num; i++) {
                let item = scoresList[i] || {};
                
                // Lấy trọng số cũ nếu có, nếu không tự tính toán
                let weight = (item.weight !== undefined && item.weight !== null) 
                    ? item.weight 
                    : ((i === num - 1) ? 100 - (defaultWeight * (num - 1)) : defaultWeight);
                
                // Lấy điểm cũ nếu có
                let score = (item.score !== undefined && item.score !== null) ? item.score : '';

                html += `
                    <div class="grade-col-group">
                        <div class="score-field">
                            <span class="mini-label">%</span>
                            <input type="number" class="e-w-input gray-pill mini-pill" min="1" max="100" value="${weight}">
                        </div>
                        <div class="score-field">
                            <span class="mini-label">Điểm</span>
                            <input type="number" class="e-s-input gray-pill mini-pill" min="0" max="10" step="0.1" value="${score}">
                        </div>
                    </div>`;
            }
            container.innerHTML = html;
        }

        // Thay đổi số cột điểm
        document.getElementById('e-cols').addEventListener('input', (e) => {
            let val = parseInt(e.target.value);
            if (!isNaN(val) && val > 0) {
                if (val > 5) val = 5;
                generateEditScoreInputs(val);
            } else {
                document.getElementById('e-score-inputs').innerHTML = '';
            }
        });

        // Nút Lưu Sửa Học Phần
        document.getElementById('btn-submit-edit').addEventListener('click', () => {
            if (editingIndex === -1) return;

            const wInputs = document.querySelectorAll('.e-w-input');
            const sInputs = document.querySelectorAll('.e-s-input');
            let finalScore = 0, totalWeight = 0;
            let updatedScoresList = [];

            for (let i = 0; i < wInputs.length; i++) {
                const w = parseFloat(wInputs[i].value);
                const s = parseFloat(sInputs[i].value);
                
                if (isNaN(w) || isNaN(s) || s < 0 || s > 10 || w < 1 || w > 100) {
                    alert('Vui lòng kiểm tra lại dữ liệu trọng số và điểm số!');
                    return;
                }
                
                finalScore += (w / 100) * s;
                totalWeight += w;
                updatedScoresList.push({ weight: w, score: s });
            }

            if (Math.round(totalWeight) !== 100) {
                alert('Tổng phần trăm trọng số phải đúng bằng 100%!');
                return;
            }

            const activeSem = document.querySelector('#e-sem-group .pill-btn.active').dataset.val;
            const activeType = document.querySelector('#e-type-group .pill-btn.active').dataset.val;
            
            // Cập nhật thông tin học phần
            currentUser.stats.gradesList[editingIndex].year = document.getElementById('e-year').value;
            currentUser.stats.gradesList[editingIndex].sem = activeSem;
            currentUser.stats.gradesList[editingIndex].code = document.getElementById('e-code').value.toUpperCase();
            currentUser.stats.gradesList[editingIndex].note = activeType;
            currentUser.stats.gradesList[editingIndex].score = Math.round(finalScore * 10) / 10;
            currentUser.stats.gradesList[editingIndex].status = finalScore >= 5.0 ? "Đ" : "CĐ";
            
            // Lưu cập nhật chi tiết cột điểm
            currentUser.stats.gradesList[editingIndex].colsCount = wInputs.length;
            currentUser.stats.gradesList[editingIndex].scoresList = updatedScoresList;

            saveCurrentUser();
            editModal.style.display = 'none';
            renderGrades();
            toggleEditMode(true); // Giữ lại cột icon sửa sau khi re-render
        });

        // Nút Xóa Học Phần
        document.getElementById('btn-delete-course').addEventListener('click', () => {
            if (confirm("Bạn có chắc chắn muốn xóa học phần này không?")) {
                currentUser.stats.gradesList.splice(editingIndex, 1);
                saveCurrentUser();
                editModal.style.display = 'none';
                renderGrades();
                toggleEditMode(true);
            }
        });

        // Tiện ích lưu lại user
        function saveCurrentUser() {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let uIndex = users.findIndex(u => u.studentId === currentUser.studentId);
            if (uIndex > -1) {
                users[uIndex] = currentUser;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
        }
    }
}

// -------------------------------------------------------------
// 7. ĐỒNG BỘ TRẠNG THÁI "ĐÃ HỌC" CHO TRANG KHUNG CTĐT
// -------------------------------------------------------------
if (window.location.pathname.includes('program.html') || window.location.pathname.includes('module-math.html')) {
    const currentUser = getCurrentUser();
    
    if (currentUser && currentUser.stats && currentUser.stats.gradesList) {
        // Lọc ra danh sách mã môn mà sinh viên đã ĐẠT (Trạng thái là "Đ" hoặc "Đạt")
        const passedCourses = currentUser.stats.gradesList
            .filter(g => g.status === 'Đ' || g.status === 'Đạt')
            .map(g => g.code.toUpperCase());

        // Quét toàn bộ các dòng trong bảng Khung CTĐT
        const tableRows = document.querySelectorAll('.course-table tbody tr');
        
        tableRows.forEach(row => {
            const cells = row.querySelectorAll('td');
            
            // Chỉ xét các dòng chứa dữ liệu môn học (thường có từ 8-10 cột, bỏ qua các dòng tiêu đề gộp)
            if (cells.length >= 8) {
                const codeCell = cells[1]; // Cột 2: Mã học phần
                const statusCell = cells[cells.length - 1]; // Cột cuối cùng: Trạng thái
                
                if (codeCell && statusCell) {
                    const courseCode = codeCell.textContent.trim().toUpperCase();
                    
                    // Nếu mã môn học có trong danh sách đã ĐẠT bên Bảng điểm
                    if (passedCourses.includes(courseCode)) {
                        statusCell.innerHTML = '<span class="status-badge passed">Đã học</span>';
                        row.style.backgroundColor = '#f2f8f2'; // Đổi nền xanh nhạt cho dòng đã học
                    } else {
                        statusCell.innerHTML = '<span class="status-badge unlearned">Chưa học</span>';
                    }
                }
            }
        });
    }
}

// -------------------------------------------------------------
// ĐỒNG BỘ BẢNG VÀ CẬP NHẬT BIỂU ĐỒ DONUT CHO TRANG MODULE-MATH
// -------------------------------------------------------------
if (window.location.pathname.includes('module-math.html')) {
    const currentUser = getCurrentUser();
    const gradesList = (currentUser && currentUser.stats && currentUser.stats.gradesList) ? currentUser.stats.gradesList : [];

    // Lấy danh sách mã môn Đạt và Chưa đạt
    const passedCodes = gradesList.filter(g => g.status === 'Đ' || g.status === 'Đạt').map(g => g.code.toUpperCase());
    const failedCodes = gradesList.filter(g => g.status === 'CĐ' || g.status === 'Chưa đạt').map(g => g.code.toUpperCase());

    let totalCredits = 0, earnedCredits = 0;
    let totalSubjects = 0, passedSubjects = 0, failedSubjects = 0;

    // Quét các dòng trong bảng
    const tableRows = document.querySelectorAll('.course-table tbody tr');
    tableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 8) {
            totalSubjects++;
            const codeCell = cells[1]; 
            const tcCell = cells[3];   
            const statusCell = cells[cells.length - 1]; 

            if (codeCell && tcCell) {
                const tc = parseInt(tcCell.textContent.trim()) || 0;
                totalCredits += tc;
                const courseCode = codeCell.textContent.trim().toUpperCase();

                if (passedCodes.includes(courseCode)) {
                    earnedCredits += tc;
                    passedSubjects++;
                    statusCell.innerHTML = '<span class="status-badge passed">Đã học</span>';
                    row.style.backgroundColor = '#f2f8f2';
                } else if (failedCodes.includes(courseCode)) {
                    failedSubjects++;
                    statusCell.innerHTML = '<span class="status-badge unlearned" style="background:#ffebee; color:#d32f2f;">Chưa đạt</span>';
                } else {
                    statusCell.innerHTML = '<span class="status-badge unlearned">Chưa học</span>';
                }
            }
        }
    });

    const unearnedCredits = totalCredits - earnedCredits;
    const unlearnedSubjects = totalSubjects - passedSubjects - failedSubjects;
    const percentEarned = totalCredits > 0 ? Math.round((earnedCredits / totalCredits) * 100) : 0;

    // 1. Cập nhật Text theo đúng ID có sẵn trong module-math.html
    if (document.getElementById('chart-percent-text')) {
        document.getElementById('chart-percent-text').textContent = percentEarned + '%';
        document.getElementById('leg-cred-passed').textContent = earnedCredits + ' tín chỉ';
        document.getElementById('leg-cred-not').textContent = unearnedCredits + ' tín chỉ';

        document.getElementById('leg-course-passed').textContent = passedSubjects + ' môn';
        document.getElementById('leg-course-failed').textContent = failedSubjects + ' môn';
    }

    // 2. Vẽ Biểu đồ 1: Số tín chỉ (chartCredits)
    const ctxCredits = document.getElementById('chartCredits');
    if (ctxCredits) {
        let chart1 = Chart.getChart('chartCredits');
        if (chart1) chart1.destroy();

        new Chart(ctxCredits.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Đã học', 'Chưa học'],
                datasets: [{
                    data: [earnedCredits, unearnedCredits],
                    backgroundColor: ['#00c853', '#2962ff'],
                    borderWidth: 0
                }]
            },
            options: { cutout: '75%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });
    }

    // 3. Vẽ Biểu đồ 2: Số môn (chartCourses)
    const ctxCourses = document.getElementById('chartCourses');
    if (ctxCourses) {
        let chart2 = Chart.getChart('chartCourses');
        if (chart2) chart2.destroy();

        new Chart(ctxCourses.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Đạt', 'Chưa đạt', 'Chưa học'],
                datasets: [{
                    data: [passedSubjects, failedSubjects, unlearnedSubjects],
                    backgroundColor: ['#00c853', '#f44336', '#e0e0e0'],
                    borderWidth: 0
                }]
            },
            options: { cutout: '75%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });
    }
}

// -------------------------------------------------------------
// 8. ĐỒNG BỘ DỮ LIỆU VÀ VẼ BIỂU ĐỒ TRÊN TRANG DASHBOARD
// -------------------------------------------------------------
if (window.location.pathname.includes('dashboard.html') || window.location.pathname.endsWith('/')) {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        alert('Vui lòng đăng nhập!');
        window.location.href = 'index.html';
    } else {
        // 1. Cập nhật Tên & MSSV
        if (document.getElementById('display-fullname')) {
            document.getElementById('display-fullname').textContent = currentUser.fullname;
        }
        if (document.getElementById('display-mssv')) {
            document.getElementById('display-mssv').textContent = `MSSV: ${currentUser.studentId}`;
        }

        const gradesList = (currentUser.stats && currentUser.stats.gradesList) ? currentUser.stats.gradesList : [];

        let earnedCredits = 0;
        let totalScoreWeighted = 0;
        let creditsForGPA = 0;
        let totalPassed = 0;
        let totalFailed = 0;

        const semGPAMap = {};

        // 2. Tính toán các chỉ số từ dữ liệu thực tế
        gradesList.forEach(g => {
            const tc = parseInt(g.tc) || 0;
            const score = parseFloat(g.score) || 0;
            const isPassed = (g.status === 'Đ' || g.status === 'Đạt');
            const isPhysicalEdu = g.name ? g.name.toLowerCase().includes('thể dục') : false;

            if (isPassed) {
                totalPassed++;
                if (!isPhysicalEdu) {
                    earnedCredits += tc;
                }
                totalScoreWeighted += (score * tc);
                creditsForGPA += tc;

                // Gom nhóm GPA theo từng học kỳ
                const semKey = `HK${g.sem || 1} (${g.year || '26-27'})`;
                if (!semGPAMap[semKey]) {
                    semGPAMap[semKey] = { totalScore: 0, totalTc: 0 };
                }
                semGPAMap[semKey].totalScore += (score * tc);
                semGPAMap[semKey].totalTc += tc;
            } else if (g.status === 'CĐ' || g.status === 'Chưa đạt') {
                totalFailed++;
            }
        });

        const totalCreditsGoal = 138;
        const gpa10 = creditsForGPA > 0 ? (totalScoreWeighted / creditsForGPA) : 0;

        // Tính xếp loại học tập
        let rank = "--";
        if (earnedCredits > 0) {
            if (gpa10 >= 9.0) rank = "Xuất sắc";
            else if (gpa10 >= 8.0) rank = "Giỏi";
            else if (gpa10 >= 7.0) rank = "Khá";
            else if (gpa10 >= 5.0) rank = "Trung bình";
            else rank = "Yếu";
        }

        // 3. Điền giá trị vào các thẻ theo ID
        if (document.getElementById('val-credits')) {
            document.getElementById('val-credits').textContent = `${earnedCredits}/${totalCreditsGoal}`;
        }
        if (document.getElementById('val-rank')) {
            document.getElementById('val-rank').textContent = rank;
        }
        if (document.getElementById('val-gpa')) {
            document.getElementById('val-gpa').textContent = gpa10.toFixed(1);
        }
        if (document.getElementById('val-passed')) {
            document.getElementById('val-passed').textContent = totalPassed;
        }
        if (document.getElementById('val-failed')) {
            document.getElementById('val-failed').textContent = totalFailed;
        }

        // 4. Vẽ Biểu đồ Donut Tín chỉ (creditChart)
        const ctxCredit = document.getElementById('creditChart');
        if (ctxCredit) {
            let existingChart = Chart.getChart('creditChart');
            if (existingChart) existingChart.destroy();

            const unearnedCredits = totalCreditsGoal - earnedCredits;
            new Chart(ctxCredit.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Đã tích luỹ', 'Còn lại'],
                    datasets: [{
                        data: [earnedCredits, unearnedCredits > 0 ? unearnedCredits : 0],
                        backgroundColor: ['#00c853', '#e0e0e0'],
                        borderWidth: 0
                    }]
                },
                options: {
                    cutout: '80%',
                    plugins: { legend: { display: false }, tooltip: { enabled: true } },
                    maintainAspectRatio: false
                }
            });
        }

        // 5. Vẽ Biểu đồ Xu hướng điểm (gpaTrendChart)
        const ctxTrend = document.getElementById('gpaTrendChart');
        if (ctxTrend) {
            let existingChart = Chart.getChart('gpaTrendChart');
            if (existingChart) existingChart.destroy();

            const labels = Object.keys(semGPAMap);
            const dataPoints = labels.map(k => (semGPAMap[k].totalScore / semGPAMap[k].totalTc).toFixed(1));

            new Chart(ctxTrend.getContext('2d'), {
                type: 'line',
                data: {
                    labels: labels.length > 0 ? labels : ['HK1 (26-27)'],
                    datasets: [{
                        label: 'GPA',
                        data: dataPoints.length > 0 ? dataPoints : [0],
                        borderColor: '#1a498b',
                        backgroundColor: 'rgba(26, 73, 139, 0.1)',
                        fill: true,
                        tension: 0.3,
                        pointRadius: 5,
                        pointBackgroundColor: '#1a498b'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { min: 0, max: 10 }
                    },
                    plugins: { legend: { display: false } }
                }
            });
        }
    }
}

