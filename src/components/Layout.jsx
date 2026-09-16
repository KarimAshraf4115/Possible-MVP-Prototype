import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({children,activePage,setActivePage,}){
  return (
    <div className="min-h-screen flex overflow-hidden">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="flex-1 min-w-0 flex flex-col">

        <Navbar />

        <main className="flex-1 px-5 pb-6 overflow-auto">
          {children}
        </main>

      </div>
    </div>
  );
}

export default Layout;