student-management-system/
│
├── backend/
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── student.controller.js
│   │   │   └── marks.controller.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── error.middleware.js
│   │   │   ├── validate.middleware.js
│   │   │   └── notFound.middleware.js
│   │   │
│   │   ├── routes/
│   │   │   ├── student.routes.js
│   │   │   └── marks.routes.js
│   │   │
│   │   ├── services/
│   │   │   ├── student.service.js
│   │   │   └── marks.service.js
│   │   │
│   │   ├── validators/
│   │   │   ├── student.validator.js
│   │   │   └── marks.validator.js
│   │   │
│   │   ├── utils/
│   │   │   ├── apiResponse.js
│   │   │   ├── asyncHandler.js
│   │   │   └── pagination.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── StudentCard.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── ConfirmModal.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── StudentList.jsx
│   │   │   ├── AddStudent.jsx
│   │   │   ├── EditStudent.jsx
│   │   │   └── StudentDetails.jsx
│   │   │
│   │   ├── services/
│   │   │   └── studentService.js
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
└── README.md
