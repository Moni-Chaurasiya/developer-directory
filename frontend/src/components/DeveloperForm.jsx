import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { createDeveloper, updateDeveloper } from '../services/api';
import { useState, useEffect } from 'react';

const schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['Frontend', 'Backend', 'Full-Stack'], {
    errorMap: () => ({ message: 'Please select a role' })
  }),
  techStack: z.string().min(2, 'Tech stack is required'),
  experience: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Experience must be a positive number'
  }),
  description: z.string().optional()
});

const DeveloperForm = ({ onClose, onSuccess, editData = null }) => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const isEditMode = !!editData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: editData ? {
      fullName: editData.fullName,
      role: editData.role,
      techStack: editData.techStack,
      experience: editData.experience.toString(),
      description: editData.description || ''
    } : {}
  });


  useEffect(() => {
    if (editData?.photo) {
      setPhotoPreview(editData.photo);
    }
  }, [editData]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

  
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      setPhotoFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
    
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('role', data.role);
      formData.append('techStack', data.techStack);
      formData.append('experience', data.experience);
      formData.append('description', data.description || 'No description provided');

    
      if (photoFile) {
        formData.append('photo', photoFile);
      }

      if (isEditMode) {
        await updateDeveloper(editData._id, formData);
        toast.success('Developer updated successfully!');
      } else {
        await createDeveloper(formData);
        toast.success('Developer added successfully!');
      }

      reset();
      setPhotoPreview(null);
      setPhotoFile(null);
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save developer');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-2xl border border-gray-200 dark:border-gray-800 my-8">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isEditMode ? 'Edit Developer' : 'Add Developer'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Photo (Optional)
            </label>
            <div className="flex items-center gap-4">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <ImageIcon className="h-10 w-10 text-gray-400" />
                </div>
              )}
              <label className="cursor-pointer">
                <div className="px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {photoPreview ? 'Change Photo' : 'Upload Photo'}
                  </span>
                </div>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Max size: 5MB. Formats: JPG, PNG, GIF
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                {...register('fullName')}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
                placeholder="Enter full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <select
                {...register('role')}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
              >
                <option value="">Select role</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Full-Stack">Full-Stack</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tech Stack (comma separated)
            </label>
            <input
              type="text"
              name="techStack"
              {...register('techStack')}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
              placeholder="e.g., React, Node, MongoDB"
            />
            {errors.techStack && (
              <p className="mt-1 text-sm text-red-500">{errors.techStack.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Experience (Years)
            </label>
            <input
              type="number"
              name="experience"
              {...register('experience')}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
              placeholder="e.g., 2"
              min="0"
            />
            {errors.experience && (
              <p className="mt-1 text-sm text-red-500">{errors.experience.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (Optional)
            </label>
            <textarea
              {...register('description')}
              rows="4"
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white resize-none"
              placeholder="Tell us about this developer..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-medium rounded-lg transition-colors"
          >
            {isSubmitting ? (
              isEditMode ? 'Updating...' : 'Adding...'
            ) : (
              isEditMode ? 'Update Developer' : 'Add Developer'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeveloperForm;