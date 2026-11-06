import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Tick monitor</h2>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-heading">WORKSPACE</p>

        <a href="#dashboard" className="nav-link active">
          Dashboard
        </a>

        <a href="#learn" className="nav-link">
          Learn
        </a>

        <a href="#report" className="nav-link">
          Report a Sighting
        </a>

        <a href="#about" className="nav-link">
          About
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;