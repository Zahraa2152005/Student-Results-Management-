class Student {

    #name;
    #grade1;
    #grade2;
    #grade3;
    #attendance;

    constructor(name, grade1, grade2, grade3, attendance) {

        this.name = name;
        this.grade1 = grade1;
        this.grade2 = grade2;
        this.grade3 = grade3;
        this.attendance = attendance;

    }

    set name(value) {

        if (value.trim() === "") {
            throw new Error("من فضلك أدخل اسم الطالب.");
        }

        this.#name = value.trim();
    }

    get name() {
        return this.#name;
    }

    set grade1(value) {

        if (value === "" || value === null || value === undefined) {
            throw new Error("من فضلك أدخل درجة المادة الأولى.");
        }

        value = Number(value);

        if (isNaN(value) || value < 0 || value > 100) {
            throw new Error("درجة المادة الأولى يجب أن تكون من 0 إلى 100.");
        }

        this.#grade1 = value;
    }

    get grade1() {
        return this.#grade1;
    }

    set grade2(value) {

        if (value === "" || value === null || value === undefined) {
            throw new Error("من فضلك أدخل درجة المادة الثانية.");
        }

        value = Number(value);

        if (isNaN(value) || value < 0 || value > 100) {
            throw new Error("درجة المادة الثانية يجب أن تكون من 0 إلى 100.");
        }

        this.#grade2 = value;
    }

    get grade2() {
        return this.#grade2;
    }

    set grade3(value) {

        if (value === "" || value === null || value === undefined) {
            throw new Error("من فضلك أدخل درجة المادة الثالثة.");
        }

        value = Number(value);

        if (isNaN(value) || value < 0 || value > 100) {
            throw new Error("درجة المادة الثالثة يجب أن تكون من 0 إلى 100.");
        }

        this.#grade3 = value;
    }

    get grade3() {
        return this.#grade3;
    }

    set attendance(value) {

        if (value === "" || value === null || value === undefined) {
            throw new Error("من فضلك أدخل نسبة الحضور.");
        }

        value = Number(value);

        if (isNaN(value) || value < 0 || value > 100) {
            throw new Error("نسبة الحضور يجب أن تكون من 0 إلى 100.");
        }

        this.#attendance = value;
    }

    get attendance() {
        return this.#attendance;
    }

    getAverage() {

        let grades = [this.#grade1, this.#grade2, this.#grade3];

        let total = grades.reduce((sum, grade) => sum + grade, 0);

        return total / grades.length;
    }

    getLetterGrade() {

        let average = this.getAverage();

        if (average >= 90) {
            return "ممتاز";
        } else if (average >= 80) {
            return "جيد جدًا";
        } else if (average >= 70) {
            return "جيد";
        } else if (average >= 60) {
            return "مقبول";
        } else if (average >= 50) {
            return "ضعيف";
        } else {
            return "ضعيف جدًا";
        }

    }

}


let studentsList = [];


const studentName = document.getElementById("studentName");

const grade1Input = document.getElementById("grade1");

const grade2Input = document.getElementById("grade2");

const grade3Input = document.getElementById("grade3");

const attendanceInput = document.getElementById("attendance");

const addStudentBtn = document.getElementById("addStudentBtn");

const mercyBtn = document.getElementById("mercyBtn");

const errorBox = document.getElementById("errorBox");

const studentsDisplay = document.getElementById("studentsList");

const mercyReport = document.getElementById("mercyReport");

const studentForm = document.getElementById("studentForm");


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


addStudentBtn.onclick = function () {

    try {

        let newStudent = new Student(
            studentName.value,
            grade1Input.value,
            grade2Input.value,
            grade3Input.value,
            attendanceInput.value
        );

        studentsList.push(newStudent);

        errorBox.classList.add("d-none");
        errorBox.textContent = "";

        displayStudents();

        studentForm.reset();

        mercyReport.innerHTML = `
            <p class="empty-message">
                اضغط على تفعيل لجنة الرأفة لعرض التقرير.
            </p>
        `;

    } catch (error) {

        errorBox.textContent = error.message;

        errorBox.classList.remove("d-none");

    }

};


function displayStudents() {

    if (studentsList.length === 0) {

        studentsDisplay.innerHTML = `
            <p class="empty-message">
                لم يتم إضافة أي طلاب حتى الآن.
            </p>
        `;

        return;
    }

    studentsDisplay.innerHTML = studentsList.map((student, index) => {

        return `
            <div class="student-item">

                <h5 class="mb-2">
                    ${index + 1} - ${escapeHTML(student.name)}
                </h5>

                <p class="mb-1">
                    متوسط الدرجات:
                    ${student.getAverage().toFixed(2)}
                </p>

                <p class="mb-1">
                    التقدير:
                    ${student.getLetterGrade()}
                </p>

                <p class="mb-0">
                    نسبة الحضور:
                    ${student.attendance}%
                </p>

            </div>
        `;

    }).join("");

}

mercyBtn.onclick = function () {

    let strugglingStudents = studentsList.filter(student => {

        let average = student.getAverage();

        return average >= 40 && average <= 49;

    });

    let studentsAfterMercy = strugglingStudents.map(student => {

        return {
            name: student.name,
            oldAverage: student.getAverage(),
            newAverage: student.getAverage() + 5
        };

    });

    let totalAfterMercy = studentsAfterMercy.reduce((sum, student) => {

        return sum + student.newAverage;

    }, 0);


    let generalAverage = studentsAfterMercy.length > 0
        ? totalAfterMercy / studentsAfterMercy.length
        : 0;

    if (studentsAfterMercy.length === 0) {

        mercyReport.innerHTML = `
            <div class="report-box text-center">

                <h5 class="report-title">
                    التقرير النهائي للجنة الرأفة
                </h5>

                <p class="mb-0">
                    لا يوجد طلاب متعثرون متوسط درجاتهم بين 40 و49.
                </p>

            </div>
        `;

        return;
    }

    mercyReport.innerHTML = `
        <div class="report-box">

            <h5 class="report-title mb-3">
                التقرير النهائي للجنة الرأفة
            </h5>

            <p>
                عدد الطلاب المتعثرين:
                <strong>${studentsAfterMercy.length}</strong>
            </p>

            <h6 class="mb-3">أسماء الطلاب ودرجاتهم بعد الرأفة:</h6>

            ${studentsAfterMercy.map(student => {

                return `
                    <div class="mercy-student">

                        <strong>${escapeHTML(student.name)}</strong>

                        <p class="mb-1">
                            المتوسط قبل الرأفة:
                            ${student.oldAverage.toFixed(2)}
                        </p>

                        <p class="mb-0">
                            المتوسط بعد الرأفة:
                            ${student.newAverage.toFixed(2)}
                        </p>

                    </div>
                `;

            }).join("")}

            <hr>

            <h6 class="report-title">
                المتوسط العام بعد الرأفة:
                ${generalAverage.toFixed(2)}
            </h6>

        </div>
    `;

};