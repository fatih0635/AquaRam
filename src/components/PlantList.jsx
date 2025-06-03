import React, { useEffect, useState } from "react";
import axios from "axios";
import AddPlantForm from "./AddPlantForm";
import WateringChart from "./WateringChart";

const PlantList = () => {
    const [plants, setPlants] = useState([]);
    const [notified, setNotified] = useState(false); // tekrar tekrar bildirim yollamamak için

    const fetchPlants = async () => {
        try {
            const response = await axios.get("http://localhost:8080/plants");
            const plantData = response.data;
            setPlants(plantData);

            // Bildirim ve sesli uyarı (sadece bir kez çalışsın diye kontrol)
            if (!notified) {
                plantData.forEach((plant) => {
                    if (plant.wateringInterval <= 2) {
                        if (Notification.permission === "granted") {
                            new Notification(`💧 Time to water ${plant.name}!`);
                            const audio = new Audio("/ding.mp3");
                            audio.play().catch((err) => {
                                console.log("Autoplay blocked, waiting for user interaction.");
                            });
                        }
                    }
                });
                setNotified(true);
            }
        } catch (error) {
            console.error("Failed to fetch plants:", error);
        }
    };

    const handlePlantAdded = () => {
        setNotified(false); // yeni bitki eklenince tekrar kontrol edilsin
        fetchPlants();
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/plants/${id}`);
            setNotified(false); // silince de yeniden kontrol gerekebilir
            fetchPlants();
        } catch (error) {
            alert("Failed to delete the plant!");
        }
    };

    useEffect(() => {
        Notification.requestPermission(); // izin iste
        fetchPlants();
    }, []);

    return (
        <div>
            <AddPlantForm onPlantAdded={handlePlantAdded} />
            <h3>Registered Plants</h3>
            <ul>
                {plants.map((plant) => (
                    <li key={plant.id}>
                        🌱 {plant.name} – 💧 every {plant.wateringInterval} day(s)
                        <button
                            onClick={() => handleDelete(plant.id)}
                            style={{
                                marginLeft: "1rem",
                                backgroundColor: "#e63946",
                                color: "white",
                                border: "none",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <WateringChart plants={plants} />
        </div>
    );
};

export default PlantList;
