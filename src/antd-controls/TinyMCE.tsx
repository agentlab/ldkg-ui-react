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
import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import './tinyMCE.css';

export const TinyMCE: React.FC<any> = React.memo(
  (props) => {
    const { data, handleChange, onMeasureChange = () => {}, editing } = props;
    const [activeEditor, setActiveEditor] = useState<any>();
    const i18n = { language: 'ru_RU' };

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

            language_url: `${process.env.PUBLIC_URL}/lang/ru.js`,
            language: i18n.language,
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
