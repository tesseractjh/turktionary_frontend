import DictContentContainer from '@components/common/DictContentContainer';

interface EtymologyProps {
  etymology: Model.Etymology;
}

function Etymology({ etymology }: EtymologyProps) {
  return (
    <DictContentContainer title="어원" headerColor="BEIGE">
      {etymology.etymology_text}
    </DictContentContainer>
  );
}

export default Etymology;
