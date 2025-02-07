import "./about.css"

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About OlympiaGym</h1>
        <div className="underline"></div>
        <h2>TU MEJOR VERSIÓN COMIENZA AQUÍ</h2>
      </div>

      <div className="about-description">
        <p>
          Hemos transformado cada aspecto de nuestro gimnasio para ofrecer una experiencia integral que combina
          instalaciones de última generación, entrenadores expertos y una comunidad comprometida con tu éxito. Tu mejor
          versión te espera, en cualquier momento, todo el tiempo.
        </p>
      </div>

      <div className="image-grid">
        <div className="image-container">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
            alt="Entrenador personal"
            className="about-image"
          />
          <div className="image-overlay">
            <h3>Entrenamiento Personal</h3>
          </div>
        </div>
        <div className="image-container">
          <img
            src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop"
            alt="Área de peso libre"
            className="about-image"
          />
          <div className="image-overlay">
            <h3>Área de Peso Libre</h3>
          </div>
        </div>
        <div className="image-container">
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop"
            alt="Área de cardio"
            className="about-image"
          />
          <div className="image-overlay">
            <h3>Área de Cardio</h3>
          </div>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature">
          <div className="feature-icon">💪</div>
          <h3>Equipamiento Moderno</h3>
          <p>Máquinas de última generación para optimizar tu entrenamiento</p>
        </div>
        <div className="feature">
          <div className="feature-icon">👥</div>
          <h3>Entrenadores Expertos</h3>
          <p>Personal altamente calificado para guiar tu progreso</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🎯</div>
          <h3>Programas Personalizados</h3>
          <p>Rutinas adaptadas a tus objetivos y necesidades</p>
        </div>
        <div className="feature">
          <div className="feature-icon">⏰</div>
          <h3>Horario Flexible</h3>
          <p>Abierto todos los días para tu conveniencia</p>
        </div>
      </div>

    </div>
  )
}

export default About