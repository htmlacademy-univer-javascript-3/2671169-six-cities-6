import { Link } from 'react-router-dom';
import './not-found-screen.css';

export default function NotFoundScreen() {
  return (
    <div className="not_found">
      <h1>404</h1>
      <span>Not Found</span>

      <Link to={'/'} className="back">
                Back to home page
      </Link>
    </div>
  );
}
