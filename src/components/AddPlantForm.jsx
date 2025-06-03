import React, { useState } from "react";
import axios from "axios";

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
            await axios.post("http://localhost:8080/plants", newPlant);
            onPlantAdded();
            setName("");
            setWateringInterval("");
        } catch (error) {
            alert("Failed to add the plant!");
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
