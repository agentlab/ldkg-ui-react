/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useRef } from 'react';
import { Story, Meta } from '@storybook/react';

import { TinyMCE } from '../src/antd-controls/TinyMCE';
import { Editor } from '@tinymce/tinymce-react';

import '../src/antd-controls/tinyMCE.css';

export default {
  title: 'Controls/RichText',
  component: TinyMCE,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta;

const data =
  '<h2>ПОЛИТИКА КОМПАНИИ В ОБЛАСТИ ПРОМЫШЛЕННОЙ БЕЗОПАСНОСТИ...</h2><p><b>ПОЛИТИКА</b> выражает позицию Высшего руководства Компании в области промышленной безопасности, охраны труда и окружающей среды и является основной для установления и анализа Целей и задач в этой области.</p>';

export const Empty: Story<{}> = () => {
  const editorRef = useRef<any>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={data}
        inline
        init={{
          height: 500,
          branding: false,
          menubar: false,
          toolbar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'codesample quickbars textpattern',
          ],
          quickbars_insert_toolbar: 'paste quicktable image',
          quickbars_selection_toolbar: 'bold italic | h2 h3 | blockquote quicklink',
          contextmenu: 'inserttable | cell row column deletetable | link image imagetools | codesample',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
};
