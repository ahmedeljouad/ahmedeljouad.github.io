function ProjectCard({ title, description, techs, githubUrl, demoUrl, icon, category }) {
  return React.createElement('div', {
    className: "project-card",
    'data-category': category
  },
    React.createElement('div', { className: "project-card-header" },
      React.createElement('div', { className: "project-icon" }, 
        React.createElement('i', { className: icon })
      ),
      React.createElement('div', null,
        React.createElement('div', { className: "project-title" }, title),
        React.createElement('div', { className: "project-category" }, category.toUpperCase())
      )
    ),
    React.createElement('p', { className: "project-desc" }, description),
    React.createElement('div', { className: "project-techs" },
      techs.map((tech, i) => 
        React.createElement('span', { key: i, className: "tech-tag" }, tech)
      )
    ),
    React.createElement('div', { className: "project-links" },
      githubUrl && React.createElement('a', {
        href: githubUrl,
        target: "_blank",
        rel: "noreferrer",
        className: "project-link"
      }, React.createElement('i', { className: "fab fa-github" }), " Code source"),
      
      demoUrl && React.createElement('a', {
        href: demoUrl,
        target: "_blank",
        rel: "noreferrer",
        className: "project-link"
      }, React.createElement('i', { className: "fas fa-external-link-alt" }), " Démo live")
    )
  );
}
function ProjectsSection({ projects }) {
  return React.createElement('div', { className: "projects-grid" },
    projects.map((project, i) => 
      React.createElement(ProjectCard, { key: i, ...project })
    )
  );
}
const projectsData = [
  {
    title: "Gestion de Bibliothèque",
    description: "Application en langage C permettant de gérer les livres et les emprunts d'une bibliothèque universitaire avec sauvegarde dans des fichiers binaires.",
    techs: ["C", "Fichiers Binaires", "Structures", "Algorithmes"],
    githubUrl: "https://github.com/ahmedeljouad/gestion-bibliotheque",
    demoUrl: null,
    icon: "fas fa-book",
    category: "c"
  },
  {
    title: "Visualisation des Algorithmes de Tri",
    description: "Interface web interactive qui visualise en temps réel le fonctionnement des algorithmes de tri (Bul, Insertion, Sélection, Rapide).",
    techs: ["HTML", "CSS", "JavaScript", "Canvas"],
    githubUrl: "https://github.com/ahmedeljouad/sort-visualizer",
    demoUrl: "https://ahmedeljouad.github.io/sort-visualizer",
    icon: "fas fa-sort",
    category: "web"
  },
  {
    title: "Système de Gestion Universitaire",
    description: "Base de données relationnelle complète pour gérer les étudiants, modules, notes et professeurs de la FSSM.",
    techs: ["MySQL", "SQL", "Normalisation", "PhpMyAdmin"],
    githubUrl: "https://github.com/ahmedeljouad/gestion-universitaire",
    demoUrl: null,
    icon: "fas fa-database",
    category: "db"
  }
];
const root = ReactDOM.createRoot(document.getElementById('react-projects'));
root.render(React.createElement(ProjectsSection, { projects: projectsData }));
window.__renderProjects = function(filter) {
  const filtered = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);
  root.render(React.createElement(ProjectsSection, { projects: filtered }));
};
console.log(" React Projects loaded successfully");