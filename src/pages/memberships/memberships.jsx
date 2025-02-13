import { CheckCircle2 } from "lucide-react"
import "./memberships.css"

const Memberships = () => {
  const plans = [
    {
      name: "Plan Básico",
      description: "Entrena en horarios específicos y disfruta de nuestras instalaciones básicas",
      price: "24.90",
      features: [
        "Acceso a área de pesas",
        "Acceso a área de cardio",
        "Casillero estándar",
        "Horario limitado",
        "Acceso a una sede",
      ],
      isPopular: false,
      color: "white",
    },
    {
      name: "Plan Premium",
      description: "Acceso total a todas nuestras instalaciones y beneficios exclusivos",
      price: "39.90",
      features: [
        "Acceso ilimitado 24/7",
        "Todas las áreas del gimnasio",
        "Casillero premium",
        "Acceso a clases grupales",
        "Acceso a todas las sedes",
        "Entrenador personal",
        "Evaluación mensual",
      ],
      isPopular: true,
      color: "#4CAF50",
    },
    {
      name: "Plan Estándar",
      description: "Entrena en cualquier momento en tu sede preferida",
      price: "29.90",
      features: [
        "Acceso a área de pesas",
        "Acceso a área de cardio",
        "Casillero estándar",
        "Horario flexible",
        "Acceso a una sede",
        "Clases grupales básicas",
      ],
      isPopular: false,
      color: "white",
    },
  ]

  return (
    <div className="memberships-container">
      <div className="memberships-header">
        <h1>Planes de Membresía</h1>
        <p>Elige el plan perfecto para alcanzar tus objetivos</p>
      </div>

      <div className="plans-container">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`plan-card ${plan.isPopular ? "popular" : ""}`}
            style={{
              backgroundColor: plan.color,
              color: plan.color === "#4CAF50" ? "white" : "#333",
            }}
          >
            {plan.isPopular && <div className="popular-badge">Más Popular</div>}
            <div className="plan-header">
              <h2>{plan.name}</h2>
              <p className="plan-description">{plan.description}</p>
            </div>

            <div className="plan-price">
              <span className="currency">$</span>
              <span className="amount">{plan.price}</span>
              <span className="period">/ mes</span>
            </div>

            <ul className="features-list">
              {plan.features.map((feature, idx) => (
                <li key={idx}>
                  <CheckCircle2 className="check-icon" />
                  {feature}
                </li>
              ))}
            </ul>


          </div>
        ))}
      </div>

      <div className="additional-info">
        <h3>Todos los planes incluyen</h3>
        <div className="benefits-grid">
          <div className="benefit-item">
            <h4>Instalaciones Modernas</h4>
            <p>Equipamiento de última generación</p>
          </div>
          <div className="benefit-item">
            <h4>Duchas y Vestidores</h4>
            <p>Instalaciones limpias y seguras</p>
          </div>
          <div className="benefit-item">
            <h4>Estacionamiento</h4>
            <p>Amplio y seguro para miembros</p>
          </div>
          <div className="benefit-item">
            <h4>Wifi Gratis</h4>
            <p>Conexión de alta velocidad</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Memberships

