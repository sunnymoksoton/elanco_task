import "./Sidebar.css";

export type Page = "dashboard" | "learn" | "report" | "about";

interface SidebarProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
}

function Sidebar({ activePage, onPageChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Tick monitor</h2>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-heading">WORKSPACE</p>

        <button
          className={`nav-link ${activePage === "dashboard" ? "active" : ""}`}
          onClick={() => onPageChange("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={`nav-link ${activePage === "learn" ? "active" : ""}`}
          onClick={() => onPageChange("learn")}
        >
          Education
        </button>

        <button
          className={`nav-link ${activePage === "report" ? "active" : ""}`}
          onClick={() => onPageChange("report")}
        >
          Report a Sighting
        </button>

        <button
          className={`nav-link ${activePage === "about" ? "active" : ""}`}
          onClick={() => onPageChange("about")}
        >
          About
        </button>
      </nav>
    </aside>
  );
}


export default Sidebar;