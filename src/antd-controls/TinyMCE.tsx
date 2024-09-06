/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { isEqual } from 'lodash-es';
import React, { useState, useEffect, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import './tinyMCE.css';
import { MstContext } from '../MstContext';

export const TinyMCE: React.FC<any> = React.memo(
  (props) => {
    const { data, handleChange, onMeasureChange = () => {}, editing } = props;
    const [activeEditor, setActiveEditor] = useState<any>();
    const { store } = useContext(MstContext);
    const localeId: string = store.getLocaleId();
    let language: string | undefined = undefined;
    if (localeId === 'de_DE') language = 'de';
    else if (localeId === 'it_IT') language = 'it';
    else if (localeId === 'pt_PT') language = 'pt_PT';
    else if (localeId === 'pt_BR') language = 'pt_BR';
    else if (localeId === 'ru_RU') language = 'ru';
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let language_url: string | undefined = undefined; // en_US by default
    if (localeId === 'de_DE') language_url = `${process.env.PUBLIC_URL}/lang/de.js`;
    else if (localeId === 'it_IT') language_url = `${process.env.PUBLIC_URL}/lang/it.js`;
    else if (localeId === 'pt_PT') language_url = `${process.env.PUBLIC_URL}/lang/pt_PT.js`;
    else if (localeId === 'pt_BR') language_url = `${process.env.PUBLIC_URL}/lang/pt_BR.js`;
    else if (localeId === 'ru_RU') language_url = `${process.env.PUBLIC_URL}/lang/ru.js`;
    console.log('TinyMCE', { localeId, language_url });

    const onChange = (ev: any) => {
      onMeasureChange();
    };
    const onSave = (ev: any) => {
      const newData = ev.target.targetElm.innerHTML;
      handleChange(newData);
    };
    useEffect(() => {
      if (!editing) {
        if (activeEditor) activeEditor.setContent(data);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editing, data]);
    return (
      <div style={{ position: 'relative' }}>
        <Editor
          initialValue={data || ''}
          inline
          init={{
            setup: (editor: any) => setActiveEditor(editor),
            branding: false,
            menubar: false,
            toolbar: false,
            plugins: ['autolink codesample link lists media paste table image quickbars textpattern'],
            quickbars_insert_toolbar: 'paste quicktable image',
            quickbars_selection_toolbar: 'bold italic | h2 h3 | blockquote quicklink',
            contextmenu: 'inserttable | cell row column deletetable | link image imagetools | codesample',
            language_url,
            language,
            skin: 'oxide',
            skin_url: `${process.env.PUBLIC_URL}/skins/ui/oxide`,
            content_css: `${process.env.PUBLIC_URL}/skins/ui/oxide/content.min.css`,
            theme: 'silver',
            theme_url: `${process.env.PUBLIC_URL}/themes/silver/theme.min.js`,
          }}
          //plugins='link image code'
          //toolbar='undo redo | bold italic | alignleft aligncenter alignright | code'
          onEditorChange={onChange}
          onBlur={onSave}
        />
      </div>
    );
  },
  (prevProps: any, nextProps: any) => isEqual(prevProps, nextProps),
);
