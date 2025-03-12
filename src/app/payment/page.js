"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Extract data from URL query params
  const [orderData, setOrderData] = useState({
    id: '',
    filePath: '',
    width: 0,
    height: 0,
    depth: 0,
    volume: 0,
    material: '',
    color: '',
    infill: '',
    price: 0
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    upiId: 'amrakash2102@oksbi',
    paymentLink: "upi://pay?"
  });
  
  const [copySuccess, setCopySuccess] = useState(false);
  const [paymentSaved, setPaymentSaved] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberValid, setMobileNumberValid] = useState(false);
  const [selectedPaymentApp, setSelectedPaymentApp] = useState('');
  
  useEffect(() => {
    // Extract all parameters from URL
    const id = searchParams.get('id') || '';
    const filePath = searchParams.get('filePath') || '';
    const width = parseFloat(searchParams.get('width') || '0');
    const height = parseFloat(searchParams.get('height') || '0');
    const depth = parseFloat(searchParams.get('depth') || '0');
    const volume = parseFloat(searchParams.get('volume') || '0');
    const material = searchParams.get('material') || '';
    const color = searchParams.get('color') || '';
    const infill = searchParams.get('infill') || '';
    const price = parseFloat(searchParams.get('price') || '0');
    
    // Set order data from URL params
    setOrderData({
      id,
      filePath,
      width,
      height,
      depth,
      volume,
      material,
      color,
      infill,
      price
    });
    
    // Update payment links for different apps
    if (price > 0) {
      setPaymentInfo(prev => ({
        ...prev,
        paymentLink: `upi://pay?`
      }));
    }
  }, [searchParams]);
  
  // Validate mobile number - must be 10 digits
  const validateMobileNumber = (number) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(number);
  };
  
  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    setMobileNumber(value);
    setMobileNumberValid(validateMobileNumber(value));
  };
  
  const copyUpiId = () => {
    navigator.clipboard.writeText(paymentInfo.upiId)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy UPI ID:', err);
      });
  };
  
  const handlePaymentOptionClick = async (app) => {
    if (!mobileNumberValid) {
      alert("Mobile number is required to proceed with payment");
      return;
    }
    
    setSelectedPaymentApp(app);
    
    console.log(`Payment initiated via ${app} for order:`, orderData);
    
    // Construct app-specific payment links
    let paymentAppLink = '';
    
    switch (app) {
      case 'paytm':
        paymentAppLink = `paytmmp://pay?pa=${paymentInfo.upiId}&pn=3DPrintService&am=${orderData.price}&cu=INR&tn=Order_${orderData.id.substring(0, 8)}`;
        break;
      case 'phonepe':
        paymentAppLink = `phonepe://pay?pa=${paymentInfo.upiId}&pn=3DPrintService&am=${orderData.price}&cu=INR&tn=Order_${orderData.id.substring(0, 8)}`;
        break;
      case 'googlepay':
        paymentAppLink = `gpay://upi/pay?pa=${paymentInfo.upiId}&pn=3DPrintService&am=${orderData.price}&cu=INR&tn=Order_${orderData.id.substring(0, 8)}`;
        break;
      default:
        paymentAppLink = paymentInfo.paymentLink;
    }
    
    // Save data to Supabase when payment button is clicked
    if (orderData.id && !paymentSaved) {
      try {
        const { data, error } = await supabase
          .from('models')
          .insert([
            {
              id: orderData.id,
              file_path: orderData.filePath,
              width: orderData.width,
              height: orderData.height,
              depth: orderData.depth,
              volume: orderData.volume,
              material: orderData.material,
              color: orderData.color,
              infill: orderData.infill,
              price: orderData.price,
              payment_status: 'pending',
              payment_method: app,
              customer_mobile: mobileNumber
            }
          ]);
          
        if (error) {
          console.error('Error saving to Supabase:', error);
        } else {
          console.log('Successfully saved to Supabase:', data);
          setPaymentSaved(true);
        }
      } catch (err) {
        console.error('Error processing payment data:', err);
      }
    }
    
    // Open the payment app with the payment link
    window.location.href = paymentAppLink;
  };
  
  // Helper function to render color preview based on color name
  const renderColorPreview = (colorName) => {
    const colorMap = {
      'white': '#ffffff',
      'black': '#000000',
      'grey': '#808080',
      'red': '#ff0000',
      'yellow': '#ffcc00',
      'purple': '#800080',
      'green': '#00cc00'
    };
    
    return (
      <div className="flex items-center">
        <span 
          className="inline-block w-5 h-5 rounded-full mr-2" 
          style={{ 
            backgroundColor: colorMap[colorName] || '#cccccc',
            border: colorName === 'white' ? '1px solid #ddd' : 'none'
          }}
        ></span>
        <span className="font-medium text-slate-800">{colorName}</span>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <h1 className="text-2xl font-bold text-center">Payment Details</h1>
          </div>
          
          {/* Order Summary */}
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold mb-4 text-blue-900">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Order ID:</span>
                <span className="font-medium text-slate-800">{orderData.id.substring(0, 8)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Dimensions:</span>
                <span className="font-medium text-slate-800">
                  {orderData.width.toFixed(2)} × {orderData.height.toFixed(2)} × {orderData.depth.toFixed(2)} mm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Volume:</span>
                <span className="font-medium text-slate-800">{(orderData.volume / 1000).toFixed(2)} cm³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Strength:</span>
                <span className="font-medium text-slate-800">{orderData.infill}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Material:</span>
                <span className="font-medium text-slate-800">{orderData.material}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Color:</span>
                {renderColorPreview(orderData.color)}
              </div>
              <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-slate-200">
                <span className="text-blue-900">Advance Payment (40%):</span>
                <span className="text-blue-900">₹{orderData.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Mobile Number Entry */}
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold mb-4 text-blue-900">Contact Information</h2>
            <div className="mb-4">
              <label htmlFor="mobile-number" className="block text-sm font-medium text-slate-700 mb-1">
                Mobile Number <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">+91</span>
                <input
                  type="tel"
                  id="mobile-number"
                  className={`w-full pl-12 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    mobileNumber && !mobileNumberValid 
                      ? 'border-red-300 focus:ring-red-200' 
                      : mobileNumberValid 
                        ? 'border-green-300 focus:ring-green-200' 
                        : 'border-slate-300 focus:ring-blue-200'
                  }`}
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  maxLength={10}
                  required
                />
              </div>
              {mobileNumber && !mobileNumberValid && (
                <p className="mt-1 text-sm text-red-600">Please enter a valid 10-digit mobile number</p>
              )}
              {mobileNumberValid && (
                <p className="mt-1 text-sm text-green-600">Mobile number is valid</p>
              )}
              {!mobileNumber && (
                <p className="mt-1 text-sm text-red-600 font-medium">
                  A valid mobile number is required to process your payment
                </p>
              )}
            </div>
          </div>
          
          {/* Payment Options */}
          <div className="p-6 text-center border-b border-slate-200">
            <h2 className="text-xl font-semibold mb-4 text-blue-900">Choose Payment Method</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Paytm Button */}
              <button
                onClick={() => handlePaymentOptionClick('paytm')}
                disabled={!mobileNumberValid}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                  selectedPaymentApp === 'paytm' 
                    ? 'border-blue-500 bg-blue-50' 
                    : mobileNumberValid
                      ? 'border-slate-200 hover:bg-slate-50' 
                      : 'border-slate-200 bg-slate-100 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="w-12 h-12 mb-2 relative">
                  <Image 
                    src="/images/icons8-paytm-48.png" 
                    alt="Paytm logo" 
                    width={48} 
                    height={48}
                    className="rounded-md"
                  />
                </div>
                <span className="font-medium text-slate-800">Paytm</span>
              </button>
              
              {/* PhonePe Button */}
              <button
                onClick={() => handlePaymentOptionClick('phonepe')}
                disabled={!mobileNumberValid}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                  selectedPaymentApp === 'phonepe' 
                    ? 'border-purple-500 bg-purple-50' 
                    : mobileNumberValid
                      ? 'border-slate-200 hover:bg-slate-50' 
                      : 'border-slate-200 bg-slate-100 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="w-12 h-12 mb-2 relative">
                  <Image 
                    src="/images/icons8-phone-pe-48.png" 
                    alt="PhonePe logo" 
                    width={48} 
                    height={48}
                    className="rounded-md"
                  />
                </div>
                <span className="font-medium text-slate-800">PhonePe</span>
              </button>
              
              {/* Google Pay Button */}
              <button
                onClick={() => handlePaymentOptionClick('googlepay')}
                disabled={!mobileNumberValid}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                  selectedPaymentApp === 'googlepay' 
                    ? 'border-green-500 bg-green-50' 
                    : mobileNumberValid
                      ? 'border-slate-200 hover:bg-slate-50' 
                      : 'border-slate-200 bg-slate-100 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="w-12 h-12 mb-2 relative">
                  <Image 
                    src="/images/icons8-google-pay-48.png" 
                    alt="Google Pay logo" 
                    width={48} 
                    height={48}
                    className="rounded-md"
                  />
                </div>
                <span className="font-medium text-slate-800">Google Pay</span>
              </button>
            </div>
            
            {/* QR Code and UPI ID Section */}
            <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="text-sm font-medium text-slate-700 mb-3">Or scan QR code / use UPI ID directly</h3>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                {/* QR Code */}
                <div className="flex flex-col items-center">
                  <div className="w-36 h-36 mb-2 bg-white p-2 rounded-lg shadow-sm">
                    <Image 
                      src="/images/QR_code.jpg" 
                      alt="UPI QR Code" 
                      width={144} 
                      height={144}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xs text-slate-500">Scan to pay</span>
                </div>
                
                {/* UPI ID */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="font-medium text-slate-700">UPI ID:</span>
                    <span className="font-medium text-slate-800">{paymentInfo.upiId}</span>
                    <button 
                      onClick={copyUpiId}
                      className={`${
                        copySuccess 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      } px-3 py-1 rounded text-sm font-medium transition-colors`}
                    >
                      {copySuccess ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <span className="text-xs text-slate-500">Pay using any UPI app</span>
                </div>
              </div>
            </div>
            
            {!mobileNumberValid && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800 text-sm">
                <p><strong>Mobile number is required</strong> to proceed with payment.</p>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-slate-50">
            <div className="text-center text-sm text-slate-600">
              <p>Your order will be processed after payment confirmation.</p>
              <p className="mt-2">
                <button 
                  onClick={() => router.push('/')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Return to Home
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}