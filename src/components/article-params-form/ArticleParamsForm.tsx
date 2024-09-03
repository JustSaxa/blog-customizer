import { useState, useRef, FormEvent } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import styles from './ArticleParamsForm.module.scss';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsProps = {
  setState: (value: ArticleStateType) => void;
}

export const ArticleParamsForm = (props: ArticleParamsProps) => {
  const { setState } = props;
  const [formState, setFormState] = useState(defaultArticleState);
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const changeState = (name: string) => {
    return (value: OptionType) => {
      setFormState((states) => ({
        ...states,
        [name]: value,
      }));
    };
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setState(formState);
  };

  const resetForm = (e: FormEvent) => {
    e.preventDefault();
    setState(defaultArticleState);
    setFormState(defaultArticleState);
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
      <aside ref={rootRef} className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
        <form className={styles.form} onSubmit={handleFormSubmit} onReset={resetForm}>
          <h1 className={styles.title}>Задайте параметры</h1>
          <Select
            title='Шрифт'
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={changeState('fontFamilyOption')}
          />
          <RadioGroup
            name='fontSize'
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            title='размер шрифта'
            onChange={changeState('fontSizeOption')}
          />
          <Select
            title='цвет шрифта'
            options={fontColors}
            selected={formState.fontColor}
            onChange={changeState('fontColor')}
          />
          <Separator />
          <Select
            title='цвет фона'
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={changeState('backgroundColor')}
          />
          <Select
            title='ширина контента'
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={changeState('contentWidth')}
          />
          <div className={styles.bottomContainer}>
            <Button title='Сбросить' type='reset' />
            <Button title='Применить' type='submit' />
          </div>
        </form>
      </aside>
    </>
  );
};