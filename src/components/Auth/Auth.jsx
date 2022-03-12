import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth(props) {
  const { roles } = props;
  const user = JSON.parse(localStorage.getItem('flash-card-user'));

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  if (!roles.includes(user?.role)) {
    return null;
  }

  return props.children;
}

export default Auth;
