import { useState } from 'react';
import { Upload, Zap, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios'

export default function UploadPage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    materialType: '',
    description: ''
  });

  const handleUpload = async () => {
    if (!pdfFile) return toast.error('Please select a PDF to upload.');
    if (!formData.title || !formData.subject || !formData.materialType)
      return toast.error('Please fill all required fields.');

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const data = new FormData();
    data.append('file', pdfFile);
    data.append('title', formData.title);
    data.append('subject', formData.subject);
    data.append('materialType', formData.materialType);
    data.append('description', formData.description);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/materials/uploads`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success('Material uploaded successfully!');
      setPdfFile(null);
      setPdfUrl(null);
      setFormData({ title: '', subject: '', materialType: '', description: '' });

    } catch (err) {
      console.error('Upload error:', err);
      if (err.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        toast.error('Failed to upload material. Please try again.');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file && file.type === 'application/pdf') {
      if (file.size > 50 * 1024 * 1024) {
        alert('File size must be less than 50MB');
        return;
      }
      setPdfFile(file);
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6 mt-14">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Upload Study Material</h1>
          <p className="text-gray-600">Share your knowledge with the community</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Upload className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Easy Upload</h3>
            <p className="text-gray-600 text-sm">Drag & drop your files</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Zap className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Quick Process</h3>
            <p className="text-gray-600 text-sm">Upload in seconds</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Shield className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Secure Storage</h3>
            <p className="text-gray-600 text-sm">Your data is safe</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Upload File</h2>
          <p className="text-gray-600 text-sm mb-6">Drag and drop your PDF file or click to browse</p>

          {!pdfFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${isDragging
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 bg-gray-50'
                }`}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="pdf-upload"
              />
              <label htmlFor="pdf-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                    <Upload className="text-purple-600" size={32} />
                  </div>
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    Drop your PDF here or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF files only, max 50MB
                  </p>
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-green-400 bg-green-50 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Upload className="text-green-600" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{pdfFile.name}</p>
                      <p className="text-sm text-gray-600">
                        {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
                      setPdfFile(null);
                      setPdfUrl(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="border-2 border-gray-200 rounded-2xl overflow-hidden bg-white" style={{ height: '500px' }}>
                <iframe
                  src={pdfUrl}
                  className="w-full h-full"
                  title="PDF Preview"
                />
              </div>
            </div>
          )}
        </div>

        {/* Material Details Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Material Details</h2>
          <p className="text-gray-600 text-sm mb-6">Provide information about your study material</p>

          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Data Structures Complete Notes"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="e.g., Mathematics, Web Development, DSA"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
              />
            </div>

            {/* Material Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material Type <span className="text-red-500">*</span>
              </label>
              <select
                name="materialType"
                value={formData.materialType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
              >
                <option value="">Select type</option>
                <option value="notes">Notes</option>
                <option value="textbook">Textbook</option>
                <option value="assignment">Assignment</option>
                <option value="question-paper">Question Paper</option>
                <option value="guide">Guide</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide a brief description of the material..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Upload Button */}
      <div className="max-w-7xl mx-auto mt-6">
        <button onClick={handleUpload} className="w-full bg-purple-600 text-white font-semibold py-4 rounded-xl hover:bg-purple-700 transition-colors shadow-lg" >
          Upload Material
        </button>
      </div>
    </div>
  );
}