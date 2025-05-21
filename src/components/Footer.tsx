export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-700">TrustHub</h3>
            <p className="text-gray-600">Building trust through data, AI, and citizen voices.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 hover:text-blue-600">Home</a></li>
              <li><a href="/feed" className="text-gray-600 hover:text-blue-600">Reports</a></li>
              <li><a href="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Contact</h3>
            <p className="text-gray-600">Have questions or feedback?</p>
            <a href="mailto:contact@trusthub.gov" className="text-blue-600 hover:underline">contact@trusthub.gov</a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} TrustHub - OpenGov Hackathon 2025</p>
        </div>
      </div>
    </footer>
  );
}