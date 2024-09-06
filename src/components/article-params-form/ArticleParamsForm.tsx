import { useState, useRef, FormEvent } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import styles from './ArticleParamsForm.module.scss';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import clsx from 'clsx';

type ArticleParamsProps = {
  setState: (value: ArticleStateType) => void;
}

export const ArticleParamsForm = (props: ArticleParamsProps) => {
  const { setState } = props;
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const changeState = (name: keyof ArticleStateType) => {
    return (value: OptionType) => {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setState(formState);
    setIsOpen(false);
  };

  const resetForm = (e: FormEvent) => {
    e.preventDefault();
    setState(defaultArticleState);
    setFormState(defaultArticleState);
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useOutsideClickClose({
    isOpen,
    rootRef,
    onChange: setIsOpen,
  });

  return (
    <>
      <ArrowButton onClick={toggleOpen} isOpen={isOpen} />
      <aside ref={rootRef} className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form className={styles.form} onSubmit={handleFormSubmit} onReset={resetForm}>
          <Text uppercase={true} weight={800} size={31}>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={changeState('fontFamilyOption')}
          />
          <RadioGroup
            name="fontSize"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            title="размер шрифта"
            onChange={changeState('fontSizeOption')}
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={formState.fontColor}
            onChange={changeState('fontColor')}
          />
          <Separator />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={changeState('backgroundColor')}
          />
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={changeState('contentWidth')}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" type="reset" />
            <Button title="Применить" type="submit" />
          </div>
        </form>
      </aside>
    </>
  );
};