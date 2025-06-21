import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { Experience } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { getColorScheme } from '../../context/ThemeContext';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ExperienceSchema = Yup.object().shape({
  period: Yup.string().trim().required('Period is required'),
  role: Yup.string().trim().required('Role is required'),
  company: Yup.string().trim().required('Company is required'),
  points: Yup.array()
    .of(Yup.string().trim().required('Point cannot be empty'))
    .min(1, 'At least one point is required'),
});

const ExperienceManager: React.FC = () => {
  const { experience, addExperience, updateExperience, deleteExperience } = useDataStore();
  const { colorScheme } = useTheme();
  const colors = getColorScheme(colorScheme);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialValues = {
    period: '',
    role: '',
    company: '',
    points: [''],
  };

  const handleEdit = (item: Experience) => {
    setIsAdding(false);
    setEditingId(item.id);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Experience Management
        </h2>
        <button
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
          }}
          className={`px-4 py-2 ${colors.button} text-white rounded-lg flex items-center gap-2`}
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {(isAdding || editingId) && (
        <Formik
          enableReinitialize
          initialValues={
            editingId
              ? experience.find((exp) => exp.id === editingId) || initialValues
              : initialValues
          }
          validationSchema={ExperienceSchema}
          onSubmit={(values, { resetForm }) => {
            if (editingId) {
              updateExperience(editingId, values);
              setEditingId(null);
            } else {
              addExperience(values);
              setIsAdding(false);
            }
            resetForm();
          }}
        >
          {({ values, errors, touched, isValid, dirty }) => (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">
                {editingId ? 'Edit Experience' : 'Add New Experience'}
              </h3>
              <Form className="space-y-4" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="period">
                      Period
                    </label>
                    <Field
                      id="period"
                      name="period"
                      placeholder="e.g., 2023 - Present"
                      className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white
                        ${errors.period && touched.period
                          ? 'border-red-600 focus:ring-red-500'
                          : 'border-slate-300 dark:border-slate-600'
                        }`}
                    />
                    <ErrorMessage
                      component="p"
                      name="period"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="company">
                      Company
                    </label>
                    <Field
                      id="company"
                      name="company"
                      placeholder="Company name"
                      className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white
                        ${errors.company && touched.company
                          ? 'border-red-600 focus:ring-red-500'
                          : 'border-slate-300 dark:border-slate-600'
                        }`}
                    />
                    <ErrorMessage
                      component="p"
                      name="company"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="role">
                    Role
                  </label>
                  <Field
                    id="role"
                    name="role"
                    placeholder="Job title"
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white
                      ${errors.role && touched.role
                        ? 'border-red-600 focus:ring-red-500'
                        : 'border-slate-300 dark:border-slate-600'
                      }`}
                  />
                  <ErrorMessage
                    component="p"
                    name="role"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Key Achievements</label>
                  <FieldArray name="points">
                    {({ push, remove }) => (
                      <>
                        {values.points.map((point, index) => (
                          <div key={index} className="flex flex-col mb-2">
                            <div className="flex gap-2">
                              <Field
                                name={`points.${index}`}
                                placeholder="Achievement or responsibility"
                                className={`flex-1 px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white
                                  ${errors.points?.[index] && touched.points?.[index]
                                    ? 'border-red-600 focus:ring-red-500'
                                    : 'border-slate-300 dark:border-slate-600'
                                  }`}
                              />
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                disabled={values.points.length === 1}
                                className="p-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <ErrorMessage
                              component="p"
                              name={`points.${index}`}
                              className="text-red-600 text-sm mt-1"
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push('')}
                          disabled={
                            values.points.some((p) => p.trim() === '') ||
                            (errors.points && errors.points.some((e) => e !== undefined))
                          }
                          className={`mt-2 px-3 py-2 text-white rounded-md ${colors.button} disabled:opacity-50`}
                        >
                          Add Point
                        </button>
                      </>
                    )}
                  </FieldArray>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    disabled={!isValid || !dirty}
                    className={`px-4 py-2 ${colors.button} text-white rounded-lg flex items-center gap-2 ${(!isValid || !dirty) && 'opacity-50 cursor-not-allowed'
                      }`}
                  >
                    <Save className="w-4 h-4" />
                    {editingId ? 'Update' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-slate-500 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      )}

      <div className="grid gap-4">
        {experience.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  {item.role}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">{item.company}</p>
                <p
                  className={`text-sm text-${colorScheme}-600 dark:text-${colorScheme}-400`}
                >
                  {item.period}
                </p>
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
                  onClick={() =>  deleteExperience(item.id)}
                  className="p-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
              {item.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceManager;

