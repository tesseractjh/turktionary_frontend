import { Link, useLocation } from 'react-router-dom';
import posAPI from '@api/pos';
import useAPI from '@hooks/useAPI';
import DictContentContainer from '@components/common/DictContentContainer';
import POSItem from './POSItem';
import styled from '@emotion/styled';
import useLanguage from '@hooks/useLanguage';

const HeaderButton = styled(Link)`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.BLACK};

  &:hover {
    text-decoration: underline;
  }
`;

function POSList() {
  const { langId, langName } = useLanguage();
  const { data } = useAPI(['posList', langId], posAPI.getPosList);

  return (
    <DictContentContainer
      title={`${langName} 품사`}
      buttons={<HeaderButton to="create">품사 추가</HeaderButton>}
    >
      {data?.map(
        ({ pos_name, pos_text, pos_order, examples, example_orders }) => {
          return (
            <POSItem
              key={`${langId}-pos-${pos_order}`}
              title={pos_name}
              text={pos_text}
              order={pos_order}
              examples={examples.filter(Boolean) as string[]}
              exampleOrders={example_orders.filter(Boolean) as number[]}
            />
          );
        }
      )}
    </DictContentContainer>
  );
}

export default POSList;
