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
import { Meta, StoryObj } from '@storybook/react';

import { TinyMCE } from '../src/antd-controls/TinyMCE';
import { Editor } from '@tinymce/tinymce-react';

import '../src/antd-controls/tinyMCE.css';

const Wrapper: React.FC<any> = (args) => {
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

export default {
  title: 'Simple Controls/RichText',
  component: TinyMCE,
  render: (args: any) => <Wrapper args />,
} as Meta<typeof Editor>;

type Story = StoryObj<any>; // StoryObj<typeof Form>;

const data = `<p><img style="display: block; margin-left: auto; margin-right: auto;" title="Tiny Logo" src="img/android-chrome-256x256.png" alt="TinyMCE Logo" width="128" height="128"></p>
<h1 style="text-align: center;">Welcome to the TinyMCE editor demo!</h1>
<h2>Got questions or need help?</h2>
<ul>
<li>Our <a href="../../6/">documentation</a> is a great resource for learning how to configure TinyMCE.</li>
<li>Have a specific question? Try the <a href="https://stackoverflow.com/questions/tagged/tinymce" target="_blank" rel="noopener"><code>tinymce</code> tag at Stack Overflow</a>.</li>
<li>We also offer enterprise grade support as part of <a href="../../../../pricing">TinyMCE premium plans</a>.</li>
</ul>
<h2>A simple table to play with</h2>
<table style="border-collapse: collapse; width: 100%;" border="1">
<thead>
<tr>
<th>Product</th>
<th>Cost</th>
<th>Really?</th>
</tr>
</thead>
<tbody>
<tr>
<td>TinyMCE</td>
<td>Free</td>
<td>YES!</td>
</tr>
<tr>
<td>Plupload</td>
<td>Free</td>
<td>YES!</td>
</tr>
</tbody>
</table>
<h2>Found a bug?</h2>
<p>If you think you have found a bug please create an issue on the <a href="https://github.com/tinymce/tinymce/issues">GitHub repo</a> to report it to the developers.</p>
<h2>Finally ...</h2>
<p>Don't forget to check out our other product <a href="http://www.plupload.com" target="_blank" rel="noopener">Plupload</a>, your ultimate upload solution featuring HTML5 upload support.</p>
<p>Thanks for supporting TinyMCE! We hope it helps you and your users create great content.<br>All the best from the TinyMCE team.</p>`;

export const Empty: Story = {};
