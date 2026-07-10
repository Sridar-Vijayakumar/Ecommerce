function Skills() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Git",
    "GitHub",
  ];

  return (
    <section id="skills" className="min-h-screen py-20 px-6">
      <h2 className="text-4xl font-bold text-center text-cyan-400 mb-12">
        Skills
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {skills.map((skill) => (
          <div
            key={skill}
            className="bg-slate-800 p-6 rounded-xl text-center hover:scale-105 transition"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;