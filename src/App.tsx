import React from "react";
import { Outlet } from "react-router-dom";
import { checkRedirect } from '@utils/index'
import storage from '@utils/storage'

const App: React.FC<any> = () => {
  const isLogin = storage.get('userInfo')?.id;
  if (!isLogin) {
    checkRedirect();
    return <></>
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
