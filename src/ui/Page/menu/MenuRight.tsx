import { clsx } from 'clsx';
import { useState } from 'react';
import { NavLink as RRNavLink } from 'react-router';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { SETTINGS_PAGE_URL } from '../../../app/Settings/SettingsPage';

export function MenuRight() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(current => !current);
  }

  return (
    <>
      <button className="user-avatar-btn" onClick={toggle} aria-label="Open account menu">
        <span className="user-avatar">RB</span>
      </button>

      <div className={clsx('menu-right-overlay', { 'is-open': isOpen })}>
        <div className="menu-right-backdrop" onClick={toggle} />
        <aside className="menu-right">
          <div className="menu-right-header">
            <span className="menu-right-title">Account</span>
            <button
              className="menu-right-close"
              onClick={toggle}
              aria-label="Close panel"
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>
          <div className="menu-right-user">
            <div className="menu-right-avatar">RB</div>
            <p className="menu-right-name">Username</p>
            <p className="menu-right-email">user@example.com</p>
            <span className="menu-right-role">Admin</span>
          </div>
          <Nav vertical className="menu-right-nav">
            <NavItem>
              <NavLink to="/change-password" tag={RRNavLink}>
                <i className="bi bi-person" /> Change Password
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={SETTINGS_PAGE_URL} tag={RRNavLink}>
                <i className="bi bi-gear" /> Settings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/logout" tag={RRNavLink}>
                <i className="bi bi-question-circle" /> Help &amp; Support
              </NavLink>
            </NavItem>
          </Nav>
          <div className="menu-right-footer">
            <button className="menu-right-logout">
              <i className="bi bi-box-arrow-right" /> Sign out
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
