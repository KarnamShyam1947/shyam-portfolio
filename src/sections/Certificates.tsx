import React from 'react';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useDataStore } from '../store/dataStore';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Certificates: React.FC = () => {
  const { colorScheme } = useTheme();
  const { certificates } = useDataStore();

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Award className={`w-8 h-8 text-${colorScheme}-500`} />
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Certifications</h2>
          </div>
          <Link 
            to="/certificates"
            className={`px-4 py-2 ${`bg-${colorScheme}-500 hover:bg-${colorScheme}-600`} text-white rounded-lg transition-colors`}
          >
            View All
          </Link>
        </div>

        {certificates.length > 0 ? (
          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              className="pb-12"
            >
              {certificates.map((cert, index) => (
                <SwiperSlide key={cert.id}>
                  <div className="bg-white dark:bg-slate-700 rounded-xl overflow-hidden shadow-lg h-full">
                    <div className="relative h-48">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-${colorScheme}-500/10`}></div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                        {cert.title}
                      </h3>
                      <div className="space-y-2 text-slate-600 dark:text-slate-300 mb-4">
                        <p className="flex items-center gap-2">
                          <span className="font-medium">Issuer:</span> {cert.issuer}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="font-medium">Date:</span> {cert.date}
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-slate-800 dark:text-white mb-3">Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.slice(0, 4).map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className={`px-2 py-1 text-sm bg-${colorScheme}-50 dark:bg-${colorScheme}-900/10 text-${colorScheme}-700 dark:text-${colorScheme}-300 rounded-full`}
                            >
                              {skill}
                            </span>
                          ))}
                          {cert.skills.length > 4 && (
                            <span className="px-2 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                              +{cert.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-block px-4 py-2 rounded-lg bg-${colorScheme}-500 hover:bg-${colorScheme}-600 text-white transition-colors duration-300`}
                      >
                        View Certificate
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-700 rounded-full p-3 shadow-lg">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-700 rounded-full p-3 shadow-lg">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">No certificates available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;