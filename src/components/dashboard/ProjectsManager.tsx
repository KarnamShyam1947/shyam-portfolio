import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, ExternalLink, Github, Loader } from 'lucide-react';
import { Formik, Form, Field, FieldArray, ErrorMessage, getIn } from 'formik';
import * as Yup from 'yup';
import { useDataStore } from '../../store/dataStore';
import { useTheme, getColorScheme } from '../../context/ThemeContext';
import { Project } from '../../types';
import { uploadFile } from '../../services/apiService';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  overview: Yup.string().required('Overview is required'),
  image: Yup.string().url('Must be a valid URL').required('Main image is required'),
  categories: Yup.string().oneOf(['all', 'web', 'aiml', 'blockchain', 'devops']).required('Category is required'),
  technologies: Yup.array().of(Yup.string().required('Technology is required')).min(1),
  images: Yup.array().of(
    Yup.object({
      url: Yup.string().url('Must be a valid URL').required('Image URL is required'),
      subtitle: Yup.string().required('Subtitle is required')
    })
  ),
  liveUrl: Yup.string().url('Must be a valid URL').nullable(),
  githubUrl: Yup.string().url('Must be a valid URL').nullable(),
  featured: Yup.boolean()
});

const cs = {
  all: 'All Projects',
  web: 'Web Development',
  aiml: 'AI / ML',
  blockchain: 'Blockchain',
  devops: 'Cloud & DevOps'
}

const initialValues: Project = {
  id: 0,
  title: '',
  description: '',
  overview: '',
  image: '',
  categories: ['web'],
  technologies: [''],
  images: [{ url: '', subtitle: '' }],
  liveUrl: '',
  githubUrl: '',
  featured: false
};

