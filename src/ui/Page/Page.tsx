import { ReactNode, useState } from 'react';
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

  const [isOpen, setIsOpen] = useState(true);
  const isScrolled = useIsScrolled();

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="container-page bg-dark">
      <MenuLeft isOpen={isOpen} toggle={toggle} />
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
