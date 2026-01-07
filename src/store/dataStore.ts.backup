import { create } from 'zustand';
import { Education, Experience, Skill, Certificate, Publication, Project, HeroSection } from '../types';

interface DataState {
  // Data
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  certificates: Certificate[];
  publications: Publication[];
  projects: Project[];
  heroSection: HeroSection;

  // Education actions
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  deleteEducation: (id: string) => void;

  // Experience actions
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;

  // Skills actions
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;

  // Certificates actions
  addCertificate: (certificate: Omit<Certificate, 'id'>) => void;
  updateCertificate: (id: string, certificate: Partial<Certificate>) => void;
  deleteCertificate: (id: string) => void;

  // Publications actions
  addPublication: (publication: Omit<Publication, 'id'>) => void;
  updatePublication: (id: string, publication: Partial<Publication>) => void;
  deletePublication: (id: string) => void;

  // Projects actions
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: number, project: Partial<Project>) => void;
  deleteProject: (id: number) => void;

  // Hero section actions
  updateHeroSection: (heroSection: Partial<HeroSection>) => void;
}

// Sample data
const sampleEducation: Education[] = [
  {
    id: '1',
    period: '2021-present',
    degree: 'Integrated MTech in Computer Science',
    institution: 'VIT-AP University',
    points: [
      'Current CGPA : 9.04',
      'Specialized in Web Technologies and Software Engineering',
      'Published research paper on modern AI/ML technologies'
    ]
  },
  {
    id: '2',
    period: '2019 - 2021',
    degree: 'Intermediate MPC',
    institution: 'DR Junior College',
    points: [
      'I secure 961 marks out of 1000',
      'Completed with distinction in Mathematics, Physics and Chemistry',
      'Led the Green House team and won best drill performing team x2'
    ]
  }
];

const sampleExperience: Experience[] = [
  {
    id: '1',
    period: 'Jan, 2025 - Present',
    role: 'Freelancer',
    company: 'Self Employed',
    points: [
      'Leading frontend development for multiple client projects',
      'Implemented responsive designs using React and Express.js',
      'Delivered the projects to client within the time frame',
    ]
  }
];

const sampleSkills: Skill[] = [
  {
    id: '1',
    title: 'Languages',
    icon: 'Layout',
    skills: [
      "Java",
      "Python",
      "C/C++",
      "HTML5",
      "CSS3",
      "Javascript",
      "XML",
      "Yaml",
      "SQL(MySQL, Oracle, SQLite)",
      "NoSQL(MongoDB)"
    ]
  },
  {
    id: '2',
    title: 'Frameworks',
    icon: 'Server',
    skills: [
      "SpringBoot",
      "Flask",
      "Node.js",
      "React.js",
      "Express.js",
      "Bootstrap",
      "Hibernate"
    ]
  },
  {
    id: '3',
    title: 'Tools',
    icon: 'Database',
    skills: [
      "Git & Github",
      "Maven",
      "NPM",
      "Postman",
      "Firebase",
      "GraphQL",
      "Docker",
      "Prometheus",
      "Grafana",
      "Github Action",
      "AWS",
      "Redis",
      "Apache Kafka"
    ]
  },
  {
    id: '4',
    title: 'Others',
    icon: 'Code',
    skills: [
      "Authentication",
      "OAuth2.0",
      "RestAPI",
      "Swagger (API Documentation)",
      "Data Caching",
      "Linux",
      "Keycloak",
      "JWT(Json Web Token)",
      "Design Patterns",
      "Ubuntu   "
    ]
  }
];

const sampleCertificates: Certificate[] = [
  {
    id: '1',
    title: "AWS Cloud Technical Essentials",
    issuer: "Amazon Web Services through edx",
    date: "July 2024",
    credentialId: "AWS-AWS-OTP-AWSD16",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://courses.edx.org/certificates/3d264c0011c04949810bec231c214c16",
    skills: ["Amazon EC2", "AWS Lambda", "Amazon S3", "VPC", "CloudFront", "RDS", "DynamoDB", "IAM"]
  },
  {
    id: '2',
    title: "Introduction to Hyperledger Blockchain Technologies",
    issuer: "LinuxFoundationX through edx",
    date: "July 2024",
    credentialId: "LFS171x",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://courses.edx.org/certificates/322bec99b7724d40bcf37d42bcfc5bab",
    skills: ["Blockchain", "Hyper Ledger"]
  },
  {
    id: '3',
    title: "Introduction to Linux",
    issuer: "LinuxFoundationX through edx",
    date: "June 2024",
    credentialId: "LFS101x",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://courses.edx.org/certificates/52319009035b4ea496d20c99ca10c9cd",
    skills: ["Linux", "Ubuntu", "Bash Scripting"]
  },
  {
    id: '4',
    title: "Introduction to Kubernetes",
    issuer: "LinuxFoundationX through edx",
    date: "June 2024",
    credentialId: "LFS158x",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://courses.edx.org/certificates/ea314ab102ed45278d9e61638a0fce3e",
    skills: ["Kubernetes", "Docker", "Deployment"]
  }
];

