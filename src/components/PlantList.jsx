import React, { useEffect, useState } from "react";
import axios from "axios";
import AddPlantForm from "./AddPlantForm";
import WateringChart from "./WateringChart";

// 🌐 NGROK üzerinden yayınlanan backend adresin
const BASE_URL = "https://c13c-31-61-230-184.ngrok-free.app";

const PlantList = () => {
    const [plants, setPlants] = useState([]);
    const [notified, setNotified] = useState(false);

    const fetchPlants = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/plants`);

            // Gelen veriyi logla
            console.log("📦 Gelen veri:", response.data);

            // Veri güvenli şekilde alınır
            const rawData = response.data;

            const plantData = Array.isArray(rawData)
                ? rawData
                : Array.isArray(rawData.data)
                    ? rawData.data
                    : [];

            // Loglama burada yapılmalı (tanımlandıktan sonra)
            console.log("🌿 PLANT STATE:", plantData);

            if (!Array.isArray(plantData)) {
                console.error("❌ Veri dizisi bekleniyordu ama alınan:", plantData);
                return;
            }

            setPlants(plantData);

            if (!notified) {
                plantData.forEach((plant) => {
                    if (plant.wateringInterval <= 2) {
                        if (Notification.permission === "granted") {
                            new Notification(`💧 Time to water ${plant.name}!`);
                            const audio = new Audio("/ding.mp3");
                            audio.play().catch(() => {
                                console.log("Autoplay blocked");
                            });
                        }
                    }
                });
                setNotified(true);
            }
        } catch (error) {
            console.error("🚫 Failed to fetch plants:", error);
        }
    };

    const handlePlantAdded = () => {
        setNotified(false);
        fetchPlants();
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/plants/${id}`);
            setNotified(false);
            fetchPlants();
        } catch (error) {
            alert("Failed to delete the plant!");
        }
    };

    useEffect(() => {
        Notification.requestPermission();
        fetchPlants();
    }, []);

    return (
        <div>
            <AddPlantForm onPlantAdded={handlePlantAdded} />
            <h3>Registered Plants</h3>
            <ul>
                {Array.isArray(plants) &&
                    plants.map((plant) => (
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
