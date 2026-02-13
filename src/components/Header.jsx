import { useState } from 'react';

const PROJECTS = [
  { id: '1', name: '대산-당진 고속도로' },
  { id: '2', name: '기타 프로젝트' },
];

function Header() {
  const [selected, setSelected] = useState(PROJECTS[0]);
  const [open, setOpen] = useState(false);

  return (
    <header className="sidebar-header">
      <div className="sidebar-brand">
        <span className="sidebar-logo" aria-hidden>D</span>
        <span className="sidebar-title">DOMAINER</span>
      </div>
      <div className="sidebar-dropdown-wrap">
        <button
          type="button"
          className="sidebar-dropdown"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label="프로젝트 선택"
        >
          <span className="sidebar-dropdown-label">{selected.name}</span>
          <span className="sidebar-dropdown-caret" aria-hidden>▼</span>
        </button>
        {open && (
          <ul
            className="sidebar-dropdown-menu"
            role="listbox"
            aria-label="프로젝트 목록"
          >
            {PROJECTS.map((p) => (
              <li key={p.id} role="option" aria-selected={selected.id === p.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(p);
                    setOpen(false);
                  }}
                >
                  {p.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
