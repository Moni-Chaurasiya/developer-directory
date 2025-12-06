import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Eye } from 'lucide-react';

const DeveloperCard = ({ developer, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { _id, fullName, role, techStack, experience, photo } = developer;

  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const getRoleColor = (role) => {
    const colors = {
      'Frontend': 'bg-orange-600',
      'Backend': 'bg-orange-600',
      'Full-Stack': 'bg-orange-600'
    };
    return colors[role] || 'bg-orange-600';
  };

  const techArray = techStack.split(',').map(tech => tech.trim());

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        {/* Profile Picture or Initial */}
        {photo ? (
          <img
            src={photo}
            alt={fullName}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-white">
              {getInitial(fullName)}
            </span>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {fullName}
            </h3>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/developer/${_id}`)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="View Profile"
              >
                <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={() => onEdit(developer)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Edit"
              >
                <Edit2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </button>
              <button
                onClick={() => onDelete(developer)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Delete"
              >
                <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
              </button>
            </div>
          </div>

          <span className={`inline-block px-3 py-1 ${getRoleColor(role)} text-white text-sm rounded-full mb-3`}>
            {role}
          </span>

          <div className="flex flex-wrap gap-2 mb-3">
            {techArray.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-gray-600 dark:text-gray-400">
            Experience: {experience} {experience === 1 ? 'Year' : 'Years'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;