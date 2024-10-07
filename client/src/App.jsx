import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import for user
import UserLayout from "./components/layouts/user-layout";
import UserDashboard from "./pages/user/dashboard";

// import for admin
import AdminDashboard from "./pages/admin/dashboard";
import AdminLayout from "./components/layouts/admin-layout";

// import for super admin
import SuperAdminLayout from "./components/layouts/super-admin-layout";
import SuperAdminDashboard from "./pages/super-admin/dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          {/* User Dashboard */}
          <Route path="/" element={<UserDashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route path="admin" element={<AdminLayout />}>
          {/* Admin Dashboard */}
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Super Admin Routes */}
        <Route path="super-admin" element={<SuperAdminLayout />}>
          {/* Super Admin Dashboard */}
          <Route path="dashboard" element={<SuperAdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
