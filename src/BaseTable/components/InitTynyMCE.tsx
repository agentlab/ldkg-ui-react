/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export const InitTinyMCE = () => {
  const i18n = { language: 'ru_RU' };

  return (
    <div style={{ display: 'none' }}>
      <Editor
        initialValue={''}
        inline
        init={{
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
      />
    </div>
  );
};
