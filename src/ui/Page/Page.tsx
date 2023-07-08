import { ReactNode } from 'react';
import { setMenuOpen, useUserSettings } from '../../context/SettingsContext';
import useIsScrolled from '../../hooks/useIsScrolled/useIsScrolled';
import { Icon } from '../index';
import Header from './menu/Header';
import MenuLeft from './menu/MenuLeft';

interface Props {
  title?: string;
  filter?: ReactNode;
  children?: ReactNode | ReactNode[];
  scrollToTop?: boolean;
}

export default function Page(props: Props) {
  const { title, filter, children, scrollToTop = false } = props;

  const [{ menuOpen }, dispatch] = useUserSettings();
  const isScrolled = useIsScrolled();

  function toggle() {
    dispatch(setMenuOpen(!menuOpen));
  }

  return (
    <div className="container-page bg-dark">
      <MenuLeft isOpen={menuOpen} toggle={toggle} />
      <div className="page-content">
        <div className="navbars">
          <Header title={title} />
          {filter && <div className="filter-bar">{filter}</div>}
        </div>
        <div className="main-content">{children}</div>
        {isScrolled && scrollToTop && (
          <Icon
            className="scroll-to-top"
            type="bi-arrow-up-circle-fill"
            color="white"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        )}
      </div>
    </div>
  );
}
