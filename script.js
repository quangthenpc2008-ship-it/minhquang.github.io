// Danh sách số tín chỉ chuẩn theo mã học phần
const courseCredits = {
    // Toán - KHTN - Môi trường
    "MTH00021": 4, "MTH00022": 4, "MTH00035": 4, "MTH00044": 4, "MTH00045": 4, "MTH00050": 4,
    "ENV00001": 2, "ENV00003": 2,
    // Lý luận chính trị - Pháp luật
    "BAA00101": 3, "BAA00102": 2, "BAA00103": 2, "BAA00104": 2, "BAA00105": 2, "BAA00011": 3,
    // KHXH - Kinh tế - Kỹ năng
    "BAA00005": 2, "BAA00006": 2, "BAA00007": 2,
    // Tin học
    "CSC00004": 4,
    // Ngoại ngữ - GDTC - GDQP-AN
    "ADD00031": 3, "ADD00032": 3, "ADD00033": 3, "ADD00034": 3,
    "BAA00021": 2, "BAA00022": 2, "BAA00030": 4,
    // Cơ sở ngành & Chuyên ngành
    "CSC10003": 4, "CSC10004": 4, "CSC10006": 4, "CSC10007": 4, "CSC10008": 4, "CSC10009": 4,
    "CSC14001": 4, "CSC14002": 4, "CSC14003": 4, "CSC14004": 4, "CSC14005": 4, "CSC14006": 4,
    "CSC14101": 4,
    "CSC11120": 4 // Bảo mật web và thiết bị di động
};

// Danh sách tên học phần theo mã môn học
const courseDictionary = {
    "MTH00021": "Vi tích phân 1",
    "MTH00022": "Vi tích phân 2",
    "MTH00035": "Đại số tuyến tính",
    "MTH00044": "Xác suất thống kê",
    "MTH00045": "Toán rời rạc", 
    "BAA00105": "Tư tưởng Hồ Chí Minh",
    "MTH00050": "Toán học tổ hợp", 
    "BAA00011": "Pháp luật đại cương",
    "ENV00001": "Môi trường đại cương",
    "ENV00003": "Con người và môi trường",
    "BAA00101": "Triết học Mác - Lênin",
    "BAA00102": "Kinh tế chính trị Mác - Lênin",
    "BAA00103": "Chủ nghĩa xã hội khoa học",
    "BAA00104": "Lịch sử Đảng Cộng sản Việt Nam",
    "BAA00005": "Kinh tế đại cương",
    "BAA00006": "Tâm lý đại cương",
    "BAA00007": "Phương pháp luận sáng tạo",
    "CSC00004": "Nhập môn CNTT",
    "ADD00031": "Anh văn 1",
    "ADD00032": "Anh văn 2",
    "ADD00033": "Anh văn 3",
    "ADD00034": "Anh văn 4",
    "BAA00021": "Thể dục 1",
    "BAA00022": "Thể dục 2",
    "BAA00030": "Giáo dục QP-AN",
    "CSC10003": "Phương pháp lập trình hướng đối tượng",
    "CSC10004": "Cấu trúc dữ liệu và giải thuật",
    "CSC10006": "Cơ sở dữ liệu",
    "CSC10007": "Hệ điều hành",
    "CSC10008": "Mạng máy tính",
    "CSC10009": "Hệ thống máy tính",
    "CSC14004": "Cơ sở trí tuệ nhân tạo",
    "CSC14001": "Automata và ngôn ngữ hình thức",
    "CSC14002": "Các hệ cơ sở tri thức",
    "CSC14003": "Khai thác dữ liệu và ứng dụng",
    "CSC14005": "Nhập môn học máy",
    "CSC14006": "Nhận dạng",
    "CSC14101": "Ẩn dữ liệu và chia sẻ thông tin",
    "CSC11120": "Bảo mật web và thiết bị di động"
};

// Hàm tiện ích lấy số tín chỉ chuẩn của một môn học
function getStandardCredit(code, fallbackTc) {
    const codeUpper = (code || "").trim().toUpperCase();
    if (courseCredits[codeUpper] !== undefined) {
        return courseCredits[codeUpper];
    }
    return parseInt(fallbackTc) || 0;
}

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
            gradesList: []
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
        const totalCreds = stats.totalCredits || 138;
        const currentCreds = stats.credits || 0;

        document.getElementById('val-credits').textContent = `${currentCreds}/${totalCreds}`;
        document.getElementById('val-gpa').textContent = (stats.gpa || 0).toFixed(1);
        document.getElementById('val-rank').textContent = stats.rank || "Chưa xếp loại";
        document.getElementById('val-passed').textContent = stats.passed || 0;
        document.getElementById('val-failed').textContent = stats.failed || 0;

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
        const totalCreds = stats.totalCredits || 138; 
        const gradesList = stats.gradesList || [];

        let earnedCredits = 0;
        let totalWeightedScore4 = 0;
        let totalCreditsForGPA = 0;

        function getScore4(score10) {
            if (score10 >= 9.0) return 4.0;
            if (score10 >= 8.0) return 3.5;
            if (score10 >= 7.0) return 3.0;
            if (score10 >= 6.0) return 2.5;
            if (score10 >= 5.0) return 2.0;
            if (score10 >= 4.0) return 1.5;
            if (score10 >= 3.0) return 1.0;
            return 0.0;
        }

        gradesList.forEach(g => {
            const tc = getStandardCredit(g.code, g.tc);
            const score = parseFloat(g.score) || 0;
            const isPassed = (g.status === "Đ" || g.status === "Đạt");
            const isExcluded = g.name ? (g.name.toLowerCase().includes("thể dục") || g.name.toLowerCase().includes("qp-an") || g.name.toLowerCase().includes("anh văn")) : false;

            if (isPassed) {
                earnedCredits += tc;
            }

            if (!isExcluded && tc > 0) {
                totalWeightedScore4 += (getScore4(score) * tc);
                totalCreditsForGPA += tc;
            }
        });

        currentUser.stats.credits = earnedCredits;
        const calcGPA4 = totalCreditsForGPA > 0 ? (totalWeightedScore4 / totalCreditsForGPA) : (stats.gpa4 || 0);
        currentUser.stats.gpa4 = calcGPA4;

        const remainingCredits = Math.max(0, totalCreds - earnedCredits);
        const completionPercent = Math.round((earnedCredits / totalCreds) * 100) || 0;
        const remainingPercent = 100 - completionPercent;

        document.getElementById('prog-total-credits').textContent = totalCreds;
        document.getElementById('prog-completed-credits').textContent = earnedCredits;
        document.getElementById('prog-remaining-credits').textContent = remainingCredits;
        document.getElementById('prog-gpa-val').textContent = calcGPA4.toFixed(2);

        document.getElementById('fill-completed-widget').style.width = `${completionPercent}%`;
        document.getElementById('percent-completed-widget').textContent = `${completionPercent}%`;

        document.getElementById('fill-remaining-widget').style.width = `${remainingPercent}%`;
        document.getElementById('percent-remaining-widget').textContent = `${remainingPercent}%`;

        const moduleMapping = {
            "BAA00101": 1, "BAA00102": 1, "BAA00103": 1, "BAA00104": 1, "BAA00105": 1, "BAA00011": 1,
            "BAA00005": 2, "BAA00006": 2, "BAA00007": 2,
            "MTH00021": 3, "MTH00022": 3, "MTH00035": 3, "MTH00044": 3, "MTH00045": 3, "MTH00050": 3, "ENV00001": 3, "ENV00003": 3,
            "CSC00004": 4,
            "ADD00031": 5, "ADD00032": 5, "ADD00033": 5, "ADD00034": 5, "BAA00021": 5, "BAA00022": 5, "BAA00030": 5,
            "CSC14004": 6
        };

        let modCredits = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
        const modTargets = { 1: 14, 2: 2, 3: 36, 4: 4, 5: 20, 6: 38, 7: 34 };
        const processedCodes = new Set();

        gradesList.forEach(g => {
            if (g.status === "Đ" || g.status === "Đạt") {
                const code = g.code.toUpperCase();
                if (!processedCodes.has(code)) {
                    processedCodes.add(code);

                    let modNum = moduleMapping[code];
                    if (!modNum) {
                        if (code.startsWith("CSC10")) modNum = 6;
                        else if (code.startsWith("CSC14") || code.startsWith("CSC11")) modNum = 7;
                    }
                    
                    if (modNum) {
                        modCredits[modNum] += getStandardCredit(code, g.tc);
                    }
                }
            }
        });

        for (let i = 1; i <= 7; i++) {
            const current = modCredits[i];
            const target = modTargets[i];
            const percent = Math.min(Math.round((current / target) * 100), 100) || 0;

            const fillEl = document.getElementById(`fill-mod-${i}`);
            const percentEl = document.getElementById(`percent-mod-${i}`);

            if (fillEl && percentEl) {
                fillEl.style.width = `${percent}%`;
                percentEl.textContent = `${percent}%`;
            }
        }
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

        const percent = Math.round((passedCreds / totalCreds) * 100) || 0;
        document.getElementById('math-progress-fill').style.width = percent + '%';
        document.getElementById('math-progress-text').textContent = percent + '%';
        
        document.getElementById('chart-percent-text').textContent = percent + '%';
        document.getElementById('leg-cred-passed').textContent = `${passedCreds} tín chỉ`;
        document.getElementById('leg-cred-not').textContent = `${totalCreds - passedCreds} tín chỉ`;
        document.getElementById('leg-course-passed').textContent = `${passedCourses} môn`;
        document.getElementById('leg-course-failed').textContent = `${failedCourses} môn`;

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

