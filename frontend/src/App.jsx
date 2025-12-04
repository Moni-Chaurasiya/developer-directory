import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import DeveloperForm from './components/DeveloperForm';
import DeveloperList from './components/DeveloperList';
import { getDevelopers } from './services/api';
import { Plus } from 'lucide-react';

function App() {
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [techFilter, setTechFilter] = useState('');

  const fetchDevelopers = async () => {
    try {
      setLoading(true);
      const response = await getDevelopers();
      setDevelopers(response.data);
      setFilteredDevelopers(response.data);
    } catch (error) {
      console.error('Error fetching developers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  useEffect(() => {
    let filtered = developers;

    if (searchQuery) {
      filtered = filtered.filter((dev) =>
        dev.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (roleFilter) {
      filtered = filtered.filter((dev) => dev.role === roleFilter);
    }


    if (techFilter) {
      filtered = filtered.filter((dev) =>
        dev.techStack.toLowerCase().includes(techFilter.toLowerCase())
      );
    }

    setFilteredDevelopers(filtered);
  }, [searchQuery, roleFilter, techFilter, developers]);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
          },
        }}
      />

      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddClick={() => setShowForm(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       
          <div >
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 sticky top-24">
              <button
                onClick={() => setShowForm(true)}
                className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Add Developer
              </button>
            </div>

            <div className="mt-6">
              <SearchBar
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilter}
                techFilter={techFilter}
                setTechFilter={setTechFilter}
              />
            </div>
          </div>

     
          {/* <div className="lg:hidden">
            <SearchBar
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilter}
              techFilter={techFilter}
              setTechFilter={setTechFilter}
            />
          </div> */}

     
          <div className="lg:col-span-2">
            <DeveloperList developers={filteredDevelopers} loading={loading} />
          </div>
        </div>
      </div>

      {showForm && (
        <DeveloperForm
          onClose={() => setShowForm(false)}
          onSuccess={fetchDevelopers}
        />
      )}
    </div>
  );
}

export default App;