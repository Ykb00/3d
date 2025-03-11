export default function PricingPage() {
  const pricingPlans = [
    {
      title: "Basic",
      price: 9.99,
      features: [
        "5 STL file uploads per month",
        "Basic model analysis",
        "Standard printing materials",
        "Email support"
      ],
      recommended: false,
      buttonText: "Get Started"
    },
    {
      title: "Professional",
      price: 24.99,
      features: [
        "20 STL file uploads per month",
        "Advanced model analysis",
        "Premium printing materials",
        "Priority email support",
        "Custom color options",
        "Design consultation (1 hour)"
      ],
      recommended: true,
      buttonText: "Best Value"
    },
    {
      title: "Enterprise",
      price: 49.99,
      features: [
        "Unlimited STL file uploads",
        "Complete model analysis suite",
        "All printing materials",
        "24/7 phone support",
        "Custom color and finish options",
        "Design consultation (5 hours)",
        "Priority manufacturing",
        "API access"
      ],
      recommended: false,
      buttonText: "Contact Sales"
    }
  ];
  
  const materialPricing = [
    { material: "PLA", pricePerGram: "$0.05", applications: "Prototypes, Models, Toys" },
    { material: "ABS", pricePerGram: "$0.06", applications: "Functional Parts, Automotive" },
    { material: "PETG", pricePerGram: "$0.07", applications: "Food Containers, Medical" },
    { material: "TPU", pricePerGram: "$0.09", applications: "Flexible Parts, Grips" },
    { material: "Nylon", pricePerGram: "$0.12", applications: "Strong Parts, Gears" },
    { material: "Resin", pricePerGram: "$0.15", applications: "Detailed Models, Jewelry" }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the perfect plan for your 3D printing and modeling needs.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {pricingPlans.map((plan, index) => (
          <div 
            key={index}
            className={`rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 ${
              plan.recommended ? 'border-2 border-blue-500 relative' : 'border border-gray-200'
            }`}
          >
            {plan.recommended && (
              <div className="bg-blue-500 text-white text-center py-2 font-medium">
                Most Popular
              </div>
            )}
            
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
              
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-3 px-4 rounded-lg font-medium transition ${
                  plan.recommended 
                    ? 'bg-blue-600 text-white hover:bg-blue-600' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Material Pricing</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider border-b">Material</th>
                <th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider border-b">Price Per Gram</th>
                <th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider border-b">Common Applications</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {materialPricing.map((material, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6 border-b border-gray-200">{material.material}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{material.pricePerGram}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{material.applications}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      <section className="bg-gray-50 p-8 rounded-lg shadow-inner">
        <h2 className="text-2xl font-bold mb-4">Custom Pricing</h2>
        <p className="mb-6">
          Need a tailored solution for your large-scale or specialized 3D printing projects? 
          Contact our sales team for custom pricing and enterprise solutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-blue-600 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition">
            Request Quote
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 py-3 px-6 rounded-lg font-medium border border-gray-300 transition">
            Contact Sales
          </button>
        </div>
      </section>
      
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 mb-8">
          Have questions about our pricing? Check out these common inquiries.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">How are printing costs calculated?</h3>
            <p className="text-gray-600">
              Our pricing is based on material usage (weight in grams), printing time, and complexity of the model.
              Your subscription plan provides discounted rates on these base costs.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">Can I change my plan?</h3>
            <p className="text-gray-600">
              Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes will be reflected in your next billing cycle.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">Do you offer discounts?</h3>
            <p className="text-gray-600">
              We offer educational discounts for schools and universities. We also have volume discounts for large orders.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">
              We accept all major credit cards, PayPal, and bank transfers for enterprise customers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}