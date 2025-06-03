import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

const WateringChart = ({ plants }) => {
    return (
        <div style={{ marginTop: "2rem" }}>
            <h3>Watering Intervals</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={plants}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: "Days", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Bar dataKey="wateringInterval" fill="#74c69d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WateringChart;
