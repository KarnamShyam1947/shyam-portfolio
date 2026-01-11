import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, BookOpen } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { Publication } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { getColorScheme } from '../../context/ThemeContext';
import { Formik, Form, Field, FieldArray, ErrorMessage, getIn } from 'formik';
import * as Yup from 'yup';

const publicationSchema = Yup.object({
  title: Yup.string().required('Required'),
  authors: Yup.array().of(Yup.string().required('Author name is required')).min(1, 'At least one author is required'),
  journal: Yup.string().required('Required'),
  year: Yup.string().required('Required').matches(/^\d{4}$/, 'Enter a valid 4-digit year'),
  doi: Yup.string().optional(),
  keywords: Yup.array().of(Yup.string().required('Keyword is required')).min(1, 'At least one keyword is required'),
  type: Yup.mixed<'journal' | 'conference' | 'preprint'>()
    .oneOf(['journal', 'conference', 'preprint'])
    .required('Required'),
  status: Yup.mixed<'published' | 'accepted' | 'under-review'>()
    .oneOf(['published', 'accepted', 'under-review'])
    .required('Required'),
  link: Yup.string().url('Invalid URL').optional(),
});

const PublicationsManager: React.FC = () => {
  const { publications, addPublication, updatePublication, deletePublication } = useDataStore();
  const { colorScheme } = useTheme();
  const colors = getColorScheme(colorScheme);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const initialValues = {
    title: '',
    authors: [''],
    journal: '',
    year: '',
    doi: '',
    keywords: [''],
    type: 'journal',
    status: 'published',
    link: '',
  };

  const startEdit = (item: Publication) => {
    setEditingId(item._id);
    setShowForm(true);
  };

  const cancelEdit = (resetForm: () => void) => {
    resetForm();
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Publications Management</h2>
        {!showForm && (
          <button
            onClick={() => {
              setEditingId(null);
              setShowForm(true);
            }}
            className={`inline-flex items-center gap-1 px-3 py-2 text-white rounded-md ${colors.button} `}
          >
            <Plus size={16} />
            Add Publication
          </button>
        )}
      </div>

      {showForm && (
        <Formik
          enableReinitialize
          initialValues={
            editingId
              ? (() => {
                const pub = publications.find((p) => p._id === editingId)!;
                return {
                  title: pub.title,
                  authors: pub.authors.length > 0 ? pub.authors : [''],
                  journal: pub.journal,
                  year: pub.year,
                  doi: pub.doi || '',
                  keywords: pub.keywords.length > 0 ? pub.keywords : [''],
                  type: pub.type,
                  status: pub.status,
                  link: pub.link || '',
                };
              })()
              : initialValues
          }
          validationSchema={publicationSchema}
          onSubmit={(values, { resetForm }) => {
            const dataToSave = {
              ...values,
              authors: values.authors.filter((a) => a.trim() !== ''),
              keywords: values.keywords.filter((k) => k.trim() !== ''),
              doi: values.doi || undefined,
              link: values.link || undefined,
            };

            if (editingId) {
              updatePublication(editingId, dataToSave);
            } else {
              addPublication(dataToSave);
            }

            resetForm();
            setEditingId(null);
            setShowForm(false);
          }}
        >
          {({ values, errors, touched, isSubmitting, resetForm }) => {
            const fieldClasses = (fieldName: string) =>
              `w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${getIn(touched, fieldName) && getIn(errors, fieldName) ? 'border-red-600' : 'border-slate-300 dark:border-slate-600'
              }`;

            return (
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">{editingId ? 'Edit Publication' : 'Add New Publication'}</h3>
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Field name="title" type="text" className={fieldClasses('title')} placeholder="Publication title" />
                    <ErrorMessage name="title" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Type</label>
                      <Field as="select" name="type" className={fieldClasses('type')}>
                        <option value="journal">Journal</option>
                        <option value="conference">Conference</option>
                        <option value="preprint">Preprint</option>
                      </Field>
                      <ErrorMessage name="type" component="div" className="text-red-600 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Status</label>
                      <Field as="select" name="status" className={fieldClasses('status')}>
                        <option value="published">Published</option>
                        <option value="accepted">Accepted</option>
                        <option value="under-review">Under Review</option>
                      </Field>
                      <ErrorMessage name="status" component="div" className="text-red-600 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Year</label>
                      <Field name="year" type="text" placeholder="2023" className={fieldClasses('year')} />
                      <ErrorMessage name="year" component="div" className="text-red-600 text-sm mt-1" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Journal/Conference</label>
                      <Field name="journal" type="text" className={fieldClasses('journal')} placeholder="Name" />
                      <ErrorMessage name="journal" component="div" className="text-red-600 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">DOI (optional)</label>
                      <Field name="doi" type="text" className={fieldClasses('doi')} placeholder="DOI" />
                      <ErrorMessage name="doi" component="div" className="text-red-600 text-sm mt-1" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Link (optional)</label>
                    <Field name="link" type="url" className={fieldClasses('link')} placeholder="https://example.com" />
                    <ErrorMessage name="link" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <FieldArray name="authors">
                    {({ push, remove }) => (
                      <div>
                        <label className="block text-sm font-medium mb-1">Authors</label>
                        {values.authors.map((_, idx) => {
                          const name = `authors.${idx}`;
                          return (
                            <div key={idx} className="mb-2 flex items-center gap-2">
                              <Field name={name} className={fieldClasses(name)} placeholder="Author" />
                              <button
                                type="button"
                                onClick={() => remove(idx)}
                                className="p-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
                                disabled={values.authors.length === 1}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          );
                        })}
                        <button
                          type="button"
                          onClick={() => push('')}
                          className={`mt-2 px-3 py-2 text-white rounded-md ${colors.button} disabled:opacity-50`}
                          disabled={values.authors.some((author) => author.trim() === '')}
                        >
                          Add Author
                        </button>
                      </div>
                    )}
                  </FieldArray>


                  <FieldArray name="keywords">
                    {({ push, remove }) => (
                      <div>
                        <label className="block text-sm font-medium mb-1 mt-4">Keywords</label>
                        {values.keywords.map((_, idx) => {
                          const name = `keywords.${idx}`;
                          return (
                            <div key={idx} className="mb-2 flex items-center gap-2">
                              <Field name={name} className={fieldClasses(name)} placeholder="Keyword" />
                              <button
                                type="button"
                                onClick={() => remove(idx)}
                                className="p-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
                                disabled={values.keywords.length === 1}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          );
                        })}
                        <button
                          type="button"
                          onClick={() => push('')}
                          className={`mt-2 px-3 py-2 text-white rounded-md ${colors.button} disabled:opacity-50`}
                          disabled={values.keywords.some((k) => k.trim() === '')}
                        >
                          Add Keyword
                        </button>
                      </div>
                    )}
                  </FieldArray>


                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => cancelEdit(resetForm)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`px-4 py-2 rounded-md text-white ${colors.button}`}
                      disabled={isSubmitting}
                    >
                      <Save size={16} className="inline-block mr-2" />
                      {editingId ? 'Update' : 'Save'}
                    </button>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      )}

      {/* Publications List */}
      <div className="mt-6">
        {publications.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400"></p>
        ) : (
          <ul className="space-y-4">
            {publications.map((pub) => (
              <li
                key={pub._id}
                className="p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 flex justify-between items-start"
              >
                <div>
                  <h4 className="font-semibold text-lg text-slate-900 dark:text-white">{pub.title}</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {pub.authors.join(', ')} — {pub.journal} ({pub.year})
                  </p>
                  <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">
                    Type: {pub.type}, Status: {pub.status}
                  </p>
                  {pub.doi && (
                    <p className="text-xs text-blue-500 underline mt-1">
                      DOI: <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer">{pub.doi}</a>
                    </p>
                  )}
                  {pub.link && (
                    <p className="text-xs text-blue-500 underline mt-1">
                      Link: <a href={pub.link} target="_blank" rel="noreferrer">{pub.link}</a>
                    </p>
                  )}
                  <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">Keywords: {pub.keywords.join(', ')}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => startEdit(pub)}
                    className={`p-2 rounded-md text-white ${colors.button}`}
                    title="Edit"
                    aria-label={`Edit ${pub.title}`}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => deletePublication(pub._id)}
                    className="p-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                    title="Delete"
                    aria-label={`Delete ${pub.title}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {publications.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">No publications available yet.</p>
          </div>
        )}
    </div>
  );
};

export default PublicationsManager;
