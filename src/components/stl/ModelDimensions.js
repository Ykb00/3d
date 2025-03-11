import { useState, useEffect } from 'react';
import Link from 'next/link';
import { materialPricing, materialDensity } from '@/lib/materialPricing';

const ModelDimensions = ({ dimensions }) => {
  const [units, setUnits] = useState('mm');
  const [strength, setStrength] = useState('basic');
  const [material, setMaterial] = useState('PLA');
  const [color, setColor] = useState('white');
  const [totalCost, setTotalCost] = useState(0);
  const [advanceAmount, setAdvanceAmount] = useState(0);

  // Colors available for each material - updated dual color options
  const materialColors = {
    PLA: ['white', 'black'],
    ABS: ['black', 'grey'],
    coloredPLA: [ 'red/yellow', 'purple/green']
  };

  // Map strength to infill percentage
  const strengthToInfill = {
    basic: { percentage: 20, key: 'infill20' },
    balanced: { percentage: 50, key: 'infill50' },
    strong: { percentage: 100, key: 'infill100' }
  };

  // Calculate cost whenever relevant parameters change
  useEffect(() => {
    if (dimensions && dimensions.volume) {
      const volumeInCm3 = dimensions.volume / 1000;
      const weight = volumeInCm3 * 1.3;
      
      const infillKey = strengthToInfill[strength].key;
      const pricePerGram = materialPricing[material][infillKey];
      const cost = weight * pricePerGram;
      
      setTotalCost(cost);
      setAdvanceAmount(cost * 0.4);
    }
  }, [dimensions, material, strength]);

  // Reset color when material changes
  useEffect(() => {
    setColor(materialColors[material][0]);
  }, [material]);

  if (!dimensions) {
    return (
      <div className="p-6 border rounded-lg bg-gradient-to-b from-slate-50 to-slate-100 shadow-sm">
        <p className="text-center text-slate-500 font-medium">Upload a model to see dimensions</p>
      </div>
    );
  }

  // Convert dimensions based on selected units
  const displayDimensions = {
    width: units === 'mm' ? dimensions.width.toFixed(2) : (dimensions.width / 25.4).toFixed(2),
    height: units === 'mm' ? dimensions.height.toFixed(2) : (dimensions.height / 25.4).toFixed(2),
    depth: units === 'mm' ? dimensions.depth.toFixed(2) : (dimensions.depth / 25.4).toFixed(2),
  };

  // Helper function to render color preview based on color name
  const renderColorPreview = (colorName) => {
    if (colorName.includes('/')) {
      // Handle dual colors
      const [color1, color2] = colorName.split('/');
      const getColorCode = (name) => {
        return name === 'white' ? '#ffffff' :
               name === 'black' ? '#000000' :
               name === 'grey' ? '#808080' :
               name === 'red' ? '#ff0000' :
               name === 'yellow' ? '#ffcc00' :
               name === 'purple' ? '#800080' :
               name === 'green' ? '#00cc00' :
               name === 'reddish gold' ? '#e6b800' :
               name === 'purplish green' ? '#4d8066' : '#cccccc';
      };
      
      return (
        <div className="flex w-6 h-6 rounded-full overflow-hidden border border-slate-300">
          <div className="w-1/2 h-full" style={{ backgroundColor: getColorCode(color1) }}></div>
          <div className="w-1/2 h-full" style={{ backgroundColor: getColorCode(color2) }}></div>
        </div>
      );
    } else {
      // Handle single colors
      return (
        <span 
          className="w-6 h-6 rounded-full shadow-sm" 
          style={{ 
            backgroundColor: 
              colorName === 'white' ? '#ffffff' : 
              colorName === 'black' ? '#000000' : 
              colorName === 'grey' ? '#808080' : 
              colorName === 'reddish gold' ? '#e6b800' : 
              colorName === 'purplish green' ? '#4d8066' : '#cccccc',
            border: colorName === 'white' ? '1px solid #cccccc' : 'none'
          }}
        ></span>
      );
    }
  };

  return (
    <div className="p-4 border border-slate-200 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-900 border-b pb-2 border-slate-200">Model Details</h2>
      
      {/* Dimensions with unit toggle */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-indigo-800">Dimensions</h3>
          <div className="flex items-center">
            <button
              onClick={() => setUnits('mm')}
              className={`px-3 py-1 rounded-l-md text-sm font-medium transition-all ${units === 'mm' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              mm
            </button>
            <button
              onClick={() => setUnits('inches')}
              className={`px-3 py-1 rounded-r-md text-sm font-medium transition-all ${units === 'inches' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              in
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-slate-700 bg-slate-50 p-3 rounded-md">
          <span className="font-medium">{displayDimensions.width} {units} × {displayDimensions.height} {units} × {displayDimensions.depth} {units}</span>
        </div>
      </div>
      
      {/* Strength selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-indigo-800">Strength</h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setStrength('basic')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
              strength === 'basic' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-sm' 
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Basic (20%)
          </button>
          <button
            onClick={() => setStrength('balanced')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
              strength === 'balanced' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-sm' 
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Balanced (50%)
          </button>
          <button
            onClick={() => setStrength('strong')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
              strength === 'strong' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-sm' 
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Strong (100%)
          </button>
        </div>
      </div>
      
      {/* Material selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-indigo-800">Material</h3>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            onClick={() => setMaterial('PLA')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
              material === 'PLA' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-sm' 
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            PLA
          </button>
          <button
            onClick={() => setMaterial('ABS')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
              material === 'ABS' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-sm' 
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            ABS
          </button>
          <button
            onClick={() => setMaterial('coloredPLA')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
              material === 'coloredPLA' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-sm' 
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Colored PLA
          </button>
        </div>
        
        {/* Color selection with heading */}
        <h4 className="text-sm font-medium text-slate-500 mb-2 ml-1">Choose color:</h4>
        <div className="grid grid-cols-2 gap-2">
          {materialColors[material].map((materialColor) => (
            <button
              key={materialColor}
              onClick={() => setColor(materialColor)}
              className={`flex items-center px-4 py-3 rounded-md transition-all ${
                color === materialColor 
                  ? 'bg-slate-100 border-2 border-indigo-400' 
                  : 'bg-white border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {renderColorPreview(materialColor)}
              <span className="ml-3 font-semibold text-slate-800">{materialColor}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Pricing information */}
      <div className="mb-6 p-5 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
        <div className="flex justify-between mb-2">
          <span className="font-medium text-indigo-900">Total Cost:</span>
          <span className="font-bold text-indigo-900">₹{totalCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-indigo-900">Advance (40%):</span>
          <span className="font-bold text-indigo-900">₹{advanceAmount.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Pay Advance Button */}
      <Link href="/pricing">
        <button className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-md shadow-sm transition duration-150 transform hover:scale-[1.01]">
          Pay Advance (₹{advanceAmount.toFixed(2)})
        </button>
      </Link>
    </div>
  );
};

export default ModelDimensions;