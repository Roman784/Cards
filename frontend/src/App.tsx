import { Routes, Route } from "react-router-dom";

import BoardPage from "./pages/BoardPage";
import LogInPage from "./pages/account/LogInPage";
import SignUpPage from "./pages/account/SignUpPage";
import ProfilePage from "./pages/account/ProfilePage"; 
import AddModulePage from "./pages/modules/AddModulePage";
import ModulesPage from "./pages/modules/ModulesPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BoardPage />} />
        <Route path="/board" element={<BoardPage />} />

        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/modules" element={<ModulesPage />} />
        <Route path="/modules/add" element={<AddModulePage />} />
        <Route path="/modules/my" element={<ModulesPage />} />
        <Route path="/modules/saved" element={<ModulesPage />} />
        
        <Route path="*" element={<BoardPage />} />
      </Routes>

    </>
  );
}
