import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/Header/Post/BlogPage';
import LoginPage from './pages/Login/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import ListProject from './pages/Header/Project/ListProject';
import ListProjectTask from './pages/Header/Task/ListProjectTask';
import ListTask from './pages/Header/Task/ListTask';
import ListCourse from './pages/Header/Course/ListCourse';
import ListStudent from './pages/Header/Student/ListStudent';
import TaskInitiation from './pages/Header/Task/TaskInitiation';
import ListProjectNego from './pages/Header/Negotiation/ListProjectNego';
import DashboardLayoutPartner from './layouts/dashboard/nav/partner/DashboardLayoutPartner';
import ListProjectNegoPartner from './pages/Partner/Negotiation/ListProjectNegoPartner';
import DashboardLayoutMember from './layouts/dashboard/nav/member/DashboardLayoutMember';
import ListProjectMember from './pages/Member/ListProjectMember';
import ListProjectTaskMember from './pages/Member/ListProjectTaskMember';
import ListTaskMember from './pages/Member/ListTaskMember';
import ListCate from './pages/Header/Category/ListCate';
import ManageRegisStudent from './pages/Header/Student/ManageRegisStudent';
import StudentCertificate from './pages/Header/Student/StudentCertificate';
import ListPartner from './pages/Header/Partner/ListPartner';
import ListCampus from './pages/Partner/Campus/ListCampus';
import ListStaff from './pages/Header/Staff/ListStaff';
import ListForm from './pages/Header/Form/ListForm';
import Home from './pages/FPTIC/Home';
import Register from './pages/FPTIC/Register';
import Profile from './pages/FPTIC/Profile';
import Program from './pages/FPTIC/Program';
import ProgramDetail from './pages/FPTIC/ProgramDetail';
import { MainLayout } from './components/fpt-ic-components/layout';
import ListTaskCancel from './pages/Header/Project/Cancel/ListTaskCancel';
import DashboardLayoutAdmin from './layouts/dashboard/nav/admin/DashboardLayoutAdmin';
import ListPartnerAd from './pages/Admin/Partner/ListPartnerAd';
import ListDeputy from './pages/Partner/ListDeputy';
import Role from './pages/Admin/Role';
import ListMajor from './pages/Header/Major/ListMajor';
import RegisterInformation from './pages/FPTIC/Information/index'
import History from './pages/Admin/History';
import AuthGuard from './components/fpt-ic-components/guards/auth-guard';
import ListFormFb from './pages/Header/Feedback/ListFormFb';
import Dashboard from './Dashboard';
// ----------------------------------------------------------------------

export default function Router() {


  const routes = useRoutes([
    {
      path: '/header',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/header/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'negotiation', element: <ListProjectNego /> },
        { path: 'partner', element: <ListPartner /> },
        { path: 'project', element: <ListProject /> },
        { path: 'category', element: <ListCate /> },
        { path: 'staff', element: <ListStaff /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'project-task', element: <ListProjectTask /> },
        { path: 'list-task', element: <ListTask />},
        { path: 'list-task-cancel', element: <ListTaskCancel />},
        { path: 'course', element: <ListCourse />},
        { path: 'major', element: <ListMajor />},
        { path: 'registration-form', element: <ListForm />},
        { path: 'feedback-form', element: <ListFormFb />},
        { path: 'student', element: <ListStudent />},
        { path: 'task-initiation', element: <TaskInitiation />},
        { path: 'student-file', element: <StudentCertificate />},
        { path: 'student/student-information', element: <ManageRegisStudent />},
      ],
    },
    {
      path: '/partner',
      element: <DashboardLayoutPartner />,
      children: [
        { element: <Navigate to="/partner/app" />, index: true },
        { path: 'app', element: <Dashboard /> },
        { path: 'project', element: <ListProjectNegoPartner/> },
        { path: 'campus', element: <ListCampus/> },
        { path: 'deputy', element: <ListDeputy/> },


      ],
    },
    {
      path: '/staff',
      element: <DashboardLayoutMember />,
      children: [
        { element: <Navigate to="/staff/app" />, index: true },
        { path: 'app', element: <Dashboard /> },
        { path: 'list-task-cancel', element: <ListTaskCancel />},
        { path: 'projects', element: <ListProjectMember/> },
        { path: 'member/list-task', element: <ListTaskMember />},
        { path: 'leader/list-task', element: <ListTask />},
        { path: 'registration-form', element: <ListForm />},
        { path: 'feedback-form', element: <ListFormFb />},
        { path: 'blog', element: <BlogPage /> },
        { path: 'project-task', element: <ListProjectTaskMember /> },
        { path: 'student', element: <ListStudent />},

      ],
    },
    {
      path: '/admin',
      element: <DashboardLayoutAdmin />,
      children: [
        { element: <Navigate to="/admin/app" />, index: true },
        { path: 'app', element: <Dashboard /> },
        { path: 'partner', element: <ListPartnerAd /> },
        { path: 'staff', element: <Role /> },
        { path: 'changelog', element: <History /> },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },

    {
      path: '/',
      element: <MainLayout/>,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: 'home', element: <Home /> },
        { path: 'register', element: <AuthGuard><Register /></AuthGuard> },
        { path: 'register-information', element: <RegisterInformation /> },
        { path: 'post', element: <Program /> },
        { path: 'profile', element: <AuthGuard><Profile /></AuthGuard>},
        { path: 'post/:id', element: <ProgramDetail /> },  
      ]
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
