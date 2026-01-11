import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, GraduationCap } from 'lucide-react';
import { Formik, Form, Field, FieldArray, ErrorMessage, getIn } from 'formik';
import * as Yup from 'yup';
import { useDataStore } from '../../store/dataStore'; // Ensure this handles education data
import { useTheme, getColorScheme } from '../../context/ThemeContext';
import { Education } from '../../types';

const validationSchema = Yup.object({
  period: Yup.string().required('Period is required'),
  degree: Yup.string().required('Degree is required'),
  institution: Yup.string().required('Institution is required'),
  points: Yup.array().of(Yup.string().required('Point is required')).min(1, 'At least one point is required'),
});

const initialValues: Education = {
  _id: '',
  period: '',
  degree: '',
  institution: '',
  points: ['']
};

const EducationManager: React.FC = () => {
  const { education, addEducation, updateEducation, deleteEducation } = useDataStore(); // Replace or extend store for this
  const { colorScheme } = useTheme();
  const colors = getColorScheme(colorScheme);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const cancelForm = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Education Management</h2>
        <button
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
          }}
          className={`px-4 py-2 ${colors.button} text-white rounded-lg flex items-center gap-2`}
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            {editingId ? 'Edit Education' : 'Add Education'}
          </h3>

          <Formik
            enableReinitialize
            initialValues={
              editingId
                ? education.find((e) => e._id === editingId) || initialValues
                : initialValues
            }
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              const data = {
                ...values,
                points: values.points.filter((p) => p.trim() !== ''),
              };

              if (editingId) {
                updateEducation(data._id, data);
                setEditingId(null);
              } else {
                addEducation(data);
                setIsAdding(false);
              }
              resetForm();
            }}
          >
            {({ values, errors, touched }) => (
              <Form className="space-y-4">
                {/* Period */}
                <div>
                  <label className="block text-sm font-medium mb-1">Period</label>
                  <Field
                    name="period"
                    className={`w-full px-3 py-2 border rounded-lg ${getIn(touched, 'period') && getIn(errors, 'period')
                      ? 'border-red-600'
                      : 'border-slate-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  />
                  <ErrorMessage name="period" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                {/* Degree */}
                <div>
                  <label className="block text-sm font-medium mb-1">Degree</label>
                  <Field
                    name="degree"
                    className={`w-full px-3 py-2 border rounded-lg ${getIn(touched, 'degree') && getIn(errors, 'degree')
                      ? 'border-red-600'
                      : 'border-slate-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  />
                  <ErrorMessage name="degree" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                {/* Institution */}
                <div>
                  <label className="block text-sm font-medium mb-1">Institution</label>
                  <Field
                    name="institution"
                    className={`w-full px-3 py-2 border rounded-lg ${getIn(touched, 'institution') && getIn(errors, 'institution')
                      ? 'border-red-600'
                      : 'border-slate-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  />
                  <ErrorMessage name="institution" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                {/* Points */}
                <FieldArray name="points">
                  {({ push, remove }) => {
                    const lastIndex = values.points.length - 1;
                    const canAdd = values.points[lastIndex]?.trim() !== '';

                    return (
                      <div>
                        <label className="block text-sm font-medium mb-1">Points</label>
                        {values.points.map((point, idx) => {
                          const fieldError = getIn(errors, `points.${idx}`);
                          const fieldTouched = getIn(touched, `points.${idx}`);
                          const hasError = fieldTouched && fieldError;

                          return (
                            <div key={idx} className="mb-2">
                              <div className="flex gap-2">
                                <Field
                                  name={`points.${idx}`}
                                  className={`flex-1 px-3 py-2 border rounded-lg ${hasError ? 'border-red-600' : 'border-slate-300 dark:border-slate-600'
                                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                                />
                                <button
                                  type="button"
                                  onClick={() => remove(idx)}
                                  className="p-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
                                  disabled={values.points.length === 1}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              {hasError && (
                                <div className="text-red-600 text-sm mt-1">{fieldError}</div>
                              )}
                            </div>
                          );
                        })}
                        <button
                          type="button"
                          onClick={() => push('')}
                          className={`mt-2 px-3 py-2 text-white rounded-md ${colors.button} disabled:opacity-50`}
                          disabled={!canAdd}
                        >
                          Add Point
                        </button>
                      </div>
                    );
                  }}
                </FieldArray>


                {/* Actions */}
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

      {/* Education List */}
      <div className="grid gap-4">
        {education.map((edu) => (
          <div key={edu._id} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{edu.degree}</h3>
                <p className="text-slate-600 dark:text-slate-300">{edu.institution}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{edu.period}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(edu._id);
                  }}
                  className={`p-2 rounded-md text-white ${colors.button}`}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteEducation(edu._id)}
                  className="p-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300">
              {edu.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {education.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap className="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400">No Eduction Details available yet.</p>
        </div>
      )}
    </div>
  );
};

export default EducationManager;
