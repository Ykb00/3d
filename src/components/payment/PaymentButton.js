"use client";

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

// Initialize Supabase client - you'll need to add your URL and key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const PaymentButton = ({ file, dimensions }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Default model settings
  const defaultSettings = {
    material: 'PLA',
    color: 'White',
    infill: '20%'
  };

  const calculatePrice = (dimensions) => {
    // Basic price calculation based on dimensions
    if (!dimensions) return 0;
    
    const volume = dimensions.volume; // in cubic millimeters
    const volumeInCm3 = volume / 1000; // convert to cm³
    
    // Price factors (you can adjust these)
    const materialCost = 0.05; // cost per cm³ for PLA
    const infillFactor = 0.2; // 20% infill
    
    // Calculate base price
    const basePrice = volumeInCm3 * materialCost * (0.5 + (infillFactor * 0.5));
    
    // Add minimum price
    return Math.max(10, basePrice).toFixed(2);
  };

  const saveModelToSupabase = async () => {
    setLoading(true);
    setError(null);

    if (!file || !dimensions) {
      setError("Model or dimensions are missing");
      setLoading(false);
      return;
    }

    try {
      // Generate unique model ID
      const modelId = `model_${Date.now()}`;
      
      // 1. Upload STL file to Supabase storage bucket
      const { data: fileData, error: fileError } = await supabase.storage
        .from('stl-models')
        .upload(`${modelId}.stl`, file);
      
      if (fileError) throw fileError;
      
      // Calculate final price
      const finalPrice = calculatePrice(dimensions);
      
      // Create model data object
      const modelData = {
        id: modelId,
        file_path: fileData.path,
        width: dimensions.width || 0,
        height: dimensions.height || 0,
        depth: dimensions.depth || 0,
        volume: dimensions.volume || 0,
        material: defaultSettings.material,
        color: defaultSettings.color,
        infill: defaultSettings.infill,
        price: finalPrice,
        payment_status: 'pending',
        created_at: new Date().toISOString()
      };
      
      // 2. Save model metadata to Supabase table
      const { error } = await supabase
        .from('models')
        .insert([modelData]);
      
      if (error) throw error;

      // 3. Redirect to payment page with model data
      const queryParams = new URLSearchParams({
        modelId: modelId,
        data: JSON.stringify(modelData)
      }).toString();
      
      router.push(`/payment?${queryParams}`);
      
    } catch (err) {
      console.error('Error saving model:', err);
      setError('Failed to save model. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate price for display
  const displayPrice = calculatePrice(dimensions);

  return (
    <div className="mt-6">
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="text-xl font-bold mb-2">
          Estimated Price: ${displayPrice}
        </div>
        <div className="text-sm text-gray-600">
          Price based on dimensions and standard settings (PLA material, White color, 20% infill)
        </div>
      </div>

      <button
        onClick={saveModelToSupabase}
        disabled={loading || !dimensions}
        className={`w-full py-3 px-4 rounded-lg text-white font-semibold 
          ${!dimensions || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Pay Advance and Proceed"
        )}
      </button>
      
      {error && (
        <div className="mt-3 text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default PaymentButton;