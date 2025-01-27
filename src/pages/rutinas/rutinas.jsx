import React, { useState } from "react"
import "./rutinas.css"

const Rutinas = () => {
  const [selectedRoutine, setSelectedRoutine] = useState(null)

  // Datos actualizados con ejercicios específicos e imágenes
  const routines = {
    pecho: [
      {
        id: "p1",
        title: "Press de Banca",
        image: "https://i.pinimg.com/originals/5d/52/bc/5d52bcd60a280ee85725fcfa2924b803.gif",
        sets: "3",
        reps: "12",
        description:
          "Ejercicio fundamental para el desarrollo del pecho. Acuéstate en el banco, agarra la barra con un agarre más ancho que los hombros.",
      },
      {
        id: "p2",
        title: "Aperturas con Mancuernas",
        image: "https://i.pinimg.com/originals/eb/2f/4d/eb2f4db39a7f5ab2a1cb50d531ae4480.gif",
        sets: "3",
        reps: "10",
        description: "Excelente ejercicio para el desarrollo lateral del pecho y mejorar la definición muscular.",
      },
      {
        id: "p3",
        title: "Fondos en Paralelas",
        image: "https://i.pinimg.com/736x/d7/76/b2/d776b27ef365fba08149117858636004.jpg",
        sets: "3",
        reps: "12",
        description: "Trabaja tríceps y pectoral inferior. Mantén el cuerpo recto.",
      },
      {
        id: "p4",
        title: "Press Inclinado",
        image: "https://i.pinimg.com/originals/be/94/3f/be943f55c4a35f5599824db11168d686.gif",
        sets: "3",
        reps: "12",
        description: "Enfoca el trabajo en la parte superior del pecho. Mantén una inclinación de 30-45 grados.",
      },
      {
        id: "p5",
        title: "Pec deck",
        image: "https://boxlifemagazine.com/wp-content/uploads//2023/07/pec-deck-butterfly-exercice-musculation.gif",
        sets: "3",
        reps: "15",
        description: "Excelente para trabajar los músculos pectorales, especialmente la porción media del pecho, y mejorar la definición muscular.",
      },
    ],
    espalda: [
      {
        id: "e1",
        title: "Dominadas",
        image: "https://i.pinimg.com/originals/88/a2/ed/88a2ed634d93cd3f903e46cd61e78743.gif",
        sets: "3",
        reps: "10",
        description: "Ejercicio compuesto que trabaja toda la espalda. Agarra la barra con las palmas hacia adelante.",
      },
      {
        id: "e2",
        title: "Remo con Barra",
        image: "https://i.pinimg.com/originals/6b/dc/01/6bdc017f9f106e611f38993045d556ab.gif",
        sets: "3",
        reps: "12",
        description:
          "Excelente para el desarrollo del espesor de la espalda. Mantén la espalda recta durante todo el movimiento.",
      },
      {
        id: "e3",
        title: "Jalón al Pecho",
        image: "https://i.pinimg.com/736x/8d/c3/63/8dc363a9b9557011775fb5c2841c17dc.jpg",
        sets: "3",
        reps: "12",
        description:
          "Trabaja principalmente el dorsal ancho. Mantén los codos apuntando hacia abajo durante el movimiento.",
      },
      {
        id: "e4",
        title: "Remo con Mancuerna",
        image: "https://i.pinimg.com/originals/a0/11/20/a01120423ce7cab0379e4c5a31d3bc37.gif",
        sets: "3",
        reps: "12",
        description: "Trabaja la espalda de forma unilateral, permitiendo corregir desequilibrios musculares.",
      },
      {
        id: "e5",
        title: "Remo en barra T",
        image: "https://i.pinimg.com/originals/93/ed/3f/93ed3f55b6b8c6c9490970d63bbc50e6.gif",
        sets: "3",
        reps: "8",
        description: "Similar a las dominadas, pero con agarre más estrecho.",
      },
    ],
    pierna: [
      {
        id: "l1",
        title: "Sentadillas",
        image: "https://i.pinimg.com/originals/df/b5/a1/dfb5a1fe815929e8e612712ba7e5470c.gif",
        sets: "3",
        reps: "12",
        description:
          "El rey de los ejercicios de pierna. Mantén la espalda recta y los pies separados al ancho de los hombros.",
      },
      {
        id: "l2",
        title: "Peso Muerto",
        image: "https://i.pinimg.com/originals/52/ca/5b/52ca5b362a5ad9c4240bbe93d5f5418b.gif",
        sets: "1",
        reps: "5",
        description: "Ejercicio compuesto que trabaja todo el cuerpo, con énfasis en la espalda y piernas.",
      },
      {
        id: "l3",
        title: "Prensa de Piernas",
        image: "https://i.pinimg.com/originals/60/fb/4a/60fb4a02b481d7a1b71fbb1795d6109b.gif",
        sets: "3",
        reps: "10",
        description: "Excelente para trabajar los cuádriceps.",
      },
      {
        id: "l4",
        title: "Extensiones",
        image: "https://i.pinimg.com/originals/2f/88/8a/2f888a80d3e49f5e31ee372116437540.gif",
        sets: "3",
        reps: "15",
        description: "Aísla el trabajo de los cuádriceps.",
      },
      {
        id: "l5",
        title: "Zancadas",
        image: "https://boxlifemagazine.com/wp-content/uploads//2023/07/fentes-avant-kettlebell-min.gif",
        sets: "3",
        reps: "12",
        description: "Trabaja cuádriceps, glúteos y femoral.",
      },
    ],
    cardio: [
      {
        id: "c1",
        title: "HIIT",
        image: "https://i.pinimg.com/originals/64/8f/36/648f368d096be26e3a3a41f5c0bba6b8.gif",
        sets: "30",
        reps: "min",
        description: "Entrenamiento intervalado de alta intensidad para maximizar la quema de calorías.",
      },
      {
        id: "c2",
        title: "Cinta de Correr",
        image: "https://i.pinimg.com/originals/c7/30/b1/c730b15cc24b7655ff67185d28915ce5.gif",
        sets: "30",
        reps: "min",
        description: "Ejercicio cardiovascular de bajo impacto.",
      },
      {
        id: "c3",
        title: "Bicicleta",
        image: "https://i.pinimg.com/originals/f1/55/97/f1559725611bf96c448c76629a9bc890.gif",
        sets: "30",
        reps: "min",
        description: "Ejercicio cardiovascular de bajo impacto.",
      },
      {
        id: "c4",
        title: "Elíptica",
        image: "https://i.pinimg.com/originals/1f/24/48/1f2448f6d83a4a3d2e1d8dd21aa7383b.gif",
        sets: "30",
        reps: "min",
        description: "Ejercicio cardiovascular de bajo impacto.",
      },
      {
        id: "c5",
        title: "Salto de Cuerda",
        image: "https://i.pinimg.com/originals/ef/fa/71/effa7121242d1456cd0f3408b71cf405.gif",
        sets: "15",
        reps: "min",
        description: "Ejercicio cardiovascular de alta intensidad.",
      },
    ],
  }

  const handleRoutineClick = (routine) => {
    setSelectedRoutine(selectedRoutine?.id === routine.id ? null : routine)
  }

  return (
    <div className="rutinas-container">
      <h1>Rutinas de Entrenamiento</h1>

      {/* Sección de Pecho */}
      <section className="rutinas-section">
        <h2>Rutinas de Pecho</h2>
        <div className="rutinas-grid">
          {routines.pecho.map((routine) => (
            <div key={routine.id} className="rutina-card" onClick={() => handleRoutineClick(routine)}>
              <img src={routine.image || "/placeholder.svg"} alt={routine.title} />
              <div className="rutina-info">
                <h3>{routine.title}</h3>
                <p className="sets-reps">
                  {routine.sets} x {routine.reps}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Espalda */}
      <section className="rutinas-section">
        <h2>Rutinas de Espalda</h2>
        <div className="rutinas-grid">
          {routines.espalda.map((routine) => (
            <div key={routine.id} className="rutina-card" onClick={() => handleRoutineClick(routine)}>
              <img src={routine.image || "/placeholder.svg"} alt={routine.title} />
              <div className="rutina-info">
                <h3>{routine.title}</h3>
                <p className="sets-reps">
                  {routine.sets} x {routine.reps}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Pierna */}
      <section className="rutinas-section">
        <h2>Rutinas de Pierna</h2>
        <div className="rutinas-grid">
          {routines.pierna.map((routine) => (
            <div key={routine.id} className="rutina-card" onClick={() => handleRoutineClick(routine)}>
              <img src={routine.image || "/placeholder.svg"} alt={routine.title} />
              <div className="rutina-info">
                <h3>{routine.title}</h3>
                <p className="sets-reps">
                  {routine.sets} x {routine.reps}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Cardio */}
      <section className="rutinas-section">
        <h2>Rutinas de Cardio</h2>
        <div className="rutinas-grid">
          {routines.cardio.map((routine) => (
            <div key={routine.id} className="rutina-card" onClick={() => handleRoutineClick(routine)}>
              <img src={routine.image || "/placeholder.svg"} alt={routine.title} />
              <div className="rutina-info">
                <h3>{routine.title}</h3>
                <p className="sets-reps">
                  {routine.sets} {routine.reps}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal para mostrar detalles de la rutina */}
      {selectedRoutine && (
        <div className="rutina-modal-overlay" onClick={() => setSelectedRoutine(null)}>
          <div className="rutina-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedRoutine(null)}>
              ×
            </button>
            <img src={selectedRoutine.image || "/placeholder.svg"} alt={selectedRoutine.title} />
            <h2>{selectedRoutine.title}</h2>
            <div className="rutina-details">
              <p className="sets-reps-large">
                {selectedRoutine.sets} series x {selectedRoutine.reps} repeticiones
              </p>
              <p className="description">{selectedRoutine.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Rutinas
