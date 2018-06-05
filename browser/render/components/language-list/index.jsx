import React from 'react'
import { observer } from 'mobx-react'
import './language-list'
import CodeMirror from 'codemirror'
import 'codemirror/mode/meta'
import isDevIconExists from 'lib/devicon-exists'
import defaultLanguageIcon from 'resources/image/defaultLanguageIcon.png'

@observer
export default class LanguageList extends React.Component {
  render () {
    const { languages } = this.props.store
    return (
      <div className='language-list'>
        <div className='language-list-label'>
          LANGUAGES
          <div className='badge'>{ Object.keys(languages).length }</div>
        </div>
        <ul className='languages'>
          {
            Object.keys(languages).map((language, index) => {
              const langMode = CodeMirror.findModeByName(language)
              const snippetMode = langMode.mode
              let languageIcon = <img src={defaultLanguageIcon} className='lang-icon' />
              if (langMode.alias) {
                for (let i = 0; i < langMode.alias.length; i++) {
                  if (isDevIconExists(`devicon-${langMode.alias[i]}-plain`)) {
                    languageIcon = <i className={`devicon-${langMode.alias[i]}-plain colored`} />
                    break
                  }
                }
              }
              // if it's not alias then maybe the mode name ?
              if (isDevIconExists(`devicon-${snippetMode}-plain`)) {
                languageIcon = <i className={`devicon-${snippetMode}-plain colored`} />
              }
              return (
                <li key={index}>
                  <div className='icon'>
                    { languageIcon }
                  </div>
                  <span className='language-name'>{ language }</span>
                  <div className='badge'>{ languages[language] }</div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
