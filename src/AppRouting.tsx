import { Routes, Route, BrowserRouter } from "react-router-dom";
import BasicLayout from "./components/Layouts/BasicLayout";
import Dashboard from "./components/pages/dashboard";
import Administation from "./components/pages/administration";
import Division from "./components/pages/administration/Dvision";
import Role from "./components/pages/administration/Role";
import FileCoumn from "./components/pages/administration/FileColumn";
import FileType from "./components/pages/administration/FileType";
import NotificationType from "./components/pages/administration/Notification";
import ProjectType from "./components/pages/administration/ProjectType";
import QuestionType from "./components/pages/administration/QuestionType";
import Questions from "./components/pages/administration/Question";
import PossibleResponse from "./components/pages/administration/Response";
import Template from "./components/pages/template";
import TemplateDetails from "./components/pages/template/templateDetails";
import AddQuestion from "./components/pages/template/AddQuestion";
import BillingCode from "./components/pages/administration/Billing";

function AppRouting() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="template" element={<Template />} />
            <Route path="/template/:id" element={<TemplateDetails />} />
            <Route path="/template/add" element={<AddQuestion />} />

            <Route path="/administration" element={<Administation />}>
              <Route index element={<Division />} />
              <Route path="external-role" element={<Role />} />
              <Route path="file-column" element={<FileCoumn />} />
              <Route path="file-type" element={<FileType />} />
              <Route path="notification" element={<NotificationType />} />
              <Route path="project" element={<ProjectType />} />
              <Route path="question-type" element={<QuestionType />} />
              <Route path="questions" element={<Questions />} />
              <Route path="possible-response" element={<PossibleResponse />} />
              <Route path="billing-code" element={<BillingCode />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRouting;
