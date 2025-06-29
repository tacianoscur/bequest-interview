import { registerLicense } from '@syncfusion/ej2-base';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import {
  DocumentEditorContainerComponent,
  Toolbar,
} from '@syncfusion/ej2-react-documenteditor';
import '@syncfusion/ej2-react-documenteditor/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import { ChevronLeftIcon, SaveIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { predefinedClauses, PredefinedClauseType } from '../utils/clausesData';

DocumentEditorContainerComponent.Inject(Toolbar);
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhNYVJ2WmFZfVtgdV9DZVZUTGYuP1ZhSXxWdkZiWH9fdXJVR2BaWEE='
);

const localApiUrl = 'http://localhost:3000/api';

export const DocumentEditor = () => {
  const [documentId, setDocumentId] = useState<number | undefined>();
  const [clauses, setClauses] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<DocumentEditorContainerComponent>(null);

  const updateClausesList = () => {
    const editor = editorRef.current!.documentEditor;
    const bookmarks = editor.getBookmarks();

    const bookmarksWithPositions = bookmarks.map((name) => {
      editor.selection.selectBookmark(name, false);
      const index = editor.selection.getHierarchicalIndex(
        editor.selection.start.paragraph,
        editor.selection.start.offset.toString()
      );
      return { name, index };
    });

    bookmarksWithPositions.sort((a, b) => {
      return a.index.localeCompare(b.index, undefined, { numeric: true });
    });

    setClauses(bookmarksWithPositions.map((b) => b.name));
  };

  const insertClauseBefore = (
    beforeName: string,
    newClause: PredefinedClauseType
  ) => {
    const editor = editorRef.current!.documentEditor;

    if (beforeName === '__END__') {
      editor.selection.moveToDocumentEnd();
    } else {
      editor.selection.selectBookmark(beforeName);
      const start = editor.selection.start.clone();
      editor.selection.selectRange(start, start);
    }

    const startIndex = editor.selection.getHierarchicalIndex(
      editor.selection.start.paragraph,
      editor.selection.start.offset.toString()
    );

    editor.editor.insertText('\n');
    editor.editor.paste(newClause.content, 'KeepSourceFormatting');

    const endIndex = editor.selection.getHierarchicalIndex(
      editor.selection.end.paragraph,
      editor.selection.end.offset.toString()
    );

    const newBookmark = newClause.name;
    editor.selection.select(startIndex, endIndex);
    editor.editor.insertBookmark(newBookmark);

    updateClausesList();
  };

  const deleteClause = (name: string) => {
    const editor = editorRef.current!.documentEditor;

    const bookmark = editor
      .getBookmarks()
      .find((bookmark) => bookmark === name);
    if (!bookmark) return;

    editor.selection.selectBookmark(name, false);
    editor.editor.delete();

    updateClausesList();
  };

  const handleOpen = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target.files?.[0];
    const editor = editorRef.current!.documentEditor;

    if (!fileInput) return;

    editor.open(fileInput);
  };

  const handleDownload = async () => {
    const editor = editorRef.current!.documentEditor;

    const blob = await editor.saveAsBlob('Docx');

    const file = new File([blob], `Document.docx`, {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    downloadFile(file);
  };

  useEffect(() => {
    const editor = editorRef.current!.documentEditor;
    let saveTimeout: NodeJS.Timeout | null = null;

    const debouncedSave = async () => {
      try {
        const blob = await editor.saveAsBlob('Sfdt');

        const data = await blob.text();

        if (documentId) {
          await fetch(`${localApiUrl}/api/documents/${documentId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
          });
        } else {
          await fetch(`${localApiUrl}/documents`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
          });
        }
      } catch (err: any) {
        alert(
          `Your document was not auto saved, make sure you are connected to the internet. Error message: ${err?.message}`
        );
      }
    };

    editor.contentChange = () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
      saveTimeout = setTimeout(debouncedSave, 1000 * 1); // 1s
    };

    return () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
    };
  }, [documentId]);

  useEffect(() => {
    const editor = editorRef.current!.documentEditor;

    const loadSavedDocument = async () => {
      const response = await fetch(`${localApiUrl}/documents/saved`);
      if (!response.ok) {
        alert(`Your document could not be loaded, try refreshing the page!`);
        return;
      }

      const data = await response.json();
      if (data && data.data) {
        editor.open(data.data);
        setDocumentId(data.id);
        setTimeout(updateClausesList, 500);
      }
    };

    loadSavedDocument();
  }, []);

  const handleAddNextClause = (insertBeforeName: string) => {
    const nextClause = predefinedClauses.find(
      (predefined) => !clauses.includes(predefined.name)
    );

    if (!nextClause) {
      alert('There are no clauses left.');
      return;
    }

    insertClauseBefore(insertBeforeName, nextClause);
  };

  return (
    <>
      <div className="p-4 w-full h-screen flex flex-col">
        <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-0 lg:items-center mb-4">
          <div className="inline-flex space-x-4 items-center">
            <button
              className="rounded-full bg-card-background p-2 cursor-not-allowed"
              onClick={() => {
                console.log('Left navigation button clicked');
              }}
            >
              <ChevronLeftIcon className="w-5 h-5 stroke-secondary" />
            </button>

            <h1 className="text-secondary text-3xl">Document Editor</h1>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={() => fileInputRef.current?.click()}
            >
              Open
            </button>
            <input
              type="file"
              accept=".docx"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleOpen}
            />
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        </div>
        <div className="flex-1 flex h-full">
          <DocumentEditorContainerComponent
            height="100%"
            serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
            enableToolbar={true}
            showPropertiesPane={false}
            ref={editorRef}
            toolbarItems={[
              'New',
              'Open',
              'Separator',
              'Undo',
              'Redo',
              'Separator',
              'Bookmark',
              'Table',
              'Separator',
              'Find',
            ]}
            contentChange={(e) => {}}
          />
        </div>
      </div>

      <div className="p-4 lg:pl-0 space-y-4 min-w-80 flex flex-col flex-1">
        <h1 className="text-white">Clauses</h1>

        <div className="bg-card-background flex flex-col h-full rounded-lg p-4 space-y-2 items-center">
          {clauses.map((name) => (
            <div
              key={name}
              className="w-full space-y-2 items-center flex flex-col"
            >
              <Button
                icon="plus"
                onClick={() => handleAddNextClause(name)}
                text="Add Clause"
              />

              <div className="bg-background rounded-lg p-2 flex flex-row justify-between gap-4 w-full items-center">
                <h2 className="text-white text-sm">{name}</h2>
                <div className="space-x-2 inline-flex">
                  <button
                    onClick={() =>
                      editorRef.current!.documentEditor.selection.selectBookmark(
                        name
                      )
                    }
                  >
                    <SaveIcon className="stroke-secondary w-5" />
                  </button>
                  <button onClick={() => deleteClause(name)}>
                    <XIcon className="stroke-secondary w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <Button
            icon="plus"
            onClick={() => handleAddNextClause('__END__')}
            text="Add Clause"
          />
        </div>
      </div>
    </>
  );
};

const downloadFile = (file: File) => {
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
};
