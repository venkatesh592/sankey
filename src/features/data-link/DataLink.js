import React, { useState } from 'react';

import styles from './DataLink.module.css';
import { setSeriesLink } from '../sankey/sankeySlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Input, Button } from '@material-ui/core';

export function DataLink() {
  const dispatch = useDispatch();
  const [source, setSource] = useState('')
  const [target, setTarget] = useState('')
  const [expenditure, setExpenditure] = useState('')
  const { t } = useTranslation();

  /**
   * @method createLink
   * @description dispatch create link action
   */
  const createLink = () => {
    const link = {
      source,
      target,
      value: expenditure
    }
    dispatch(setSeriesLink(link))
    setSource('')
    setTarget('')
    setExpenditure('')
  }

  return (
    <div className={styles.dataLink}>
      <span>{t('Link Expenditure')}</span>
      <Input
        className={styles.input}
        placeholder={t('Source Placeholder')}
        value={source}
        onChange={e => setSource(e.target.value)} />
      <Input
        className={styles.input}
        placeholder={t('Target Placeholder')}
        value={target}
        onChange={e => setTarget(e.target.value)} />
      <Input
        className={styles.input}
        placeholder={t('Expenditure')}
        value={expenditure}
        onChange={e => setExpenditure(e.target.value)} />
      <Button variant="contained" color="primary" onClick={createLink}>{t('Create')}</Button>
    </div>
  )
}
