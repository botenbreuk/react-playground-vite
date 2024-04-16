import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Badge, Button, Nav, NavItem, NavLink, Popover, PopoverHeader } from 'reactstrap';
import { FINAL_FORM_PAGE_URL } from '../../../app/FinalForm/FinalFormPage';
import { FINAL_FORM_TOTP_FIELD_PAGE_URL } from '../../../app/FinalForm/TotpInput/TotpInputPage';
import { IconType } from '../../Icon/icon-types';
import Logo from '../../Logo/Logo';
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

export default function MenuLeft(props: Props) {
  const { isOpen, toggle } = props;

  const navLinks = links().map((link, index) => {
    return (
      <NavItem key={link.url}>
        <PopoverIcon id={`${index}`} title={link.label} isActive={!isOpen}>
          <NavLink to={link.url} tag={RRNavLink} end disabled={link.disabled}>
            {isOpen && `${link.label} `}
            {isOpen && link.badgeNumber && link.badgeNumber > 0 && (
              <Badge className="bg-danger" pill>
                {link.badgeNumber}
              </Badge>
            )}
            {link.icon && <Icon type={link.icon} />}
          </NavLink>
        </PopoverIcon>
      </NavItem>
    );
  });

  const className = classNames('menu-left', { closed: !isOpen });

  return (
    <div className={className}>
      <Icon
        type={isOpen ? 'bi-caret-left-fill' : 'bi-caret-right-fill'}
        className="toggle-menu-button"
        color="#244e9b"
        onClick={toggle}
      />

      <div className="menu-container">
        <div className="logo-wrapper">
          <Logo height={100} />
        </div>
        <div className="links-container">
          <Nav vertical className="text-end" pills>
            {navLinks.map(i => i)}
          </Nav>
        </div>
        <div className="footer">
          <Button color="link" className="text-white p-0">
            {isOpen ? 'About' : <Icon type="bi-question-circle-fill" />}
          </Button>
          <Button color="link" className="text-white p-0">
            {isOpen ? 'Contact' : <Icon type="bi-headset" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

function PopoverIcon({
  id,
  title,
  children,
  isActive
}: {
  id: string;
  title: string;
  children: ReactNode;
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);

  function toggle() {
    if (isActive) {
      setOpen(value => !value);
    }
  }

  return (
    <span>
      <div id={`Popover-${id}`} onMouseOver={toggle} onMouseOutCapture={toggle}>
        {children}
      </div>
      <Popover placement="right" isOpen={open} target={`Popover-${id}`} toggle={toggle}>
        <PopoverHeader>{title}</PopoverHeader>
      </Popover>
    </span>
  );
}
