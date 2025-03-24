import { useState, useEffect } from "react";
import styles from "./Laundry.module.css";

const Laundry = () => {
  const [shouldWash, setShouldWash] = useState(false);
  const [color, setColor] = useState("blanc");
  const [temperature, setTemperature] = useState(30);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("laundryData"));
    if (storedData) {
      const today = new Date().toDateString();
      if (storedData.date === today) {
        setShouldWash(storedData.shouldWash);
        setColor(storedData.color);
        setTemperature(storedData.temperature);
      } else {
        localStorage.removeItem("laundryData"); // Reset si ce n'est plus aujourd'hui
      }
    }
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        console.log("Permission notifications:", permission);
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toDateString();
    const laundryData = { date: today, shouldWash, color, temperature };
    localStorage.setItem("laundryData", JSON.stringify(laundryData));

    alert(`Machine sauvegardée pour aujourd'hui: ${color}, ${temperature}°C`);
    if ("Notification" in window && Notification.permission === "granted") {
      setTimeout(() => {
        new Notification("🧺 Machine à Laver", {
          body: `N'oublie pas ta machine : ${color}, ${temperature}°C`,
          icon: "/washing-machine.png",
        });
      }, 60000); // Notification après 1 minute (60000ms)
    }
  };

  return (
    <div className={styles.laundryContainer}>
      <h2>Machine à Laver</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Lancer une machine aujourd'hui ?
          <input
            type="checkbox"
            checked={shouldWash}
            onChange={() => setShouldWash(!shouldWash)}
          />
        </label>
        {shouldWash && (
          <>
            <label>
              Couleur :
              <select value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="blanc">Blanc</option>
                <option value="couleur">Couleur</option>
              </select>
            </label>
            <label>
              Température :
              <select value={temperature} onChange={(e) => setTemperature(Number(e.target.value))}>
                {[20, 30, 40, 50, 60, 70, 80, 90].map((temp) => (
                  <option key={temp} value={temp}>{temp}°C</option>
                ))}
              </select>
            </label>
          </>
        )}
        <button type="submit">Valider</button>
      </form>
    </div>
  );
};

export default Laundry;
