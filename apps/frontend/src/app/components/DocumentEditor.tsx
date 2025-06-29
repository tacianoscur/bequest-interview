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
import { ChevronLeftIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const autoSaveBookmarkKey = '__autosave_cursor__';

DocumentEditorContainerComponent.Inject(Toolbar);
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhNYVJ2WmFZfVtgdV9DZVZUTGYuP1ZhSXxWdkZiWH9fdXJVR2BaWEE='
);

export const DocumentEditor = () => {
  const [documentId, setDocumentId] = useState<number | undefined>();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<DocumentEditorContainerComponent>(null);

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
      const blob = await editor.saveAsBlob('Sfdt');

      const data = await blob.text();

      if (documentId) {
        await fetch(`http://localhost:3000/api/documents/${documentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data }),
        });
      } else {
        await fetch('http://localhost:3000/api/documents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data }),
        });
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
      const response = await fetch('http://localhost:3000/api/documents/saved');
      if (!response.ok) return;

      const data = await response.json();
      if (data && data.data) {
        editor.open(data.data);
        setDocumentId(data.id);
      }
    };

    loadSavedDocument();
  }, []);

  return (
    <>
      <div className="p-4 lg:pt-12 w-full h-screen flex flex-col">
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
