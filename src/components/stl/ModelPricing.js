"use client";

import { useState, useEffect } from 'react';

const MATERIALS = [
  { id: 'pla', name: 'PLA', pricePerGram: 0.05, density: 1.24 },
  { id: 'abs', name: 'ABS', pricePerGram: 0.06, density: 1.04 },
  { id: 'petg', name: 'PETG', pricePerGram: 0.07, density: 1.27 },
  { id: 'resin', name: 'Resin', pricePerGram: 0.15, density: 1.1 }
];

export default function ModelPricing({ dimensions }) {
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    if (dimensions?.volume) {
      calculatePrice();
    }
  }, [dimensions, selectedMaterial, quantity]);
  
  const calculatePrice = () => {
    if (!dimensions?.volume) return;
    
    // Convert volume from cm³ to ml, then calculate weight using density
    const volumeInCm3 = parseFloat(dimensions.volume);
    const weightInGrams = volumeInCm3 * selectedMaterial.density;
    
    // Calculate base price
    const materialCost = weightInGrams * selectedMaterial.pricePerGram;
    
    // Add printing time cost (simplified approximation)
    const printingTimeCost = Math.pow(volumeInCm3, 1/3) * 0.5; // Rough estimate
    
    // Calculate total, apply quantity and add margin
    const basePrice = (materialCost + printingTimeCost) * 1.5; // 50% margin
    const totalPrice = basePrice * quantity;
    
    setPrice(totalPrice.toFixed(2));
  };
  
  if (!dimensions?.volume) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Price Estimation</h3>
      
      <div className="mb-4">
        <label className="block text-gray-500 mb-2">Material</label>
        <select 
          className="w-full p-2 border border-gray-300 rounded-md"
          value={selectedMaterial.id}
          onChange={(e) => setSelectedMaterial(MATERIALS.find(m => m.id === e.target.value))}
        >
          {MATERIALS.map(material => (
            <option key={material.id} value={material.id}>
              {material.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-500 mb-2">Quantity</label>
        <input 
          type="number" 
          min="1" 
          value={quantity} 
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Estimated Price:</span>
          <span className="text-xl font-bold">${price}</span>
        </div>
        
        <button className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition">
          Proceed to Order
        </button>
      </div>
    </div>
  );
}