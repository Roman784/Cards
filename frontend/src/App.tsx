import { Routes, Route } from "react-router-dom";

import BoardPage from "./pages/BoardPage";
import LogInPage from "./pages/account/LogInPage";
import SignUpPage from "./pages/account/SignUpPage";
import ProfilePage from "./pages/account/ProfilePage"; 
import AddModulePage from "./pages/modules/AddModulePage";
import MyModulesPage from "./pages/modules/MyModulesPage";
import FavoriteModulesPage from "./pages/modules/FavoriteModulesPage";
import ModulePage from "./pages/modules/ModulePage";
import EditModulePage from "./pages/modules/EditModulePage";

import Header from "./components/header/Header";

import "./styles/App.css";

export default function App() {
  return (
    <>
      <Header />

      <main className="content" style={{marginBottom: "300px"}}>
        <Routes>
          <Route path="/" element={<BoardPage />} />
          <Route path="/board" element={<BoardPage />} />

          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/module" element={<ModulePage />} />
          <Route path="/modules/add" element={<AddModulePage />} />
          <Route path="/modules/edit" element={<EditModulePage />} />
          <Route path="/modules/my" element={<MyModulesPage />} />
          <Route path="/modules/favorites" element={<FavoriteModulesPage />} />
          
          <Route path="*" element={<BoardPage />} />
        </Routes>
      </main>
    </>
  );
}
