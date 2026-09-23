import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// import authRoutes from "./modules/auth/auth.route";
// import adminRoutes from "./modules/admin/admin.route";
// import userRoutes from "./modules/user/user.route";
// import studentRoutes from "./modules/student/student.route";
// import teacherRoutes from "./modules/teacher/teacher.route";
// import academicRoutes from "./modules/academic/academic.route";
// import subjectRoutes from "./modules/subject/subject.route";
// import examRoutes from "./modules/exam/exam.route";
// import markRoutes from "./modules/mark/mark.route";
// import resultRoutes from "./modules/result/result.route";
// import examFeeRoutes from "./modules/examFee/examFee.route";
// import paymentRoutes from "./modules/payment/payment.route";

// import notFound from "./middlewares/notFound";
// import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
}));

app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "College Management API is running",
    });
});

// app.use(
//     "/api/auth",
//     authRoutes,
// );

// app.use(
//     "/api/admin",
//     adminRoutes,
// );

// app.use(
//     "/api/users",
//     userRoutes,
// );

// app.use(
//     "/api/students",
//     studentRoutes,
// );

// app.use(
//     "/api/teachers",
//     teacherRoutes,
// );

// app.use(
//     "/api/academic",
//     academicRoutes,
// );

// app.use(
//     "/api/subjects",
//     subjectRoutes,
// );

// app.use(
//     "/api/exams",
//     examRoutes,
// );

// app.use(
//     "/api/marks",
//     markRoutes,
// );

// app.use(
//     "/api/results",
//     resultRoutes,
// );

// app.use(
//     "/api/exam-fees",
//     examFeeRoutes,
// );

// app.use(
//     "/api/payments",
//     paymentRoutes,
// );

// app.use(notFound);

// app.use(globalErrorHandler);

export default app;