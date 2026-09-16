import { useState } from "react";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Connectors from "./pages/Connectors";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  function renderPage() {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;

      case "Schedule":
        return <Schedule />;

      case "Connectors":
        return <Connectors />;

      default:
        return <Dashboard />;
    }
  }

  return (
    <div
      className="
        min-h-screen
        bg-[linear-gradient(45deg,#FFCF68_0%,#D8D2C9_40%,#E4E0E0_70%,#E4E0E0_100%)]
      "
    >
      <Layout
        activePage={activePage}
        setActivePage={setActivePage}
      >
        {renderPage()}
      </Layout>
    </div>
  );
}

export default App;