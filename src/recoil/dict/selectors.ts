import { selectorFamily } from 'recoil';
import { dictFormCountState, dictFormListState, dictFormState } from './atoms';

export const meaningListState = selectorFamily<any[], string>({
  key: 'meaningListState',
  get:
    (id) =>
    ({ get }) => {
      const count = get(dictFormCountState(id));
      return [...Array(count)].map((_, index) =>
        get(dictFormState(`${id}-meaning-${index + 1}`))
      );
    },
  set:
    (id) =>
    ({ get, set, reset }, value) => {
      const [action, order, langId] = value as [string, number, string];
      const count = get(dictFormCountState(id));
      switch (action) {
        case 'DELETE':
          {
            for (let i = order; i <= count; i++) {
              const meaningId = `${id}-meaning-${i + 1}`;
              const meaning = get(dictFormState(meaningId));

              const deletedExampleCount = get(
                dictFormCountState(`${id}-meaning-${i}`)
              );
              // 삭제된 meaning의 모든 example 초기화
              for (let j = 1; j <= deletedExampleCount; j++) {
                reset(dictFormState(`${id}-meaning-${i}-example-text-${j}`));
                reset(
                  dictFormState(`${id}-meaning-${i}-example-translation-${j}`)
                );
              }

              const exampleCount = get(dictFormCountState(meaningId));
              // 삭제된 meaning의 다음 순서의 meaning의 example을 앞으로 당김
              for (let j = 1; j <= exampleCount; j++) {
                const text = get(
                  dictFormState(`${meaningId}-example-text-${j}`)
                );
                const translation = get(
                  dictFormState(`${meaningId}-example-translation-${j}`)
                );
                set(
                  dictFormState(`${id}-meaning-${i}-example-text-${j}`),
                  text
                );
                set(
                  dictFormState(`${id}-meaning-${i}-example-translation-${j}`),
                  translation
                );
                reset(dictFormState(`${meaningId}-example-text-${j}`));
                reset(dictFormState(`${meaningId}-example-translation-${j}`));
              }

              set(dictFormState(`${id}-meaning-${i}`), meaning);
              // 삭제된 meaning 순서의 example count를 바뀐 개수로 갱신
              set(dictFormCountState(`${id}-meaning-${i}`), exampleCount);
              reset(dictFormState(meaningId));
            }
            if (count === 1) {
              const posId = Number(id.split('-')[3]);
              const posList = get(
                dictFormListState(`${langId}-voca-selected-pos`)
              );
              const newPosList = [
                ...posList
                  .filter(({ pos_id }) => pos_id !== posId)
                  .map((pos) => ({ ...pos }))
              ];
              set(dictFormListState(`${langId}-voca-selected-pos`), newPosList);
            }
            set(dictFormCountState(id), (state) => (state > 1 ? state - 1 : 1));
          }
          break;
        case 'SWITCH':
          {
            const [order1, order2] = [order - 1, order];
            const id1 = `${id}-meaning-${order1}`;
            const id2 = `${id}-meaning-${order2}`;

            const meaning1 = get(dictFormState(id1));
            const meaning2 = get(dictFormState(id2));
            set(dictFormState(id1), meaning2);
            set(dictFormState(id2), meaning1);

            const exampleCount1 = get(dictFormCountState(id1));
            const exampleCount2 = get(dictFormCountState(id2));
            const examples1 = [...Array(exampleCount1)].map((_, index) => {
              const text = get(
                dictFormState(`${id1}-example-text-${index + 1}`)
              );
              const translation = get(
                dictFormState(`${id1}-example-translation-${index + 1}`)
              );
              reset(dictFormState(`${id1}-example-text-${index + 1}`));
              reset(dictFormState(`${id1}-example-translation-${index + 1}`));
              return { text, translation };
            });
            const examples2 = [...Array(exampleCount2)].map((_, index) => {
              const text = get(
                dictFormState(`${id2}-example-text-${index + 1}`)
              );
              const translation = get(
                dictFormState(`${id2}-example-translation-${index + 1}`)
              );
              reset(dictFormState(`${id2}-example-text-${index + 1}`));
              reset(dictFormState(`${id2}-example-translation-${index + 1}`));
              return { text, translation };
            });
            examples1.forEach(({ text, translation }, index) => {
              set(dictFormState(`${id2}-example-text-${index + 1}`), text);
              set(
                dictFormState(`${id2}-example-translation-${index + 1}`),
                translation
              );
            });
            examples2.forEach(({ text, translation }, index) => {
              set(dictFormState(`${id1}-example-text-${index + 1}`), text);
              set(
                dictFormState(`${id1}-example-translation-${index + 1}`),
                translation
              );
            });

            set(dictFormCountState(id1), exampleCount2);
            set(dictFormCountState(id2), exampleCount1);
          }
          break;
        default:
          break;
      }
    }
});

export const exampleListState = selectorFamily<any[], string>({
  key: 'exampleListState',
  get:
    (id) =>
    ({ get }) => {
      const count = get(dictFormCountState(id));
      return [...Array(count)].map((_, index) =>
        get(dictFormState(`${id}-example-${index + 1}`))
      );
    },
  set:
    (id) =>
    ({ get, set, reset }, value) => {
      const [action, order] = value as [string, number];
      const count = get(dictFormCountState(id));
      switch (action) {
        case 'DELETE':
          {
            for (let i = order; i <= count; i++) {
              const text = get(dictFormState(`${id}-example-text-${i + 1}`));
              const translation = get(
                dictFormState(`${id}-example-translation-${i + 1}`)
              );
              set(dictFormState(`${id}-example-text-${i}`), text);
              set(dictFormState(`${id}-example-translation-${i}`), translation);
              reset(dictFormState(`${id}-example-text-${i + 1}`));
              reset(dictFormState(`${id}-example-translation-${i + 1}`));
            }
            set(dictFormCountState(id), (state) => state - 1);
          }
          break;
        case 'SWITCH':
          {
            const [order1, order2] = [order - 1, order];
            const text1 = get(dictFormState(`${id}-example-text-${order1}`));
            const text2 = get(dictFormState(`${id}-example-text-${order2}`));
            const translation1 = get(
              dictFormState(`${id}-example-translation-${order1}`)
            );
            const translation2 = get(
              dictFormState(`${id}-example-translation-${order2}`)
            );
            set(dictFormState(`${id}-example-text-${order1}`), text2);
            set(dictFormState(`${id}-example-text-${order2}`), text1);
            set(
              dictFormState(`${id}-example-translation-${order1}`),
              translation2
            );
            set(
              dictFormState(`${id}-example-translation-${order2}`),
              translation1
            );
          }
          break;
        default:
          break;
      }
    }
});
