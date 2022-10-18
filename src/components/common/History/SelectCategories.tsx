import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import { ChangeEvent, useMemo, useState } from 'react';

interface SelectCategoriesProps {
  categoryTitles: Record<string, any>;
  selectedCategories: Record<string, boolean>;
  setSelectedCategories: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

const Container = styled.ul`
  ${flex('flex-start')}
  flex-wrap: wrap;
  gap: ${pxToRem(16)};
  padding-top: ${pxToRem(10)};
  margin: ${pxToRem(10, 0, 20)};
  border-top: ${border()} ${({ theme }) => theme.color.GRAY_LIGHT};
`;

const Checkbox = styled.input`
  margin-right: ${pxToRem(10)};

  &:hover + label {
    color: ${({ theme }) => theme.color.BROWN_DARK};
  }
`;

const Label = styled.label`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.sm};
  user-select: none;
`;

function SelectCategories({
  categoryTitles,
  selectedCategories,
  setSelectedCategories
}: SelectCategoriesProps) {
  const categories = useMemo(
    () =>
      Object.entries(categoryTitles).map(([key, value]) => ({
        title: value,
        logName: key
      })),
    [categoryTitles]
  );

  const handleChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = currentTarget;
    const prev = { ...selectedCategories };
    if (checked) {
      prev[value] = true;
    } else if (Object.keys(prev).length > 1) {
      delete prev[value];
    }
    setSelectedCategories(prev);
  };

  return (
    <Container>
      {categories.map(
        ({ title, logName }: { title: string; logName: string }) => {
          const id = `checkbox-history-${logName}`;
          return (
            <div key={id}>
              <Checkbox
                id={id}
                type="checkbox"
                value={logName}
                checked={!!selectedCategories[logName]}
                onChange={handleChange}
              />
              <Label htmlFor={id}>{title}</Label>
            </div>
          );
        }
      )}
    </Container>
  );
}

export default SelectCategories;
