import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

interface ProtectedRouteElementProps extends PropsWithChildren {
  statement: boolean;
  redirect: string;
}

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({
  statement,
  children,
  redirect,
}) => (statement ? children : <Navigate to={redirect} />);

export default ProtectedRouteElement;
