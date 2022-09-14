import { useEffect, useState } from 'react';
import userAPI from '@api/user';
import notificationAPI from '@api/notification';
import useAPI from '@hooks/useAPI';
import useAccessToken from '@hooks/useAccessToken';

const useLogin = () => {
  const [user, setUser] = useState<Partial<Model.User>>({
    user_name: '',
    user_exp: 0
  });
  const [notification, setNotification] = useState([]);
  const accessToken = useAccessToken();
  const { refetch: getUserInfo } = useAPI(
    'getHeaderUserInfo',
    userAPI.getHeaderUserInfo,
    {
      enabled: false
    }
  );
  const { refetch: getNotification } = useAPI(
    'getNotification',
    notificationAPI.getNotification,
    {
      enabled: false
    }
  );

  useEffect(() => {
    if (accessToken) {
      (async () => {
        const [{ data: userInfo }, { data: userNotification }] =
          await Promise.all([getUserInfo(), getNotification()]);
        if (userInfo) {
          const { user } = userInfo;
          setUser(user);
        }
        if (notification) {
          const { notification } = userNotification;
          setNotification(notification);
        }
      })();
    }
  }, [accessToken]);

  return [user, notification] as [Partial<Model.User>, never[]];
};

export default useLogin;
