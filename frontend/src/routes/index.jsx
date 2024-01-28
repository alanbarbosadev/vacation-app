import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Auth from "../pages/Auth";
import Vacation from "../pages/Vacation";
import VacationRegister from "../pages/Vacation/components/VacationRegister";
import VacationEdit from "../pages/Vacation/components/VacationEdit";
import HomePage from "../pages/Layout/HomePage";
import UsersList from "../pages/Admin/Users/UsersList";

let router = createBrowserRouter([
  {
    path: "/auth/:operation",
    element: <Auth />,
  },
  {
    path: "/vacations",
    element: <Vacation />,
  },
  {
    path: "/register-vacation",
    element: <VacationRegister />,
  },
  {
    path: "/vacations/:vacationId/edit",
    element: <VacationEdit />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/users",
    element: <UsersList />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
