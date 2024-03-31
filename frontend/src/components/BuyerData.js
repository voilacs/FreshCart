import React, { useEffect, useState } from 'react';
import { getBuyerData } from '../services/BuyerData';
const BuyerData = () => {
    const [columnLabels, setColumnLabels] = useState([]);
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const itemsData = await getBuyerData();
                setItems(itemsData);

                const labels = itemsData.reduce((acc, item) => {
                    Object.keys(item).forEach(key => {
                        if (!acc.includes(key)  && key !== 'password') {
                            acc.push(key);
                        }
                    });
                    return acc;
                }, []);

                setColumnLabels(labels);
            } catch (error) {
                console.error('Error fetching buyer data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <table className="table">
            <thead>
                <tr>
                    {columnLabels.map(label => (
                        <th key={label}>{label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        {columnLabels.map(label => (
                            <td key={label}>{item[label] || ''}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BuyerData;