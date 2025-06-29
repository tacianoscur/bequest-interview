import {
  FileIcon,
  FileQuestionMarkIcon,
  HomeIcon,
  ListIcon,
  PieChartIcon,
  PrinterIcon,
  UsersIcon,
} from 'lucide-react';

const LeftMenu: React.FC = () => {
  return (
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
  );
};

export default LeftMenu;
