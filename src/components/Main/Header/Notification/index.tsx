import { MouseEventHandler, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import notificationAPI from '@api/notification';
import useMutationAPI from '@hooks/useMutationAPI';
import PopupContainer from '@components/common/PopupContainer';
import Message from './Message';

interface NotificationProps {
  notifications: Model.NotificationTable[];
  handleDocumentClick: (event: MouseEvent) => void;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  hidden: boolean;
}

const ButotnWrapper = styled.div`
  width: 100%;
  text-align: right;
`;

const DeleteButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.WHITE};

  &:hover {
    text-decoration: underline;
  }

  @media ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const MessageList = styled.ul`
  & li {
    border-bottom: ${border()} ${({ theme }) => theme.color.BORDER};
  }
`;

const NoMessage = styled.div`
  ${flex()};
  width: 100%;
  height: 100%;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.GRAY};

  @media ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
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
    <PopupContainer
      id="popup-notification"
      className="popup-notification"
      role="menu"
      hidden={hidden}
      setHidden={setHidden}
      handleDocumentClick={handleDocumentClick}
      aria-labelledby="btn-notification-popup"
      topContent={
        <ButotnWrapper>
          <DeleteButton onClick={handleDelete}>
            모든 알림 읽음 표시
          </DeleteButton>
        </ButotnWrapper>
      }
    >
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
    </PopupContainer>
  );
}

export default Notification;
