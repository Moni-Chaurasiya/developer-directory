// import { useState, useEffect } from 'react';
// import { Toaster } from 'react-hot-toast';
// import Navbar from './components/Navbar';
// import SearchBar from './components/SearchBar';
// import DeveloperForm from './components/DeveloperForm';
// import DeveloperList from './components/DeveloperList';
// import { getDevelopers } from './services/api';
// import { Plus } from 'lucide-react';

// function App() {
//   const [developers, setDevelopers] = useState([]);
//   const [filteredDevelopers, setFilteredDevelopers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [roleFilter, setRoleFilter] = useState('');
//   const [techFilter, setTechFilter] = useState('');

//   const fetchDevelopers = async () => {
//     try {
//       setLoading(true);
//       const response = await getDevelopers();
//       setDevelopers(response.data);
//       setFilteredDevelopers(response.data);
//     } catch (error) {
//       console.error('Error fetching developers:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDevelopers();
//   }, []);

//   useEffect(() => {
//     let filtered = developers;

//     if (searchQuery) {
//       filtered = filtered.filter((dev) =>
//         dev.fullName.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (roleFilter) {
//       filtered = filtered.filter((dev) => dev.role === roleFilter);
//     }


//     if (techFilter) {
//       filtered = filtered.filter((dev) =>
//         dev.techStack.toLowerCase().includes(techFilter.toLowerCase())
//       );
//     }

//     setFilteredDevelopers(filtered);
//   }, [searchQuery, roleFilter, techFilter, developers]);

//   return (
//     <div className="min-h-screen bg-white dark:bg-black transition-colors">

//         <Toaster
//         toastOptions={{
//           style: {
//             background: "white",
//             color: "black",
//           },
//           className:
//             "dark:bg-gray-900 dark:text-white dark:border dark:border-gray-700",
//         }}
//       />

//       <Navbar
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         onAddClick={() => setShowForm(true)}
//       />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       
//           <div >
//             <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 sticky top-24">
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
//               >
//                 <Plus className="h-5 w-5" />
//                 Add Developer
//               </button>
//             </div>

//             <div className="mt-6">
//               <SearchBar
//                 roleFilter={roleFilter}
//                 setRoleFilter={setRoleFilter}
//                 techFilter={techFilter}
//                 setTechFilter={setTechFilter}
//               />
//             </div>
//           </div>

     
//           {/* <div className="lg:hidden">
//             <SearchBar
//               roleFilter={roleFilter}
//               setRoleFilter={setRoleFilter}
//               techFilter={techFilter}
//               setTechFilter={setTechFilter}
//             />
//           </div> */}

     
//           <div className="lg:col-span-2">
//             <DeveloperList developers={filteredDevelopers} loading={loading} />
//           </div>
//         </div>
//       </div>

//       {showForm && (
//         <DeveloperForm
//           onClose={() => setShowForm(false)}
//           onSuccess={fetchDevelopers}
//         />
//       )}
//     </div>
//   );
// }

// export default App;

import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import DeveloperForm from './components/DeveloperForm';
import DeveloperList from './components/DeveloperList';
import DeveloperProfile from './components/DeveloperProfile';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { getDevelopers, deleteDeveloper } from './services/api';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

function HomePage() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, developer: null });
  const [deleting, setDeleting] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [techFilter, setTechFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchDevelopers = useCallback(async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      const params = {
        page: pageNum,
        limit: 10,
        search: searchQuery,
        role: roleFilter,
        techStack: techFilter,
        sortBy: sortBy
      };

      const response = await getDevelopers(params);
      
      if (append) {
        setDevelopers(prev => [...prev, ...response.data]);
      } else {
        setDevelopers(response.data);
      }

      setHasMore(response.pagination.hasMore);
      setPage(pageNum);
    } catch (error) {
      toast.error('Failed to load developers');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, roleFilter, techFilter, sortBy]);


  useEffect(() => {
    setPage(1);
    fetchDevelopers(1, false);
  }, [searchQuery, roleFilter, techFilter, sortBy]);

 
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchDevelopers(page + 1, true);
    }
  };

  const handleEdit = (developer) => {
    setEditData(developer);
    setShowForm(true);
  };

  const handleDeleteClick = (developer) => {
    setDeleteModal({ show: true, developer });
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await deleteDeveloper(deleteModal.developer._id);
      toast.success('Developer deleted successfully');
      setDeleteModal({ show: false, developer: null });
      fetchDevelopers(1, false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete developer');
    } finally {
      setDeleting(false);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditData(null);
  };

  const handleFormSuccess = () => {
    fetchDevelopers(1, false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddClick={() => setShowForm(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
          <div className="lg:block">
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
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>
          </div>

    
          {/* <div className="lg:hidden">
            <SearchBar
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilter}
              techFilter={techFilter}
              setTechFilter={setTechFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div> */}


          <div className="lg:col-span-2">
            <DeveloperList
              developers={developers}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          </div>
        </div>
      </div>

      {showForm && (
        <DeveloperForm
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
          editData={editData}
        />
      )}

      <DeleteConfirmModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, developer: null })}
        onConfirm={handleDeleteConfirm}
        developerName={deleteModal.developer?.fullName}
        loading={deleting}
      />
    </div>
  );
}

function App() {
  return (
    <>
    
      {/* <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
          },
        }}
      /> */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "white",
            color: "black",
          },
          className:
            "dark:bg-gray-900 dark:text-white dark:border dark:border-gray-700",
        }}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/developer/:id"
          element={
            <ProtectedRoute>
              <DeveloperProfile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;