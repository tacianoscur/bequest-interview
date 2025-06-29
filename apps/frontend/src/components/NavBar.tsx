import {
  CirclePlayIcon,
  FileTextIcon,
  GavelIcon,
  InfoIcon,
  PencilRulerIcon,
  SettingsIcon,
} from 'lucide-react';

const NavBar: React.FC = () => {
  const renderProfileOption = (children: React.ReactElement) => {
    // TODO no action implemented, add page and route to respective page
    return (
      <button
        className="sticky bg-card-background rounded-lg p-2 flex justify-center items-center w-full cursor-not-allowed"
        onClick={() => {
          console.log('Navigation bar profile icon clicked');
        }}
      >
        {children}
      </button>
    );
  };

  return (
    <nav className="flex-1 flex flex-col items-center max-w-20 bg-nav-background p-4 shadow-lg">
      <img
        src="/assets/images/bequest-logo.svg"
        alt="Bequest Logo"
        className="w-full aspect-auto"
      />

      <div className="flex flex-col gap-10 justify-between mt-14 h-full w-full">
        <div className="flex flex-col gap-4 items-center">
          {/* TODO no action implemented, add page and route to respective page */}
          <button
            className="cursor-not-allowed"
            onClick={() => {
              console.log('Navigation bar icon clicked');
            }}
          >
            <PencilRulerIcon className="stroke-secondary w-5" />
          </button>

          {/* TODO no action implemented, add page and route to respective page */}
          <button
            className="cursor-not-allowed"
            onClick={() => {
              console.log('Navigation bar icon clicked');
            }}
          >
            <GavelIcon className="stroke-secondary w-5" />
          </button>

          {/* TODO no action implemented, add page and route to respective page */}
          <button
            className="cursor-not-allowed"
            onClick={() => {
              console.log('Navigation bar icon clicked');
            }}
          >
            <FileTextIcon className="stroke-secondary w-5" />
          </button>

          {/* TODO no action implemented, add page and route to respective page */}
          <button
            className="cursor-not-allowed"
            onClick={() => {
              console.log('Navigation bar icon clicked');
            }}
          >
            <SettingsIcon className="stroke-secondary w-5" />
          </button>

          {/* TODO no action implemented, add page and route to respective page */}
          <button
            className="cursor-not-allowed"
            onClick={() => {
              console.log('Navigation bar icon clicked');
            }}
          >
            <CirclePlayIcon className="stroke-secondary w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {renderProfileOption(
            <InfoIcon className="stroke-secondary w-5 h-5" />
          )}

          {renderProfileOption(
            <img
              src="/assets/images/avatar.jpeg"
              alt="User Avatar"
              className="w-5 aspect-square rounded-full object-contain"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
