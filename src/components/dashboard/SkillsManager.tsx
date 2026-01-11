import React, { useState } from 'react';
import { useFormik, FormikProvider, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';
import { Plus, Edit, Trash2, Save, X, Code } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { Skill } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { getColorScheme } from '../../context/ThemeContext';

const SkillsManager: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = useDataStore();
  const { colorScheme } = useTheme();
  const colors = getColorScheme(colorScheme);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const iconOptions = ['Code', 'Layout', 'Server', 'Database', 'Cloud', 'Smartphone', 'Palette'];

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    icon: Yup.string().required('Icon is required'),
    skills: Yup.array()
      .of(Yup.string().trim().required('Skill cannot be empty'))
      .min(1, 'At least one skill is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      icon: 'Code',
      skills: [''],
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const filteredSkills = values.skills.filter(skill => skill.trim() !== '');

      if (editingId) {
        updateSkill(editingId, { ...values, skills: filteredSkills });
        setEditingId(null);
      } else {
        addSkill({ ...values, skills: filteredSkills });
        setIsAdding(false);
      }

      formik.resetForm();
    },
  });

  const handleEdit = (item: Skill) => {
    formik.setValues({
      title: item.title,
      icon: item.icon,
      skills: item.skills,
    });
    setEditingId(item._id);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    formik.resetForm();
  };

  const lastSkillFilled = formik.values.skills[formik.values.skills.length - 1]?.trim().length > 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Skills Management</h2>
        <button
          onClick={() => {
            formik.resetForm();
            setIsAdding(true);
            setEditingId(null);
          }}
          className={`px-4 py-2 ${colors.button} text-white rounded-lg flex items-center gap-2`}
        >
          <Plus className="w-4 h-4" />
          Add Skill Category
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            {editingId ? 'Edit Skill Category' : 'Add New Skill Category'}
          </h3>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white 
                      ${formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`}
                    placeholder="e.g., Frontend Development"
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.title}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Icon</label>
                  <select
                    name="icon"
                    value={formik.values.icon}
                    onChange={formik.handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Skills</label>
                <FieldArray name="skills">
                  {({ remove, push }) => (
                    <>
                      {formik.values.skills.map((skill, index) => {
                        const touched = getIn(formik.touched, `skills.${index}`);
                        const error = getIn(formik.errors, `skills.${index}`);

                        return (
                          <div key={index} className="flex flex-col gap-1 mb-2">
                            <div className="flex gap-2">
                              <input
                                name={`skills.${index}`}
                                value={skill}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Skill name"
                                className={`flex-1 px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${touched && error
                                    ? 'border-red-600 focus:ring-red-500'
                                    : 'border-slate-300 dark:border-slate-600'
                                  }`}
                              />
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                disabled={formik.values.skills.length === 1}
                                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            {touched && error && (
                              <div className="text-red-600 text-sm">{error}</div>
                            )}
                          </div>
                        );
                      })}

                      {formik.touched.skills && typeof formik.errors.skills === 'string' && (
                        <div className="text-red-600 text-sm mb-2">{formik.errors.skills}</div>
                      )}

                      <button
                        type="button"
                        onClick={() => push('')}
                        disabled={!lastSkillFilled}
                       className={`mt-2 px-3 py-2 text-white rounded-md ${colors.button} disabled:opacity-50`}
                      >
                        Add Skill
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 text-white ${formik.isValid && !formik.isSubmitting
                      ? colors.button
                      : `opacity-50 cursor-not-allowed ${colors.button}`
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
            </form>
          </FormikProvider>
        </div>
      )}

      <div className="grid gap-4">
        {skills.map((item) => (
          <div key={item._id} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">Icon: {item.icon}</p>
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
                  onClick={() => deleteSkill(item._id)}
                  className="p-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>

            </div>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300">
              {item.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
          <div className="text-center py-12">
            <Code className="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">No Skill Details available yet.</p>
          </div>
        )}
    </div>
  );
};

export default SkillsManager;

