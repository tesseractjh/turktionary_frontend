import { MouseEventHandler, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import notificationAPI from '@api/notification';
import useMutationAPI from '@hooks/useMutationAPI';
import pxToRem from '@utils/pxToRem';
import Message from './Message';

interface NotificationProps {
  notifications: Model.NotificationTable[];
  handleDocumentClick: (event: MouseEvent) => void;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  hidden: boolean;
}

const Container = styled.div<{ hidden: boolean }>`
  ${flex('center', 'stretch')}
  ${({ hidden }) => (hidden ? 'display: none;' : '')}
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  top: ${pxToRem(64)};
  right: 0;
  z-index: 10;
  width: ${pxToRem(360)};
  max-height: ${pxToRem(400)};
  border: ${border()} ${({ theme }) => theme.color.BORDER};
  border-radius: ${pxToRem(10)};
  box-shadow: 0 7px 20px rgb(0 0 0 / 17%);
  background-color: ${({ theme }) => theme.color.WHITE};
`;

const Top = styled.div`
  ${flex('flex-end')}
  height: ${pxToRem(36)};
  padding: ${pxToRem(0, 10)};
  background-color: ${({ theme }) => theme.color.TEAL_DARK};
  text-align: right;
`;

const DeleteButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.WHITE};

  &:hover {
    text-decoration: underline;
  }
`;

const Bottom = styled.div`
  overflow-x: none;
  overflow-y: auto;
  height: ${pxToRem(364)};

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: ${({ theme }) => theme.color.GRAY};
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.color.BORDER};
  }
`;

const MessageList = styled.ul`
  & li:not(:last-of-type) {
    border-bottom: ${border()} ${({ theme }) => theme.color.BORDER};
  }
`;

const NoMessage = styled.div`
  ${flex()};
  width: 100%;
  height: 100%;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.GRAY};
`;

function Notification({
  notifications,
  handleDocumentClick,
  setHidden,
  hidden
}: NotificationProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deleteNotification } = useMutationAPI(
    notificationAPI.deleteNotification
  );
  const { mutate: deleteAllNotifiation } = useMutationAPI(
    notificationAPI.deleteAllNotification
  );

  useEffect(() => {
    if (hidden) {
      document.removeEventListener('click', handleDocumentClick);
    } else {
      document.addEventListener('click', handleDocumentClick);
    }
  }, [hidden]);

  const handleMessageClick = useCallback<MouseEventHandler<HTMLUListElement>>(
    async ({ target }) => {
      const msg = (target as HTMLElement).closest('.notification-msg');
      if (msg) {
        const index = (msg as HTMLElement).dataset.index as unknown as number;
        const { notification_id, notification_link } = notifications[index];
        deleteNotification(
          { query: { notification_id } },
          {
            onSuccess: () => {
              navigate(notification_link);
              setHidden(true);
              queryClient.invalidateQueries(['getNotification']);
            }
          }
        );
      }
    },
    [notifications]
  );

  const handleDelete = useCallback(async () => {
    if (!notifications.length) {
      return;
    }

    deleteAllNotifiation(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['getNotification']);
        }
      }
    );
  }, [notifications]);

  return (
    <Container hidden={hidden} className="notification">
      <Top>
        <DeleteButton onClick={handleDelete}>모든 알림 읽음 표시</DeleteButton>
      </Top>
      <Bottom>
        {notifications.length ? (
          <MessageList onClick={handleMessageClick}>
            {notifications.map((notification, index) => (
              <Message
                key={notification.notification_id}
                notification={notification}
                index={index}
                className="notification-msg"
              />
            ))}
          </MessageList>
        ) : (
          <NoMessage>새로운 알림이 없습니다</NoMessage>
        )}
      </Bottom>
    </Container>
  );
}

export default Notification;
