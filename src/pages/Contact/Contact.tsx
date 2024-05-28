import React from "react";
import Header from "../../components/Header-component/heder-component";
import Footer from "../../components/Footer-component/footer-component";
import { motion } from "framer-motion";
import "./Contact.css";

const teamMembers = [
    {
        name: "Samir Sanchez",
        role: "Estudiante de Ingeniería de Sistemas",
        email: "samir.sanchez@example.com",
        github: "https://github.com/samirsanchez",
        linkedin: "https://www.linkedin.com/in/samirsanchez",
        photo: "https://firebasestorage.googleapis.com/v0/b/miportal-c92f1.appspot.com/o/SamiTombo.jpg?alt=media&token=61f3a6f7-33bc-4277-a60a-8b7b702b4b23"
    },
    {
        name: "Lukas Rodriguez Pelaez",
        role: "Estudiante de Ingeniería de Sistemas",
        email: "rodriguezlukas@javeriana.edu.co",
        github: "https://github.com/Lukas0310",
        linkedin: "http://www.linkedin.com/in/lukas-rodriguez-pelaez",
        photo: "https://firebasestorage.googleapis.com/v0/b/miportal-c92f1.appspot.com/o/viceCity.jpg?alt=media&token=44effdb7-da5b-40c9-94f0-746e777f73b8"
    },
    {
        name: "Jorge Camilo Chantryt Fernandez ",
        role: "Estudiante de Ingeniería de Sistemas",
        email: "jorgemilo51@gmail.com",
        github: "https://github.com/cchantryt ",
        linkedin: "https://www.linkedin.com/in/jorge-chantryt-952a34275/",
        photo: "https://firebasestorage.googleapis.com/v0/b/miportal-c92f1.appspot.com/o/JorgeDiablo.jpg?alt=media&token=3ced1d76-c90b-4cc9-9673-e688df833307"
    },
    {
        name: "David Fernando Perez Medina",
        role: "Estudiante de Ingeniería de Sistemas",
        email: "davidfernando1112@gmail.com",
        github: "https://github.com/davidfer1112",
        linkedin: "https://www.linkedin.com/in/davidperez",
        photo: "https://firebasestorage.googleapis.com/v0/b/miportal-c92f1.appspot.com/o/Muelitas.jpg?alt=media&token=e265fda6-0f88-474e-bbce-06c4673fee38"
    },
    {
        name: "Felipe Bolivar",
        role: "Estudiante de Ingeniería de Sistemas",
        email: "felipebolivar498@gmail.com ",
        github: "https://github.com/felipebolivar",
        linkedin: "https://www.linkedin.com/in/felipebolivar",
        photo: "https://firebasestorage.googleapis.com/v0/b/miportal-c92f1.appspot.com/o/RamboEnLaPlaya.jpg?alt=media&token=4b41745b-f7a6-4e4e-8c0b-1901ca6cb797"
    }
];

const Contact: React.FC = () => {
    return (
        <>
            <Header />
            <section className="contact-hero">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Contacto
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    Conoce a nuestro equipo
                </motion.p>
            </section>
            <section className="contact-content">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={index}
                        className={`team-member ${index % 2 === 1 ? "reverse" : ""}`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: index * 0.3 }}
                    >
                        <div className="text-content">
                            <h2>{member.name}</h2>
                            <p>{member.role}</p>
                            <p>Email: <a href={`mailto:${member.email}`}>{member.email}</a></p>
                            <p>GitHub: <a href={member.github} target="_blank" rel="noopener noreferrer">{member.github}</a></p>
                            <p>LinkedIn: <a href={member.linkedin} target="_blank" rel="noopener noreferrer">{member.linkedin}</a></p>
                        </div>
                        <img src={member.photo} alt={member.name} className="member-photo" />
                    </motion.div>
                ))}
            </section>
            <Footer />
        </>
    );
};

export default Contact;
