import { Navigate } from 'react-router';

interface ProtectedRouteElementProps {
  statement: boolean;
  redirect: string;
  children: React.ReactElement;
}

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({
  statement,
  children,
  redirect,
}) => (statement ? children : <Navigate to={redirect} />);

export default ProtectedRouteElement;
