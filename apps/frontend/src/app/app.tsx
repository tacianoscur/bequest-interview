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
import LeftMenu from './components/LeftMenu';

export function App() {
  return (
    <main className="flex flex-row overflow-hidden">
      <NavBar />

      <section className="flex flex-col lg:flex-row justify-between w-full overflow-auto">
        <LeftMenu />

        <DocumentEditor />
      </section>
    </main>
  );
}

export default App;
