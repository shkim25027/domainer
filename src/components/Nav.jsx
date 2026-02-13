import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// 단일 메뉴 (아이콘 + 라벨)
const TOP_MENUS = [
  { path: '/', label: '보상현황', icon: 'doc' },
  { path: '/compensation', label: '보상관리', icon: 'grid' },
  { path: '/complaint', label: '민원관리', icon: 'user' },
  { path: '/map', label: '지도[위치기반]', icon: 'map' },
  { path: '/data', label: '자료관리', icon: 'folder' },
  { path: '/standards', label: '보상기준·절차', icon: 'search' },
];

// 확장 메뉴: 프로젝트 관리
const PROJECT_MENU_ID = 'project-management';
const PROJECT_SUBMENUS = [
  { path: '/project/info', label: '사업정보 관리' },
  { path: '/project/client', label: '발주처 관리' },
  { path: '/project/section', label: '공구 관리' },
  { path: '/project/survey', label: '조사업체 관리' },
  { path: '/project/consultation', label: '협의기관 관리' },
];

const ICONS = {
  doc: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  grid: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  user: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  map: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  ),
  folder: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <line x1="9" y1="14" x2="15" y2="14" />
    </svg>
  ),
  search: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

function Nav() {
  const [projectOpen, setProjectOpen] = useState(true);
  const location = useLocation();

  const isProjectActive = PROJECT_SUBMENUS.some(
    (s) => location.pathname === s.path || location.pathname.startsWith(s.path + '/')
  );

  return (
    <div className="sidebar-body">
      <nav className="sidebar-nav" aria-label="주요 메뉴">
        <ul className="sidebar-menu">
          {TOP_MENUS.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`sidebar-menu-link ${location.pathname === item.path ? 'is-active' : ''}`}
              >
                <span className="sidebar-menu-icon">{ICONS[item.icon]}</span>
                <span className="sidebar-menu-label">{item.label}</span>
              </Link>
            </li>
          ))}

          <li className={`sidebar-menu-group ${projectOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              className={`sidebar-menu-link sidebar-menu-link--expand ${isProjectActive ? 'is-active' : ''}`}
              onClick={() => setProjectOpen((v) => !v)}
              aria-expanded={projectOpen}
              aria-controls={PROJECT_MENU_ID}
            >
              <span className="sidebar-menu-icon">{ICONS.settings}</span>
              <span className="sidebar-menu-label">프로젝트 관리</span>
              <span className="sidebar-menu-caret" aria-hidden>{projectOpen ? '▲' : '▼'}</span>
            </button>
            <ul
              id={PROJECT_MENU_ID}
              className="sidebar-submenu"
              hidden={!projectOpen}
            >
              {PROJECT_SUBMENUS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`sidebar-submenu-link ${location.pathname === item.path ? 'is-active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>

      <div className="sidebar-user">
        <div className="sidebar-user-avatar" aria-hidden />
        <div className="sidebar-user-info">
          <span className="sidebar-user-name">김형수 과장</span>
          <span className="sidebar-user-org">서산아산건설사업단</span>
        </div>
        <button type="button" className="sidebar-user-settings" aria-label="설정">
          {ICONS.settings}
        </button>
      </div>
    </div>
  );
}

export default Nav;
