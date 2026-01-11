import { create } from 'zustand';
import { Education, Experience, Skill, Certificate, Publication, Project, HeroSection } from '../types';
import * as api from '../services/apiService';

interface DataState {
  // Data
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  certificates: Certificate[];
  publications: Publication[];
  projects: Project[];
  heroSection: HeroSection;

  // Loading states
  loading: {
    education: boolean;
    experience: boolean;
    skills: boolean;
    certificates: boolean;
    publications: boolean;
    projects: boolean;
    heroSection: boolean;
  };

  // Fetch all data
  fetchAllData: () => Promise<void>;

  // Education actions
  fetchEducation: () => Promise<void>;
  addEducation: (education: Omit<Education, '_id'>) => Promise<void>;
  updateEducation: (id: string, education: Partial<Education>) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;

  // Experience actions
  fetchExperience: () => Promise<void>;
  addExperience: (experience: Omit<Experience, '_id'>) => Promise<void>;
  updateExperience: (id: string, experience: Partial<Experience>) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;

  // Skills actions
  fetchSkills: () => Promise<void>;
  addSkill: (skill: Omit<Skill, '_id'>) => Promise<void>;
  updateSkill: (id: string, skill: Partial<Skill>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;

  // Certificates actions
  fetchCertificates: () => Promise<void>;
  addCertificate: (certificate: Omit<Certificate, '_id'>) => Promise<void>;
  updateCertificate: (id: string, certificate: Partial<Certificate>) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;

  // Publications actions
  fetchPublications: () => Promise<void>;
  addPublication: (publication: Omit<Publication, '_id'>) => Promise<void>;
  updatePublication: (id: string, publication: Partial<Publication>) => Promise<void>;
  deletePublication: (id: string) => Promise<void>;

  // Projects actions
  fetchProjects: () => Promise<void>;
  addProject: (project: Omit<Project, '_id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  // Hero section actions
  fetchHeroSection: () => Promise<void>;
  updateHeroSection: (heroSection: Partial<HeroSection>) => Promise<void>;
}

const defaultHeroSection: HeroSection = {
  _id: '1',
  name: 'Loading...',
  title: 'Loading...',
  subtitle: 'Loading...',
  description: 'Loading...',
  primaryButtonText: 'View My Work',
  primaryButtonLink: '#projects',
  secondaryButtonText: 'Contact Me',
  secondaryButtonLink: '#contact',
  typingPhrases: ['Full Stack Developer']
};

export const useDataStore = create<DataState>((set, get) => ({
  education: [],
  experience: [],
  skills: [],
  certificates: [],
  publications: [],
  projects: [],
  heroSection: defaultHeroSection,

  loading: {
    education: false,
    experience: false,
    skills: false,
    certificates: false,
    publications: false,
    projects: false,
    heroSection: false,
  },

  fetchAllData: async () => {
    await Promise.all([
      get().fetchEducation(),
      get().fetchExperience(),
      get().fetchSkills(),
      get().fetchCertificates(),
      get().fetchPublications(),
      get().fetchProjects(),
      get().fetchHeroSection(),
    ]);
  },

  // Education actions
  fetchEducation: async () => {
    try {
      set((state) => ({ loading: { ...state.loading, education: true } }));
      const data = await api.read('education');
      set({ education: data.data });
    } catch (error) {
      console.error('Failed to fetch education:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, education: false } }));
    }
  },

  addEducation: async (education) => {
    try {
      console.log("data: ", education);
      
      const response = await api.create('education', education);
      const newEducation = response.data || response;
      set((state) => ({ education: [...state.education, newEducation] }));
    } catch (error) {
      console.error('Failed to add education:', error);
      throw error;
    }
  },

  updateEducation: async (id, education) => {
    try {
      console.log("data: ", education);
      
      const updated = await api.update('education', id, education);
      set((state) => ({
        education: state.education.map((item) =>
          item._id === id ? { ...item, ...updated } : item
        ),
      }));
    } catch (error) {
      console.error('Failed to update education:', error);
      throw error;
    }
  },

  deleteEducation: async (id) => {
    try {
      await api.remove('education', id);
      set((state) => ({
        education: state.education.filter((item) => item._id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete education:', error);
      throw error;
    }
  },

  // Experience actions
  fetchExperience: async () => {
    try {
      set((state) => ({ loading: { ...state.loading, experience: true } }));
      const data = await api.read('experience');
      set({ experience: data.data });
    } catch (error) {
      console.error('Failed to fetch experience:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, experience: false } }));
    }
  },

  addExperience: async (experience) => {
    try {
      const response = await api.create('experience', experience);
      const newExperience = response.data || response;
      set((state) => ({ experience: [...state.experience, newExperience] }));
    } catch (error) {
      console.error('Failed to add experience:', error);
      throw error;
    }
  },

  updateExperience: async (id, experience) => {
    try {
      const updated = await api.update('experience', id, experience);
      set((state) => ({
        experience: state.experience.map((item) =>
          item._id === id ? { ...item, ...updated } : item
        ),
      }));
    } catch (error) {
      console.error('Failed to update experience:', error);
      throw error;
    }
  },

  deleteExperience: async (id) => {
    try {
      await api.remove('experience', id);
      set((state) => ({
        experience: state.experience.filter((item) => item._id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete experience:', error);
      throw error;
    }
  },

  // Skills actions
  fetchSkills: async () => {
    try {
      set((state) => ({ loading: { ...state.loading, skills: true } }));
      const data = await api.read('skill');
      set({ skills: data.data });
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, skills: false } }));
    }
  },

  addSkill: async (skill) => {
    try {
      const response = await api.create('skill', skill);
      const newSkill = response.data || response;
      set((state) => ({ skills: [...state.skills, newSkill] }));
    } catch (error) {
      console.error('Failed to add skill:', error);
      throw error;
    }
  },

  updateSkill: async (id, skill) => {
    try {
      const updated = await api.update('skill', id, skill);
      set((state) => ({
        skills: state.skills.map((item) =>
          item._id === id ? { ...item, ...updated } : item
        ),
      }));
    } catch (error) {
      console.error('Failed to update skill:', error);
      throw error;
    }
  },

  deleteSkill: async (id) => {
    try {
      await api.remove('skill', id);
      set((state) => ({
        skills: state.skills.filter((item) => item._id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete skill:', error);
      throw error;
    }
  },

  // Certificates actions
  fetchCertificates: async () => {
    try {
      set((state) => ({ loading: { ...state.loading, certificates: true } }));
      const data = await api.read('certificate');
      set({ certificates: data.data });
    } catch (error) {
      console.error('Failed to fetch certificates:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, certificates: false } }));
    }
  },

  addCertificate: async (certificate) => {
    try {
      const response = await api.create('certificate', certificate);
      const newCertificate = response.data || response;
      set((state) => ({ certificates: [...state.certificates, newCertificate] }));
    } catch (error) {
      console.error('Failed to add certificate:', error);
      throw error;
    }
  },

  updateCertificate: async (id, certificate) => {
    try {
      const updated = await api.update('certificate', id, certificate);
      set((state) => ({
        certificates: state.certificates.map((item) =>
          item._id === id ? { ...item, ...updated } : item
        ),
      }));
    } catch (error) {
      console.error('Failed to update certificate:', error);
      throw error;
    }
  },

  deleteCertificate: async (id) => {
    try {
      await api.remove('certificate', id);
      set((state) => ({
        certificates: state.certificates.filter((item) => item._id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete certificate:', error);
      throw error;
    }
  },

  // Publications actions
  fetchPublications: async () => {
    try {
      set((state) => ({ loading: { ...state.loading, publications: true } }));
      const data = await api.read('publication');
      set({ publications: data.data });
    } catch (error) {
      console.error('Failed to fetch publications:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, publications: false } }));
    }
  },

  addPublication: async (publication) => {
    try {
      const response = await api.create('publication', publication);
      const newPublication = response.data || response;
      set((state) => ({ publications: [...state.publications, newPublication] }));
    } catch (error) {
      console.error('Failed to add publication:', error);
      throw error;
    }
  },

  updatePublication: async (id, publication) => {
    try {
      const updated = await api.update('publication', id, publication);
      set((state) => ({
        publications: state.publications.map((item) =>
          item._id === id ? { ...item, ...updated } : item
        ),
      }));
    } catch (error) {
      console.error('Failed to update publication:', error);
      throw error;
    }
  },

  deletePublication: async (id) => {
    try {
      await api.remove('publication', id);
      set((state) => ({
        publications: state.publications.filter((item) => item._id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete publication:', error);
      throw error;
    }
  },

  // Projects actions
  fetchProjects: async () => {
    try {
      set((state) => ({ loading: { ...state.loading, projects: true } }));
      const data = await api.read('project');
      set({ projects: data.data });
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, projects: false } }));
    }
  },

  addProject: async (project) => {
    try {
      const response = await api.create('project', project);
      const newProject = response.data || response;
      set((state) => ({ projects: [...state.projects, newProject] }));
    } catch (error) {
      console.error('Failed to add project:', error);
      throw error;
    }
  },

  updateProject: async (id, project) => {
    try {
      const updated = await api.update('project', id, project);
      set((state) => ({
        projects: state.projects.map((item) =>
          item._id === id ? { ...item, ...updated } : item
        ),
      }));
    } catch (error) {
      console.error('Failed to update project:', error);
      throw error;
    }
  },

  deleteProject: async (id) => {
    try {
      await api.remove('project', id);
      set((state) => ({
        projects: state.projects.filter((item) => item._id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw error;
    }
  },

  // Hero section actions
  fetchHeroSection: async () => {
    try {
      set((state) => ({ loading: { ...state.loading, heroSection: true } }));
      const data = await api.read('home-section');
      console.log("hero data: ", data);
      
      if (data) {
        set({ heroSection: data });
      }
    } catch (error) {
      console.error('Failed to fetch hero section:', error);
    } finally {
      set((state) => ({ loading: { ...state.loading, heroSection: false } }));
    }
  },

  updateHeroSection: async (heroSection) => {
    try {
      const current = get().heroSection;
      const updated = await api.update('home-section', null, heroSection);
      set({ heroSection: { ...current, ...updated } });
    } catch (error) {
      console.error('Failed to update hero section:', error);
      throw error;
    }
  },
}));
