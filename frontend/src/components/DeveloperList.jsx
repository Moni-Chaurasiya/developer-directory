import DeveloperCard from './DeveloperCard';
import { Users } from 'lucide-react';

const DeveloperList = ({ developers, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (developers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Users className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
          No developers found
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Developer List
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {developers.map((developer) => (
          <DeveloperCard key={developer._id} developer={developer} />
        ))}
      </div>
    </div>
  );
};

export default DeveloperList;