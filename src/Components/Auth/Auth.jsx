import React, { useContext } from 'react';
import { When } from 'react-if';
import { AuthContext } from '../../Context/Auth';

function Auth({ capability, children }) {
  const context = useContext(AuthContext);
  const isLoggedIn = context.loggedIn;
  const canDo = capability ? context.can(capability) : true;
  const okToRender = isLoggedIn && canDo;

  return <When condition={okToRender}>{children}</When>;
}

export default Auth;
