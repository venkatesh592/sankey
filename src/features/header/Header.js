import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import styles from './Header.module.css';

export function Header(props) {

  const { t, i18n } = useTranslation()
  const language = localStorage.getItem('i18nextLng') || 'en'
  const [lang, setLang] = useState(language)
  const { title } = props

  /**
   * @method handleChange
   * @description handle language change
   */
  const handleChange = (event) => {
    setLang(event.target.value)
    i18n.changeLanguage(event.target.value)
  }

  return (
    <div className={styles.header}>
      <a href="#default">{t(title)}</a>
      <Select
        data-testid="slelect-lang"
        className={styles.select}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={lang}
        onChange={handleChange}
      >
        <MenuItem value="en">{t('English')}</MenuItem>
        <MenuItem value="fr">{t('French')}</MenuItem>
        <MenuItem value="de">{t('German')}</MenuItem>
        <MenuItem value="cs">{t('Czech')}</MenuItem>
        <MenuItem value="es">{t('Spanish')}</MenuItem>
      </Select>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}