// -------------------------------------------------------------
// 6. TRANG BẢNG ĐIỂM & TÍNH ĐIỂM (grades.html)
// -------------------------------------------------------------
if (window.location.pathname.includes('grades.html')) {
    // --- CHỨC NĂNG XUẤT FILE EXCEL VÀ JSON ---
    const btnExportData = document.getElementById('btn-export-json'); 
    if (btnExportData) {
        btnExportData.addEventListener('click', () => {
            if (!currentUser || !currentUser.stats || !currentUser.stats.gradesList || currentUser.stats.gradesList.length === 0) {
                alert('Không có dữ liệu điểm để xuất!');
                return;
            }

            const dataToExport = currentUser.stats.gradesList;
            const fileNamePrefix = `Bang_Diem_${currentUser.studentId}`;

            const excelData = dataToExport.map((g, index) => ({
                "STT": index + 1,
                "Năm học": g.year,
                "Học kì": g.sem,
                "Mã môn": g.code,
                "Tên môn học": g.name,
                "Số tín chỉ": getStandardCredit(g.code, g.tc),
                "Điểm (Hệ 10)": parseFloat(g.score),
                "Trạng thái": g.status === "Đ" || g.status === "Đạt" ? "Đạt" : "Chưa đạt",
                "Ghi chú": g.note || ""
            }));

            const worksheet = XLSX.utils.json_to_sheet(excelData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Bảng Điểm");
                
            worksheet['!cols'] = [
                {wpx: 40}, {wpx: 70}, {wpx: 60}, {wpx: 80}, 
                {wpx: 220}, {wpx: 80}, {wpx: 90}, {wpx: 80}, {wpx: 120}
            ];

            XLSX.writeFile(workbook, `${fileNamePrefix}.xlsx`);
                
            setTimeout(() => {
                const jsonString = JSON.stringify(dataToExport, null, 4);
                const blob = new Blob([jsonString], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                    
                const a = document.createElement('a');
                a.href = url;
                a.download = `${fileNamePrefix}.json`;
                    
                document.body.appendChild(a);
                a.click();
                    
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 500);
        });
    }

    // --- CHỨC NĂNG NHẬP FILE EXCEL / JSON ---
    const btnImportData = document.getElementById('btn-import-json');
    const fileImportInput = document.getElementById('file-import-input');

    if (btnImportData && fileImportInput) {
        btnImportData.addEventListener('click', () => {
            fileImportInput.click();
        });

        fileImportInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const fileName = file.name.toLowerCase();
            const reader = new FileReader();

            reader.onload = function(e) {
                try {
                    let importedData = [];

                    if (fileName.endsWith('.json')) {
                        const rawJson = JSON.parse(e.target.result);
                        if (Array.isArray(rawJson)) {
                            importedData = rawJson.map(item => {
                                const codeUpper = (item.code || "").trim().toUpperCase();
                                return {
                                    ...item,
                                    code: codeUpper,
                                    name: courseDictionary[codeUpper] || item.name || "Học phần tự chọn",
                                    tc: getStandardCredit(codeUpper, item.tc)
                                };
                            });
                        }
                    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
                        const data = new Uint8Array(e.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const firstSheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[firstSheetName];
                        const rawData = XLSX.utils.sheet_to_json(worksheet);
                            
                        importedData = rawData.map(row => {
                            let finalScore = parseFloat(row["Điểm (Hệ 10)"]) || 0;
                            const codeUpper = String(row["Mã môn"] || "").trim().toUpperCase();
                            return {
                                year: row["Năm học"] || "25 - 26",
                                sem: String(row["Học kì"] || "1"),
                                code: codeUpper,
                                name: courseDictionary[codeUpper] || row["Tên môn học"] || "Học phần tự chọn",
                                tc: getStandardCredit(codeUpper, row["Số tín chỉ"]),
                                score: finalScore,
                                status: finalScore >= 5.0 ? "Đ" : "CĐ",
                                note: row["Ghi chú"] || "",
                                colsCount: 1,
                                scoresList: [{ weight: 100, score: finalScore }]
                            };
                        }).filter(item => item.code !== "");
                    } else {
                        alert("Định dạng file không hỗ trợ. Vui lòng chọn file .xlsx, .xls hoặc .json");
                        return;
                    }

                    if (Array.isArray(importedData) && importedData.length > 0) {
                        const isAppend = confirm('Nhấn "OK" để GỘP dữ liệu file vào bảng điểm hiện tại.\nNhấn "Cancel" để XÓA CŨ VÀ GHI ĐÈ bằng dữ liệu từ file.');
                            
                        if (!currentUser.stats.gradesList) currentUser.stats.gradesList = [];
                            
                        if (isAppend) {
                            const existingCodes = currentUser.stats.gradesList.map(g => g.code);
                            const newItems = importedData.filter(g => !existingCodes.includes(g.code));
                                
                            currentUser.stats.gradesList = [...currentUser.stats.gradesList, ...newItems];
                                
                            if (newItems.length < importedData.length) {
                                alert(`Đã gộp thành công. Bỏ qua ${importedData.length - newItems.length} môn bị trùng mã học phần!`);
                            } else {
                                alert("Nhập dữ liệu thành công!");
                            }
                        } else {
                            currentUser.stats.gradesList = importedData;
                            alert("Đã ghi đè dữ liệu mới thành công!");
                        }

                        saveCurrentUser();
                        renderGrades();
                    } else {
                        alert("File không chứa dữ liệu hoặc sai định dạng!");
                    }
                } catch (error) {
                    console.error(error);
                    alert("Có lỗi xảy ra khi đọc file: " + error.message);
                }
                    
                fileImportInput.value = '';
            };

            if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
                reader.readAsArrayBuffer(file);
            } else {
                reader.readAsText(file);
            }
        });
    }

    let currentGradeScale = '10';

    function convertGrade(score10, targetScale) {
        if (targetScale === '10') return score10.toFixed(1);

        let score4 = 0.0, letter = 'F';
        
        if (score10 >= 9.0)      { score4 = 4.0; letter = 'A+'; }
        else if (score10 >= 8.0) { score4 = 3.5; letter = 'A';  }
        else if (score10 >= 7.0) { score4 = 3.0; letter = 'B+'; }
        else if (score10 >= 6.0) { score4 = 2.5; letter = 'B';  }
        else if (score10 >= 5.0) { score4 = 2.0; letter = 'C';  }
        else if (score10 >= 4.0) { score4 = 1.5; letter = 'D+'; }
        else if (score10 >= 3.0) { score4 = 1.0; letter = 'D';  }
        else                     { score4 = 0.0; letter = 'F';  }

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
            let totalWeightedScore = 0;
            let totalWeightedScore4 = 0;
            let totalCreditsForGPA = 0;
            let needsSync = false;
            
            if (userGrades.length === 0) {
                tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:30px;">Chưa có dữ liệu</td></tr>`;
            } else {
                userGrades.forEach((g, index) => {
                    const codeUpper = (g.code || "").trim().toUpperCase();
                    if (courseCredits[codeUpper] !== undefined && g.tc !== courseCredits[codeUpper]) {
                        g.tc = courseCredits[codeUpper];
                        needsSync = true;
                    }
                    if (courseDictionary[codeUpper] && g.name !== courseDictionary[codeUpper]) {
                        g.name = courseDictionary[codeUpper];
                        needsSync = true;
                    }

                    tbody.innerHTML += `
                        <tr>
                            <td>${index + 1}</td><td>${g.year}</td><td>${g.sem}</td><td>${g.code}</td>
                            <td style="font-weight: 500; text-align: left;">${g.name}</td>
                            <td>${g.tc}</td>
                            <td>
                                <span onclick="showScoreDetails(${index})" 
                                    style="font-weight: 700; text-decoration: underline; cursor: pointer; color: #1a498b;" 
                                    title="Nhấp để xem điểm thành phần">
                                    ${convertGrade(g.score, currentGradeScale)}
                                </span>
                            </td>
                            <td>${g.status}</td><td style="font-size: 12px;">${g.note}</td>
                            <td class="col-edit-action" style="display: none;">
                                <button class="edit-icon-btn" onclick="editCourse(${index})">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </button>
                            </td>
                        </tr>`;
                    
                    let tc = parseInt(g.tc) || 0;
                    regCredits += tc;
                    
                    if(g.status === "Đ") {
                        totalPassed++; 
                        earnedCredits += tc; 
                    } else { 
                        totalFailed++; 
                    }

                    if (!g.name.toLowerCase().includes("thể dục") && !g.name.toLowerCase().includes("qp-an") && !g.name.toLowerCase().includes("anh văn")) {
                        totalWeightedScore += (g.score * tc);
                        let score4 = parseFloat(convertGrade(g.score, '4'));
                        totalWeightedScore4 += (score4 * tc);
                        totalCreditsForGPA += tc;
                    }
                });
            }

            let newGPA = totalCreditsForGPA > 0 ? (totalWeightedScore / totalCreditsForGPA) : 0;
            let newGPA4 = totalCreditsForGPA > 0 ? (totalWeightedScore4 / totalCreditsForGPA) : 0;
            let overallLetter = totalCreditsForGPA > 0 ? convertGrade(newGPA, 'letter') : 'Chưa xếp loại';

            currentUser.stats.gpa = newGPA;
            currentUser.stats.gpa4 = newGPA4;
            currentUser.stats.credits = earnedCredits;

            if (needsSync) {
                saveCurrentUser();
            }
            
            document.getElementById('val-gpa-display').textContent = newGPA.toFixed(1);
            document.getElementById('val-reg-credits').textContent = regCredits;
            document.getElementById('val-earned-credits').textContent = earnedCredits;
            document.getElementById('val-pass-count').textContent = `${totalPassed} / ${userGrades.length} môn`;
            document.getElementById('val-fail-count').textContent = `${totalFailed} / ${userGrades.length} môn`;

            let gpa4Element = document.getElementById('val-gpa4-letter');
            if (gpa4Element) {
                gpa4Element.textContent = `${newGPA4.toFixed(2)} | ${overallLetter}`;
            }

            let classification = "Xếp loại học tập";
            if (totalCreditsForGPA > 0) {
                if (newGPA >= 9.0) classification = "Xuất sắc";
                else if (newGPA >= 8.0) classification = "Giỏi";
                else if (newGPA >= 7.0) classification = "Khá";
                else if (newGPA >= 5.0) classification = "Trung bình";
                else if (newGPA >= 4.0) classification = "Yếu";
                else classification = "Kém";
            }

            let classificationElement = document.getElementById('val-classification');
            if (classificationElement) {
                classificationElement.textContent = classification;
            }

            const ctxGpa = document.getElementById('gpaChart');
            if (ctxGpa) {
                let existingChart = Chart.getChart('gpaChart');
                if (existingChart) existingChart.destroy();

                let chartData = (totalPassed === 0 && totalFailed === 0) ? [1] : [totalPassed, totalFailed];
                let chartColors = (totalPassed === 0 && totalFailed === 0) ? ['#e0e0e0'] : ['#00c853', '#ff3d00'];

                new Chart(ctxGpa.getContext('2d'), {
                    type: 'doughnut',
                    data: {
                        labels: ['Đạt', 'Chưa đạt'],
                        datasets: [{
                            data: chartData,
                            backgroundColor: chartColors,
                            borderWidth: 0
                        }]
                    },
                    options: {
                        cutout: '70%', 
                        plugins: { 
                            legend: { display: false }, 
                            tooltip: { enabled: (totalPassed > 0 || totalFailed > 0) } 
                        },
                        maintainAspectRatio: false
                    }
                });
            }

            // --- XỬ LÝ PHẦN KHUYẾN NGHỊ ---
            let failedCoursesNames = [];
            let improveCoursesNames = [];
            
            userGrades.forEach(g => {
                if (g.status === "CĐ" || g.status === "Chưa đạt") {
                    failedCoursesNames.push(g.name);
                } else if (g.score >= 5.0 && g.score < 7.0 && !g.name.toLowerCase().includes("thể dục") && !g.name.toLowerCase().includes("qp-an") && !g.name.toLowerCase().includes("anh văn")) {
                    improveCoursesNames.push(g.name);
                }
            });

            const recommendContainer = document.getElementById('recommend-container');
            if (recommendContainer) {
                let html = `<h3 style="color: #1a498b; margin-top: 0; margin-bottom: 15px; text-align: center; font-size: 1.1rem;">Khuyến nghị</h3>`;
                html += `<p style="margin: 5px 0; font-weight: 500;">Bạn có <strong style="color: red;">${failedCoursesNames.length}</strong> môn phải học lại.</p>`;
                html += `<p style="margin: 5px 0; font-weight: 500;">Bạn có <strong style="color: #00c853;">${improveCoursesNames.length}</strong> môn nên học cải thiện ở kì tiếp theo${improveCoursesNames.length > 0 ? ':' : '.'}</p>`;
                
                if (improveCoursesNames.length > 0) {
                    html += `<ul style="margin: 5px 0 10px 0; padding-left: 20px;">`;
                    let displayCount = Math.min(improveCoursesNames.length, 2); 
                    for (let i = 0; i < displayCount; i++) {
                        html += `<li>${improveCoursesNames[i]}</li>`;
                    }
                    html += `</ul>`;
                    
                    if (improveCoursesNames.length > 2 || failedCoursesNames.length > 0) {
                        html += `<button id="btn-show-more-recommend" style="background: none; border: none; color: #1a498b; font-weight: bold; cursor: pointer; padding: 0; text-decoration: underline; margin-left: 20px;">Xem thêm</button>`;
                    }
                } else if (failedCoursesNames.length > 0) {
                    html += `<button id="btn-show-more-recommend" style="background: none; border: none; color: #1a498b; font-weight: bold; cursor: pointer; padding: 0; text-decoration: underline; margin-top: 5px;">Xem thêm</button>`;
                }

                recommendContainer.innerHTML = html;

                const btnShowMore = document.getElementById('btn-show-more-recommend');
                if (btnShowMore) {
                    btnShowMore.addEventListener('click', () => {
                        const modal = document.getElementById('recommend-modal');
                        const content = document.getElementById('recommend-modal-content');
                        if (modal && content) {
                            let modalHtml = `<p style="color: red; font-weight: bold; margin-bottom: 5px;">Các môn phải học lại:</p><ul style="margin-top: 0;">`;
                            if (failedCoursesNames.length > 0) {
                                failedCoursesNames.forEach(n => modalHtml += `<li>${n}</li>`);
                            } else {
                                modalHtml += `<li>Không có</li>`;
                            }
                            modalHtml += `</ul><p style="color: #00c853; font-weight: bold; margin-bottom: 5px;">Các môn nên học cải thiện:</p><ul style="margin-top: 0;">`;
                            if (improveCoursesNames.length > 0) {
                                improveCoursesNames.forEach(n => modalHtml += `<li>${n}</li>`);
                            } else {
                                modalHtml += `<li>Không có</li>`;
                            }
                            modalHtml += `</ul>`;
                            
                            content.innerHTML = modalHtml;
                            modal.style.display = 'flex';
                        }
                    });
                }
            }
        }

        renderGrades();

        // --- CHỨC NĂNG LỌC VÀ SẮP XẾP ---
        const btnFilterYear = document.getElementById('btn-filter-year');
        const btnFilterSem = document.getElementById('btn-filter-sem');
        const btnSortName = document.getElementById('btn-sort-name');

        let activeFilter = null;
        let isSortNameActive = false;

        if (currentUser && currentUser.stats && currentUser.stats.gradesList) {
            currentUser.stats.gradesList.forEach((item, index) => {
                if (item.originalIndex === undefined) {
                    item.originalIndex = index;
                }
            });
        }

        function applyFiltersAndSort() {
            let list = currentUser.stats.gradesList;
            if (!list) return;

            list.sort((a, b) => a.originalIndex - b.originalIndex);

            if (isSortNameActive) {
                list.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
            }

            if (activeFilter === 'year') {
                list.sort((a, b) => {
                    let yearA = parseInt(String(a.year).split('-')[0].trim()) || 0;
                    let yearB = parseInt(String(b.year).split('-')[0].trim()) || 0;
                    return yearA - yearB;
                });
            } else if (activeFilter === 'sem') {
                list.sort((a, b) => {
                    let semA = parseInt(a.sem) || 0;
                    let semB = parseInt(b.sem) || 0;
                    return semA - semB;
                });
            }

            renderGrades();
        }

        if (btnFilterYear) {
            btnFilterYear.addEventListener('click', () => {
                if (activeFilter === 'year') {
                    activeFilter = null;
                    btnFilterYear.classList.remove('active');
                } else {
                    activeFilter = 'year';
                    btnFilterYear.classList.add('active');
                    if (btnFilterSem) btnFilterSem.classList.remove('active');
                }
                applyFiltersAndSort();
            });
        }

        if (btnFilterSem) {
            btnFilterSem.addEventListener('click', () => {
                if (activeFilter === 'sem') {
                    activeFilter = null; 
                    btnFilterSem.classList.remove('active');
                } else {
                    activeFilter = 'sem';
                    btnFilterSem.classList.add('active');
                    if (btnFilterYear) btnFilterYear.classList.remove('active');
                }
                applyFiltersAndSort();
            });
        }

        if (btnSortName) {
            btnSortName.addEventListener('click', () => {
                isSortNameActive = !isSortNameActive;
                btnSortName.classList.toggle('active', isSortNameActive);
                applyFiltersAndSort();
            });
        }

        // --- XỬ LÝ SỰ KIỆN MENU CHỌN HỆ ĐIỂM ---
        const scaleSelector = document.getElementById('grade-scale-selector');
        const scaleMenu = document.getElementById('scale-dropdown-menu');
        const currentScaleText = document.getElementById('current-scale-text');

        if (scaleSelector && scaleMenu) {
            scaleSelector.addEventListener('click', (e) => {
                e.stopPropagation(); 
                if (scaleMenu.style.display === 'none' || scaleMenu.style.display === '') {
                    scaleMenu.style.display = 'flex';
                    const rect = scaleSelector.getBoundingClientRect();
                    scaleMenu.style.top = (rect.bottom + 8) + 'px';
                    scaleMenu.style.left = (rect.left + rect.width / 2) + 'px';
                    scaleMenu.style.transform = 'translateX(-50%)';
                } else {
                    scaleMenu.style.display = 'none';
                }
            });

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

        // --- 2. XỬ LÝ MODAL THÊM THỦ CÔNG ---
        const modal = document.getElementById('manual-modal');
        const colInput = document.getElementById('m-cols');
        const scoreContainer = document.getElementById('m-score-inputs');
        
        let selectedSem = "1";
        let selectedType = "";

        document.getElementById('btn-add-manual').addEventListener('click', () => {
            modal.style.display = 'flex'; 
            scoreContainer.innerHTML = '';
            document.getElementById('m-year').value = '';
            document.getElementById('m-code').value = '';
            document.getElementById('m-cols').value = '';
        });
        document.getElementById('btn-cancel-modal').addEventListener('click', () => modal.style.display = 'none');

        const btnCloseRecommend = document.getElementById('btn-close-recommend');
        if (btnCloseRecommend) {
            btnCloseRecommend.addEventListener('click', () => {
                document.getElementById('recommend-modal').style.display = 'none';
            });
        }

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

        colInput.addEventListener('input', (e) => {
            let val = parseInt(e.target.value);
            if (isNaN(val) || val <= 0) {
                scoreContainer.innerHTML = ''; 
            } else {
                if (val > 5) {
                    val = 5;
                    e.target.value = 5;
                }
                generateScoreInputs(val);
            }
        });

        document.getElementById('btn-submit-course').addEventListener('click', () => {
            const yearVal = document.getElementById('m-year').value || '25 - 26';
            const codeVal = document.getElementById('m-code').value.trim().toUpperCase() || 'PHY00001';

            if (!courseDictionary[codeVal]) {
                alert(`Lỗi: Mã học phần "${codeVal}" không tồn tại trong hệ thống! Vui lòng nhập đúng mã.`);
                return;
            }

            if (currentUser.stats.gradesList && currentUser.stats.gradesList.length > 0) {
                const isDuplicate = currentUser.stats.gradesList.some(course => course.code === codeVal);
                if (isDuplicate) {
                    alert(`Lỗi: Mã học phần "${codeVal}" đã tồn tại trong bảng điểm! Vui lòng kiểm tra lại.`);
                    return;
                }
            }

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
                scoresList.push({ weight: w, score: s });
            }

            if (Math.round(totalWeight) !== 100) {
                alert(`Tổng trọng số hiện tại là ${totalWeight}%. Vui lòng điều chỉnh lại để tổng bằng 100%!`);
                return;
            }

            let courseName = courseDictionary[codeVal] || "Học phần tự chọn";
            let credits = courseCredits[codeVal] !== undefined ? courseCredits[codeVal] : 4;
            if (codeVal === "PHY00001") { credits = 3; }

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
            
            saveCurrentUser();
            modal.style.display = 'none';
            renderGrades();
        });

        const btnEditMode = document.getElementById('btn-edit');
        const btnFinishEdit = document.getElementById('btn-finish-edit');
        const finishContainer = document.getElementById('finish-edit-container');

        function toggleEditMode(isEditing) {
            const editCols = document.querySelectorAll('.col-edit-action');
            editCols.forEach(col => {
                col.style.display = isEditing ? 'table-cell' : 'none';
            });

            if (finishContainer) {
                finishContainer.style.display = isEditing ? 'flex' : 'none';
            }

            const toolbarButtons = document.querySelectorAll('.grades-toolbar button');
            toolbarButtons.forEach(btn => {
                btn.disabled = isEditing;
                if (isEditing) {
                    btn.style.opacity = '0.5';
                    btn.style.cursor = 'not-allowed';
                    btn.style.pointerEvents = 'none';
                } else {
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                    btn.style.pointerEvents = 'auto';
                }
            });
        }

        if (btnEditMode) {
            btnEditMode.addEventListener('click', () => {
                toggleEditMode(true);
            });
        }

        if (btnFinishEdit) {
            btnFinishEdit.addEventListener('click', () => {
                toggleEditMode(false);
            });
        }

        // --- LOGIC CHO MODAL SỬA & CHI TIẾT ĐIỂM ---
        const editModal = document.getElementById('edit-modal');
        let editingIndex = -1;

        window.showScoreDetails = function(index) {
            const course = currentUser.stats.gradesList[index];
            if (!course) return;

            let scores = course.scoresList;
            if (!scores || scores.length === 0) {
                scores = [{ weight: 100, score: course.score }];
            }

            let detailModal = document.getElementById('score-detail-modal');
            if (!detailModal) {
                detailModal = document.createElement('div');
                detailModal.id = 'score-detail-modal';
                detailModal.style.cssText = `
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0, 0, 0, 0.5); display: none;
                    justify-content: center; align-items: center; z-index: 2000;
                    font-family: 'Montserrat', sans-serif;
                `;
                document.body.appendChild(detailModal);

                detailModal.addEventListener('click', (e) => {
                    if (e.target === detailModal) {
                        detailModal.style.display = 'none';
                    }
                });
            }

            let rowsHtml = '';
            scores.forEach((item, i) => {
                rowsHtml += `
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 10px; text-align: center;">Cột ${i + 1}</td>
                        <td style="padding: 10px; text-align: center; font-weight: 500;">${item.weight}%</td>
                        <td style="padding: 10px; text-align: center; font-weight: 700; color: #1a498b;">${parseFloat(item.score).toFixed(1)}</td>
                    </tr>
                `;
            });

            const score10 = convertGrade(course.score, '10');
            const score4 = convertGrade(course.score, '4');
            const scoreLetter = convertGrade(course.score, 'letter');

            detailModal.innerHTML = `
                <div style="background: #fff; width: 90%; max-width: 460px; border-radius: 16px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); animation: fadeIn 0.2s ease;">
                    <div style="border-bottom: 2px solid #f0f4f8; padding-bottom: 12px; margin-bottom: 16px;">
                        <h3 style="margin: 0; color: #1a498b; font-size: 1.1rem;">Chi tiết điểm thành phần</h3>
                        <p style="margin: 4px 0 0 0; font-size: 0.9rem; color: #555; font-weight: 600;">
                            ${course.name} (${course.code})
                        </p>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 0.9rem; border-radius: 8px; overflow: hidden;">
                        <thead>
                            <tr style="background: #1a498b; color: #fff;">
                                <th style="padding: 10px; text-align: center;">Thành phần</th>
                                <th style="padding: 10px; text-align: center;">Trọng số</th>
                                <th style="padding: 10px; text-align: center;">Điểm (Hệ 10)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowsHtml}
                        </tbody>
                    </table>

                    <div style="background: #f4f8fd; padding: 12px 16px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 0.9rem;">
                        <span style="color: #333; font-weight: 600;">Điểm tổng kết:</span>
                        <span style="color: #1a498b; font-weight: 700;">
                            ${score10} <span style="font-weight: 500; color: #555;">(Hệ 4: ${score4} | Chữ: ${scoreLetter})</span>
                        </span>
                    </div>

                    <div style="text-align: right;">
                        <button onclick="document.getElementById('score-detail-modal').style.display='none'" 
                                style="background: #1a498b; color: #fff; border: none; padding: 9px 22px; border-radius: 8px; font-weight: 600; cursor: pointer; font-family: inherit;">
                            Đóng
                        </button>
                    </div>
                </div>
            `;

            detailModal.style.display = 'flex';
        };

        window.editCourse = function(index) {
            editingIndex = index;
            const course = currentUser.stats.gradesList[index];
            if (!course) return;

            document.getElementById('e-year').value = course.year || '25 - 26';
            document.getElementById('e-code').value = course.code || '';
            
            document.querySelectorAll('#e-sem-group .pill-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.val == course.sem);
            });

            document.querySelectorAll('#e-type-group .pill-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.val === (course.note || ''));
            });

            let existingScores = course.scoresList;
            if (!existingScores || existingScores.length === 0) {
                existingScores = [{ weight: 100, score: course.score }];
            }

            const count = course.colsCount || existingScores.length;
            document.getElementById('e-cols').value = count;

            generateEditScoreInputs(count, existingScores);
            editModal.style.display = 'flex';
        };

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

        document.getElementById('btn-cancel-edit').addEventListener('click', () => {
            editModal.style.display = 'none';
            editingIndex = -1;
        });

        function generateEditScoreInputs(num, scoresList = []) {
            const container = document.getElementById('e-score-inputs');
            container.innerHTML = '';
            let defaultWeight = Math.floor(100 / num);
            let html = '';

            for (let i = 0; i < num; i++) {
                let item = scoresList[i] || {};
                let weight = (item.weight !== undefined && item.weight !== null) 
                    ? item.weight 
                    : ((i === num - 1) ? 100 - (defaultWeight * (num - 1)) : defaultWeight);
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

        document.getElementById('e-cols').addEventListener('input', (e) => {
            let val = parseInt(e.target.value);
            if (!isNaN(val) && val > 0) {
                if (val > 5) val = 5;
                generateEditScoreInputs(val);
            } else {
                document.getElementById('e-score-inputs').innerHTML = '';
            }
        });

        // Nút Lưu Sửa Học Phần (Đã sửa lỗi updatedCode & tự cập nhật số tín chỉ)
        document.getElementById('btn-submit-edit').addEventListener('click', () => {
            if (editingIndex === -1) return;

            const updatedCode = document.getElementById('e-code').value.trim().toUpperCase();

            if (!courseDictionary[updatedCode]) {
                alert(`Lỗi: Mã học phần "${updatedCode}" không tồn tại trong hệ thống! Vui lòng nhập đúng mã.`);
                return;
            }

            const isDuplicate = currentUser.stats.gradesList.some((course, index) => course.code === updatedCode && index !== editingIndex);
            if (isDuplicate) {
                alert(`Lỗi: Mã học phần "${updatedCode}" đã tồn tại trong bảng điểm!`);
                return;
            }

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
            
            currentUser.stats.gradesList[editingIndex].year = document.getElementById('e-year').value;
            currentUser.stats.gradesList[editingIndex].sem = activeSem;
            currentUser.stats.gradesList[editingIndex].code = updatedCode;
            currentUser.stats.gradesList[editingIndex].name = courseDictionary[updatedCode] || "Học phần tự chọn";
            currentUser.stats.gradesList[editingIndex].tc = getStandardCredit(updatedCode, currentUser.stats.gradesList[editingIndex].tc);
            currentUser.stats.gradesList[editingIndex].note = activeType;
            currentUser.stats.gradesList[editingIndex].score = Math.round(finalScore * 10) / 10;
            currentUser.stats.gradesList[editingIndex].status = finalScore >= 5.0 ? "Đ" : "CĐ";
            currentUser.stats.gradesList[editingIndex].colsCount = wInputs.length;
            currentUser.stats.gradesList[editingIndex].scoresList = updatedScoresList;

            saveCurrentUser();
            editModal.style.display = 'none';
            renderGrades();
            toggleEditMode(true);
        });

        document.getElementById('btn-delete-course').addEventListener('click', () => {
            if (confirm("Bạn có chắc chắn muốn xóa học phần này không?")) {
                currentUser.stats.gradesList.splice(editingIndex, 1);
                saveCurrentUser();
                editModal.style.display = 'none';
                renderGrades();
                toggleEditMode(true);
            }
        });

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
        const passedCourses = currentUser.stats.gradesList
            .filter(g => g.status === 'Đ' || g.status === 'Đạt')
            .map(g => g.code.toUpperCase());
            
        const failedCourses = currentUser.stats.gradesList
            .filter(g => g.status === 'CĐ' || g.status === 'Chưa đạt')
            .map(g => g.code.toUpperCase());

        const tableRows = document.querySelectorAll('.course-table tbody tr');
        
        tableRows.forEach(row => {
            const cells = row.querySelectorAll('td');
            
            if (cells.length >= 8) {
                const codeCell = cells[1];
                const statusCell = cells[cells.length - 1];
                
                if (codeCell && statusCell) {
                    const courseCode = codeCell.textContent.trim().toUpperCase();
                    
                    if (passedCourses.includes(courseCode)) {
                        statusCell.className = 'td-status st-dat';
                        statusCell.textContent = 'ĐẠT';
                        row.style.backgroundColor = '#f2f8f2';
                    } else if (failedCourses.includes(courseCode)) {
                        statusCell.className = 'td-status st-chua-dat';
                        statusCell.textContent = 'CHƯA ĐẠT';
                        row.style.backgroundColor = '';
                    } else {
                        statusCell.className = 'td-status st-chua-hoc';
                        statusCell.textContent = 'Chưa học';
                        row.style.backgroundColor = '';
                    }
                }
            }
        });
    }
}

