import React from 'react';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import { Header } from '../components';
import { Button } from '@mui/material';
import { Send } from '@mui/icons-material';


const Editor = () => (
  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header  title="Editor" />
    <RichTextEditorComponent>
      <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
    </RichTextEditorComponent><br/><br/>

    <div style={{paddingLeft:'90%'}}>
    <Button variant='contained' color='info' endIcon={<Send/>} size='small'>Invite </Button>
    </div>

  </div>
);
export default Editor;
