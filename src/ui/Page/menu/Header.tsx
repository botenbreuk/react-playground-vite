import { MenuRight } from './MenuRight';

type Props = {
  title?: string;
};

export function Header(props: Props) {
  const { title } = props;

  return (
    <div className="header-bar">
      <span className="header-title">{title}</span>
      <div className="header-actions">
        <button className="header-icon-btn" aria-label="Notifications">
          <i className="bi bi-bell" />
          <span className="notification-dot" />
        </button>
        <MenuRight />
      </div>
    </div>
  );
}
