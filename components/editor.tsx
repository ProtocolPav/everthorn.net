'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

type TiptapProps = {
  content: string,
  editable: boolean
}

const Tiptap = ({content, editable}: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: content,
    editable: editable
  })

  return (
    <EditorContent editor={editor} />
  )
}

export default Tiptap