const ProjectsManager: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useDataStore();
  const { colorScheme } = useTheme();
  const colors = getColorScheme(colorScheme);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isUploadingMainImage, setIsUploadingMainImage] = useState(false);
  const [uploadingIndexes, setUploadingIndexes] = useState<Set<number>>(new Set());

  const cancelForm = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Projects Management</h2>
        <button
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
          }}
          className={`px-4 py-2 ${colors.button} text-white rounded-lg flex items-center gap-2`}
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h3>

          <Formik
            enableReinitialize
            initialValues={
              editingId
                ? projects.find((p) => p.id === editingId) || initialValues
                : initialValues
            }
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              const cleaned = {
                ...values,
                technologies: values.technologies.filter((tech) => tech.trim() !== ''),
                images: values.images.filter((img) => img.url && img.subtitle),
                liveUrl: values.liveUrl || null,
                githubUrl: values.githubUrl || null
              };

              if (editingId) {
                updateProject(editingId, cleaned);
                setEditingId(null);
              } else {
                addProject(cleaned);
                setIsAdding(false);
              }
              resetForm();
            }}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Field
                    name="title"
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${getIn(touched, 'title') && getIn(errors, 'title')
                      ? 'border-red-600'
                      : 'border-slate-300 dark:border-slate-600'
                      }`}
                  />
                  <ErrorMessage name="title" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Field
                    as="textarea"
                    name="description"
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${getIn(touched, 'description') && getIn(errors, 'description')
                      ? 'border-red-600'
                      : 'border-slate-300 dark:border-slate-600'
                      }`}
                  />
                  <ErrorMessage name="description" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                {/* Overview */}
                <div>
                  <label className="block text-sm font-medium mb-1">Overview</label>
                  <Field
                    as="textarea"
                    name="overview"
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${getIn(touched, 'overview') && getIn(errors, 'overview')
                      ? 'border-red-600'
                      : 'border-slate-300 dark:border-slate-600'
                      }`}
                  />
                  <ErrorMessage name="overview" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                {/* Category & Featured */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <Field
                      as="select"
                      name="category"
                      className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${getIn(touched, 'category') && getIn(errors, 'category')
                        ? 'border-red-600'
                        : 'border-slate-300 dark:border-slate-600'
                        }`}
                    >
                      <option value="web">Web</option>
                      <option value="mobile">Mobile</option>
                      <option value="design">Design</option>
                    </Field>
                    <ErrorMessage name="category" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                  <label className="flex items-center space-x-2 pt-8">
                    <Field type="checkbox" name="featured" className="mr-2" />
                    <span className="text-sm font-medium">Featured</span>
                  </label>
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium mb-1">Main Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.currentTarget.files?.[0];
                      if (!file) return;

                      setIsUploadingMainImage(true);

                      try {
                        const imageUrl = await uploadFile(file);
                        setFieldValue('image', imageUrl);
                      } catch (error) {
                        console.error('Upload error:', error);
                      } finally {
                        setIsUploadingMainImage(false);
                      }
                    }}
                    disabled={isUploadingMainImage}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white
      ${getIn(touched, 'image') && getIn(errors, 'image') ? 'border-red-600' : 'border-slate-300 dark:border-slate-600'}
    `}
                  />
                  {isUploadingMainImage && (
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 italic mt-1">
                      <Loader className='animate-spin' />
                      Uploading...
                    </div>
                  )}
                  <ErrorMessage name="image" component="div" className="text-red-600 text-sm mt-1" />
                  {/* Optional: Show a preview of the uploaded image */}
                  {values.image && !isUploadingMainImage && (
                    <img src={values.image} alt="Main" className="mt-2 w-40 h-40 object-cover rounded" />
                  )}
                </div>

                {/* Images  */}
                <FieldArray name="images">
                  {({ push, remove, form }) => {
                    const { values, setFieldValue, touched, errors } = form;

                    const lastImage = values.images[values.images.length - 1];
                    const canAddImage = lastImage && lastImage.url && lastImage.url.trim() !== '';

                    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
                      const file = event.currentTarget.files?.[0];
                      if (!file) return;

                      setUploadingIndexes((prev) => new Set(prev).add(index));

                      try {
                        const imageUrl = await uploadFile(file);
                        setFieldValue(`images.${index}.url`, imageUrl);
                      } catch (error) {
                        console.error('Upload error:', error);
                      } finally {
                        setUploadingIndexes((prev) => {
                          const newSet = new Set(prev);
                          newSet.delete(index);
                          return newSet;
                        });
                      }
                    };

                    return (
                      <div>
                        <label className="block text-sm font-medium mb-1">Additional Images</label>
                        {values.images.map((img: any, idx: number) => {
                          const urlTouched = getIn(touched, `images.${idx}.url`);
                          const urlError = getIn(errors, `images.${idx}.url`);
                          const subtitleTouched = getIn(touched, `images.${idx}.subtitle`);
                          const subtitleError = getIn(errors, `images.${idx}.subtitle`);

                          const isUploading = uploadingIndexes.has(idx);

                          return (
                            <div key={idx} className="flex flex-col gap-1 mb-2">
                              <div className="flex gap-2 items-center">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileChange(e, idx)}
                                  disabled={isUploading}
                                  className={`flex-1 px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${urlTouched && urlError ? 'border-red-600' : 'border-slate-300 dark:border-slate-600'
                                    }`}
                                />
                                {isUploading && (
                                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 italic">
                                    <Loader className='animate-spin' />
                                    Uploading...
                                  </div>
                                )}
                                {img.url && (
                                  <img
                                    src={img.url}
                                    alt={`Uploaded #${idx + 1}`}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                )}
                                <Field
                                  name={`images.${idx}.subtitle`}
                                  placeholder="Subtitle"
                                  className={`flex-1 px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${subtitleTouched && subtitleError ? 'border-red-600' : 'border-slate-300 dark:border-slate-600'
                                    }`}
                                  disabled={isUploading}
                                />
                                <button
                                  type="button"
                                  onClick={() => remove(idx)}
                                  disabled={values.images.length === 1 || isUploading}
                                  className="p-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              {urlTouched && urlError && <div className="text-red-600 text-sm">{urlError}</div>}
                              {subtitleTouched && subtitleError && <div className="text-red-600 text-sm">{subtitleError}</div>}
                            </div>
                          );
                        })}
                        <button
                          type="button"
                          onClick={() => push({ url: '', subtitle: '' })}
                          disabled={!canAddImage}
                          className={`mt-2 px-3 py-2 text-white rounded-md ${colors.button} disabled:opacity-50`}
                        >
                          Add Image
                        </button>
                      </div>
                    );
                  }}
                </FieldArray>


                {/* Technologies */}
                <FieldArray name="technologies">
                  {({ push, remove }) => {
                    // Check if all technologies are non-empty and valid (no errors)
                    const allTechValid =
                      values.technologies.length > 0 &&
                      values.technologies.every((t: string, i: number) => t.trim() !== '' && !(getIn(errors, `technologies.${i}`) && getIn(touched, `technologies.${i}`)));

                    return (
                      <div>
                        <label className="block text-sm font-medium mb-1">Technologies</label>
                        {values.technologies.map((tech: string, idx: number) => {
                          const isError = getIn(touched, `technologies.${idx}`) && getIn(errors, `technologies.${idx}`);
                          return (
                            <div key={idx} className="flex gap-2 mb-2">
                              <Field
                                name={`technologies.${idx}`}
                                className={`flex-1 px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${isError ? 'border-red-600' : 'border-slate-300 dark:border-slate-600'
                                  }`}
                              />
                              <button
                                type="button"
                                onClick={() => remove(idx)}
                                className="p-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
                                disabled={values.technologies.length === 1}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          );
                        })}
                        <button
                          type="button"
                          onClick={() => push('')}
                          disabled={!allTechValid}
                          className={`mt-2 px-3 py-2 text-white rounded-md ${colors.button} disabled:opacity-50`}
                        >
                          Add Technology
                        </button>
                      </div>
                    );
                  }}
                </FieldArray>

                {/* Submit / Cancel */}
                <div className="flex justify-end gap-2">
                  <button type="submit" className={`px-4 py-2 ${colors.button} text-white rounded-lg flex items-center gap-2`}>
                    <Save className="w-4 h-4" />
                    {editingId ? 'Update' : 'Save'}
                  </button>
                  <button type="button" onClick={cancelForm} className="px-4 py-2 bg-slate-500 text-white rounded-lg">
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {/* Projects List */}
      <div className="grid gap-4">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{proj.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">
                   {proj.categories.map(cat => cs[cat]).join(", ")}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(proj.id);
                  }}
                  className={`p-2 rounded-md text-white ${colors.button}`}
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => deleteProject(proj.id)}
                  className="p-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-2">{proj.description}</p>

            <div className="flex gap-4 mt-3">
              {proj.liveUrl && (
                <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                  <ExternalLink size={14} /> Live
                </a>
              )}
              {proj.githubUrl && (
                <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                  <Github size={14} /> GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsManager;
