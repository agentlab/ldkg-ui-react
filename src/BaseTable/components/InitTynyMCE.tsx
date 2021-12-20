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
