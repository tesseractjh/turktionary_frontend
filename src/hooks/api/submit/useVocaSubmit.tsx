import vocaAPI from '@api/voca';
import useLanguage from '@hooks/useLanguage';
import {
  dictFormCountState,
  dictFormListState,
  dictFormState
} from '@recoil/dict';
import { useNavigate } from 'react-router-dom';
import { RecoilState, useRecoilCallback } from 'recoil';
import useMutationAPI from '../useMutationAPI';
import useMutationOnSuccess from '../useMutationOnSuccess';

interface UseVocaSumbitProps {
  isCreate?: boolean;
}

type State = { states: RecoilState<any>[] };

type MeaningList = (Model.POS & {
  meanings: (Model.Meaning & { examples: (Model.Example & State)[] } & State)[];
} & State)[];

const validateForm = (
  headword: string,
  etymology: string,
  synonyms: Model.Voca[],
  antonyms: Model.Voca[],
  cognates: Model.Voca[],
  meaningList: MeaningList
) => {
  const safeHeadword = headword.trim().slice(0, 255);
  const safeEtymology = etymology.trim().slice(0, 255);
  const safeSynonyms = synonyms
    .filter(({ voca_id }) => Number.isInteger(voca_id) && voca_id >= 0)
    .map(({ voca_id }) => voca_id);
  const safeAntonyms = antonyms
    .filter(({ voca_id }) => Number.isInteger(voca_id) && voca_id >= 0)
    .map(({ voca_id }) => voca_id);
  const safeCognates = cognates
    .filter(({ voca_id }) => Number.isInteger(voca_id) && voca_id >= 0)
    .map(({ voca_id }) => voca_id);
  const safeMeaningList = meaningList.map((pos) => ({
    ...pos,
    meanings: pos.meanings
      .map((meaning) => ({
        ...meaning,
        meaning_text: meaning.meaning_text.trim().slice(0, 255),
        examples: meaning.examples
          .map((example) => ({
            ...example,
            example_text: example.example_text.trim().slice(0, 255),
            example_translation: example.example_translation
              .trim()
              .slice(0, 255)
          }))
          .filter(({ example_text }) => example_text)
      }))
      .filter(({ meaning_text }) => meaning_text)
  }));

  let isValid = true;
  let errorMsg = '';

  if (!safeHeadword) {
    isValid = false;
    errorMsg = '표제어를 입력해주세요!';
  }

  if (
    !safeMeaningList.length ||
    safeMeaningList.every(({ meanings }) => !meanings.length)
  ) {
    isValid = false;
    errorMsg = '1개 이상의 뜻을 입력해주세요!';
  }

  return {
    isValid,
    errorMsg,
    safeHeadword,
    safeEtymology,
    safeSynonyms,
    safeAntonyms,
    safeCognates,
    safeMeaningList
  };
};

function useVocaSubmit({ isCreate }: UseVocaSumbitProps) {
  const { langId } = useLanguage();
  const navigate = useNavigate();
  const onSuccess = useMutationOnSuccess();

  const { mutate: createVoca, mutateAsync: createVocaAsync } = useMutationAPI(
    vocaAPI.createVoca
  );

  const handleClick = useRecoilCallback(({ snapshot, reset }) => async () => {
    const headwordState = dictFormState(`${langId}-voca-headword`);
    const headword = await snapshot.getPromise(headwordState);

    const etymologyState = dictFormState(`${langId}-voca-etymology`);
    const etymology = await snapshot.getPromise(etymologyState);

    const synonymState = dictFormListState(`voca-selection-${langId}-synonym`);
    const synonyms = await snapshot.getPromise(synonymState);
    const antonymState = dictFormListState(`voca-selection-${langId}-antonym`);
    const antonyms = await snapshot.getPromise(antonymState);
    const cognateState = dictFormListState(`voca-selection-${langId}-cognate`);
    const cognates = await snapshot.getPromise(cognateState);

    const posListState = dictFormListState(`${langId}-voca-pos`);
    const posList = await snapshot.getPromise(posListState);

    const meaningList = (
      await Promise.all(
        posList.map(async (posId) => {
          const meaningCountState = dictFormCountState(
            `${langId}-voca-pos-${posId}`
          );
          const meaningCount = await snapshot.getPromise(meaningCountState);

          if (!meaningCount) {
            return null;
          }

          const meanings = await Promise.all(
            [...Array(meaningCount)].map(async (_, meaningIndex) => {
              const meaningState = dictFormState(
                `${langId}-voca-pos-${posId}-meaning-${meaningIndex + 1}`
              );
              const exampleCountState = dictFormCountState(
                `${langId}-voca-pos-${posId}-meaning-${meaningIndex + 1}`
              );

              const meaning = await snapshot.getPromise(meaningState);
              const exampleCount = await snapshot.getPromise(exampleCountState);
              const examples = (
                await Promise.all(
                  [...Array(exampleCount)].map(async (_, exampleIndex) => {
                    const exampleTextState = dictFormState(
                      `${langId}-voca-pos-${posId}-meaning-${
                        meaningIndex + 1
                      }-example-text-${exampleIndex + 1}`
                    );
                    const exampleTranslationState = dictFormState(
                      `${langId}-voca-pos-${posId}-meaning-${
                        meaningIndex + 1
                      }-example-translation-${exampleIndex + 1}`
                    );

                    const exampleText = await snapshot.getPromise(
                      exampleTextState
                    );

                    if (!exampleText) {
                      return null;
                    }

                    const exampleTranslation = await snapshot.getPromise(
                      exampleTranslationState
                    );

                    return {
                      example_text: exampleText,
                      example_translation: exampleTranslation,
                      states: [exampleTextState, exampleTranslationState]
                    };
                  })
                )
              ).filter(Boolean);

              return {
                meaning_text: meaning,
                examples,
                states: [meaningState, exampleCountState]
              };
            })
          );
          return { pos_id: posId, meanings, states: [meaningCountState] };
        })
      )
    ).filter(Boolean);

    const {
      isValid,
      errorMsg,
      safeHeadword,
      safeEtymology,
      safeSynonyms,
      safeAntonyms,
      safeCognates,
      safeMeaningList
    } = validateForm(
      headword,
      etymology,
      synonyms,
      antonyms,
      cognates,
      meaningList as MeaningList
    );

    if (!isValid) {
      alert(errorMsg);
      return;
    }

    if (isCreate) {
      createVoca(
        {
          body: {
            voca: {
              lang_name: langId,
              headword: safeHeadword,
              etymology: safeEtymology
            },
            synonyms: safeSynonyms,
            antonyms: safeAntonyms,
            cognates: safeCognates,
            meaningList: safeMeaningList
          }
        },
        {
          onSuccess: async (data, variables) => {
            await onSuccess(data, variables, createVocaAsync, () => {
              [
                headwordState,
                etymologyState,
                synonymState,
                antonymState,
                cognateState,
                dictFormListState(`${langId}-voca-selected-pos`)
              ].forEach((state) => reset(state));
              meaningList.forEach((pos) => {
                pos?.states.forEach((state) => reset(state));
                pos?.meanings?.forEach((meaning) => {
                  meaning?.states.forEach((state) => reset(state));
                  meaning?.examples?.forEach((example) => {
                    example?.states.forEach((state) => reset(state));
                  });
                });
              });
              alert('정상적으로 제출되었습니다!');
              navigate(`/${langId}`);
            });
          }
        }
      );
    }
  });

  return handleClick;
}

export default useVocaSubmit;
