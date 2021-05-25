import React, { FC } from 'react';
import { Button } from 'zent';
import { observer } from "mobx-react";
import timer from 'stores';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Home: FC = observer(() => {
  // return (
  //   <div>
  //     <Button onClick={() => timer.decrease()}>-</Button>
  //     {timer.secondsPassed}
  //     <Button onClick={() => timer.increase()}>+</Button>
  //     <img src={"https://img.alicdn.com/i1/2532523019/O1CN01rDVxy61YAkJthlYQD_!!2532523019.jpg"} alt=""/>
  //   </div>
  // );
  const editor = useEditor({
    extensions: [
      StarterKit
    ],
    content: '<p>Hello World! 🌎️</p>',
  });

  return (
    <EditorContent editor={editor} />
  );
});

export default Home;