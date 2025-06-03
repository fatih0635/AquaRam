import React, { useState } from "react";
import axios from "axios";

// NGROK URL'İNİ BURAYA YAPIŞTIR
const BASE_URL = "https://b208-31-61-230-184.ngrok-free.app";

const AddPlantForm = ({ onPlantAdded }) => {
    const [name, setName] = useState("");
    const [wateringInterval, setWateringInterval] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPlant = {
            name: name.trim(),
            wateringInterval: parseInt(wateringInterval),
        };

        try {
            await axios.post(`${BASE_URL}/plants`, newPlant);
            onPlantAdded();
            setName("");
            setWateringInterval("");
        } catch (error) {
            alert("Failed to add the plant!");
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add New Plant</h3>
            <input
                type="text"
                placeholder="Plant name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Watering interval (days)"
                value={wateringInterval}
                onChange={(e) => setWateringInterval(e.target.value)}
                required
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddPlantForm;

