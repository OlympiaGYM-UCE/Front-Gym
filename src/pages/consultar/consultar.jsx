import { useState } from "react"

function Consultar() {
  const [cedula, setCedula] = useState("")
  const [membershipInfo, setMembershipInfo] = useState(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMembershipInfo(null)

    if (!cedula) {
      setError("Por favor, ingrese una cédula")
      return
    }

    try {
      const response = await fetch(`/api/memberships/cedula/${cedula}`)

      if (!response.ok) {
        throw new Error("No se encontró información para esta cédula")
      }

      const data = await response.json()
      setMembershipInfo(data)
    } catch (err) {
      setError(err.message || "Error al consultar la membresía")
    }
  }

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "50px auto",
      padding: "30px",
      boxShadow: "0 0 20px rgba(0,0,0,0.1)",
      borderRadius: "12px",
      backgroundColor: "#ffffff",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#4CAF50",
      fontSize: "28px",
      fontWeight: "bold",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "6px",
      border: "2px solid #e0e0e0",
      fontSize: "16px",
      transition: "border-color 0.3s",
    },
    button: {
      padding: "12px 20px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      transition: "background-color 0.3s",
    },
    error: {
      color: "#ff6b6b",
      marginTop: "20px",
      textAlign: "center",
      fontSize: "14px",
    },
    infoContainer: {
      marginTop: "30px",
      padding: "20px",
      backgroundColor: "#f1f8e9",
      borderRadius: "8px",
      border: "1px solid #c5e1a5",
    },
    infoText: {
      color: "#33691e",
      fontSize: "16px",
      lineHeight: "1.6",
    },
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Consultar Membresía</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <input
            type="text"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            placeholder="Ingrese la cédula"
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Consultar
        </button>
      </form>

      {error && <div style={styles.error}>{error}</div>}

      {membershipInfo && (
        <div style={styles.infoContainer}>
          <p style={styles.infoText}>{membershipInfo}</p>
        </div>
      )}
    </div>
  )
}

export default Consultar