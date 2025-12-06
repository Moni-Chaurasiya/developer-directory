import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Briefcase, Code, User } from 'lucide-react';
import { getDeveloperById } from '../services/api';
import toast from 'react-hot-toast';
import { getImageUrl } from '../utils/helpers';
// const getImageUrl = (photoPath) => {
//   if (!photoPath) return null;
//   if (photoPath.startsWith('http')) return photoPath;
//   return `http://localhost:5000${photoPath}`;
// };

const DeveloperProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeveloper();
  }, [id]);

  const fetchDeveloper = async () => {
    try {
      setLoading(true);
      const response = await getDeveloperById(id);
      setDeveloper(response.data);
    } catch (error) {
      toast.error('Failed to load developer profile');
      navigate('/');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!developer) {
    return null;
  }

  const techArray = developer.techStack.split(',').map(tech => tech.trim());
  const getInitial = (name) => name.charAt(0).toUpperCase();
  const getRoleColor = (role) => {
    const colors = {
      'Frontend': 'bg-orange-600',
      'Backend': 'bg-orange-600',
      'Full-Stack': 'bg-orange-600'
    };
    return colors[role] || 'bg-orange-600';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
  
      <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Directory</span>
          </button>
        </div>
      </div>

 
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">

          <div className="bg-gradient-to-r from-sky-300 to-sky-800 h-32"></div>
          
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16">
        
              {developer.photo ? (
                <img
                  //src={developer.photo}
                  src={getImageUrl(developer.photo)}
                  alt={developer.fullName}
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 bg-orange-600 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">
                    {getInitial(developer.fullName)}
                  </span>
                </div>
              )}

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {developer.fullName}
                </h1>
                <span className={`inline-block px-4 py-2 ${getRoleColor(developer.role)} text-white text-sm font-medium rounded-full`}>
                  {developer.role} Developer
                </span>
              </div>
            </div>

    
            <div className="mt-8 space-y-6">
        
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <User className="h-5 w-5 text-orange-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    About
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {developer.description || 'No description provided'}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Code className="h-5 w-5 text-orange-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Tech Stack
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techArray.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

         
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="h-5 w-5 text-orange-600" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Experience
                    </h2>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {developer.experience} {developer.experience === 1 ? 'Year' : 'Years'}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Joined
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {formatDate(developer.createdAt)}
                  </p>
                </div>
              </div>

 
              {developer.createdBy && (
                <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Added by <span className="font-medium text-gray-700 dark:text-gray-300">{developer.createdBy.name}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;