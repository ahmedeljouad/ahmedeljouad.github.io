const ProjectCard = ({ title, description, tech, link }) => {
    return (
        <div className="project-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <p><strong>Technologies:</strong> {tech}</p>
            <a href={link} target="_blank">Voir projet</a>
        </div>
    );
};

const Projects = () => {
    return (
        <div>
            <ProjectCard 
                title="Portfolio Website"
                description="Site personnel responsive."
                tech="HTML, CSS, JS"
                link="https://github.com/username/project1"
            />
            <ProjectCard 
                title="Todo App"
                description="Application de gestion de tâches."
                tech="ReactJS"
                link="https://github.com/username/project2"
            />
        </div>
    );
};

const ContactForm = () => {
    return (
        <form id="contact-form">
            <input type="text" id="name" placeholder="Nom" />
            <input type="email" id="email" placeholder="Email" />
            <textarea id="message" placeholder="Message"></textarea>
            <button type="submit">Envoyer</button>
        </form>
    );
};

ReactDOM.createRoot(document.getElementById("project-root")).render(<Projects />);
ReactDOM.createRoot(document.getElementById("contact-root")).render(<ContactForm />);