// -------------------------------------------------------------
// 8. ĐỒNG BỘ BẢNG VÀ CẬP NHẬT BIỂU ĐỒ DONUT CHO TRANG MODULE-MATH
// -------------------------------------------------------------
if (window.location.pathname.includes('module-math.html')) {
    const currentUser = getCurrentUser();
    const gradesList = (currentUser && currentUser.stats && currentUser.stats.gradesList) ? currentUser.stats.gradesList : [];

    const passedCodes = gradesList.filter(g => g.status === 'Đ' || g.status === 'Đạt').map(g => g.code.toUpperCase());
    const failedCodes = gradesList.filter(g => g.status === 'CĐ' || g.status === 'Chưa đạt').map(g => g.code.toUpperCase());

    let totalCredits = 0, earnedCredits = 0;
    let totalSubjects = 0, passedSubjects = 0, failedSubjects = 0;

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
                    statusCell.className = 'td-status st-dat';
                    statusCell.textContent = 'ĐẠT';
                    row.style.backgroundColor = '#f2f8f2';
                } else if (failedCodes.includes(courseCode)) {
                    failedSubjects++;
                    statusCell.className = 'td-status st-chua-dat';
                    statusCell.textContent = 'CHƯA ĐẠT';
                    row.style.backgroundColor = '';
                } else {
                    statusCell.className = 'td-status st-chua-hoc';
                    statusCell.textContent = 'Chưa học';
                    row.style.backgroundColor = '';
                }
            }
        }
    });

    const fixedTotalCredits = 36; 
    const unearnedCredits = fixedTotalCredits - earnedCredits;
    const unlearnedSubjects = totalSubjects - passedSubjects - failedSubjects;
    const percentEarned = Math.round((earnedCredits / fixedTotalCredits) * 100) || 0;

    if (document.getElementById('chart-percent-text')) {
        document.getElementById('chart-percent-text').textContent = percentEarned + '%';
        document.getElementById('leg-cred-passed').textContent = earnedCredits + ' tín chỉ';
        document.getElementById('leg-cred-not').textContent = unearnedCredits + ' tín chỉ';

        document.getElementById('leg-course-passed').textContent = passedSubjects + ' môn';
        document.getElementById('leg-course-failed').textContent = failedSubjects + ' môn';
    }
    
    if (document.getElementById('math-progress-fill')) {
        document.getElementById('math-progress-fill').style.width = percentEarned + '%';
    }
    if (document.getElementById('math-progress-text')) {
        document.getElementById('math-progress-text').textContent = percentEarned + '%';
    }

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

        gradesList.forEach(g => {
            const tc = getStandardCredit(g.code, g.tc);
            const score = parseFloat(g.score) || 0;
            const isPassed = (g.status === 'Đ' || g.status === 'Đạt');
            const isExcluded = g.name ? (g.name.toLowerCase().includes('thể dục') || g.name.toLowerCase().includes('qp-an')) : false;

            if (isPassed) {
                totalPassed++;
                if (!isExcluded) earnedCredits += tc;
            } else if (g.status === 'CĐ' || g.status === 'Chưa đạt') {
                totalFailed++;
            }

            if (!isExcluded) {
                totalScoreWeighted += (score * tc);
                creditsForGPA += tc;
            }

            if (!isExcluded) {
                const semKey = `HK${g.sem || 1} (${g.year || '26-27'})`;
                if (!semGPAMap[semKey]) {
                    semGPAMap[semKey] = { totalScore: 0, totalTc: 0 };
                }
                semGPAMap[semKey].totalScore += (score * tc);
                semGPAMap[semKey].totalTc += tc;
            }
        });

        const totalCreditsGoal = 138;
        const gpa10 = creditsForGPA > 0 ? (totalScoreWeighted / creditsForGPA) : 0;

        let rank = "--";
        if (earnedCredits > 0) {
            if (gpa10 >= 9.0) rank = "Xuất sắc";
            else if (gpa10 >= 8.0) rank = "Giỏi";
            else if (gpa10 >= 7.0) rank = "Khá";
            else if (gpa10 >= 5.0) rank = "Trung bình";
            else if (gpa10 >= 4.0) rank = "Yếu";
            else rank = "Kém";
        }

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

