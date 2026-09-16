import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Connectors from "./pages/Connectors";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "schedule", element: <Schedule /> },
      { path: "connectors", element: <Connectors /> },
    ],
  },
]);
function App() {
  return (
    <div
      className="
        min-h-screen
        bg-[linear-gradient(45deg,#FFCF68_0%,#D8D2C9_40%,#E4E0E0_70%,#E4E0E0_100%)]
      "
    >
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
