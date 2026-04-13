import { clsx } from 'clsx';
import { NavLink as RRNavLink } from 'react-router';
import { Badge, Nav, NavItem, NavLink } from 'reactstrap';
import { toContact } from '../../../app/Contact/ContactPage';
import { FINAL_FORM_PAGE_URL } from '../../../app/FinalForm/FinalFormPage';
import { FINAL_FORM_TOTP_FIELD_PAGE_URL } from '../../../app/FinalForm/TotpInput/TotpInputPage';
import { IconType } from '../../Icon/icon-types';
import { Icon } from '../../index';

type MenuLink = {
  icon: IconType;
  url: string;
  label: string;
  badgeNumber?: number;
  disabled?: boolean;
};

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

/*
  Defines all the links of the application.
  When the roles are empty they are considered public.
*/
const links = (): MenuLink[] => [
  {
    icon: 'bi-house',
    url: '/',
    label: 'Home',
    badgeNumber: 42
  },
  {
    icon: 'bi-card-list',
    url: '/cards',
    label: 'Cards example'
  },
  {
    icon: 'bi-card-image',
    url: '/cards/big',
    label: 'Card Big example'
  },
  {
    icon: 'bi-shuffle',
    url: '/shuffle',
    label: 'Shuffle'
  },
  {
    icon: 'bi-arrow-counterclockwise',
    url: '/dnd',
    label: 'Drag and Drop'
  },
  {
    icon: 'bi-boxes',
    url: '/dnd-sort',
    label: 'Drag and Drop - sort'
  },
  {
    icon: 'bi-clipboard-data',
    url: FINAL_FORM_PAGE_URL,
    label: 'Final form'
  },
  {
    icon: 'bi-clipboard-data',
    url: FINAL_FORM_TOTP_FIELD_PAGE_URL,
    label: 'Final form TOTP'
  },
  {
    icon: 'bi-table',
    url: '/table',
    label: 'Advanced table'
  },
  {
    icon: 'bi-lock',
    url: '/disabled',
    label: 'Disabled Link',
    disabled: true
  }
];

export function MenuLeft(props: Props) {
  const { isOpen, toggle } = props;

  const navLinks = links().map(link => (
    <NavItem key={link.url} className="sidebar-nav-item">
      <NavLink to={link.url} tag={RRNavLink} end disabled={link.disabled}>
        <Icon type={link.icon} />
        <span className="nav-label">{link.label}</span>
        {link.badgeNumber && link.badgeNumber > 0 && (
          <Badge className="bg-danger ms-auto" pill>
            {link.badgeNumber}
          </Badge>
        )}
      </NavLink>
      <span className="nav-tooltip">{link.label}</span>
    </NavItem>
  ));

  return (
    <div className={clsx('menu-left', { closed: !isOpen })}>
      <div className="menu-container">
        <div className="sidebar-header">
          <span className="brand-text">Playground</span>
          <button
            className="toggle-sidebar-btn"
            onClick={toggle}
            aria-label="Toggle sidebar"
          >
            <Icon type={isOpen ? 'bi-chevron-double-left' : 'bi-chevron-double-right'} />
          </button>
        </div>
        <div className="links-container">
          <Nav vertical pills>
            {navLinks}
          </Nav>
        </div>
        <div className="footer">
          <NavLink to="#" tag={RRNavLink} className="footer-btn">
            <Icon type="bi-question-circle" />
            <span className="nav-label">About</span>
          </NavLink>
          <NavLink to={toContact()} tag={RRNavLink} className="footer-btn">
            <Icon type="bi-headset" />
            <span className="nav-label">Contact</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