const samplePublications: Publication[] = [
  {
    id: '1',
    title: 'Transfer Learning for Bird Species Identification',
    authors: ['Hari Kishan Kondaveeti', 'Kottakota Sai Sanjay', 'Karnam Shyam', 'Rayachoti Aniruth', 'Simhadri Chinna Gopi', 'Samparthi V S Kumar'],
    journal: 'International Conference on Computational Systems and Communications (ICCSC) ',
    year: '2023',
    doi: '10.1109/ICCSC56913.2023.10142979',
    keywords: ['Arduino',  'Flask',  'Convolutional Neural Networks',  'MobileNet',  'Bird Species Recognition',  'Bird Identification','Transfer Learning'
],
    type: 'conference',
    status: 'published',
    link: 'https://ieeexplore.ieee.org/abstract/document/10142979'
  },
  {
    id: '2',
    title: 'A Federated Learning approach for privacy preserving technique for Brain Tumor Classification',
    authors: ['Dr. Anurag De', "Gautam Pal", 'Shyam Karnam', " Kalakanti Pawan Tej "],
    journal: 'ACM Conference on Web Technologies',
    year: '2023', 
    doi:"10.1007/978-981-97-8336-6_20",
    keywords: ['React', 'Performance', 'Optimization', 'Virtual DOM'],
    type: 'conference',
    status: 'published',
    link: 'https://link.springer.com/chapter/10.1007/978-981-97-8336-6_20'
  }
];

const sampleHeroSection: HeroSection = {
  id: '1',
  name: 'Shyam Karnam',
  title: 'Frontend Developer',
  subtitle: 'Passionate Web Developer',
  description: 'Passionate about crafting modern web experiences that merge beautiful design with excellent functionality. I specialize in creating responsive websites that provide seamless user experiences.',
  primaryButtonText: 'View My Work',
  primaryButtonLink: '#projects',
  secondaryButtonText: 'Contact Me',
  secondaryButtonLink: '#contact',
  typingPhrases: ['Full Stack Web Developer.', 'Freelancer', 'AI/ML enthusiast.', 'Blockchain Developer.', 'Cloud & DevOps enthusiast.']
};

