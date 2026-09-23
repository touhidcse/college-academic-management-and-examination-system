
// use prisma-8

import "temporal-polyfill/full/global";
import { db } from "./db";

// ======================================================
// CONFIG
// ======================================================

const PASSWORD = "123456";

function instant(value: string): Temporal.Instant {
  return Temporal.Instant.from(value);
}

const SESSION_START = instant(
  "2026-01-01T00:00:00.000Z",
);

const SESSION_END = instant(
  "2026-12-31T23:59:59.999Z",
);

let emailNumber = 1;
let studentNumber = 1;

// ======================================================
// HELPERS
// ======================================================

function nextEmail(): string {
  return `level${emailNumber++}@gmail.com`;
}

function studentId(): string {
  return `STU-2026-${String(studentNumber).padStart(4, "0")}`;
}

function registrationNumber(): string {
  return `REG-2026-${String(studentNumber).padStart(5, "0")}`;
}

function getGrade(mark: number) {
  if (mark >= 80) {
    return {
      grade: "A_PLUS" as const,
      gradePoint: 5,
    };
  }

  if (mark >= 70) {
    return {
      grade: "A" as const,
      gradePoint: 4,
    };
  }

  if (mark >= 60) {
    return {
      grade: "A_MINUS" as const,
      gradePoint: 3.5,
    };
  }

  if (mark >= 50) {
    return {
      grade: "B" as const,
      gradePoint: 3,
    };
  }

  if (mark >= 40) {
    return {
      grade: "C" as const,
      gradePoint: 2,
    };
  }

  if (mark >= 33) {
    return {
      grade: "D" as const,
      gradePoint: 1,
    };
  }

  return {
    grade: "F" as const,
    gradePoint: 0,
  };
}

function getMark(index: number): number {
  const marks = [
    82,
    76,
    71,
    68,
    88,
    79,
    64,
    73,
    91,
    58,
  ];

  const mark = marks[index % marks.length];

  if (mark === undefined) {
    throw new Error(`Invalid mark index: ${index}`);
  }

  return mark;
}

