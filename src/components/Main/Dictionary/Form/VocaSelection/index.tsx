import { ChangeEvent, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import {
  dictFormListState,
  dictFormState,
  dictFormTimerIdState
} from '@recoil/dict';
import vocaAPI from '@api/voca';
import useLanguage from '@hooks/useLanguage';
import useAPIWithToken from '@hooks/api/useAPIWithToken';
import pxToRem from '@utils/pxToRem';
import debounce from '@utils/debounce';
import { LANG_MAP } from '@constants/language';
import VocaLink from '@components/common/VocaLink';
import ComboBox from '@components/common/ComboBox';
import Flag from '@components/common/Flag';

interface VocaSelectionProps {
  id: string;
  label: string;
  findAll?: boolean;
}

const FlagWrapper = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 10px;

  & svg {
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  padding: ${pxToRem(10)};
`;

const Label = styled.label`
  display: inline-block;
  margin-bottom: ${pxToRem(10)};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.md};

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const SelectionWrapper = styled.div`
  position: relative;
  ${flex('flex-start')}
`;

const SelectedVocaList = styled.ul`
  ${flex('flex-start')}
  flex-wrap: wrap;
  gap: ${pxToRem(10, 20)};
  margin-top: ${pxToRem(10)};
`;

function VocaSelection({ id, label, findAll }: VocaSelectionProps) {
  const { langId } = useLanguage();
  const inputId = `voca-selection-${langId}-${id}`;
  const comboBoxId = `voca-combo-box-${langId}-${id}`;

  const [timerId, setTimerId] = useRecoilState(dictFormTimerIdState(inputId));
  const [inputState, setInputState] = useRecoilState(dictFormState(inputId));
  const [searchedVocaListState, setSearchedVocaListState] = useRecoilState(
    dictFormListState(comboBoxId)
  );
  const [vocaListState, setVocaListState] = useRecoilState(
    dictFormListState(inputId)
  );

  const params = findAll
    ? { langId, keyword: inputState, isLangExcluded: true }
    : { langId, keyword: inputState };

  const { refetch } = useAPIWithToken(
    ['vocaSelection', params],
    vocaAPI.getVocaList,
    { enabled: false }
  );

  const handleInputChange = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
      const { value } = currentTarget;
      setInputState(value);
      const inputValue = value.trim().slice(0, 255);

      if (!inputValue) {
        setSearchedVocaListState([]);
        return;
      }

      debounce(
        timerId,
        setTimerId,
        async () => {
          const { data } = await refetch();
          if (data) {
            setSearchedVocaListState(data);
          }
        },
        250
      )();
    },
    [timerId]
  );

  const selectionListCallback = useCallback(
    (Item: (props: any) => JSX.Element, props?: Record<string, any>) =>
      (selection: Model.Voca) => {
        const { voca_id, lang_name, headword, voca_order } = selection;
        return (
          <Item
            {...props}
            key={voca_id}
            onClick={props?.handleClick?.({ lang_name, headword, voca_order })}
          >
            <FlagWrapper>
              <Flag nation={LANG_MAP[lang_name].type} />
            </FlagWrapper>

            {headword}
            {voca_order > 1 ? <sup>{voca_order}</sup> : null}
          </Item>
        );
      },
    []
  );

  const handleDelete = useCallback(
    ({ lang_name, headword, voca_order }: Model.Voca) =>
      () => {
        setVocaListState((state) => {
          const index = state.findIndex(
            ({
              lang_name: prevLangName,
              headword: prevHeadword,
              voca_order: prevVocaOrder
            }) =>
              lang_name === prevLangName &&
              headword === prevHeadword &&
              voca_order === prevVocaOrder
          );

          if (index >= 0) {
            const newState = [...state];
            newState.splice(index, 1);
            return newState;
          }

          return state;
        });
      },
    []
  );

  return (
    <Container>
      <Label htmlFor={inputId}>{label}</Label>
      <SelectionWrapper>
        <ComboBox
          id={inputId}
          selectionList={searchedVocaListState}
          selectionListCallback={selectionListCallback}
          placeholder="표제어 검색"
          handleChange={handleInputChange}
        />
      </SelectionWrapper>
      {vocaListState.length ? (
        <SelectedVocaList>
          {vocaListState.map((voca) => (
            <VocaLink
              key={`selected-voca-${voca.lang_name}-${voca.headword}-${voca.voca_order}`}
              langId={voca.lang_name}
              headword={voca.headword}
              vocaOrder={voca.voca_order}
              backgroundColor="GRAY_DARK"
              hoverBackgroundColor="GRAY"
              handleDelete={handleDelete}
              useFlag
              useDeleteButton
            />
          ))}
        </SelectedVocaList>
      ) : null}
    </Container>
  );
}

export default VocaSelection;
