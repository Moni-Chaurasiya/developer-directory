const getBaseURL = () => {
  const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  //  const apiURL = 'http://localhost:5000/api';
  return apiURL.replace('/api', '');
};


export const getImageUrl = (photoPath) => {
  if (!photoPath) return null;
  if (photoPath.startsWith('http')) return photoPath;
  return `${getBaseURL()}${photoPath}`;
};