function updateCategoryProgress() {
    let earnedCredits = 0;
    const totalCredits = 36; 
    const tableRows = document.querySelectorAll('table tbody tr');

    tableRows.forEach(row => {
        const creditCell = row.cells[3]; 
        const statusCell = row.cells[7]; 

        if (creditCell && statusCell) {
            const credits = parseInt(creditCell.innerText.trim());
            const status = statusCell.innerText.trim();

            if (status.includes('Đã học') || status.includes('Đạt')) {
                if (!isNaN(credits)) {
                    earnedCredits += credits;
                }
            }
        }
    });

    let percentage = (totalCredits === 0) ? 0 : Math.round((earnedCredits / totalCredits) * 100);
    const progressBar = document.querySelector('.progress-bar-fill');
    const progressText = document.querySelector('.progress-text');

    if (progressBar) {
        progressBar.style.width = percentage + '%';
    }
    if (progressText) {
        progressText.innerText = percentage + '%';
    }
}

// -------------------------------------------------------------
// 9. HIỂN THỊ CHI TIẾT LÝ LUẬN CHÍNH TRỊ - PHÁP LUẬT (module-politics.html)
// -------------------------------------------------------------
if (window.location.pathname.includes('module-politics.html')) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Vui lòng đăng nhập để truy cập!');
        window.location.href = 'index.html';
    } else {
        document.getElementById('display-fullname').textContent = currentUser.fullname;
        document.getElementById('display-mssv').textContent = `MSSV: ${currentUser.studentId}`;

        const courseData = [
            { stt: "1", code: "BAA00101", name: "Triết học Mác - Lênin", tc: 3, type: "BB", lt: 45, th: 0, bt: 0, req: "" },
            { stt: "2", code: "BAA00102", name: "Kinh tế chính trị Mác - Lênin", tc: 2, type: "BB", lt: 30, th: 0, bt: 0, req: "" },
            { stt: "3", code: "BAA00103", name: "Chủ nghĩa xã hội khoa học", tc: 2, type: "BB", lt: 30, th: 0, bt: 0, req: "" },
            { stt: "4", code: "BAA00104", name: "Lịch sử Đảng Cộng sản Việt Nam", tc: 2, type: "BB", lt: 30, th: 0, bt: 0, req: "" },
            { stt: "5", code: "BAA00105", name: "Tư tưởng Hồ Chí Minh", tc: 2, type: "BB", lt: 30, th: 0, bt: 0, req: "" },
            { stt: "6", code: "BAA00011", name: "Pháp luật đại cương", tc: 3, type: "BB", lt: 45, th: 0, bt: 0, req: "" }
        ];

        const gradesList = (currentUser.stats && currentUser.stats.gradesList) ? currentUser.stats.gradesList : [];
        const tbody = document.getElementById('course-table-body-politics');
        
        let passedCreds = 0, passedCourses = 0, failedCourses = 0;
        const totalCreds = 14; 
        const totalCourses = 6;

        courseData.forEach(c => {
            const gradeInfo = gradesList.find(g => g.code.toUpperCase() === c.code.toUpperCase());
            let statusClass = 'st-chua-hoc';
            let displayStatus = 'Chưa học';

            if (gradeInfo) {
                if (gradeInfo.status === "Đ" || gradeInfo.status === "Đạt") {
                    statusClass = 'st-dat'; 
                    displayStatus = 'ĐẠT';
                    passedCreds += c.tc; 
                    passedCourses++; 
                } else if (gradeInfo.status === "CĐ" || gradeInfo.status === "Chưa đạt") {
                    statusClass = 'st-chua-dat'; 
                    displayStatus = 'CHƯA ĐẠT';
                    failedCourses++; 
                } else if (gradeInfo.status === "Đang học") {
                    statusClass = 'st-dang-hoc';
                    displayStatus = 'Đang học';
                }
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${c.stt}</td>
                <td>${c.code}</td>
                <td style="text-align: left; font-weight: 600;">${c.name}</td>
                <td>${c.tc}</td>
                <td>${c.type}</td>
                <td>${c.lt}</td><td>${c.th}</td><td>${c.bt}</td>
                <td>${c.req}</td>
                <td class="td-status ${statusClass}">${displayStatus}</td>
            `;
            tbody.appendChild(tr);
        });

        const percent = Math.round((passedCreds / totalCreds) * 100) || 0;
        document.getElementById('politics-progress-fill').style.width = percent + '%';
        document.getElementById('politics-progress-text').textContent = percent + '%';
        
        document.getElementById('chart-percent-text-politics').textContent = percent + '%';
        document.getElementById('leg-cred-passed-politics').textContent = `${passedCreds} tín chỉ`;
        document.getElementById('leg-cred-not-politics').textContent = `${totalCreds - passedCreds} tín chỉ`;

        const percentCourses = Math.round((passedCourses / totalCourses) * 100) || 0;
        document.getElementById('chart-courses-percent-politics').textContent = percentCourses + '%';
        document.getElementById('leg-course-passed-politics').textContent = `${passedCourses} môn`;
        document.getElementById('leg-course-failed-politics').textContent = `${failedCourses} môn`;

        new Chart(document.getElementById('chartCreditsPolitics').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Đã học', 'Chưa học'],
                datasets: [{ data: [passedCreds, totalCreds - passedCreds], backgroundColor: ['#00c853', '#2962ff'], borderWidth: 0 }]
            },
            options: { cutout: '75%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });

        new Chart(document.getElementById('chartCoursesPolitics').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Đạt', 'Chưa đạt', 'Khác'],
                datasets: [{ data: [passedCourses, failedCourses, totalCourses - passedCourses - failedCourses], backgroundColor: ['#00c853', '#f44336', '#9e9e9e'], borderWidth: 0 }]
            },
            options: { cutout: '75%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });
    }
}

// -------------------------------------------------------------
// 10. HIỂN THỊ CHI TIẾT KHXH - KINH TẾ - KỸ NĂNG (module-skills.html)
// -------------------------------------------------------------
if (window.location.pathname.includes('module-skills.html')) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Vui lòng đăng nhập để truy cập!');
        window.location.href = 'index.html';
    } else {
        document.getElementById('display-fullname').textContent = currentUser.fullname;
        document.getElementById('display-mssv').textContent = `MSSV: ${currentUser.studentId}`;

        const courseData = [
            { stt: "1", isHeader: true, name: "Chọn 1 học phần (2 tín chỉ) trong các học phần sau:" },
            { stt: "", code: "BAA00005", name: "Kinh tế đại cương", tc: 2, type: "TC", lt: 30, th: 0, bt: 0, req: "" },
            { stt: "", code: "BAA00006", name: "Tâm lý đại cương", tc: 2, type: "TC", lt: 30, th: 0, bt: 0, req: "" },
            { stt: "", code: "BAA00007", name: "Phương pháp luận sáng tạo", tc: 2, type: "TC", lt: 30, th: 0, bt: 0, req: "" }
        ];

        const gradesList = (currentUser.stats && currentUser.stats.gradesList) ? currentUser.stats.gradesList : [];
        const tbody = document.getElementById('course-table-body-skills');
        
        let passedCreds = 0, passedCourses = 0, failedCourses = 0;
        const totalCreds = 2;
        const totalCourses = 3;
        const processedCodes = new Set();

        courseData.forEach(c => {
            const tr = document.createElement('tr');
            
            if (c.isHeader) {
                tr.innerHTML = `<td>${c.stt}</td><td colspan="9" class="group-header" style="text-align:left; font-weight:bold; background-color:#f8f9fa;">${c.name}</td>`;
            } else {
                const gradeInfo = gradesList.find(g => g.code.toUpperCase() === c.code.toUpperCase());
                let statusClass = 'st-chua-hoc';
                let displayStatus = 'Chưa học';
                let bgRow = '';

                if (gradeInfo) {
                    if (gradeInfo.status === "Đ" || gradeInfo.status === "Đạt") {
                        statusClass = 'st-dat'; 
                        displayStatus = 'ĐẠT';
                        bgRow = 'background-color: #f2f8f2;';
                        
                        if (!processedCodes.has(c.code)) {
                            processedCodes.add(c.code);
                            passedCreds += c.tc; 
                            passedCourses++; 
                        }
                    } else if (gradeInfo.status === "CĐ" || gradeInfo.status === "Chưa đạt") {
                        statusClass = 'st-chua-dat'; 
                        displayStatus = 'CHƯA ĐẠT';
                        failedCourses++; 
                    } else if (gradeInfo.status === "Đang học") {
                        statusClass = 'st-dang-hoc';
                        displayStatus = 'Đang học';
                    }
                }

                tr.style = bgRow;
                tr.innerHTML = `
                    <td>${c.stt}</td>
                    <td>${c.code}</td>
                    <td style="text-align: left; font-weight: 600;">${c.name}</td>
                    <td>${c.tc}</td>
                    <td>${c.type}</td>
                    <td>${c.lt}</td><td>${c.th}</td><td>${c.bt}</td>
                    <td>${c.req}</td>
                    <td class="td-status ${statusClass}">${displayStatus}</td>
                `;
            }
            tbody.appendChild(tr);
        });

        const percent = Math.min(Math.round((passedCreds / totalCreds) * 100), 100) || 0;
        const remainingCreds = Math.max(0, totalCreds - passedCreds);

        document.getElementById('skills-progress-fill').style.width = percent + '%';
        document.getElementById('skills-progress-text').textContent = percent + '%';
        
        document.getElementById('chart-percent-text-skills').textContent = percent + '%';
        document.getElementById('leg-cred-passed-skills').textContent = `${Math.min(passedCreds, totalCreds)} tín chỉ`;
        document.getElementById('leg-cred-not-skills').textContent = `${remainingCreds} tín chỉ`;

        const percentCourses = Math.round((passedCourses / totalCourses) * 100) || 0;
        document.getElementById('chart-courses-percent-skills').textContent = percentCourses + '%';
        document.getElementById('leg-course-passed-skills').textContent = `${passedCourses} môn`;
        document.getElementById('leg-course-failed-skills').textContent = `${failedCourses} môn`;

        new Chart(document.getElementById('chartCreditsSkills').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Đã học', 'Chưa học'],
                datasets: [{ 
                    data: [Math.min(passedCreds, totalCreds), remainingCreds], 
                    backgroundColor: ['#2563eb', '#e2e8f0'], 
                    borderWidth: 0 
                }]
            },
            options: { cutout: '75%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });

        new Chart(document.getElementById('chartCoursesSkills').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Đạt', 'Chưa đạt', 'Khác'],
                datasets: [{ 
                    data: [passedCourses, failedCourses, totalCourses - passedCourses - failedCourses], 
                    backgroundColor: ['#00c853', '#f44336', '#e2e8f0'], 
                    borderWidth: 0 
                }]
            },
            options: { cutout: '75%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });
    }
}

// -------------------------------------------------------------
// 11. HIỂN THỊ CHI TIẾT TIN HỌC (module-it.html)
// -------------------------------------------------------------
if (window.location.pathname.includes('module-it.html')) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Vui lòng đăng nhập để truy cập!');
        window.location.href = 'index.html';
    } else {
        document.getElementById('display-fullname').textContent = currentUser.fullname;
        document.getElementById('display-mssv').textContent = `MSSV: ${currentUser.studentId}`;

        const courseData = [
            { stt: "1", code: "CSC00004", name: "Nhập môn CNTT", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" }
        ];

        const gradesList = (currentUser.stats && currentUser.stats.gradesList) ? currentUser.stats.gradesList : [];
        const tbody = document.getElementById('course-table-body-it');
        
        let passedCreds = 0, passedCourses = 0, failedCourses = 0;
        const totalCreds = 4; 
        const totalCourses = 1;
        const processedCodes = new Set();

        courseData.forEach(c => {
            const gradeInfo = gradesList.find(g => g.code.toUpperCase() === c.code.toUpperCase());
            let statusClass = 'st-chua-hoc';
            let displayStatus = 'Chưa học';

            if (gradeInfo) {
                if (gradeInfo.status === "Đ" || gradeInfo.status === "Đạt") {
                    statusClass = 'st-dat'; 
                    displayStatus = 'ĐẠT';
                    if (!processedCodes.has(c.code)) {
                        processedCodes.add(c.code);
                        passedCreds += c.tc; 
                        passedCourses++; 
                    }
                } else if (gradeInfo.status === "CĐ" || gradeInfo.status === "Chưa đạt") {
                    statusClass = 'st-chua-dat'; 
                    displayStatus = 'CHƯA ĐẠT';
                    failedCourses++; 
                } else if (gradeInfo.status === "Đang học") {
                    statusClass = 'st-dang-hoc';
                    displayStatus = 'Đang học';
                }
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${c.stt}</td>
                <td>${c.code}</td>
                <td style="text-align: center; font-weight: 600;">${c.name}</td>
                <td>${c.tc}</td>
                <td>${c.type}</td>
                <td>${c.lt}</td><td>${c.th}</td><td>${c.bt}</td>
                <td>${c.req}</td>
                <td class="td-status ${statusClass}">${displayStatus}</td>
            `;
            tbody.appendChild(tr);
        });

        const percent = Math.min(Math.round((passedCreds / totalCreds) * 100), 100) || 0;
        const remainingCreds = Math.max(0, totalCreds - passedCreds);

        document.getElementById('it-progress-fill').style.width = percent + '%';
        document.getElementById('it-progress-text').textContent = percent + '%';
        
        document.getElementById('chart-percent-text-it').textContent = percent + '%';
        document.getElementById('leg-cred-passed-it').textContent = `${passedCreds} tín chỉ`;
        document.getElementById('leg-cred-not-it').textContent = `${remainingCreds} tín chỉ`;

        const percentCourses = Math.round((passedCourses / totalCourses) * 100) || 0;
        document.getElementById('chart-courses-percent-it').textContent = percentCourses + '%';
        document.getElementById('leg-course-passed-it').textContent = `${passedCourses} môn`;
        document.getElementById('leg-course-failed-it').textContent = `${failedCourses} môn`;

        new Chart(document.getElementById('chartCreditsIT').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Đã học', 'Chưa học'],
                datasets: [{ 
                    data: [passedCreds, remainingCreds], 
                    backgroundColor: ['#00c853', '#2962ff'], 
                    borderWidth: 0 
                }]
            },
            options: { cutout: '75%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });

        new Chart(document.getElementById('chartCoursesIT').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Đạt', 'Chưa đạt', 'Chưa học'],
                datasets: [{ 
                    data: [passedCourses, failedCourses, totalCourses - passedCourses - failedCourses], 
                    backgroundColor: ['#00c853', '#f44336', '#e0e0e0'], 
                    borderWidth: 0 
                }]
            },
            options: { cutout: '75%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });
    }
}

// -------------------------------------------------------------
// 12. HIỂN THỊ CHI TIẾT NGOẠI NGỮ - GDTC - GDQP-AN (module-language.html)
// -------------------------------------------------------------
if (window.location.pathname.includes('module-language.html')) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Vui lòng đăng nhập để truy cập!');
        window.location.href = 'index.html';
    } else {
        document.getElementById('display-fullname').textContent = currentUser.fullname;
        document.getElementById('display-mssv').textContent = `MSSV: ${currentUser.studentId}`;

        // Danh sách môn học chuẩn của nhóm Ngoại ngữ - GDTC - GDQP-AN (Tổng: 20 tín chỉ, 7 môn)
        const courseData = [
            { isHeader: true, name: "a. Ngoại ngữ" },
            { stt: "1", code: "ADD00031", name: "Anh văn 1", tc: 3, type: "", lt: 30, th: 30, bt: 0, req: "" },
            { stt: "2", code: "ADD00032", name: "Anh văn 2", tc: 3, type: "", lt: 30, th: 30, bt: 0, req: "" },
            { stt: "3", code: "ADD00033", name: "Anh văn 3", tc: 3, type: "", lt: 30, th: 30, bt: 0, req: "" },
            { stt: "4", code: "ADD00034", name: "Anh văn 4", tc: 3, type: "", lt: 30, th: 30, bt: 0, req: "" },
            { isHeader: true, name: "b. Giáo dục thể chất" },
            { stt: "1", code: "BAA00021", name: "Thể dục 1", tc: 2, type: "BB", lt: 15, th: 30, bt: 0, req: "" },
            { stt: "2", code: "BAA00022", name: "Thể dục 2", tc: 2, type: "BB", lt: 15, th: 30, bt: 0, req: "" },
            { isHeader: true, name: "c. Giáo dục quốc phòng và an ninh" },
            { stt: "1", code: "BAA00030", name: "Giáo dục QP-AN", tc: 4, type: "BB", lt: "", th: "", bt: "", req: "" }
        ];

        const gradesList = (currentUser.stats && currentUser.stats.gradesList) ? currentUser.stats.gradesList : [];
        const tbody = document.getElementById('course-table-body-lang');
        
        let passedCreds = 0, passedCourses = 0, failedCourses = 0;
        const totalCreds = 20; 
        const totalCourses = 7;
        const processedCodes = new Set();

        courseData.forEach(c => {
            const tr = document.createElement('tr');

            if (c.isHeader) {
                tr.innerHTML = `
                    <td></td>
                    <td colspan="9" style="text-align: left; font-weight: 700; color: #333; padding: 14px 12px;">${c.name}</td>
                `;
            } else {
                const gradeInfo = gradesList.find(g => g.code.toUpperCase() === c.code.toUpperCase());
                let statusClass = 'st-chua-hoc';
                let displayStatus = 'Chưa học';

                if (gradeInfo) {
                    if (gradeInfo.status === "Đ" || gradeInfo.status === "Đạt") {
                        statusClass = 'st-dat'; 
                        displayStatus = 'ĐẠT';
                        if (!processedCodes.has(c.code)) {
                            processedCodes.add(c.code);
                            passedCreds += c.tc; 
                            passedCourses++; 
                        }
                    } else if (gradeInfo.status === "CĐ" || gradeInfo.status === "Chưa đạt") {
                        statusClass = 'st-chua-dat'; 
                        displayStatus = 'CHƯA ĐẠT';
                        failedCourses++; 
                    } else if (gradeInfo.status === "Đang học") {
                        statusClass = 'st-dang-hoc';
                        displayStatus = 'Đang học';
                    }
                }

                tr.innerHTML = `
                    <td>${c.stt}</td>
                    <td>${c.code}</td>
                    <td style="text-align: center; font-weight: 600;">${c.name}</td>
                    <td>${c.tc}</td>
                    <td>${c.type}</td>
                    <td>${c.lt}</td><td>${c.th}</td><td>${c.bt}</td>
                    <td>${c.req}</td>
                    <td class="td-status ${statusClass}">${displayStatus}</td>
                `;
            }
            tbody.appendChild(tr);
        });

        // 1. Cập nhật thanh tiến độ góc phải (đồng bộ 100% với trang Khung CTĐT)
        const percent = Math.min(Math.round((passedCreds / totalCreds) * 100), 100) || 0;
        const remainingCreds = Math.max(0, totalCreds - passedCreds);

        document.getElementById('lang-progress-fill').style.width = percent + '%';
        document.getElementById('lang-progress-text').textContent = percent + '%';
        
        // 2. Cập nhật Text Biểu Đồ 1 (Tín chỉ)
        document.getElementById('chart-percent-text-lang').textContent = percent + '%';
        document.getElementById('leg-cred-passed-lang').textContent = `${passedCreds} tín chỉ`;
        document.getElementById('leg-cred-not-lang').textContent = `${remainingCreds} tín chỉ`;

        // 3. Cập nhật Text Biểu Đồ 2 (Số môn)
        const percentCourses = Math.round((passedCourses / totalCourses) * 100) || 0;
        document.getElementById('chart-courses-percent-lang').textContent = percentCourses + '%';
        document.getElementById('leg-course-passed-lang').textContent = `${passedCourses} môn`;
        document.getElementById('leg-course-failed-lang').textContent = `${failedCourses} môn`;

        // 4. Vẽ Biểu đồ 1: Số tín chỉ
        new Chart(document.getElementById('chartCreditsLang').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Đã học', 'Chưa học'],
                datasets: [{ 
                    data: [passedCreds, remainingCreds], 
                    backgroundColor: ['#00c853', '#2962ff'], 
                    borderWidth: 0 
                }]
            },
            options: { cutout: '75%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });

        // 5. Vẽ Biểu đồ 2: Số môn
        new Chart(document.getElementById('chartCoursesLang').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Đạt', 'Chưa đạt', 'Chưa học'],
                datasets: [{ 
                    data: [passedCourses, failedCourses, totalCourses - passedCourses - failedCourses], 
                    backgroundColor: ['#00c853', '#f44336', '#bdbdbd'], 
                    borderWidth: 0 
                }]
            },
            options: { cutout: '75%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });
    }
}

// -------------------------------------------------------------
// 13. HIỂN THỊ CHI TIẾT CƠ SỞ NGÀNH (module-foundation.html)
// -------------------------------------------------------------
if (window.location.pathname.includes('module-foundation.html')) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Vui lòng đăng nhập để truy cập!');
        window.location.href = 'index.html';
    } else {
        document.getElementById('display-fullname').textContent = currentUser.fullname;
        document.getElementById('display-mssv').textContent = `MSSV: ${currentUser.studentId}`;

        // Danh sách môn học chuẩn của nhóm Cơ sở ngành (Mục tiêu: 38 tín chỉ)
        const courseData = [
            { stt: "1", code: "CSC10003", name: "Phương pháp lập trình hướng đối tượng", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" },
            { stt: "2", code: "CSC10004", name: "Cấu trúc dữ liệu và giải thuật", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "TQ:<br>Vi tích phân 1" },
            { stt: "3", code: "CSC10006", name: "Cơ sở dữ liệu", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" },
            { stt: "4", code: "CSC10007", name: "Hệ điều hành", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" },
            { stt: "5", code: "CSC10008", name: "Mạng máy tính", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" },
            { stt: "6", code: "CSC10009", name: "Hệ thống máy tính", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" },
            { stt: "10", code: "CSC14004", name: "Cơ sở trí tuệ nhân tạo", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" }
        ];

        const gradesList = (currentUser.stats && currentUser.stats.gradesList) ? currentUser.stats.gradesList : [];
        const tbody = document.getElementById('course-table-body-foundation');
        
        let passedCreds = 0, passedCourses = 0, failedCourses = 0;
        const totalCreds = 38; 
        const totalCourses = courseData.length;
        const processedCodes = new Set();

        courseData.forEach(c => {
            // Hỗ trợ khớp cả mã CSC10009 hoặc CSC1009 nếu người dùng nhập thiếu số 0
            const gradeInfo = gradesList.find(g => {
                const gCode = g.code.toUpperCase();
                return gCode === c.code.toUpperCase() || (c.code === "CSC10009" && gCode === "CSC1009");
            });

            let statusClass = 'st-chua-hoc';
            let displayStatus = 'Chưa học';

            if (gradeInfo) {
                if (gradeInfo.status === "Đ" || gradeInfo.status === "Đạt") {
                    statusClass = 'st-dat'; 
                    displayStatus = 'ĐẠT';
                    if (!processedCodes.has(c.code)) {
                        processedCodes.add(c.code);
                        passedCreds += c.tc; 
                        passedCourses++; 
                    }
                } else if (gradeInfo.status === "CĐ" || gradeInfo.status === "Chưa đạt") {
                    statusClass = 'st-chua-dat'; 
                    displayStatus = 'CHƯA ĐẠT';
                    failedCourses++; 
                } else if (gradeInfo.status === "Đang học") {
                    statusClass = 'st-dang-hoc';
                    displayStatus = 'Đang học';
                }
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${c.stt}</td>
                <td>${c.code}</td>
                <td style="text-align: center; font-weight: 600;">${c.name}</td>
                <td>${c.tc}</td>
                <td>${c.type}</td>
                <td>${c.lt}</td><td>${c.th}</td><td>${c.bt}</td>
                <td>${c.req}</td>
                <td class="td-status ${statusClass}">${displayStatus}</td>
            `;
            tbody.appendChild(tr);
        });

        // 1. Cập nhật thanh tiến độ góc phải (đồng bộ 100% với trang Khung CTĐT)
        const percent = Math.min(Math.round((passedCreds / totalCreds) * 100), 100) || 0;
        const remainingCreds = Math.max(0, totalCreds - passedCreds);

        document.getElementById('foundation-progress-fill').style.width = percent + '%';
        document.getElementById('foundation-progress-text').textContent = percent + '%';
        
        // 2. Cập nhật Text Biểu Đồ 1 (Tín chỉ)
        document.getElementById('chart-percent-text-foundation').textContent = percent + '%';
        document.getElementById('leg-cred-passed-foundation').textContent = `${passedCreds} tín chỉ`;
        document.getElementById('leg-cred-not-foundation').textContent = `${remainingCreds} tín chỉ`;

        // 3. Cập nhật Text Biểu Đồ 2 (Số môn)
        const percentCourses = Math.round((passedCourses / totalCourses) * 100) || 0;
        document.getElementById('chart-courses-percent-foundation').textContent = percentCourses + '%';
        document.getElementById('leg-course-passed-foundation').textContent = `${passedCourses} môn`;
        document.getElementById('leg-course-failed-foundation').textContent = `${failedCourses} môn`;

        // 4. Vẽ Biểu đồ 1: Số tín chỉ
        new Chart(document.getElementById('chartCreditsFoundation').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Đã học', 'Chưa học'],
                datasets: [{ 
                    data: [passedCreds, remainingCreds], 
                    backgroundColor: ['#00c853', '#2962ff'], 
                    borderWidth: 0 
                }]
            },
            options: { cutout: '75%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });

        // 5. Vẽ Biểu đồ 2: Số môn
        new Chart(document.getElementById('chartCoursesFoundation').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Đạt', 'Chưa đạt', 'Chưa học'],
                datasets: [{ 
                    data: [passedCourses, failedCourses, Math.max(0, totalCourses - passedCourses - failedCourses)], 
                    backgroundColor: ['#00c853', '#f44336', '#bdbdbd'], 
                    borderWidth: 0 
                }]
            },
            options: { cutout: '75%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });
    }
}

// -------------------------------------------------------------
// 14. HIỂN THỊ CHI TIẾT CHUYÊN NGÀNH (module-major.html)
// -------------------------------------------------------------
if (window.location.pathname.includes('module-major.html')) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Vui lòng đăng nhập để truy cập!');
        window.location.href = 'index.html';
    } else {
        document.getElementById('display-fullname').textContent = currentUser.fullname;
        document.getElementById('display-mssv').textContent = `MSSV: ${currentUser.studentId}`;

        // Danh sách môn học chuẩn của nhóm Chuyên ngành (Mục tiêu: 34 tín chỉ)
        const courseData = [
            { stt: "1", code: "CSC14001", name: "Automata và ngôn ngữ hình thức", tc: 4, type: "TC", lt: 45, th: 30, bt: 0, req: "" },
            { stt: "2", code: "CSC14002", name: "Các hệ cơ sở tri thức", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" },
            { stt: "3", code: "CSC14004", name: "Khai thác dữ liệu và ứng dụng", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" },
            { stt: "4", code: "CSC14005", name: "Nhập môn học máy", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" },
            { stt: "5", code: "CSC14006", name: "Nhận dạng", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" },
            { stt: "6", code: "CSC14101", name: "Ẩn dữ liệu và chia sẻ thông tin", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" },
            { stt: "7", code: "CSC11120", name: "Bảo mật web và thiết bị di động", tc: 4, type: "BB", lt: 45, th: 30, bt: 0, req: "" }
        ];

        const gradesList = (currentUser.stats && currentUser.stats.gradesList) ? currentUser.stats.gradesList : [];
        const tbody = document.getElementById('course-table-body-major');
        
        let passedCreds = 0, passedCourses = 0, failedCourses = 0;
        const totalCreds = 34; 
        const totalCourses = courseData.length;
        const processedCodes = new Set();

        courseData.forEach(c => {
            // Khớp mã học phần (hỗ trợ cả CSC14004 và CSC14003 cho môn Khai thác dữ liệu)
            const gradeInfo = gradesList.find(g => {
                const gCode = g.code.toUpperCase();
                return gCode === c.code.toUpperCase() || (c.code === "CSC14004" && gCode === "CSC14003");
            });

            let statusClass = 'st-chua-hoc';
            let displayStatus = 'Chưa học';

            if (gradeInfo) {
                if (gradeInfo.status === "Đ" || gradeInfo.status === "Đạt") {
                    statusClass = 'st-dat'; 
                    displayStatus = 'ĐẠT';
                    if (!processedCodes.has(c.code)) {
                        processedCodes.add(c.code);
                        passedCreds += c.tc; 
                        passedCourses++; 
                    }
                } else if (gradeInfo.status === "CĐ" || gradeInfo.status === "Chưa đạt") {
                    statusClass = 'st-chua-dat'; 
                    displayStatus = 'CHƯA ĐẠT';
                    failedCourses++; 
                } else if (gradeInfo.status === "Đang học") {
                    statusClass = 'st-dang-hoc';
                    displayStatus = 'Đang học';
                }
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${c.stt}</td>
                <td>${c.code}</td>
                <td style="text-align: center; font-weight: 600;">${c.name}</td>
                <td>${c.tc}</td>
                <td>${c.type}</td>
                <td>${c.lt}</td><td>${c.th}</td><td>${c.bt}</td>
                <td>${c.req}</td>
                <td class="td-status ${statusClass}">${displayStatus}</td>
            `;
            tbody.appendChild(tr);
        });

        // 1. Cập nhật thanh tiến độ góc phải (đồng bộ với trang Khung CTĐT)
        const percent = Math.min(Math.round((passedCreds / totalCreds) * 100), 100) || 0;
        const remainingCreds = Math.max(0, totalCreds - passedCreds);

        document.getElementById('major-progress-fill').style.width = percent + '%';
        document.getElementById('major-progress-text').textContent = percent + '%';
        
        // 2. Cập nhật Text Biểu Đồ 1 (Tín chỉ)
        document.getElementById('chart-percent-text-major').textContent = percent + '%';
        document.getElementById('leg-cred-passed-major').textContent = `${passedCreds} tín chỉ`;
        document.getElementById('leg-cred-not-major').textContent = `${remainingCreds} tín chỉ`;

        // 3. Cập nhật Text Biểu Đồ 2 (Số môn)
        const percentCourses = Math.round((passedCourses / totalCourses) * 100) || 0;
        document.getElementById('chart-courses-percent-major').textContent = percentCourses + '%';
        document.getElementById('leg-course-passed-major').textContent = `${passedCourses} môn`;
        document.getElementById('leg-course-failed-major').textContent = `${failedCourses} môn`;

        // 4. Vẽ Biểu đồ 1: Số tín chỉ
        new Chart(document.getElementById('chartCreditsMajor').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Đã học', 'Chưa học'],
                datasets: [{ 
                    data: [passedCreds, remainingCreds], 
                    backgroundColor: ['#00c853', '#2962ff'], 
                    borderWidth: 0 
                }]
            },
            options: { cutout: '75%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });

        // 5. Vẽ Biểu đồ 2: Số môn
        new Chart(document.getElementById('chartCoursesMajor').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Đạt', 'Chưa đạt', 'Chưa học'],
                datasets: [{ 
                    data: [passedCourses, failedCourses, Math.max(0, totalCourses - passedCourses - failedCourses)], 
                    backgroundColor: ['#00c853', '#f44336', '#bdbdbd'], 
                    borderWidth: 0 
                }]
            },
            options: { cutout: '75%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
        });
    }
}

// -------------------------------------------------------------
// 15. TỰ ĐỘNG LIÊN KẾT MỤC "TỐT NGHIỆP" TRÊN TẤT CẢ CÁC TRANG
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sidebar-item').forEach(link => {
        if (link.textContent.trim() === 'Tốt nghiệp') {
            link.setAttribute('href', 'graduation.html');
        }
    });
});

// -------------------------------------------------------------
// 16. HIỂN THỊ & CHỈNH SỬA ĐIỀU KIỆN TỐT NGHIỆP (graduation.html)
// -------------------------------------------------------------
if (window.location.pathname.includes('graduation.html')) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Vui lòng đăng nhập để truy cập!');
        window.location.href = 'index.html';
    } else {
        document.getElementById('display-fullname').textContent = currentUser.fullname;
        document.getElementById('display-mssv').textContent = `MSSV: ${currentUser.studentId}`;

        if (!currentUser.stats) currentUser.stats = {};
        if (!currentUser.stats.graduationOverrides) {
            currentUser.stats.graduationOverrides = {};
        }

        const conditionDefinitions = [
            { id: 'foreign_lang', name: 'Chuẩn đầu ra ngoại ngữ' },
            { id: 'gdqp', name: 'Hoàn thành học phần GDQP-AN' },
            { id: 'gdtc', name: 'Học phần GDTC' },
            { id: 'credits', name: 'Tích lũy đủ số tín chỉ' },
            { id: 'gpa_rank', name: 'Xếp loại học lực Trung bình trở lên' }
        ];

        function evaluateAutoConditions() {
            const gradesList = currentUser.stats.gradesList || [];
            const passedCodes = new Set(
                gradesList
                    .filter(g => g.status === 'Đ' || g.status === 'Đạt')
                    .map(g => (g.code || '').trim().toUpperCase())
            );

            let earnedCredits = 0;
            let totalWeighted10 = 0;
            let creditsForGPA = 0;

            gradesList.forEach(g => {
                const codeUpper = (g.code || '').trim().toUpperCase();
                const tc = (typeof getStandardCredit === 'function')
                    ? getStandardCredit(codeUpper, g.tc)
                    : (parseInt(g.tc) || 0);
                const score = parseFloat(g.score) || 0;
                const isPassed = (g.status === 'Đ' || g.status === 'Đạt');
                const isExcluded = g.name
                    ? (g.name.toLowerCase().includes('thể dục') || g.name.toLowerCase().includes('qp-an') || g.name.toLowerCase().includes('anh văn'))
                    : false;

                if (isPassed) earnedCredits += tc;
                if (!isExcluded && tc > 0) {
                    totalWeighted10 += score * tc;
                    creditsForGPA += tc;
                }
            });

            const totalTargetCredits = currentUser.stats.totalCredits || 138;
            const gpa10 = creditsForGPA > 0 ? (totalWeighted10 / creditsForGPA) : 0;

            const hasAv4 = passedCodes.has('ADD00034');
            const hasGdqp = passedCodes.has('BAA00030');
            const hasTd1 = passedCodes.has('BAA00021');
            const hasTd2 = passedCodes.has('BAA00022');
            const hasGdtc = hasTd1 && hasTd2;

            return {
                foreign_lang: {
                    done: hasAv4,
                    note: hasAv4 ? 'Hoàn thành Anh văn 4' : ''
                },
                gdqp: {
                    done: hasGdqp,
                    note: hasGdqp ? 'Chứng chỉ GDQP-AN' : ''
                },
                gdtc: {
                    done: hasGdtc,
                    note: hasGdtc
                        ? 'ĐẠT thể dục 1, thể dục 2'
                        : (hasTd1 || hasTd2 ? 'Đã đạt 1/2 học phần GDTC' : '')
                },
                credits: {
                    done: earnedCredits >= totalTargetCredits,
                    note: earnedCredits > 0 ? `${earnedCredits} / ${totalTargetCredits} tín chỉ` : ''
                },
                gpa_rank: {
                    done: creditsForGPA > 0 && gpa10 >= 5.0,
                    note: creditsForGPA > 0 ? `GPA: ${gpa10.toFixed(2)} / 10` : ''
                }
            };
        }

        function saveGradUser() {
            const users = getUsers();
            const idx = users.findIndex(u => u.studentId === currentUser.studentId);
            if (idx > -1) {
                users[idx] = currentUser;
                localStorage.setItem('users', JSON.stringify(users));
            }
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }

        function renderGraduationTable() {
            const autoData = evaluateAutoConditions();
            const overrides = currentUser.stats.graduationOverrides || {};
            const tbody = document.getElementById('grad-table-body');
            if (!tbody) return;
            tbody.innerHTML = '';

            let completedCount = 0;

            conditionDefinitions.forEach((cond, idx) => {
                const custom = overrides[cond.id];
                let isDone = autoData[cond.id].done;
                let noteText = autoData[cond.id].note;

                if (custom) {
                    if (custom.mode === 'done') isDone = true;
                    else if (custom.mode === 'pending') isDone = false;

                    if (custom.note !== undefined && custom.note !== null) {
                        noteText = custom.note;
                    }
                }

                if (isDone) completedCount++;

                const statusBadgeHtml = isDone
                    ? `<span class="badge-grad-done"><i class="fa-regular fa-circle-check" style="font-size: 17px;"></i> Hoàn thành</span>`
                    : `<span class="badge-grad-pending"><i class="fa-regular fa-clock" style="font-size: 16px;"></i> Chưa hoàn thành</span>`;

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="grad-cond-name">${cond.name}</td>
                    <td>${statusBadgeHtml}</td>
                    <td class="grad-note-cell">${noteText}</td>
                    <td>
                        <button class="btn-grad-edit" onclick="openGradEditModal(${idx})" title="Chỉnh sửa điều kiện">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            const totalConds = conditionDefinitions.length;
            const percent = Math.round((completedCount / totalConds) * 100);

            document.getElementById('grad-completed-ratio').textContent = `${completedCount} / ${totalConds}`;
            document.getElementById('grad-percent-text').textContent = `${percent}%`;
            document.getElementById('grad-progress-fill').style.width = `${percent}%`;

            const statusPill = document.getElementById('grad-overall-status');
            if (completedCount === totalConds) {
                statusPill.classList.add('completed');
                statusPill.innerHTML = `<i class="fa-regular fa-circle-check"></i><span>Đủ điều kiện tốt nghiệp</span>`;
            } else {
                statusPill.classList.remove('completed');
                statusPill.innerHTML = `<i class="fa-regular fa-clock"></i><span>Đang hoàn thiện</span>`;
            }
        }

        // --- XỬ LÝ MODAL & ĐỒNG BỘ PLACEHOLDER ---
        const scorePlaceholders = {
            'IELTS': 'VD: 4.5, 6.0, 6.5...',
            'VSTEP': 'VD: B1, B2...',
            'TOEFL (iBT)': 'VD: 45, 61, 79...',
            'TOEFL (ITP)': 'VD: 450, 500...',
            'TOEFL (ITP) + TOEIC': 'VD: TOEFL 500, TOEIC 240',
            'TOEFL (CBT)': 'VD: 133...',
            'TOEIC 4 kỹ năng': 'VD: N-Đ 600, N-V 240',
            'PET-CEFR': 'VD: B1...',
            'FCE': 'VD: B2 hoặc 160...',
            'BEC': 'VD: B1, B2...',
            'BULATS': 'VD: 40, 60...'
        };

        function syncCertPlaceholder() {
            const typeEl = document.getElementById('cert-type');
            const scoreEl = document.getElementById('cert-score');
            if (!typeEl || !scoreEl) return;
            scoreEl.placeholder = scorePlaceholders[typeEl.value] || 'VD: 6.5';
        }

        let editingCondIndex = -1;
        const gradModal = document.getElementById('grad-edit-modal');
        const langModal = document.getElementById('language-modal');
        const certInfoModal = document.getElementById('cert-info-modal');

        window.openGradEditModal = function(index) {
            editingCondIndex = index;
            const cond = conditionDefinitions[index];
            const autoData = evaluateAutoConditions();
            const custom = currentUser.stats.graduationOverrides[cond.id];

            if (cond.id === 'foreign_lang' && langModal) {
                const typeEl = document.getElementById('cert-type');
                const scoreEl = document.getElementById('cert-score');
                const dateEl = document.getElementById('cert-date');

                if (custom && custom.certType) {
                    typeEl.value = custom.certType;
                    scoreEl.value = custom.certScore || '';
                    dateEl.value = custom.certDate || '';
                } else {
                    typeEl.selectedIndex = 0;
                    scoreEl.value = '';
                    dateEl.value = '';
                }

                const resultEl = document.getElementById('cert-check-result');
                if (resultEl) resultEl.textContent = '';

                syncCertPlaceholder();
                langModal.classList.remove('grad-modal-hidden');
                langModal.style.display = 'flex';
            } else if (gradModal) {
                document.getElementById('grad-modal-cond-name').textContent = cond.name;
                document.getElementById('grad-modal-status').value = custom ? custom.mode : 'auto';
                document.getElementById('grad-modal-note').value = (custom && custom.note !== undefined)
                    ? custom.note
                    : autoData[cond.id].note;

                gradModal.classList.remove('grad-modal-hidden');
                gradModal.style.display = 'flex';
            }
        };

        const btnCancelGrad = document.getElementById('btn-cancel-grad');
        if (btnCancelGrad) {
            btnCancelGrad.addEventListener('click', () => {
                gradModal.style.display = 'none';
                editingCondIndex = -1;
            });
        }

        const btnSaveGrad = document.getElementById('btn-save-grad');
        if (btnSaveGrad) {
            btnSaveGrad.addEventListener('click', () => {
                if (editingCondIndex === -1) return;
                const cond = conditionDefinitions[editingCondIndex];
                const mode = document.getElementById('grad-modal-status').value;
                const note = document.getElementById('grad-modal-note').value.trim();

                if (mode === 'auto' && note === '') {
                    delete currentUser.stats.graduationOverrides[cond.id];
                } else {
                    currentUser.stats.graduationOverrides[cond.id] = { mode, note };
                }

                saveGradUser();
                gradModal.style.display = 'none';
                renderGraduationTable();
            });
        }

        if (langModal) {
            const certTypeSelect = document.getElementById('cert-type');
            if (certTypeSelect) {
                certTypeSelect.addEventListener('change', () => {
                    syncCertPlaceholder();
                    document.getElementById('cert-score').value = '';
                    const resultEl = document.getElementById('cert-check-result');
                    if (resultEl) resultEl.textContent = '';
                });
            }

            const btnCancelLang = document.getElementById('btn-cancel-lang');
            if (btnCancelLang) {
                btnCancelLang.addEventListener('click', () => {
                    langModal.style.display = 'none';
                    editingCondIndex = -1;
                });
            }

            const btnCheckCert = document.getElementById('btn-check-cert');
            if (btnCheckCert) {
                btnCheckCert.addEventListener('click', () => {
                    const type = document.getElementById('cert-type').value;
                    const scoreRaw = document.getElementById('cert-score').value.trim();
                    const scoreNum = parseFloat(scoreRaw);
                    const resultEl = document.getElementById('cert-check-result');

                    const minMass = {
                        'IELTS': 4.5,
                        'TOEFL (iBT)': 45,
                        'TOEFL (ITP)': 450,
                        'TOEFL (CBT)': 133,
                        'BULATS': 40
                    };

                    if (!type) {
                        resultEl.style.color = '#ef4444';
                        resultEl.textContent = 'Vui lòng chọn loại chứng chỉ!';
                        return;
                    }
                    if (!scoreRaw) {
                        resultEl.style.color = '#ef4444';
                        resultEl.textContent = 'Vui lòng nhập điểm hoặc bậc chứng chỉ!';
                        return;
                    }

                    if (minMass[type] !== undefined && !isNaN(scoreNum)) {
                        if (scoreNum >= minMass[type]) {
                            resultEl.style.color = '#059669';
                            resultEl.textContent = `Đạt chuẩn tối thiểu CT Đại trà (${type} ≥ ${minMass[type]})`;
                        } else {
                            resultEl.style.color = '#ef4444';
                            resultEl.textContent = `Chưa đạt chuẩn tối thiểu CT Đại trà (${type} ≥ ${minMass[type]})`;
                        }
                    } else {
                        resultEl.style.color = '#1a498b';
                        resultEl.textContent = 'Vui lòng đối chiếu mức điểm chi tiết trong bảng quy định bên dưới.';
                    }
                });
            }

            const btnSaveLang = document.getElementById('btn-save-lang');
            if (btnSaveLang) {
                btnSaveLang.addEventListener('click', () => {
                    if (editingCondIndex === -1) return;
                    const cond = conditionDefinitions[editingCondIndex];
                    const type = document.getElementById('cert-type').value;
                    const score = document.getElementById('cert-score').value.trim();
                    const date = document.getElementById('cert-date').value.trim();

                    if (!type || !score) {
                        alert('Vui lòng chọn chứng chỉ và nhập điểm!');
                        return;
                    }

                    const noteText = date ? `${type} ${score} (Cấp: ${date})` : `${type} ${score}`;
                    currentUser.stats.graduationOverrides[cond.id] = {
                        mode: 'done',
                        note: noteText,
                        certType: type,
                        certScore: score,
                        certDate: date
                    };

                    saveGradUser();
                    langModal.style.display = 'none';
                    renderGraduationTable();
                });
            }

            const btnDeleteLang = document.getElementById('btn-delete-lang-data');
            if (btnDeleteLang) {
                btnDeleteLang.addEventListener('click', () => {
                    if (editingCondIndex === -1) return;
                    const cond = conditionDefinitions[editingCondIndex];
                    delete currentUser.stats.graduationOverrides[cond.id];

                    saveGradUser();
                    langModal.style.display = 'none';
                    renderGraduationTable();
                });
            }
        }

        const linkCertInfo = document.getElementById('link-cert-info');
        if (linkCertInfo && certInfoModal) {
            linkCertInfo.addEventListener('click', (e) => {
                e.preventDefault();
                certInfoModal.classList.remove('grad-modal-hidden');
                certInfoModal.style.display = 'flex';
            });

            const btnCloseCertInfo = document.getElementById('btn-close-cert-info');
            if (btnCloseCertInfo) {
                btnCloseCertInfo.addEventListener('click', () => {
                    certInfoModal.style.display = 'none';
                });
            }

            certInfoModal.addEventListener('click', (e) => {
                if (e.target === certInfoModal) {
                    certInfoModal.style.display = 'none';
                }
            });
        }

        renderGraduationTable();
    }
}

// -------------------------------------------------------------
// 17. CHỨC NĂNG TRANG CÀI ĐẶT (settings.html)
// -------------------------------------------------------------
if (window.location.pathname.includes('settings.html')) {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        alert('Vui lòng đăng nhập để truy cập!');
        window.location.href = 'index.html';
    } else {
        // Điền thông tin người dùng
        document.getElementById('display-fullname').textContent = currentUser.fullname;
        document.getElementById('display-mssv').textContent = `MSSV: ${currentUser.studentId}`;
        
        const nameInput = document.getElementById('set-name');
        const mssvInput = document.getElementById('set-mssv');
        const majorInput = document.getElementById('set-major'); // Thêm dòng này
        
        if(nameInput) nameInput.value = currentUser.fullname;
        if(mssvInput) mssvInput.value = currentUser.studentId;
        
        // Thêm dòng này: Nếu user có chuyên ngành thì điền vào, không thì để trống hiện placeholder
        if(majorInput) majorInput.value = currentUser.major || '';

        // Hàm tiện ích lưu dữ liệu
        function saveUserToStorage(userObj) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let uIndex = users.findIndex(u => u.studentId === userObj.studentId);
            if (uIndex > -1) {
                users[uIndex] = userObj;
                localStorage.setItem('users', JSON.stringify(users));
            }
            localStorage.setItem('currentUser', JSON.stringify(userObj));
        }

        // 1. Chức năng Đăng xuất
        const btnLogout = document.getElementById('btn-logout');
        if (btnLogout) {
            btnLogout.addEventListener('click', () => {
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            });
        }

        // 2. Chức năng Đặt lại dữ liệu
        const resetModal = document.getElementById('reset-confirm-modal');
        const btnReset = document.getElementById('btn-reset-data');
        const btnCancelDelete = document.getElementById('btn-cancel-delete');
        const btnConfirmDelete = document.getElementById('btn-confirm-delete');

        if (btnReset && resetModal) {
            btnReset.addEventListener('click', () => {
                resetModal.classList.remove('grad-modal-hidden');
                resetModal.style.display = 'flex';
            });

            btnCancelDelete.addEventListener('click', () => {
                resetModal.style.display = 'none';
            });

            btnConfirmDelete.addEventListener('click', () => {
                // Đưa toàn bộ chỉ số về 0 và xóa rỗng bảng điểm
                currentUser.stats = {
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
                    gradesList: [], // Xóa bảng điểm
                    graduationOverrides: {} // Xóa điều kiện tốt nghiệp chỉnh tay
                };
                
                saveUserToStorage(currentUser);
                alert('Đã đặt lại toàn bộ dữ liệu thành công!');
                window.location.reload();
            });
        }

        // 3. Chức năng Xuất file sao lưu (JSON)
        const btnExport = document.getElementById('btn-export-backup');
        if (btnExport) {
            btnExport.addEventListener('click', () => {
                // Gom dữ liệu tài khoản hiện tại thành chuỗi JSON
                const dataStr = JSON.stringify(currentUser, null, 4);
                const blob = new Blob([dataStr], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = `Backup_Data_${currentUser.studentId}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        }

        // 4. Chức năng Khôi phục dữ liệu từ file
        const btnRestore = document.getElementById('btn-restore-backup');
        const fileInput = document.getElementById('restore-file-input');

        if (btnRestore && fileInput) {
            btnRestore.addEventListener('click', () => {
                fileInput.click();
            });

            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = function(evt) {
                    try {
                        const importedUser = JSON.parse(evt.target.result);
                        
                        // Kiểm tra xem file sao lưu có khớp với MSSV đang đăng nhập không
                        if (importedUser && importedUser.studentId === currentUser.studentId) {
                            saveUserToStorage(importedUser);
                            alert('Khôi phục dữ liệu thành công!');
                            window.location.reload();
                        } else {
                            alert('Lỗi: File sao lưu không hợp lệ hoặc thuộc về tài khoản sinh viên khác!');
                        }
                    } catch (error) {
                        alert('Lỗi: Không thể đọc file sao lưu. Vui lòng đảm bảo file đúng định dạng JSON.');
                    }
                };
                reader.readAsText(file);
                
                // Reset value để có thể chọn lại cùng 1 file nếu cần
                fileInput.value = '';
            });
        }
    }
}

// -------------------------------------------------------------
// 18. CHỨC NĂNG TRANG MỤC TIÊU (goals.html)
// -------------------------------------------------------------
if (window.location.pathname.includes('goals.html')) {
    const currentUser = getCurrentUser();

    function saveGoalToStorage(userObj) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let uIndex = users.findIndex(u => u.studentId === userObj.studentId);
        if (uIndex > -1) {
            users[uIndex] = userObj;
            localStorage.setItem('users', JSON.stringify(users));
        }
        localStorage.setItem('currentUser', JSON.stringify(userObj));
    }
    
    if (!currentUser) {
        alert('Vui lòng đăng nhập để truy cập!');
        window.location.href = 'index.html';
    } else {
        document.getElementById('display-fullname').textContent = currentUser.fullname;
        document.getElementById('display-mssv').textContent = `MSSV: ${currentUser.studentId}`;

        // 1. Tính toán số liệu hiện tại
        const gradesList = currentUser.stats.gradesList || [];
        const totalTargetCredits = currentUser.stats.totalCredits || 138;
        
        let earnedCredits = 0;
        let totalWeightedScore = 0;
        let creditsForGPA = 0;
        let lowScoreCourses = [];

        gradesList.forEach(g => {
            const codeUpper = (g.code || '').trim().toUpperCase();
            const tc = (typeof getStandardCredit === 'function') ? getStandardCredit(codeUpper, g.tc) : (parseInt(g.tc) || 0);
            const score = parseFloat(g.score) || 0;
            const isPassed = (g.status === 'Đ' || g.status === 'Đạt');
            const isExcluded = g.name ? (g.name.toLowerCase().includes('thể dục') || g.name.toLowerCase().includes('qp-an') || g.name.toLowerCase().includes('anh văn')) : false;

            if (isPassed) {
                earnedCredits += tc;
            }
            if (!isExcluded && tc > 0) {
                totalWeightedScore += score * tc;
                creditsForGPA += tc;
                
                // Thu thập môn có thể cải thiện (điểm từ 5.0 đến dưới 7.0, ưu tiên tín chỉ cao)
                if (score >= 5.0 && score < 7.0) {
                    lowScoreCourses.push({ code: codeUpper, name: g.name, tc: tc, score: score });
                }
            }
        });

        const currentGPA = creditsForGPA > 0 ? (totalWeightedScore / creditsForGPA) : 0;
        const remainingCredits = Math.max(0, totalTargetCredits - earnedCredits);

        // Hiển thị Form Thống kê cơ bản
        document.getElementById('stat-earned-credits').textContent = `${earnedCredits}/${totalTargetCredits} tín chỉ`;
        document.getElementById('stat-rem-credits').textContent = `${remainingCredits} tín chỉ`;
        document.getElementById('stat-current-gpa').textContent = `${currentGPA.toFixed(2)} / 10`;
        document.getElementById('required-sub-text').textContent = `Áp dụng cho ${remainingCredits} tín chỉ chưa học`;

        // Khởi tạo Chart
        let successChartInstance = null;
        function updateSuccessChart(rate) {
            const ctx = document.getElementById('successChart');
            if (!ctx) return;
            if (successChartInstance) successChartInstance.destroy();
            
            let color = '#fbbf24'; // Vàng
            if (rate > 70) color = '#10b981'; // Xanh
            if (rate < 30) color = '#ef4444'; // Đỏ

            successChartInstance = new Chart(ctx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Khả thi', 'Khó khăn'],
                    datasets: [{ data: [rate, 100 - rate], backgroundColor: [color, '#e2e8f0'], borderWidth: 0 }]
                },
                options: { cutout: '80%', plugins: { legend: { display: false }, tooltip: {enabled: false} }, maintainAspectRatio: false }
            });
            document.getElementById('success-rate-val').textContent = `${Math.round(rate)}%`;
        }

        // 2. Logic Phân tích Mục tiêu
        function analyzeGoal() {
            const goalGPA = parseFloat(document.getElementById('goal-gpa-input').value) || 8.0;
            const rankSelect = document.getElementById('goal-rank-select');
            const rankText = rankSelect.options[rankSelect.selectedIndex].text.split(' (')[0];

            currentUser.stats.goal = { gpa: goalGPA, rank: rankText };
            saveGoalToStorage(currentUser);

            // Cập nhật thẻ Summary Top
            document.getElementById('summary-gpa-val').textContent = goalGPA === 10 ? '10.0' : `${goalGPA.toFixed(1)}+`;
            document.getElementById('summary-rank-val').textContent = rankText;

            const reqValEl = document.getElementById('required-gpa-val');
            const badgeEl = document.getElementById('success-status-badge');
            const chalText = document.getElementById('challenge-text');
            const chalFill = document.getElementById('challenge-fill');

            // XỬ LÝ TRƯỜNG HỢP BAN ĐẦU CHƯA CÓ DỮ LIỆU (0 tín chỉ)
            if (creditsForGPA === 0) {
                reqValEl.textContent = `${goalGPA.toFixed(2)} / 10`;
                updateSuccessChart(100); // Mức trung lập đầy đủ
                
                badgeEl.textContent = 'Mới bắt đầu';
                badgeEl.style.backgroundColor = '#e2e8f0';
                badgeEl.style.color = '#475569';
                
                chalText.textContent = 'Chưa đánh giá';
                chalText.className = 'text-blue';
                chalFill.style.width = '0%';
                chalFill.style.backgroundColor = '#94a3b8';

                document.getElementById('sugg-maintain-text').textContent = `Bạn cần đạt mức điểm trung bình >= ${goalGPA.toFixed(1)} cho tất cả các môn học sắp tới để hoàn thành mục tiêu.`;
                document.getElementById('sugg-plan-text').textContent = `Hãy lên kế hoạch phân bổ ${remainingCredits} tín chỉ hợp lý cho các học kỳ tới để có một khởi đầu vững chắc.`;
                document.getElementById('sugg-improve-list').innerHTML = '<li style="color: #64748b; font-style: italic;">Chưa có dữ liệu điểm để phân tích môn cần cải thiện.</li>';
                return; 
            }

            // XỬ LÝ KHI ĐÃ CÓ DỮ LIỆU ĐIỂM
            let requiredGPA = 0;
            if (remainingCredits > 0) {
                requiredGPA = ((goalGPA * totalTargetCredits) - (currentGPA * creditsForGPA)) / remainingCredits;
            }

            if (remainingCredits === 0) {
                reqValEl.textContent = "- / 10";
                updateSuccessChart(currentGPA >= goalGPA ? 100 : 0);
                badgeEl.textContent = currentGPA >= goalGPA ? 'Đã đạt mục tiêu' : 'Không thể đạt';
                badgeEl.style.backgroundColor = currentGPA >= goalGPA ? '#dcfce7' : '#fee2e2';
                badgeEl.style.color = currentGPA >= goalGPA ? '#10b981' : '#ef4444';
            } else {
                reqValEl.textContent = `${requiredGPA.toFixed(2)} / 10`;
                
                // Tính tỉ lệ thành công & độ khó
                let rate = 100;
                let chalPercent = 0;
                if (requiredGPA > 10) {
                    rate = 0; chalPercent = 100;
                } else if (requiredGPA <= currentGPA) {
                    rate = 95; chalPercent = 20;
                } else {
                    let gap = requiredGPA - currentGPA; 
                    rate = Math.max(5, 100 - (gap * 50)); 
                    chalPercent = Math.min(100, 20 + (gap * 60));
                }

                updateSuccessChart(rate);
                chalFill.style.width = `${chalPercent}%`;
                
                if (rate >= 80) {
                    badgeEl.textContent = 'Khả thi cao'; badgeEl.style.backgroundColor = '#dcfce7'; badgeEl.style.color = '#10b981';
                    chalText.textContent = 'Dễ dàng'; chalText.className = 'text-green'; chalFill.style.backgroundColor = '#10b981';
                } else if (rate >= 40) {
                    badgeEl.textContent = 'Cần nỗ lực'; badgeEl.style.backgroundColor = '#fef08a'; badgeEl.style.color = '#ca8a04';
                    chalText.textContent = 'Khá cao'; chalText.className = 'text-orange'; chalFill.style.backgroundColor = '#fbbf24';
                } else {
                    badgeEl.textContent = 'Rất khó khăn'; badgeEl.style.backgroundColor = '#fee2e2'; badgeEl.style.color = '#ef4444';
                    chalText.textContent = 'Cực khó'; chalText.className = 'text-red'; chalFill.style.backgroundColor = '#ef4444';
                }
            }

            // Gợi ý động khi đã có dữ liệu
            document.getElementById('sugg-maintain-text').textContent = `Bạn nên duy trì mức điểm trung bình của các tín còn lại ở mức >= ${Math.max(goalGPA, requiredGPA).toFixed(1)} để đảm bảo GPA tích lũy đạt mục tiêu.`;
            document.getElementById('sugg-plan-text').textContent = `Bạn nên chia đều ${remainingCredits} tín chỉ còn lại vào các học kỳ tiếp theo (~ 12 - 15 tín chỉ / kì) để giữ phong độ tốt nhất.`;

            const suggList = document.getElementById('sugg-improve-list');
            suggList.innerHTML = '';
            lowScoreCourses.sort((a, b) => b.tc - a.tc || a.score - b.score);
            
            if (lowScoreCourses.length > 0) {
                let count = 0;
                lowScoreCourses.forEach(c => {
                    if(count >= 2) return; 
                    let targetSc = c.score + 1.5 > 10 ? 10 : c.score + 1.5; 
                    let gain = ((targetSc - c.score) * c.tc) / creditsForGPA;
                    suggList.innerHTML += `<li><strong>${c.name}</strong> (từ ${c.score.toFixed(1)} lên >= ${targetSc.toFixed(1)} để tăng ~${gain.toFixed(2)} GPA tích lũy)</li>`;
                    count++;
                });
            } else {
                suggList.innerHTML = '<li>Bạn đang duy trì điểm rất tốt, không có môn nào cấp bách cần cải thiện.</li>';
            }
        }

        document.getElementById('btn-analyze-goal').addEventListener('click', analyzeGoal);
        document.getElementById('goal-rank-select').addEventListener('change', function() {
            document.getElementById('goal-gpa-input').value = this.value;
        });

        document.getElementById('goal-gpa-input').addEventListener('input', function() {
            if (this.value !== "") {
                let val = parseFloat(this.value);
                if (val < 0) this.value = 0;
                if (val > 10) this.value = 10;
            }
        });

        // Nút Thêm/Cập nhật mục tiêu -> Cuộn xuống form
        document.getElementById('btn-toggle-goal-form').addEventListener('click', () => {
            const formSection = document.querySelector('.goal-form-card');
            formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('goal-gpa-input').focus();
        });

        // Khôi phục mục tiêu đã lưu (nếu có)
        if (currentUser.stats.goal) {
            document.getElementById('goal-gpa-input').value = currentUser.stats.goal.gpa;
            const savedGPA = parseFloat(currentUser.stats.goal.gpa);
            document.getElementById('summary-gpa-val').textContent = savedGPA === 10 ? '10.0' : `${savedGPA.toFixed(1)}+`;
            document.getElementById('summary-rank-val').textContent = currentUser.stats.goal.rank;
            
            // Set lại select box
            const options = document.getElementById('goal-rank-select').options;
            for(let i=0; i<options.length; i++) {
                if(options[i].text.includes(currentUser.stats.goal.rank)) {
                    document.getElementById('goal-rank-select').selectedIndex = i;
                    break;
                }
            }
        }

        // Chạy phân tích lần đầu
        analyzeGoal();

        // 3. Trình Mô Phỏng What-If
        let whatifCourses = [];
        const wiModal = document.getElementById('whatif-modal');
        let editingWiIndex = -1;

        function renderWhatIfTable() {
            const tbody = document.getElementById('whatif-table-body');
            tbody.innerHTML = '';
            
            let simTotalWeighted = totalWeightedScore;
            let simCreditsGPA = creditsForGPA;

            whatifCourses.forEach((c, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${c.code}</td>
                    <td style="text-align: left; font-weight: 700;">${c.name}</td>
                    <td>${c.tc}</td>
                    <td>${c.type}</td>
                    <td style="font-weight: 800; color: #1a498b;">${c.score}</td>
                    <td>
                        <button class="btn-wi-action btn-wi-edit" onclick="editWhatIf(${index})">Sửa</button>
                        <button class="btn-wi-action btn-wi-del" onclick="delWhatIf(${index})">Xóa</button>
                    </td>
                `;
                tbody.appendChild(tr);

                // Tính toán GPA mô phỏng
                if (c.type === 'Mới') {
                    simTotalWeighted += (c.score * c.tc);
                    simCreditsGPA += c.tc;
                } else if (c.type === 'Cải thiện' || c.type === 'Học lại') {
                    // Tìm điểm cũ (nếu có)
                    const oldCourse = gradesList.find(g => g.code.toUpperCase() === c.code.toUpperCase());
                    if (oldCourse) {
                        simTotalWeighted -= (parseFloat(oldCourse.score) * c.tc); // Trừ cũ
                    } else {
                        simCreditsGPA += c.tc; // Nếu không tìm thấy cũ, coi như thêm mới
                    }
                    simTotalWeighted += (c.score * c.tc); // Cộng mới
                }
            });

            if (whatifCourses.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" style="padding: 20px; font-style: italic;">Chưa có môn giả định. Hãy thêm môn học để mô phỏng GPA.</td></tr>`;
            }

            const predictedGPA = simCreditsGPA > 0 ? (simTotalWeighted / simCreditsGPA) : 0;
            document.getElementById('predicted-gpa-val').textContent = predictedGPA.toFixed(2);
        }

        window.editWhatIf = function(index) {
            editingWiIndex = index;
            const c = whatifCourses[index];
            document.getElementById('wi-code').value = c.code;
            document.getElementById('wi-name').value = c.name;
            document.getElementById('wi-credits').value = c.tc;
            document.getElementById('wi-type').value = c.type;
            document.getElementById('wi-score').value = c.score;
            
            wiModal.style.display = 'flex';
        };

        window.delWhatIf = function(index) {
            whatifCourses.splice(index, 1);
            renderWhatIfTable();
        };

        document.getElementById('btn-add-whatif').addEventListener('click', () => {
            editingWiIndex = -1;
            document.getElementById('wi-code').value = '';
            document.getElementById('wi-name').value = '';
            document.getElementById('wi-credits').value = '4';
            document.getElementById('wi-type').value = 'Mới';
            document.getElementById('wi-score').value = '';
            wiModal.style.display = 'flex';
        });

        document.getElementById('btn-cancel-wi').addEventListener('click', () => {
            wiModal.style.display = 'none';
        });

        document.getElementById('btn-save-wi').addEventListener('click', () => {
            const code = document.getElementById('wi-code').value.trim().toUpperCase() || 'UNK';
            const name = document.getElementById('wi-name').value.trim() || 'Môn giả định';
            const tc = parseInt(document.getElementById('wi-credits').value) || 4;
            const type = document.getElementById('wi-type').value;
            const score = parseFloat(document.getElementById('wi-score').value) || 0;

            const newItem = { code, name, tc, type, score };

            if (editingWiIndex > -1) {
                whatifCourses[editingWiIndex] = newItem;
            } else {
                whatifCourses.push(newItem);
            }

            wiModal.style.display = 'none';
            renderWhatIfTable();
        });

        renderWhatIfTable();
    }
}