import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Loader } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { Certificate } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { getColorScheme } from '../../context/ThemeContext';
import { useFormik, FormikProvider, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getIn } from 'formik';


const certificateSchema = Yup.object({
  title: Yup.string().required('Certificate title is required'),
  issuer: Yup.string().required('Issuer is required'),
  date: Yup.string().required('Date is required'),
  credentialId: Yup.string().required('Credential ID is required'),
  image: Yup.string().url('Invalid URL').required('Image URL is required'),
  link: Yup.string().url('Invalid URL').required('Certificate link is required'),
  skills: Yup.array()
    .of(Yup.string().trim().required('Skill cannot be empty'))
    .min(1, 'At least one skill is required'),
});

const CertificatesManager: React.FC = () => {
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useDataStore();
  const { colorScheme } = useTheme();
  const colors = getColorScheme(colorScheme);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
    const [isUploadingMainImage, setIsUploadingMainImage] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: '',
      issuer: '',
      date: '',
      credentialId: '',
      image: '',
      link: '',
      skills: [''],
    },
    validationSchema: certificateSchema,
    onSubmit: (values, { resetForm }) => {
      if (editingId) {
        updateCertificate(editingId, values);
        setEditingId(null);
      } else {
        addCertificate(values);
        setIsAdding(false);
      }
      resetForm();
    },
    enableReinitialize: true,
  });

  // Load certificate data into form when editingId changes
  useEffect(() => {
    if (editingId) {
      const cert = certificates.find((c) => c.id === editingId);
      if (cert) {
        formik.setValues({
          title: cert.title,
          issuer: cert.issuer,
          date: cert.date,
          credentialId: cert.credentialId,
          image: cert.image,
          link: cert.link,
          skills: cert.skills.length ? cert.skills : [''],
        });
        setIsAdding(false);
      }
    } else {
      formik.resetForm();
    }
  }, [editingId, certificates]);

  const handleEdit = (item: Certificate) => {
    setEditingId(item.id);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    formik.resetForm();
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    formik.resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Certificates Management</h2>
        <button
          onClick={handleAddNew}
          className={`px-4 py-2 ${colors.button} text-white rounded-lg flex items-center gap-2`}
          disabled={isAdding || editingId !== null}
        >
          <Plus className="w-4 h-4" />
          Add Certificate
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">{editingId ? 'Edit Certificate' : 'Add New Certificate'}</h3>

          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Certificate Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${formik.touched.title && formik.errors.title
                    ? 'border-red-500'
                    : 'border-slate-300 dark:border-slate-600'
                    }`}
                  placeholder="e.g., AWS Certified Solutions Architect"
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="issuer" className="block text-sm font-medium mb-1">
                    Issuer
                  </label>
                  <input
                    id="issuer"
                    name="issuer"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.issuer}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${formik.touched.issuer && formik.errors.issuer
                      ? 'border-red-500'
                      : 'border-slate-300 dark:border-slate-600'
                      }`}
                    placeholder="e.g., Amazon Web Services"
                  />
                  {formik.touched.issuer && formik.errors.issuer && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.issuer}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-1">
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${formik.touched.date && formik.errors.date
                      ? 'border-red-500'
                      : 'border-slate-300 dark:border-slate-600'
                      }`}
                    placeholder="e.g., 2023"
                  />
                  {formik.touched.date && formik.errors.date && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.date}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="credentialId" className="block text-sm font-medium mb-1">
                    Credential ID
                  </label>
                  <input
                    id="credentialId"
                    name="credentialId"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.credentialId}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${formik.touched.credentialId && formik.errors.credentialId
                      ? 'border-red-500'
                      : 'border-slate-300 dark:border-slate-600'
                      }`}
                    placeholder="e.g., AWS-123456"
                  />
                  {formik.touched.credentialId && formik.errors.credentialId && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.credentialId}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="link" className="block text-sm font-medium mb-1">
                    Certificate Link
                  </label>
                  <input
                    id="link"
                    name="link"
                    type="url"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.link}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${formik.touched.link && formik.errors.link
                      ? 'border-red-500'
                      : 'border-slate-300 dark:border-slate-600'
                      }`}
                    placeholder="https://example.com/certificate"
                  />
                  {formik.touched.link && formik.errors.link && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.link}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Main Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.currentTarget.files?.[0];
                    if (!file) return;

                    setIsUploadingMainImage(true);

                    const formData = new FormData();
                    formData.append('file', file);

                    try {
                      const response = await fetch('https://httpbin.org/post', {
                        method: 'POST',
                        body: formData,
                      });
                      if (!response.ok) throw new Error('Upload failed');

                      const data = await response.json();
                      // Set the image URL in Formik's state
                      formik.setFieldValue('image', "https://images.unsplash.com/photo-1599009434802-ca1dd09895e7");
                    } catch (error) {
                      console.error('Upload error:', error);
                      // Optional: Show some error UI here
                    } finally {
                      setIsUploadingMainImage(false);
                    }
                  }}
                  disabled={isUploadingMainImage}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white
      ${getIn(formik.touched, 'image') && getIn(formik.errors, 'image') ? 'border-red-600' : 'border-slate-300 dark:border-slate-600'}
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
                {formik.values.image && !isUploadingMainImage && (
                  <img src={formik.values.image} alt="Main" className="mt-2 w-40 h-40 object-cover rounded" />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Skills Covered</label>
                <FieldArray
                  name="skills"
                  render={(arrayHelpers) => (
                    <>
                      {formik.values.skills.map((skill, index) => {
                        const touchedSkill = formik.touched.skills?.[index];
                        const errorSkill = formik.errors.skills?.[index];

                        return (
                          <div key={index} className="flex flex-col gap-1 mb-2">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                name={`skills.${index}`}
                                value={skill}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Skill name"
                                className={`flex-1 px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${touchedSkill && errorSkill ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                                  }`}
                              />

                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                                disabled={formik.values.skills.length === 1}
                                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            {touchedSkill && errorSkill && (
                              <p className="text-red-500 text-xs mt-1">{formik.errors.skills}</p>
                            )}

                          </div>
                        );

                      })}

                      <button
                        type="button"
                        onClick={() => arrayHelpers.push('')}
                        disabled={
                          formik.values.skills.length > 0 &&
                          formik.values.skills[formik.values.skills.length - 1].trim() === ''
                        }
                        className={`mt-2 px-3 py-2 text-white rounded-md ${colors.button} disabled:opacity-50`}
                      >
                        Add Skill
                      </button>

                    </>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 text-white ${!formik.isValid || formik.isSubmitting
                    ? 'opacity-50 cursor-not-allowed ' + colors.button
                    : colors.button
                    }`}
                >
                  <Save className="w-4 h-4" />
                  {editingId ? 'Update' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </FormikProvider>
        </div>
      )}

      <div className="grid gap-4">
        {certificates.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{item.issuer}</p>
                  <p className={`text-sm text-${colorScheme}-600 dark:text-${colorScheme}-400`}>
                    {item.date} • {item.credentialId}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className={`p-2 rounded-md text-white ${colors.button}`}
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => deleteCertificate(item.id)}
                  className="p-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 text-sm bg-${colorScheme}-100 dark:bg-${colorScheme}-900/20 text-${colorScheme}-700 dark:text-${colorScheme}-300 rounded`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificatesManager;
