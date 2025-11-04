import {
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  ConditionalContents,
  CreateLink,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  Separator,
  tablePlugin,
  toolbarPlugin,
  UndoRedo
} from '@mdxeditor/editor';
import { Ref } from 'react';
import { useField } from 'react-final-form';
import { FormGroup } from 'reactstrap';

export function FinalEditor({
  label,
  name,
  editorRef
}: {
  label: string;
  name: string;
  editorRef?: Ref<MDXEditorMethods> | null;
}) {
  const {
    input,
    meta: { error, invalid, touched }
  } = useField(name);

  return (
    <FormGroup style={{ display: 'grid' }}>
      <label>{label}</label>
      <MDXEditor
        ref={editorRef}
        className="border"
        markdown={input.value}
        onChange={input.onChange}
        onBlur={() => input.onBlur()}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          tablePlugin(),
          imagePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              css: 'css',
              txt: 'txt',
              sql: 'sql',
              html: 'html',
              sass: 'sass',
              scss: 'scss',
              bash: 'bash',
              json: 'json',
              js: 'javascript',
              ts: 'typescript',
              '': 'unspecified',
              tsx: 'TypeScript (React)',
              jsx: 'JavaScript (React)'
            },
            autoLoadLanguageSupport: true
          }),
          diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: '' }),
          toolbarPlugin({
            toolbarContents: () => (
              <ConditionalContents
                options={[
                  {
                    when: editor => editor?.editorType === 'codeblock',
                    contents: () => <ChangeCodeMirrorLanguage />
                  },
                  {
                    fallback: () => (
                      <>
                        <UndoRedo />
                        <Separator />
                        <BoldItalicUnderlineToggles />
                        <CodeToggle />
                        <Separator />
                        <ListsToggle />
                        <Separator />
                        <CreateLink />
                        <InsertImage />
                        <Separator />
                        <InsertTable />
                        <InsertThematicBreak />
                        <Separator />
                        <InsertCodeBlock />
                      </>
                    )
                  }
                ]}
              />
            )
          })
        ]}
      />
      {invalid && touched && error && <div className="text-danger">{error}</div>}
    </FormGroup>
  );
}
