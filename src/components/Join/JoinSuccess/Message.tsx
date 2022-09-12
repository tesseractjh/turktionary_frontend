import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import { useEffect, useState } from 'react';

const Container = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: ${pxToRem(240)};

  @media ${({ theme }) => theme.media.laptop} {
    height: ${pxToRem(200)};
  }

  @media ${({ theme }) => theme.media.tablet} {
    height: ${pxToRem(100)};
  }

  @media ${({ theme }) => theme.media.mobile} {
    height: ${pxToRem(40)};
  }
`;

const ThankYou = styled.p<{ angle: number; trigger: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: fit-content;
  width: 100%;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.custom('sm', 6, true)};
  transform: translate(-50%, -50%) rotate(${({ angle }) => angle}deg);
  transform-origin: left center;
  ${({ trigger }) => (trigger ? '' : 'transition: transform 1s 2s;')}

  @media ${({ theme }) => theme.media.laptop} {
    font-size: ${({ theme }) => theme.fontSize.custom('sm', 4, true)};
  }

  @media ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.custom('sm', 3, true)};
  }

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.custom('sm', 1.6, true)};
  }
`;

const expressions = [
  'Hoş geldiniz!',
  'Xoş gəlmisiniz!',
  'Xush kelibsiz!',
  'Қош келдіңіз!',
  'Hoş geldiňiz!',
  'Кош келдиңиз!'
];

function Message() {
  const [angle, setAngle] = useState(0);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      setAngle((prev) => prev - 60);
      setTrigger(false);
    }, 3000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (angle === -(360 / expressions.length) * 7) {
      setTrigger(true);
    }
  }, [angle]);

  useEffect(() => {
    if (trigger) {
      setAngle(0);
    }
  }, [trigger]);

  return (
    <Container>
      {expressions.map((expression, index) => (
        <ThankYou
          key={`join-success-expression-${index}`}
          angle={angle + (360 / expressions.length) * index}
          trigger={trigger}
        >
          {expression}
        </ThankYou>
      ))}
    </Container>
  );
}

export default Message;
