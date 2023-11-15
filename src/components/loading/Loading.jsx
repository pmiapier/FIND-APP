import { LoaderIcon } from './LoaderIcon';

export default function Loading() {
  return (
    <>
      {/* backdrop covers all the contents, preventing the clicking from the users */}
      {/* real spinnier is all the contents are clickable at the moment */}

      <div className="fixed inset-0 bg-black opacity-30 z-40"></div>
      <div className="fixed inset-0 z-50">
        <div className="flex items-center justify-center min-h-full">
          <LoaderIcon className="fill-blue-600 animate-spin" />
        </div>
      </div>
    </>
  );
}
