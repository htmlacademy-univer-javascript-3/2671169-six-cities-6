import { Outlet } from 'react-router-dom';
import Header from '../header/header';

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