const sampleProjects: Project[] = [
  {
    "id": 1,
    "title": "NLP Based Resume Parser",
    "description": "This project uses Natural Language Processing (NLP) techniques to parse resumes, enabling automated extraction and analysis of relevant data from resumes in a structured format. This tool is designed to streamline the hiring process by helping HR professionals quickly and accurately sift through a large number of resumes. The solution is highly efficient and can be integrated into any recruitment platform for faster resume screening and data organization.",
    "overview": "This project uses Natural Language Processing (NLP) techniques to parse resumes, enabling automated extraction and analysis of relevant data from resumes in a structured format. This tool is designed to streamline the hiring process by helping HR professionals quickly and accurately sift through a large number of resumes. The solution is highly efficient and can be integrated into any recruitment platform for faster resume screening and data organization.",
    "image": "assets/images/portfolio/g1.jpg",
    "images": [
      {
        "url": "assets/images/pr-0.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      },
      {
        "url": "assets/images/pr-1.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      }
    ],
    "categories": ["web", "aiml"],
    "technologies": ["python", "NLP", "NER", "Flask", "Google Colab", "Flask RestX"],
    "liveUrl": "https://github.com/KarnamShyam1947/resume-parser-nlp",
    "githubUrl": "https://github.com/KarnamShyam1947/resume-parser-nlp",
    "featured": false
  },
  {
    "id": 2,
    "title": "Library Management System",
    "description": "The Library Management System is a full-stack web application built using Python, designed to manage the day-to-day operations of a library. It allows users to search for books, issue and return them, manage book inventories, and track user activity. This system provides a convenient and organized way to streamline library operations, ensuring easy access to books and a smooth administrative workflow.",
    "overview": "The Library Management System is a full-stack web application built using Python, designed to manage the day-to-day operations of a library. It allows users to search for books, issue and return them, manage book inventories, and track user activity. This system provides a convenient and organized way to streamline library operations, ensuring easy access to books and a smooth administrative workflow.",
    "image": "assets/images/portfolio/g2.png",
    "images": [
      {
        "url": "assets/images/pr-0.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      },
      {
        "url": "assets/images/pr-1.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      }
    ],
    "categories": ["web"],
    "technologies": ["Python", "html", "css", "Javascript", "Jinja", "Flask", "MySQL Database"],
    "liveUrl": "https://github.com/KarnamShyam1947/lms",
    "githubUrl": "https://github.com/KarnamShyam1947/lms",
    "featured": false
  },
  {
    "id": 3,
    "title": "AgriTech",
    "description": "The AgriTech project focuses on using machine learning and deep learning techniques to solve problems in agriculture, such as crop disease prediction, weather forecasting, and fertilizer recommendation. By analyzing agricultural data, this project aims to optimize farming practices, improve crop production efficiency, and make agriculture more sustainable. It leverages AI to provide actionable insights that can help farmers make informed decisions for better crop management and increased productivity.",
    "overview": "The AgriTech project focuses on using machine learning and deep learning techniques to solve problems in agriculture, such as crop disease prediction, weather forecasting, and fertilizer recommendation. By analyzing agricultural data, this project aims to optimize farming practices, improve crop production efficiency, and make agriculture more sustainable. It leverages AI to provide actionable insights that can help farmers make informed decisions for better crop management and increased productivity.",
    "image": "assets/images/portfolio/g2.png",
    "images": [
      {
        "url": "assets/images/pr-0.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      },
      {
        "url": "assets/images/pr-1.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      }
    ],
    "categories": ["web", "aiml"],
    "technologies": ["Python", "Flask", "TensorFlow", "Sckit Learn", "HTML, CSS", "Javascript", "Jinja"],
    "liveUrl": "https://github.com/KarnamShyam1947/AgriTech",
    "githubUrl": "https://github.com/KarnamShyam1947/AgriTech",
    "featured": false
  },
  {
    "id": 4,
    "title": "Bird Classification",
    "description": "Wrap is a clean and elegant Multipurpose Landing Page Template. It will fit perfectly for Startup, Web App or any type of Web Services. It has 4 background styles with 6 homepage styles. 6 pre-defined color scheme. All variations are organized separately so you can use / customize the template very easily.",
    "overview": "Wrap is a clean and elegant Multipurpose Landing Page Template. It will fit perfectly for Startup, Web App or any type of Web Services. It has 4 background styles with 6 homepage styles. 6 pre-defined color scheme. All variations are organized separately so you can use / customize the template very easily.",
    "image": "assets/images/portfolio/g2.png",
    "images": [
      {
        "url": "assets/images/pr-0.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      },
      {
        "url": "assets/images/pr-1.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      }
    ],
    "categories": ["aiml"],
    "technologies": ["Python", "html", "css", "Javascript", "Jinja", "Flask", "MySQL Database", "TensorFlow"],
    "liveUrl": "https://github.com/KarnamShyam1947/Bird_Classification",
    "githubUrl": "https://github.com/KarnamShyam1947/Bird_Classification",
    "featured": false
  },
  {
    "id": 5,
    "title": "Block Chain Based TO DO List",
    "description": "This project leverages blockchain technology to create a decentralized TO DO list application. It ensures that the tasks and their statuses are securely recorded in a blockchain, offering users a transparent and immutable way to track their tasks. The blockchain-based approach prevents unauthorized alterations and ensures data integrity, making it ideal for users who need a highly secure, transparent, and reliable task management system. The application integrates simple task management with cutting-edge blockchain technology for enhanced privacy and security",
    "overview": "This project leverages blockchain technology to create a decentralized TO DO list application. It ensures that the tasks and their statuses are securely recorded in a blockchain, offering users a transparent and immutable way to track their tasks. The blockchain-based approach prevents unauthorized alterations and ensures data integrity, making it ideal for users who need a highly secure, transparent, and reliable task management system. The application integrates simple task management with cutting-edge blockchain technology for enhanced privacy and security",
    "image": "assets/images/portfolio/g2.png",
    "images": [
      {
        "url": "assets/images/pr-0.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      },
      {
        "url": "assets/images/pr-1.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      }
    ],
    "categories": ["blockchain"],
    "technologies": ["Block Chain", "React", "Meta Mask", "Hard Hat", "Ganache", "Ethereum"],
    "liveUrl": "https://karnamshyam1947.github.io/portfolio",
    "githubUrl": "https://karnamshyam1947.github.io/portfolio",
    "featured": false
  },
  {
    "id": 6,
    "title": "Ensemble Learning for Eye Disease",
    "description": "This project utilizes ensemble learning techniques to predict and diagnose eye diseases from medical images. By combining multiple machine learning models, this approach improves the accuracy and reliability of predictions. Ensemble learning combines the strengths of different algorithms, allowing for better generalization and performance when dealing with medical datasets.",
    "overview": "This project utilizes ensemble learning techniques to predict and diagnose eye diseases from medical images. By combining multiple machine learning models, this approach improves the accuracy and reliability of predictions. Ensemble learning combines the strengths of different algorithms, allowing for better generalization and performance when dealing with medical datasets.",
    "image": "assets/images/portfolio/g2.png",
    "images": [
      {
        "url": "assets/images/pr-0.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      },
      {
        "url": "assets/images/pr-1.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      }
    ],
    "categories": ["aiml"],
    "technologies": ["Python", "TensorFlow", "Google Colab", "Kaggle"],
    "liveUrl": "https://github.com/KarnamShyam1947/ensemble-learning-eye-disease",
    "githubUrl": "https://github.com/KarnamShyam1947/ensemble-learning-eye-disease",
    "featured": false
  },
  {
    "id": 7,
    "title": "Federated Learning for Brain Tumor",
    "description": "The Federated Learning for Brain Tumor project uses federated learning techniques to train machine learning models on medical data distributed across different devices or hospitals, without sharing sensitive data. This enables the creation of a more robust and privacy-preserving model for the detection of brain tumors from medical imaging. By aggregating insights from multiple data sources without compromising patient privacy, federated learning allows for more accurate predictions, making it a powerful tool for improving brain tumor diagnosis and treatment.",
    "overview": "The Federated Learning for Brain Tumor project uses federated learning techniques to train machine learning models on medical data distributed across different devices or hospitals, without sharing sensitive data. This enables the creation of a more robust and privacy-preserving model for the detection of brain tumors from medical imaging. By aggregating insights from multiple data sources without compromising patient privacy, federated learning allows for more accurate predictions, making it a powerful tool for improving brain tumor diagnosis and treatment.",
    "image": "assets/images/portfolio/g2.png",
    "images": [
      {
        "url": "assets/images/pr-0.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      },
      {
        "url": "assets/images/pr-1.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      }
    ],
    "categories": ["aiml"],
    "technologies": ["Python", "TensorFlow", "Google Colab", "Flower Framework", "Kaggle"],
    "liveUrl": "https://github.com/KarnamShyam1947/fl_brain_tumor",
    "githubUrl": "https://github.com/KarnamShyam1947/fl_brain_tumor",
    "featured": false
  },
  {
    "id": 8,
    "title": "Health Care Web App",
    "description": "This Health Care Web App is designed as a comprehensive platform for managing healthcare services. Built using Java and integrated with front-end technologies like JSP, this full-stack application enables seamless user interactions for both patients and healthcare professionals. Features include patient management, appointment scheduling, medical records, and more, ensuring a user-friendly experience. The back-end is powered by Java with robust data management, ensuring secure and efficient handling of sensitive healthcare information",
    "overview": "This Health Care Web App is designed as a comprehensive platform for managing healthcare services. Built using Java and integrated with front-end technologies like JSP, this full-stack application enables seamless user interactions for both patients and healthcare professionals. Features include patient management, appointment scheduling, medical records, and more, ensuring a user-friendly experience. The back-end is powered by Java with robust data management, ensuring secure and efficient handling of sensitive healthcare information",
    "image": "assets/images/portfolio/g2.png",
    "images": [
      {
        "url": "assets/images/pr-0.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      },
      {
        "url": "assets/images/pr-1.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      }
    ],
    "categories": ["web"],
    "technologies": ["Java", "Maven", "J2EE", "JSP", "MySQL DB", "Hibernate (ORM)", "HTML", "CSS", "Tomcat Server", "Javascript"],
    "liveUrl": "https://github.com/KarnamShyam1947/health_care_webapp",
    "githubUrl": "https://github.com/KarnamShyam1947/health_care_webapp",
    "featured": false
  },
  {
    "id": 9,
    "title": "MedServices Web Api",
    "description": "MedServices Web API is a Java-based backend service built with Spring Boot, designed for managing medical services. This API facilitates secure data handling for healthcare systems, including patient records, appointment details, and medicine information. The Spring Boot framework ensures a highly scalable and maintainable architecture, supporting various endpoints that can be integrated with different front-end applications or mobile platforms. It also implements security features like authentication and authorization to ensure that sensitive healthcare data is protected.",
    "overview": "MedServices Web API is a Java-based backend service built with Spring Boot, designed for managing medical services. This API facilitates secure data handling for healthcare systems, including patient records, appointment details, and medicine information. The Spring Boot framework ensures a highly scalable and maintainable architecture, supporting various endpoints that can be integrated with different front-end applications or mobile platforms. It also implements security features like authentication and authorization to ensure that sensitive healthcare data is protected.",
    "image": "assets/images/portfolio/g2.png",
    "images": [
      {
        "url": "assets/images/pr-0.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      },
      {
        "url": "assets/images/pr-1.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      }
    ],
    "categories": ["web"],
    "technologies": ["Java", "Spring Boot", "JWT", "Spring Security", "MySQL DB", "Spring Data JPA", "Swagger (API Documentation)"],
    "liveUrl": "https://github.com/KarnamShyam1947/springboot-rest-api",
    "githubUrl": "https://github.com/KarnamShyam1947/springboot-rest-api",
    "featured": false
  },
  {
    "id": 10,
    "title": "GitHub Action CI/CD",
    "description": "This project demonstrates a clean and efficient Continuous Integration/Continuous Deployment (CI/CD) pipeline using GitHub Actions. It allows developers to automate their software delivery process, enabling faster development cycles, improved code quality, and seamless deployments. GitHub Actions is highly customizable, allowing you to define workflows to automatically build, test, and deploy code across various environments. The integration with GitHub’s ecosystem ensures ease of use and scalability, perfect for modern web development ",
    "overview": "This project demonstrates a clean and efficient Continuous Integration/Continuous Deployment (CI/CD) pipeline using GitHub Actions. It allows developers to automate their software delivery process, enabling faster development cycles, improved code quality, and seamless deployments. GitHub Actions is highly customizable, allowing you to define workflows to automatically build, test, and deploy code across various environments. The integration with GitHub’s ecosystem ensures ease of use and scalability, perfect for modern web development ",
    "image": "assets/images/portfolio/g2.png",
    "images": [
      {
        "url": "assets/images/pr-0.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      },
      {
        "url": "assets/images/pr-1.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      }
    ],
    "categories": ["devops"],
    "technologies": ["GitHub", "Git CLI", "GitHub Action", "AWS", "YAML", "Docker", "SonarQube"],
    "liveUrl": "https://github.com/KarnamShyam1947/github-actions-sonarqube-demo",
    "githubUrl": "https://github.com/KarnamShyam1947/github-actions-sonarqube-demo",
    "featured": false
  },
  {
    "id": 11,
    "title": "Jenkins Based CI/CD",
    "description": "This project focuses on implementing a Jenkins-based CI/CD pipeline with a focus on security (DevSecOps). Jenkins, an open-source automation server, is widely used for continuous integration and delivery. With built-in support for pipeline as code, Jenkins allows the orchestration of complex workflows and integrates seamlessly with security tools to detect vulnerabilities at every stage of development. This pipeline automates the building, testing, and deployment processes while ensuring a secure environment by incorporating security checks into the CI/CD pipeline.",
    "overview": "This project focuses on implementing a Jenkins-based CI/CD pipeline with a focus on security (DevSecOps). Jenkins, an open-source automation server, is widely used for continuous integration and delivery. With built-in support for pipeline as code, Jenkins allows the orchestration of complex workflows and integrates seamlessly with security tools to detect vulnerabilities at every stage of development. This pipeline automates the building, testing, and deployment processes while ensuring a secure environment by incorporating security checks into the CI/CD pipeline.",
    "image": "assets/images/portfolio/g2.png",
    "images": [
      {
        "url": "assets/images/pr-0.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      },
      {
        "url": "assets/images/pr-1.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      }
    ],
    "categories": ["devops"],
    "technologies": ["Jenkins", "Groovy", "GitHub", "AWS EC2, ECR, ECS", "SonarQube", "Trivy Container Scanner", "OWASP Dependency Check"],
    "liveUrl": "https://github.com/LearnerShyam1947/jenkins-cicd-demo",
    "githubUrl": "https://github.com/LearnerShyam1947/jenkins-cicd-demo",
    "featured": false
  },
  {
    "id": 12,
    "title": "Workers Safety Equipment Detection",
    "description": "The Workers Safety Equipment Detection project uses AI and Machine Learning to ensure that workers are wearing the necessary safety equipment in hazardous environments. This system leverages computer vision techniques to analyze real-time video or images and detects whether workers are equipped with essential safety gear such as helmets, gloves, safety vests, and more. By using advanced object detection models, the solution enhances workplace safety, helps prevent accidents, and provides automated compliance checks. This technology can be integrated into construction sites, factories, or any other work environments where safety is critical.",
    "overview": "The Workers Safety Equipment Detection project uses AI and Machine Learning to ensure that workers are wearing the necessary safety equipment in hazardous environments. This system leverages computer vision techniques to analyze real-time video or images and detects whether workers are equipped with essential safety gear such as helmets, gloves, safety vests, and more. By using advanced object detection models, the solution enhances workplace safety, helps prevent accidents, and provides automated compliance checks. This technology can be integrated into construction sites, factories, or any other work environments where safety is critical.",
    "image": "assets/images/portfolio/g2.png",
    "images": [
      {
        "url": "assets/images/pr-0.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      },
      {
        "url": "assets/images/pr-1.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      }
    ],
    "categories": ["aiml"],
    "technologies": ["YOLO", "ultralytics", "Google Colab", "CVAT"],
    "liveUrl": "https://github.com/KarnamShyam1947/object-detection-yolo",
    "githubUrl": "https://github.com/KarnamShyam1947/object-detection-yolo",
    "featured": false
  },
  {
    "id": 13,
    "title": "facial recognition attendance system",
    "description": "The Facial Recognition Attendance System is an innovative solution that automates attendance tracking using facial recognition technology. This system leverages AI and machine learning algorithms to identify and verify individuals based on facial features, eliminating the need for traditional attendance methods such as manual sign-ins or RFID cards. With real-time processing, the system enhances accuracy, reduces fraud, and improves efficiency in attendance management. It can be integrated into schools, workplaces, and events to streamline the attendance process while maintaining security and privacy.",
    "overview": "The Facial Recognition Attendance System is an innovative solution that automates attendance tracking using facial recognition technology. This system leverages AI and machine learning algorithms to identify and verify individuals based on facial features, eliminating the need for traditional attendance methods such as manual sign-ins or RFID cards. With real-time processing, the system enhances accuracy, reduces fraud, and improves efficiency in attendance management. It can be integrated into schools, workplaces, and events to streamline the attendance process while maintaining security and privacy.",
    "image": "assets/images/portfolio/g2.png",
    "images": [
      {
        "url": "assets/images/pr-0.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      },
      {
        "url": "assets/images/pr-1.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      }
    ],
    "categories": ["aiml"],
    "technologies": ["Python", "Flask", "MySQL Database", "HTML, CSS"],
    "liveUrl": "https://github.com/karnamshyam1947/facial-recognition-attendance-system",
    "githubUrl": "https://github.com/karnamshyam1947/facial-recognition-attendance-system",
    "featured": false
  },
  {
    "id": 14,
    "title": "Dynamic Portfolio",
    "description": "The Facial Recognition Attendance System is an innovative solution that automates attendance tracking using facial recognition technology. This system leverages AI and machine learning algorithms to identify and verify individuals based on facial features, eliminating the need for traditional attendance methods such as manual sign-ins or RFID cards. With real-time processing, the system enhances accuracy, reduces fraud, and improves efficiency in attendance management. It can be integrated into schools, workplaces, and events to streamline the attendance process while maintaining security and privacy.",
    "overview": "The Facial Recognition Attendance System is an innovative solution that automates attendance tracking using facial recognition technology. This system leverages AI and machine learning algorithms to identify and verify individuals based on facial features, eliminating the need for traditional attendance methods such as manual sign-ins or RFID cards. With real-time processing, the system enhances accuracy, reduces fraud, and improves efficiency in attendance management. It can be integrated into schools, workplaces, and events to streamline the attendance process while maintaining security and privacy.",
    "image": "assets/images/portfolio/g2.png",
    "images": [
      {
        "url": "assets/images/pr-0.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      },
      {
        "url": "assets/images/pr-1.jif",
        "subtitle": "All variations are organized separately so you can use /  customize the template very easily."
      }
    ],
    "categories": ["web"],
    "technologies": ["HTML, CSS", "Javascript", "Mongo DB", "Express", "ReactJS", "NodeJS"],
    "liveUrl": "https://github.com/karnamshyam1947/portfolilo",
    "githubUrl": "https://github.com/karnamshyam1947/portfolilo",
    "featured": false
  }
]





export const useDataStore = create<DataState>((set) => ({
  education: sampleEducation,
  experience: sampleExperience,
  skills: sampleSkills,
  certificates: sampleCertificates,
  publications: samplePublications,
  projects: sampleProjects,
  heroSection: sampleHeroSection,

  // Education actions
  addEducation: (education) =>
    set((state) => ({
      education: [...state.education, { ...education, id: Date.now().toString() }]
    })),

  updateEducation: (id, updatedEducation) =>
    set((state) => ({
      education: state.education.map((item) =>
        item.id === id ? { ...item, ...updatedEducation } : item
      )
    })),

  deleteEducation: (id) =>
    set((state) => ({
      education: state.education.filter((item) => item.id !== id)
    })),

  // Experience actions
  addExperience: (experience) =>
    set((state) => ({
      experience: [...state.experience, { ...experience, id: Date.now().toString() }]
    })),

  updateExperience: (id, updatedExperience) =>
    set((state) => ({
      experience: state.experience.map((item) =>
        item.id === id ? { ...item, ...updatedExperience } : item
      )
    })),

  deleteExperience: (id) =>
    set((state) => ({
      experience: state.experience.filter((item) => item.id !== id)
    })),

  // Skills actions
  addSkill: (skill) =>
    set((state) => ({
      skills: [...state.skills, { ...skill, id: Date.now().toString() }]
    })),

  updateSkill: (id, updatedSkill) =>
    set((state) => ({
      skills: state.skills.map((item) =>
        item.id === id ? { ...item, ...updatedSkill } : item
      )
    })),

  deleteSkill: (id) =>
    set((state) => ({
      skills: state.skills.filter((item) => item.id !== id)
    })),

  addCertificate: (certificate) =>
    set((state) => ({
      certificates: [...state.certificates, { ...certificate, id: Date.now().toString() }]
    })),

  updateCertificate: (id, updatedCertificate) =>
    set((state) => ({
      certificates: state.certificates.map((item) =>
        item.id === id ? { ...item, ...updatedCertificate } : item
      )
    })),

  deleteCertificate: (id) =>
    set((state) => ({
      certificates: state.certificates.filter((item) => item.id !== id)
    })),

  addPublication: (publication) =>
    set((state) => ({
      publications: [...state.publications, { ...publication, id: Date.now().toString() }]
    })),

  updatePublication: (id, updatedPublication) =>
    set((state) => ({
      publications: state.publications.map((item) =>
        item.id === id ? { ...item, ...updatedPublication } : item
      )
    })),

  deletePublication: (id) =>
    set((state) => ({
      publications: state.publications.filter((item) => item.id !== id)
    })),

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, { ...project, id: Date.now() }]
    })),

  updateProject: (id, updatedProject) =>
    set((state) => ({
      projects: state.projects.map((item) =>
        item.id === id ? { ...item, ...updatedProject } : item
      )
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((item) => item.id !== id)
    })),

  updateHeroSection: (updatedHeroSection) =>
    set((state) => ({
      heroSection: { ...state.heroSection, ...updatedHeroSection }
    })),
}));