import { createBrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import SchoolResult from './components/SchoolResult';
import School from './components/School';
import Courses from './components/Courses';
import Section from './components/Section';
import PageNotFound from './components/PageNotFound';

function App() {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Home/>},
    { path: "/home", element: <Home/>},
    { path: "/school", element: <School/>},
    { path: "/schoolResult", element: <SchoolResult/>},
    { path: "/courses", element: <Courses/>},
    { path: "/section", element: <Section/>},
    { path: "/student", element: <Home/>},
    { path: "/exam", element: <Home/>},
    { path: "/question", element: <Home/>},
    { path: "/report", element: <Home/>},
    { path: "/user", element: <Home/>},
    { path: "*", element: <PageNotFound/>},
  ])
  return (
    <div className="App">
     <Header/>
    </div>
  );
}

export default App;
