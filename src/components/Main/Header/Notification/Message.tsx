import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import PenIcon from '@assets/images/pen-to-square-solid.svg';
import ArrowIcon from '@assets/images/arrow-up-right-dots-solid.svg';
import BullhornIcon from '@assets/images/bullhorn-solid.svg';
import BellIcon from '@assets/images/bell-regular.svg';
import elpasedTime from '@utils/elpasedTime';
import parseMarkdown from '@utils/parseMarkdown';

interface MessageProps extends Props {
  notification: Model.NotificationTable;
  index: number;
}

const Container = styled.button`
  ${flex('center', 'flex-start', true)}
  width: 100%;
  min-height: ${pxToRem(80)};
  padding: ${pxToRem(16)};
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.color.GRAY_LIGHT};
  }
`;

const Left = styled.div`
  width: ${pxToRem(36)};
  & svg {
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
    fill: ${({ theme }) => theme.color.TEAL_DARK};
  }
`;

const Right = styled.div`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const NotificationInfo = styled.div`
  ${flex()};
  margin-bottom: ${pxToRem(10)};
`;

const Title = styled.strong`
  flex: 1;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const Time = styled.time`
  color: ${({ theme }) => theme.color.GRAY};
  font-size: ${({ theme }) => theme.fontSize.custom('xs', -2)};
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.5;

  & span.md-block {
    padding: ${pxToRem(2, 4)};
    border-radius: ${pxToRem(3)};
    background-color: ${({ theme }) => theme.color.TEAL};
  }

  & span.md-bold {
    font-weight: 600;
  }
`;

const getIcon = (type: string) => {
  switch (type) {
    case 'edit':
    case 'suggestion':
      return PenIcon;
    case 'levelup':
      return ArrowIcon;
    case 'announce':
      return BullhornIcon;
    default:
      return BellIcon;
  }
};

function Message({
  notification: {
    notification_type: type,
    notification_title: title,
    notification_text: text,
    notification_link: link,
    created_time: time
  },
  index,
  className
}: MessageProps) {
  const Icon = getIcon(type);
  return (
    <li className={className} data-index={index}>
      <Container>
        <Left>
          <Icon />
        </Left>
        <Right>
          <NotificationInfo>
            <Title>{title}</Title>
            <Time>{elpasedTime(time)}</Time>
          </NotificationInfo>
          <Text dangerouslySetInnerHTML={{ __html: parseMarkdown(text) }} />
        </Right>
      </Container>
    </li>
  );
}

export default Message;
