import { Outlet } from "react-router-dom";

const SuperAdminLayout = () => {
  return (
    <div>
      <div></div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdminLayout;
