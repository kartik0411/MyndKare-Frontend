import Courses from "../Pages/Courses/Courses"
import Exam from "../Pages/Exam/Exam"
import Home from "../Pages/Home/Home"
import PageNotFound from "../Pages/PageNotFound/PageNotFound"
import Question from "../Pages/Question/Question"
import Report from "../Pages/Report/Report"
import School from "../Pages/School/School"
import SchoolResult from "../Pages/SchoolResult/SchoolResult"
import Section from "../Pages/Section/Section"
import Student from "../Pages/Student/Student"
import User from "../Pages/User/User"

const routes = [
    { path: "/", Component: Home },
    { path: "/school", Component: School },
    { path: "/schoolResult", Component: SchoolResult },
    { path: "/courses", Component: Courses },
    { path: "/section", Component: Section },
    { path: "/student", Component: Student },
    { path: "/exam", Component: Exam },
    { path: "/question", Component: Question },
    { path: "/report", Component: Report },
    { path: "/user", Component: User },
    { path: "*", Component: PageNotFound },
]

export default routes