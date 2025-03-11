export default function DesignersPage() {
  const designers = [
    {
      id: 1,
      name: "Alex Johnson",
      specialty: "Mechanical Parts",
      experience: "8 years",
      rating: 4.9,
      image: "/api/placeholder/100/100"
    },
    {
      id: 2,
      name: "Sarah Williams",
      specialty: "Character Models",
      experience: "6 years",
      rating: 4.7,
      image: "/api/placeholder/100/100"
    },
    {
      id: 3,
      name: "Michael Chen",
      specialty: "Architectural Models",
      experience: "10 years",
      rating: 4.8,
      image: "/api/placeholder/100/100"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      specialty: "Product Prototypes",
      experience: "5 years",
      rating: 4.6,
      image: "/api/placeholder/100/100"
    },
    {
      id: 5,
      name: "David Kim",
      specialty: "Jewelry Design",
      experience: "7 years",
      rating: 4.9,
      image: "/api/placeholder/100/100"
    },
    {
      id: 6,
      name: "Lisa Park",
      specialty: "Medical Models",
      experience: "9 years",
      rating: 4.8,
      image: "/api/placeholder/100/100"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our 3D Designers</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Work with our team of professional 3D designers to bring your ideas to life.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {designers.map((designer) => (
          <div key={designer.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={designer.image}
                  alt={designer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">{designer.name}</h3>
                  <p className="text-blue-600">{designer.specialty}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Experience</span>
                  <span className="font-medium">{designer.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Rating</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-1">{designer.rating}</span>
                    <span className="text-yellow-400">★</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                Contact Designer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}