function getDOB(index: number): Temporal.Instant {
  const year = 2004 + (index % 4);
  const month = index % 12;
  const day = 5 + (index % 20);

  return instant(
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00.000Z`,
  );
}

// ======================================================
// SUBJECT TYPES
// ======================================================

type SubjectCode =
  | "BANGLA_1ST"
  | "BANGLA_2ND"
  | "ENGLISH_1ST"
  | "ENGLISH_2ND"
  | "ICT"
  | "PHYSICS"
  | "CHEMISTRY"
  | "MATHEMATICS"
  | "BIOLOGY"
  | "ACCOUNTING"
  | "FINANCE_BANKING_INSURANCE"
  | "BUSINESS_ORGANIZATION_MANAGEMENT"
  | "CIVICS"
  | "ISLAMIC_HISTORY_CULTURE"
  | "SOCIOLOGY"
  | "LOGIC"
  | "ECONOMICS"
  | "ISLAMIC_STUDIES"
  | "DEGREE_BANGLA"
  | "DEGREE_ENGLISH"
  | "DEGREE_ICT"
  | "DEGREE_HISTORY"
  | "DEGREE_POLITICAL_SCIENCE"
  | "DEGREE_SOCIOLOGY"
  | "HONOURS_BANGLA"
  | "HONOURS_ENGLISH"
  | "HONOURS_ICT"
  | "HONOURS_ACCOUNTING"
  | "HONOURS_MANAGEMENT"
  | "HONOURS_ECONOMICS";

type GroupCode =
  | "SCIENCE"
  | "HUMANITIES"
  | "BUSINESS_STUDIES"
  | "BA"
  | "BBS"
  | "BSS"
  | "ACCOUNTING"
  | "MANAGEMENT";

type ProgramType =
  | "HIGHER_SECONDARY"
  | "DEGREE"
  | "HONOURS";

type SubjectDefinition = {
  subject: SubjectCode;
  paperType: "FIRST" | "SECOND" | "SINGLE";
  category:
    | "COMPULSORY"
    | "ELECTIVE"
    | "OPTIONAL";
  isRequired: boolean;
};

// ======================================================
// HSC COMMON SUBJECTS
// ======================================================

const HSC_COMMON: SubjectDefinition[] = [
  {
    subject: "BANGLA_1ST",
    paperType: "FIRST",
    category: "COMPULSORY",
    isRequired: true,
  },
  {
    subject: "BANGLA_2ND",
    paperType: "SECOND",
    category: "COMPULSORY",
    isRequired: true,
  },
  {
    subject: "ENGLISH_1ST",
    paperType: "FIRST",
    category: "COMPULSORY",
    isRequired: true,
  },
  {
    subject: "ENGLISH_2ND",
    paperType: "SECOND",
    category: "COMPULSORY",
    isRequired: true,
  },
  {
    subject: "ICT",
    paperType: "SINGLE",
    category: "COMPULSORY",
    isRequired: true,
  },
];

// ======================================================
// HSC SUBJECTS
// ======================================================

const HSC_SUBJECTS: Record<
  "SCIENCE" | "HUMANITIES" | "BUSINESS_STUDIES",
  SubjectDefinition[]
> = {
  SCIENCE: [
    ...HSC_COMMON,
    {
      subject: "PHYSICS",
      paperType: "SINGLE",
      category: "ELECTIVE",
      isRequired: true,
    },
    {
      subject: "CHEMISTRY",
      paperType: "SINGLE",
      category: "ELECTIVE",
      isRequired: true,
    },
    {
      subject: "MATHEMATICS",
      paperType: "SINGLE",
      category: "ELECTIVE",
      isRequired: true,
    },
    {
      subject: "BIOLOGY",
      paperType: "SINGLE",
      category: "OPTIONAL",
      isRequired: false,
    },
  ],

  HUMANITIES: [
    ...HSC_COMMON,
    {
      subject: "CIVICS",
      paperType: "SINGLE",
      category: "ELECTIVE",
      isRequired: true,
    },
    {
      subject: "ISLAMIC_HISTORY_CULTURE",
      paperType: "SINGLE",
      category: "ELECTIVE",
      isRequired: true,
    },
    {
      subject: "SOCIOLOGY",
      paperType: "SINGLE",
      category: "ELECTIVE",
      isRequired: true,
    },
    {
      subject: "ECONOMICS",
      paperType: "SINGLE",
      category: "OPTIONAL",
      isRequired: false,
    },
  ],

  BUSINESS_STUDIES: [
    ...HSC_COMMON,
    {
      subject: "ACCOUNTING",
      paperType: "SINGLE",
      category: "ELECTIVE",
      isRequired: true,
    },
    {
      subject: "FINANCE_BANKING_INSURANCE",
      paperType: "SINGLE",
      category: "ELECTIVE",
      isRequired: true,
    },
    {
      subject: "BUSINESS_ORGANIZATION_MANAGEMENT",
      paperType: "SINGLE",
      category: "ELECTIVE",
      isRequired: true,
    },
  ],
};

// ======================================================
// DEGREE SUBJECTS
// ======================================================

const DEGREE_SUBJECTS: Record<
  "BA" | "BBS" | "BSS",
  SubjectDefinition[]
> = {
  BA: [
    {
      subject: "DEGREE_BANGLA",
      paperType: "SINGLE",
      category: "COMPULSORY",
      isRequired: true,
    },
    {
      subject: "DEGREE_ENGLISH",
      paperType: "SINGLE",
      category: "COMPULSORY",
      isRequired: true,
    },
    {
      subject: "DEGREE_HISTORY",
      paperType: "SINGLE",
      category: "ELECTIVE",
      isRequired: true,
    },
    {
      subject: "DEGREE_POLITICAL_SCIENCE",
      paperType: "SINGLE",
      category: "ELECTIVE",
      isRequired: true,
    },
  ],

  BBS: [
    {
      subject: "DEGREE_BANGLA",
      paperType: "SINGLE",
      category: "COMPULSORY",
      isRequired: true,
    },
    {
      subject: "DEGREE_ENGLISH",
      paperType: "SINGLE",
      category: "COMPULSORY",
      isRequired: true,
    },
    {
      subject: "DEGREE_ICT",
      paperType: "SINGLE",
      category: "COMPULSORY",
      isRequired: true,
    },
    {
      subject: "DEGREE_SOCIOLOGY",
      paperType: "SINGLE",
      category: "ELECTIVE",
      isRequired: true,
    },
  ],

  BSS: [
    {
      subject: "DEGREE_BANGLA",
      paperType: "SINGLE",
      category: "COMPULSORY",
      isRequired: true,
    },
    {
      subject: "DEGREE_ENGLISH",
      paperType: "SINGLE",
      category: "COMPULSORY",
      isRequired: true,
    },
    {
      subject: "DEGREE_POLITICAL_SCIENCE",
      paperType: "SINGLE",
      category: "ELECTIVE",
      isRequired: true,
    },
    {
      subject: "DEGREE_SOCIOLOGY",
      paperType: "SINGLE",
      category: "ELECTIVE",
      isRequired: true,
    },
  ],
};

// ======================================================
// HONOURS SUBJECTS
// ======================================================

const HONOURS_SUBJECTS: Record<
  "ACCOUNTING" | "MANAGEMENT",
  SubjectDefinition[]
> = {
  ACCOUNTING: [
    {
      subject: "HONOURS_BANGLA",
      paperType: "SINGLE",
      category: "COMPULSORY",
      isRequired: true,
    },
    {
      subject: "HONOURS_ENGLISH",
      paperType: "SINGLE",
      category: "COMPULSORY",
      isRequired: true,
    },
    {
      subject: "HONOURS_ICT",
      paperType: "SINGLE",
      category: "COMPULSORY",
      isRequired: true,
    },
    {
      subject: "HONOURS_ACCOUNTING",
      paperType: "SINGLE",
      category: "ELECTIVE",
      isRequired: true,
    },
  ],

  MANAGEMENT: [
    {
      subject: "HONOURS_BANGLA",
      paperType: "SINGLE",
      category: "COMPULSORY",
      isRequired: true,
    },
    {
      subject: "HONOURS_ENGLISH",
      paperType: "SINGLE",
      category: "COMPULSORY",
      isRequired: true,
    },
    {
      subject: "HONOURS_ICT",
      paperType: "SINGLE",
      category: "COMPULSORY",
      isRequired: true,
    },
    {
      subject: "HONOURS_MANAGEMENT",
      paperType: "SINGLE",
      category: "ELECTIVE",
      isRequired: true,
    },
  ],
};

// ======================================================
// GET SUBJECTS
// ======================================================

function getSubjects(
  programType: ProgramType,
  groupCode: GroupCode,
): SubjectDefinition[] {
  if (programType === "HIGHER_SECONDARY") {
    const subjects =
      HSC_SUBJECTS[
        groupCode as
          | "SCIENCE"
          | "HUMANITIES"
          | "BUSINESS_STUDIES"
      ];

    if (!subjects) {
      throw new Error(
        `HSC subjects not found for group: ${groupCode}`,
      );
    }

    return subjects;
  }

  if (programType === "DEGREE") {
    const subjects =
      DEGREE_SUBJECTS[
        groupCode as "BA" | "BBS" | "BSS"
      ];

    if (!subjects) {
      throw new Error(
        `Degree subjects not found for group: ${groupCode}`,
      );
    }

    return subjects;
  }

  const subjects =
    HONOURS_SUBJECTS[
      groupCode as "ACCOUNTING" | "MANAGEMENT"
    ];

  if (!subjects) {
    throw new Error(
      `Honours subjects not found for group: ${groupCode}`,
    );
  }

  return subjects;
}

// ======================================================
// MAIN
// ======================================================

async function main() {
  console.log("==========================================");
  console.log(
    "College Academic Management System",
  );
  console.log("Prisma 8 Seed");
  console.log("==========================================");

  // ====================================================
  // 1. ACADEMIC SESSION
  // ====================================================

  console.log(
    "\n[1/15] Creating Academic Session...",
  );

  const session =
    await db.orm.public.AcademicSession.create({
      name: "2026 Academic Session",
      startDate: SESSION_START,
      endDate: SESSION_END,
      isActive: true,
    });

  // ====================================================
  // 2. PROGRAMS
  // ====================================================

  console.log("[2/15] Creating Programs...");

  const hsc =
    await db.orm.public.AcademicProgram.create({
      name: "Higher Secondary Certificate",
      code: "HSC",
      type: "HIGHER_SECONDARY",
      isActive: true,
    });

  const degree =
    await db.orm.public.AcademicProgram.create({
      name: "Degree",
      code: "DEGREE",
      type: "DEGREE",
      isActive: true,
    });

  const honours =
    await db.orm.public.AcademicProgram.create({
      name: "Honours",
      code: "HONOURS",
      type: "HONOURS",
      isActive: true,
    });

  // ====================================================
  // 3. LEVELS
  // ====================================================

  console.log(
    "[3/15] Creating Academic Levels...",
  );

  const levelMap = new Map<string, number>();

  async function createLevel(
    programId: number,
    programType: ProgramType,
    yearNumber: number,
    name: string,
  ) {
    const level =
      await db.orm.public.AcademicLevel.create({
        programId,
        name,
        yearNumber,
      });

    levelMap.set(
      `${programType}:${yearNumber}`,
      level.id,
    );

    return level.id;
  }

  await createLevel(
    hsc.id,
    "HIGHER_SECONDARY",
    1,
    "HSC First Year",
  );

  await createLevel(
    hsc.id,
    "HIGHER_SECONDARY",
    2,
    "HSC Second Year",
  );

  for (let year = 1; year <= 3; year++) {
    await createLevel(
      degree.id,
      "DEGREE",
      year,
      `Degree ${
        year === 1
          ? "First"
          : year === 2
            ? "Second"
            : "Third"
      } Year`,
    );
  }

  for (let year = 1; year <= 4; year++) {
    await createLevel(
      honours.id,
      "HONOURS",
      year,
      `Honours ${
        year === 1
          ? "First"
          : year === 2
            ? "Second"
            : year === 3
              ? "Third"
              : "Fourth"
      } Year`,
    );
  }

  // ====================================================
  // 4. GROUPS
  // ====================================================

  console.log("[4/15] Creating Groups...");

  const groupMap = new Map<string, number>();

  async function createGroup(
    programType: ProgramType,
    year: number,
    code: GroupCode,
    name: string,
  ) {
    const levelId = levelMap.get(
      `${programType}:${year}`,
    );

    if (!levelId) {
      throw new Error(
        `Level not found: ${programType}:${year}`,
      );
    }

    const group =
      await db.orm.public.AcademicGroup.create({
        academicLevelId: levelId,
        name,
        code,
      });

    groupMap.set(
      `${programType}:${year}:${code}`,
      group.id,
    );

    return group.id;
  }

  // HSC groups
  for (const year of [1, 2]) {
    await createGroup(
      "HIGHER_SECONDARY",
      year,
      "SCIENCE",
      "Science",
    );

    await createGroup(
      "HIGHER_SECONDARY",
      year,
      "HUMANITIES",
      "Humanities",
    );

    await createGroup(
      "HIGHER_SECONDARY",
      year,
      "BUSINESS_STUDIES",
      "Business Studies",
    );
  }

  // Degree groups
  for (let year = 1; year <= 3; year++) {
    await createGroup(
      "DEGREE",
      year,
      "BA",
      "BA",
    );

    await createGroup(
      "DEGREE",
      year,
      "BBS",
      "BBS",
    );

    await createGroup(
      "DEGREE",
      year,
      "BSS",
      "BSS",
    );
  }

  // Honours groups
  for (let year = 1; year <= 4; year++) {
    await createGroup(
      "HONOURS",
      year,
      "ACCOUNTING",
      "Accounting",
    );

    await createGroup(
      "HONOURS",
      year,
      "MANAGEMENT",
      "Management",
    );
  }

  // ====================================================
  // 5. SECTIONS
  // ====================================================

  console.log("[5/15] Creating Sections...");

  const sectionMap = new Map<string, number>();

  const allGroupKeys =
    Array.from(groupMap.keys());

  for (const key of allGroupKeys) {
    const parts = key.split(":");

    const programType =
      parts[0] as ProgramType;

    const year = Number(parts[1]);

    const levelId = levelMap.get(
      `${programType}:${year}`,
    );

    if (!levelId) {
      throw new Error(
        `Level not found for section: ${key}`,
      );
    }

    const groupId = groupMap.get(key);

    if (!groupId) {
      throw new Error(
        `Group not found for section: ${key}`,
      );
    }

    const section =
      await db.orm.public.Section.create({
        academicLevelId: levelId,
        academicGroupId: groupId,
        name: "A",
        capacity: 50,
        isActive: true,
      });

    sectionMap.set(key, section.id);
  }

  // ====================================================
  // 6. CURRICULUM SUBJECTS
  // ====================================================

  console.log(
    "[6/15] Creating Curriculum Subjects...",
  );

  const curriculumMap =
    new Map<string, number>();

  for (const key of allGroupKeys) {
    const parts = key.split(":");

    const programType =
      parts[0] as ProgramType;

    const year = Number(parts[1]);

    const groupCode =
      parts[2] as GroupCode;

    const levelId = levelMap.get(
      `${programType}:${year}`,
    );

    if (!levelId) {
      throw new Error(
        `Level not found for curriculum: ${key}`,
      );
    }

    const groupId = groupMap.get(key);

    if (!groupId) {
      throw new Error(
        `Group not found for curriculum: ${key}`,
      );
    }

    const subjects = getSubjects(
      programType,
      groupCode,
    );

    for (const subject of subjects) {
      const curriculum =
        await db.orm.public.CurriculumSubject.create({
          academicLevelId: levelId,
          academicGroupId: groupId,
          subject: subject.subject,
          paperType: subject.paperType,
          category: subject.category,
          selectionGroup:
            subject.category === "OPTIONAL"
              ? "OPTIONAL"
              : null,
          isRequired: subject.isRequired,
        });

      curriculumMap.set(
        `${key}:${subject.subject}:${subject.paperType}`,
        curriculum.id,
      );
    }
  }

  // ====================================================
  // 7. ADMIN
  // ====================================================

  console.log("[7/15] Creating Admin...");

  const admin =
    await db.orm.public.User.create({
      email: nextEmail(),
      password: PASSWORD,
      name: "System Administrator",
      phone: "01700000001",
      role: "ADMIN",
      isActive: true,
    });

  // ====================================================
  // 8. TEACHERS
  // ====================================================

  console.log("[8/15] Creating Teachers...");

  const teacherMap = new Map<
    string,
    {
      teacherId: number;
      userId: number;
    }
  >();

  const teacherDepartments: Array<{
    code: GroupCode;
    name: string;
  }> = [
    {
      code: "SCIENCE",
      name: "Science",
    },
    {
      code: "HUMANITIES",
      name: "Humanities",
    },
    {
      code: "BUSINESS_STUDIES",
      name: "Business Studies",
    },
    {
      code: "BA",
      name: "BA",
    },
    {
      code: "BBS",
      name: "BBS",
    },
    {
      code: "BSS",
      name: "BSS",
    },
    {
      code: "ACCOUNTING",
      name: "Accounting",
    },
    {
      code: "MANAGEMENT",
      name: "Management",
    },
  ];

  let employeeNumber = 1;

  for (const department of teacherDepartments) {
    for (let i = 1; i <= 2; i++) {
      const user =
        await db.orm.public.User.create({
          email: nextEmail(),
          password: PASSWORD,
          name: `${department.name} Teacher ${i}`,
          phone: `017${String(
            10000000 + employeeNumber,
          )}`,
          role: "TEACHER",
          isActive: true,
        });

      const teacher =
        await db.orm.public.Teacher.create({
          userId: user.id,
          employeeId: `EMP-${String(
            employeeNumber,
          ).padStart(3, "0")}`,
          designation: "Lecturer",
          department: department.name,
        });

      teacherMap.set(
        `${department.code}:${i}`,
        {
          teacherId: teacher.id,
          userId: user.id,
        },
      );

      employeeNumber++;
    }
  }

  // ====================================================
  // 9. TEACHER ASSIGNMENTS
  // ====================================================

  console.log(
    "[9/15] Creating Teacher Assignments...",
  );

  for (const key of allGroupKeys) {
    const parts = key.split(":");

    const programType =
      parts[0] as ProgramType;

    const year = Number(parts[1]);

    const groupCode =
      parts[2] as GroupCode;

    const sectionId = sectionMap.get(key);

    if (!sectionId) {
      throw new Error(
        `Section not found: ${key}`,
      );
    }

    const subjects = getSubjects(
      programType,
      groupCode,
    );

    const teacher1 = teacherMap.get(
      `${groupCode}:1`,
    );

    const teacher2 = teacherMap.get(
      `${groupCode}:2`,
    );

    if (!teacher1 || !teacher2) {
      throw new Error(
        `Teachers not found for group: ${groupCode}`,
      );
    }

    const academicSessionId = session.id;

    void year;

    for (const [
      index,
      subject,
    ] of subjects.entries()) {
      const curriculumSubjectId =
        curriculumMap.get(
          `${key}:${subject.subject}:${subject.paperType}`,
        );

      if (!curriculumSubjectId) {
        throw new Error(
          `Curriculum subject not found: ${key}:${subject.subject}:${subject.paperType}`,
        );
      }

      const teacher =
        index % 2 === 0
          ? teacher1
          : teacher2;

      await db.orm.public.TeacherAssignment.create({
        teacherId: teacher.teacherId,
        sectionId,
        curriculumSubjectId,
        academicSessionId,
        isActive: true,
      });
    }
  }

  // ====================================================
  // 10. EXAMS
  // ====================================================

  console.log("[10/15] Creating Exams...");

  const examMap = new Map<string, number>();

  for (const key of allGroupKeys) {
    const parts = key.split(":");

    const programType =
      parts[0] as ProgramType;

    const year = Number(parts[1]);

    const groupCode =
      parts[2] as GroupCode;

    const levelId = levelMap.get(
      `${programType}:${year}`,
    );

    if (!levelId) {
      throw new Error(
        `Level not found for exam: ${key}`,
      );
    }

    const groupId = groupMap.get(key);

    if (!groupId) {
      throw new Error(
        `Group not found for exam: ${key}`,
      );
    }

    const exam =
      await db.orm.public.Exam.create({
        name: `2026 ${programType} Year ${year} ${groupCode} Annual Examination`,
        examType:
          programType ===
          "HIGHER_SECONDARY"
            ? "HSC_ANNUAL"
            : "INCOURSE_1",
        academicSessionId: session.id,
        academicLevelId: levelId,
        academicGroupId: groupId,
        startDate: instant(
          "2026-06-01T00:00:00.000Z",
        ),
        endDate: instant(
          "2026-06-15T00:00:00.000Z",
        ),
        resultPublished: true,
      });

    examMap.set(key, exam.id);
  }

  // ====================================================
  // 11. EXAM SUBJECTS
  // ====================================================

  console.log(
    "[11/15] Creating Exam Subjects...",
  );

  const examSubjectMap =
    new Map<string, number>();

  const practicalSubjects: SubjectCode[] = [
    "ICT",
    "PHYSICS",
    "CHEMISTRY",
    "BIOLOGY",
  ];

  for (const key of allGroupKeys) {
    const parts = key.split(":");

    const programType =
      parts[0] as ProgramType;

    const groupCode =
      parts[2] as GroupCode;

    const examId = examMap.get(key);

    if (!examId) {
      throw new Error(
        `Exam not found: ${key}`,
      );
    }

    const subjects = getSubjects(
      programType,
      groupCode,
    );

    for (const subject of subjects) {
      const curriculumSubjectId =
        curriculumMap.get(
          `${key}:${subject.subject}:${subject.paperType}`,
        );

      if (!curriculumSubjectId) {
        throw new Error(
          `Curriculum subject not found: ${key}:${subject.subject}:${subject.paperType}`,
        );
      }

      const hasPractical =
        practicalSubjects.includes(
          subject.subject,
        );

      const examSubject =
        await db.orm.public.ExamSubject.create({
          examId,
          curriculumSubjectId,
          subject: subject.subject,
          paperType: subject.paperType,
          fullMarks: 100,
          mcqFullMarks: 30,
          creativeFullMarks: 50,
          practicalFullMarks:
            hasPractical ? 20 : 0,
          mcqPassMarks: 10,
          creativePassMarks: 17,
          practicalPassMarks:
            hasPractical ? 7 : 0,
          passMarks: 33,
        });

      examSubjectMap.set(
        `${key}:${subject.subject}:${subject.paperType}`,
        examSubject.id,
      );
    }
  }

  // ====================================================
  // 12. STUDENTS
  // ====================================================

  console.log("[12/15] Creating Students...");

  async function createStudents(
    programType: ProgramType,
    year: number,
    groupCode: GroupCode,
    count: number,
  ) {
    const key =
      `${programType}:${year}:${groupCode}`;

    const levelId = levelMap.get(
      `${programType}:${year}`,
    );

    if (!levelId) {
      throw new Error(
        `Level not found: ${programType}:${year}`,
      );
    }

    const groupId = groupMap.get(key);

    if (!groupId) {
      throw new Error(
        `Group not found: ${key}`,
      );
    }

    const sectionId = sectionMap.get(key);

    if (!sectionId) {
      throw new Error(
        `Section not found: ${key}`,
      );
    }

    const examId = examMap.get(key);

    if (!examId) {
      throw new Error(
        `Exam not found: ${key}`,
      );
    }

    const subjects = getSubjects(
      programType,
      groupCode,
    );

    for (let i = 1; i <= count; i++) {
      const currentStudentNumber =
        studentNumber;

      const email = nextEmail();

      // ----------------------------------------------
      // USER
      // ----------------------------------------------

      const user =
        await db.orm.public.User.create({
          email,
          password: PASSWORD,
          name: `${groupCode} Student ${year}-${i}`,
          phone: `018${String(
            currentStudentNumber,
          ).padStart(8, "0")}`,
          role: "STUDENT",
          isActive: true,
        });

      // ----------------------------------------------
      // STUDENT
      // ----------------------------------------------

      const student =
        await db.orm.public.Student.create({
          userId: user.id,
          studentId: studentId(),
          dateOfBirth:
            getDOB(currentStudentNumber),
          gender:
            i % 2 === 0
              ? "Female"
              : "Male",
          guardianName:
            `Guardian ${currentStudentNumber}`,
          guardianPhone: `019${String(
            currentStudentNumber,
          ).padStart(8, "0")}`,
          address:
            "Chattogram, Bangladesh",
        });

      // ----------------------------------------------
      // ACADEMIC RECORD
      // ----------------------------------------------

      const academicRecord =
        await db.orm.public.StudentAcademicRecord.create({
          studentId: student.id,
          academicSessionId: session.id,
          academicLevelId: levelId,
          academicGroupId: groupId,
          sectionId,
          rollNumber: i,
          registrationNumber:
            registrationNumber(),
          status: "ACTIVE",
        });

      // ----------------------------------------------
      // STUDENT SUBJECTS
      // ----------------------------------------------

      for (const subject of subjects) {
        const curriculumSubjectId =
          curriculumMap.get(
            `${key}:${subject.subject}:${subject.paperType}`,
          );

        if (!curriculumSubjectId) {
          throw new Error(
            `Curriculum subject not found: ${key}:${subject.subject}:${subject.paperType}`,
          );
        }

        await db.orm.public.StudentSubject.create({
          studentId: student.id,
          studentAcademicRecordId:
            academicRecord.id,
          curriculumSubjectId,
          subject: subject.subject,
          paperType: subject.paperType,
          category: subject.category,
        });
      }

      // ----------------------------------------------
      // MARKS
      // ----------------------------------------------

      let totalMarks = 0;
      let obtainedMarks = 0;
      let totalGradePoint = 0;

      for (const [
        subjectIndex,
        subject,
      ] of subjects.entries()) {
        const examSubjectId =
          examSubjectMap.get(
            `${key}:${subject.subject}:${subject.paperType}`,
          );

        if (!examSubjectId) {
          throw new Error(
            `Exam subject not found: ${key}:${subject.subject}:${subject.paperType}`,
          );
        }

        const mark = getMark(
          currentStudentNumber +
            subjectIndex,
        );

        const grade = getGrade(mark);

        const teacher =
          teacherMap.get(
            `${groupCode}:${
              subjectIndex % 2 === 0
                ? 1
                : 2
            }`,
          );

        if (!teacher) {
          throw new Error(
            `Teacher not found for group: ${groupCode}`,
          );
        }

        await db.orm.public.Mark.create({
          examSubjectId,
          studentId: student.id,
          mcqMark: Math.min(
            30,
            Math.round(mark * 0.3),
          ),
          creativeMark: Math.min(
            50,
            Math.round(mark * 0.5),
          ),
          practicalMark: 0,
          obtainedMark: mark,
          isPassed: mark >= 33,
          grade: grade.grade,
          gradePoint: grade.gradePoint,
          enteredBy: teacher.userId,
        });

        totalMarks += 100;
        obtainedMarks += mark;
        totalGradePoint +=
          grade.gradePoint;
      }

      // ----------------------------------------------
      // RESULT
      // ----------------------------------------------

      const gpa = Number(
        (
          totalGradePoint /
          subjects.length
        ).toFixed(2),
      );

      await db.orm.public.Result.create({
        examId,
        studentId: student.id,
        totalMarks,
        obtainedMarks,
        gpa,
        status: "PUBLISHED",
        publishedAt: instant(
          "2026-06-20T10:00:00.000Z",
        ),
      });

      // ----------------------------------------------
      // EXAM FEE
      // ----------------------------------------------

      const examFee =
        await db.orm.public.ExamFee.create({
          examId,
          studentId: student.id,
          amount: 1500,
          dueDate: instant(
            "2026-05-20T23:59:59.999Z",
          ),
          status: "PAID",
          paidAt: instant(
            "2026-05-10T10:00:00.000Z",
          ),
        });

      // ----------------------------------------------
      // PAYMENT
      // ----------------------------------------------

      const transactionId =
        `TXN-${currentStudentNumber}-${String(
          currentStudentNumber,
        ).padStart(4, "0")}`;

      const payment =
        await db.orm.public.Payment.create({
          examFeeId: examFee.id,
          studentId: student.id,
          amount: 1500,
          gateway:
            currentStudentNumber % 2 === 0
              ? "SSLCOMMERZ"
              : "BKASH",
          paymentMethod:
            currentStudentNumber % 2 === 0
              ? "CARD"
              : "MOBILE_BANKING",
          status: "SUCCESS",
          gatewayTransactionId:
            transactionId,
          initiatedAt: instant(
            "2026-05-10T09:55:00.000Z",
          ),
          completedAt: instant(
            "2026-05-10T10:00:00.000Z",
          ),
        });

      // ----------------------------------------------
      // PAYMENT TRANSACTION
      // ----------------------------------------------

      await db.orm.public.PaymentTransaction.create({
        paymentId: payment.id,
        gateway: payment.gateway,
        gatewayTransactionId:
          transactionId,
        amount: 1500,
        status: "SUCCESS",
        responseData: {
          success: true,
          transactionId,
          amount: 1500,
          currency: "BDT",
          message: "Payment successful",
        },
      });

      // ----------------------------------------------
      // AUDIT LOG
      // ----------------------------------------------

      await db.orm.public.AuditLog.create({
        userId: admin.id,
        action: "STUDENT_CREATED",
        entity: "Student",
        entityId: String(student.id),
        oldData: null,
        newData: {
          studentId: student.studentId,
          email,
          program: programType,
          year,
          group: groupCode,
        },
        ipAddress: "127.0.0.1",
        userAgent:
          "College Academic Management Seed",
      });

      studentNumber++;
    }
  }

  // ====================================================
  // HSC STUDENTS
  // ====================================================

  await createStudents(
    "HIGHER_SECONDARY",
    1,
    "SCIENCE",
    5,
  );

  await createStudents(
    "HIGHER_SECONDARY",
    1,
    "HUMANITIES",
    5,
  );

  await createStudents(
    "HIGHER_SECONDARY",
    1,
    "BUSINESS_STUDIES",
    5,
  );

  await createStudents(
    "HIGHER_SECONDARY",
    2,
    "SCIENCE",
    5,
  );

  await createStudents(
    "HIGHER_SECONDARY",
    2,
    "HUMANITIES",
    5,
  );

  await createStudents(
    "HIGHER_SECONDARY",
    2,
    "BUSINESS_STUDIES",
    5,
  );

  // ====================================================
  // DEGREE STUDENTS
  // ====================================================

  for (let year = 1; year <= 3; year++) {
    await createStudents(
      "DEGREE",
      year,
      "BA",
      3,
    );

    await createStudents(
      "DEGREE",
      year,
      "BBS",
      3,
    );

    await createStudents(
      "DEGREE",
      year,
      "BSS",
      3,
    );
  }

  // ====================================================
  // HONOURS STUDENTS
  // ====================================================

  for (let year = 1; year <= 4; year++) {
    await createStudents(
      "HONOURS",
      year,
      "ACCOUNTING",
      4,
    );

    await createStudents(
      "HONOURS",
      year,
      "MANAGEMENT",
      4,
    );
  }

  // ====================================================
  // 13. FINAL AUDIT LOG
  // ====================================================

  console.log(
    "[13/15] Creating final Audit Log...",
  );

  await db.orm.public.AuditLog.create({
    userId: admin.id,
    action: "SEED_COMPLETED",
    entity: "System",
    entityId: "SEED-2026",
    oldData: null,
    newData: {
      adminCount: 1,
      teacherCount: 16,
      studentCount: 89,
      totalUsers: 106,
    },
    ipAddress: "127.0.0.1",
    userAgent:
      "College Academic Management Seed",
  });

  // ====================================================
  // 14. SUMMARY
  // ====================================================

  console.log("[14/15] Seed Summary");
  console.log("------------------------------------------");

  console.log("Admin    : 1");
  console.log("Teachers : 16");
  console.log("Students : 89");
  console.log("Users    : 106");

  console.log("------------------------------------------");

  console.log("HSC      : 30");
  console.log("Degree   : 27");
  console.log("Honours  : 32");

  console.log("------------------------------------------");

  console.log(
    `Email: level1@gmail.com -> level${
      emailNumber - 1
    }@gmail.com`,
  );

  console.log("Password: 123456");

  console.log("------------------------------------------");
  console.log(
    "[15/15] SEED COMPLETED SUCCESSFULLY",
  );
  console.log("==========================================");
}

// ======================================================
// RUN
// ======================================================

main()
  .catch((error: unknown) => {
    console.error(
      "\n==========================================",
    );
    console.error("SEED FAILED");
    console.error(
      "==========================================",
    );
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.close();
  });

