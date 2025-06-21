import {
  Award,
  BookOpen,
  Briefcase,
  Code,
  FolderOpen,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Monitor,
  User,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CertificatesManager from '../components/dashboard/CertificatesManager';
import EducationManager from '../components/dashboard/EducationManager';
import ExperienceManager from '../components/dashboard/ExperienceManager';
import HeroManager from '../components/dashboard/HeroManager';
import ProjectsManager from '../components/dashboard/ProjectsManager';
import PublicationsManager from '../components/dashboard/PublicationsManager';
import SkillsManager from '../components/dashboard/SkillsManager';
import { getColorScheme, useTheme } from '../context/ThemeContext';
import { useAuthStore } from '../store/authStore';
import ChangePassword from '../components/dashboard/ChangePasswordManager';

type ActiveTab = 'overview' | 'hero' | 'education' | 'experience' | 'skills' | 'publications' | 'certificates' | 'projects' | 'changePassword';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { colorScheme } = useTheme();
  const colors = getColorScheme(colorScheme);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    { id: 'overview', icon: <LayoutDashboard />, label: 'Overview' },
    { id: 'hero', icon: <Monitor />, label: 'Hero Section' },
    { id: 'education', icon: <GraduationCap />, label: 'Education' },
    { id: 'experience', icon: <Briefcase />, label: 'Experience' },
    { id: 'skills', icon: <Code />, label: 'Skills' },
    { id: 'certificates', icon: <Award />, label: 'Certificates' },
    { id: 'projects', icon: <FolderOpen />, label: 'Projects' },
    { id: 'publications', icon: <BookOpen />, label: 'Publications' },
    { id: 'changePassword', icon: <BookOpen />, label: 'Change Password' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'hero':
        return <HeroManager />;
      case 'education':
        return <EducationManager />;
      case 'experience':
        return <ExperienceManager />;
      case 'skills':
        return <SkillsManager />;
      case 'certificates':
        return <CertificatesManager />;
      case 'projects':
        return <ProjectsManager />;
      case 'publications':
        return <PublicationsManager />;
      case 'changePassword':
        return <ChangePassword />;
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {menuItems.slice(2).map((item, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${colors.button} bg-opacity-10 dark:bg-opacity-20`}>
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 dark:text-white">{item.label}</h3>
                  <p className="text-slate-500 dark:text-slate-400">Total {item.label.toLowerCase()}</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white dark:bg-slate-800 shadow-lg transition-all duration-300 relative`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3">
                <LayoutDashboard className={colors.accent} />
                <span className="text-xl font-bold text-slate-800 dark:text-white">Dashboard</span>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors dark:text-white"
            >
              {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ActiveTab)}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} p-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? `${colors.button} text-white`
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                {!sidebarCollapsed && <span>{item.label}</span>}
              </div>
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className={`absolute bottom-0 ${sidebarCollapsed ? 'w-16' : 'w-64'} p-4 border-t border-slate-200 dark:border-slate-700`}>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-slate-800 dark:text-white">{user?.name}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</div>
              </div>
            </div>
          )}

          <div className={`flex ${sidebarCollapsed ? 'flex-col' : 'flex-row'} gap-2`}>
            <button
              onClick={() => navigate('/')}
              className={`${sidebarCollapsed ? 'w-full' : 'flex-1'} flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300`}
              title={sidebarCollapsed ? 'View Site' : undefined}
            >
              <Home size={18} />
              {!sidebarCollapsed && <span>View Site</span>}
            </button>
            <button
              onClick={handleLogout}
              className={`${sidebarCollapsed ? 'w-full' : 'flex-1'} flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300`}
              title={sidebarCollapsed ? 'Logout' : undefined}
            >
              <LogOut size={18} />
              {!sidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-slate-800 dark:text-white capitalize">
              {activeTab === 'overview' ? 'Dashboard Overview' : `${activeTab} Management`}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Welcome back, {user?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;