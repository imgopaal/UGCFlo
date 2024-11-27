import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export function BackButton() {
  return (
    <Link to="/flos" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
      <BsArrowLeft className="w-5 h-5 mr-2" />
      Back to Flos
    </Link>
  );
}