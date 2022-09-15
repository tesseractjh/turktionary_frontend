import { useEffect, useState } from 'react';
import userAPI from '@api/user';
import notificationAPI from '@api/notification';
import useAPI from '@hooks/useAPI';
import useAccessToken from '@hooks/useAccessToken';

const useLogin = () => {
  const accessToken = useAccessToken();
  const { data: user } = useAPI(
    'getHeaderUserInfo',
    userAPI.getHeaderUserInfo,
    {
      enabled: !!accessToken
    }
  );
  const { data: notification } = useAPI(
    'getNotification',
    notificationAPI.getNotification,
    {
      enabled: !!accessToken
    }
  );

  return [user, notification] as const;
};

export default useLogin;
