import { DocumentEditor } from './components/DocumentEditor';
import NavBar from './components/NavBar';
import {
  FileIcon,
  FileQuestionMarkIcon,
  HomeIcon,
  ListIcon,
  PieChartIcon,
  PrinterIcon,
  SaveIcon,
  UsersIcon,
  XIcon,
} from 'lucide-react';
import Button from './components/Button';

export function App() {
  return (
    <main className="flex flex-row overflow-hidden">
      <NavBar />

      <section className="flex flex-col lg:flex-row justify-between w-full overflow-auto">
        <div className="bg-foreground ml-4 p-4 space-y-6">
          <div className="space-y-1">
            <h1 className="text-white">Scur, Taciano</h1>
            <p className="text-white text-xs">tacianoscur.pj@gmail.com.br</p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              className="cursor-not-allowed inline-flex items-center gap-2"
              onClick={() => {
                console.log('Summary item clicked');
              }}
            >
              <HomeIcon className="stroke-secondary w-3" />
              <p className="text-secondary text-sm">Summary</p>
            </button>

            <button
              className="cursor-not-allowed inline-flex items-center gap-2"
              onClick={() => {
                console.log('Intake item clicked');
              }}
            >
              <FileQuestionMarkIcon className="stroke-secondary w-3" />
              <p className="text-secondary text-sm">Intake</p>
            </button>

            <button
              className="cursor-not-allowed inline-flex items-center gap-2"
              onClick={() => {
                console.log('Interested Parties item clicked');
              }}
            >
              <UsersIcon className="stroke-secondary w-3" />
              <p className="text-secondary text-sm">Interested Parties</p>
            </button>

            <button
              className="cursor-not-allowed inline-flex items-center gap-2"
              onClick={() => {
                console.log('Inventory item clicked');
              }}
            >
              <ListIcon className="stroke-secondary w-3" />
              <p className="text-secondary text-sm">Inventory</p>
            </button>

            <button
              className="cursor-not-allowed inline-flex items-center gap-2"
              onClick={() => {
                console.log('Asset Distributions item clicked');
              }}
            >
              <PieChartIcon className="stroke-secondary w-3" />
              <p className="text-secondary text-sm">Asset Distributions</p>
            </button>

            <button
              className="cursor-not-allowed inline-flex items-center gap-2"
              onClick={() => {
                console.log('Forms item clicked');
              }}
            >
              <PrinterIcon className="stroke-secondary w-3" />
              <p className="text-secondary text-sm">Forms</p>
            </button>

            <button
              className="cursor-not-allowed inline-flex items-center gap-2"
              onClick={() => {
                console.log('Documents item clicked');
              }}
            >
              <FileIcon className="stroke-secondary w-3" />
              <p className="text-secondary text-sm">Documents</p>
            </button>
          </div>
        </div>

        <DocumentEditor />

        <div className="p-4 lg:pl-0 space-y-4 min-w-80 flex flex-col flex-1">
          <h1 className="text-white">Clauses</h1>

          <div className="bg-card-background flex flex-col h-full rounded-lg p-4 space-y-2 items-center">
            <Button
              icon="plus"
              onClick={() => {
                console.log('Add Clause button clicked');
              }}
              text="Add Clause"
            />

            <div className="bg-background rounded-lg p-2 flex flex-row justify-between gap-4 w-full">
              <h2 className="text-white">Revocation</h2>

              <div className="space-x-2 inline-flex">
                <button
                  className="cursor-not-allowed"
                  onClick={() => {
                    console.log('Save Clause button clicked');
                  }}
                >
                  <SaveIcon className="stroke-secondary w-5" />
                </button>

                <a
                  className="cursor-not-allowed"
                  onClick={() => {
                    console.log('Delete Clause button clicked');
                  }}
                >
                  <XIcon className="stroke-secondary w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
