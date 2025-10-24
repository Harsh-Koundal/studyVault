import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  ArrowLeft, Share2, Heart, Flag, Download, User, Calendar,
  Download as DownloadIcon, FileText, Eye, Home
} from 'lucide-react';

const MaterialPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchMaterial();
  }, [id]);

  const fetchMaterial = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/materials/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMaterial(res.data);
      // console.log(material.fileUrl.replace(/ /g, '%20'))
    } catch (err) {
      console.error("Error fetching material:", err);
      toast.error("Failed to load material");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!material?.fileUrl) {
      toast.error("File not available");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Update download count
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/materials/${id}/download`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Trigger download
      const link = document.createElement('a');
      link.href = material.fileUrl;
      link.download = material.title || 'material.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Download started!");

      // Refresh material data to show updated download count
      fetchMaterial();
    } catch (err) {
      console.error("Error downloading:", err);
      toast.error("Failed to download");
    }
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/materials/${id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsLiked(!isLiked);
      toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
    } catch (err) {
      console.error("Error liking material:", err);
      toast.error("Failed to update");
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const handleReport = async () => {
    const reason = prompt("Please provide a reason for reporting this material:");
    if (!reason) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/materials/${id}/report`,
        { reason },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Material reported. We'll review it soon.");
    } catch (err) {
      console.error("Error reporting material:", err);
      toast.error("Failed to report");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading material...</p>
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Material not found</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-10">

      {/* Main Content */}
      <div className='pt-14 ml-10 cursor-pointer'>
        <button
          onClick={() => navigate('/Dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Dashboard
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Preview Area */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {material.title}
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                {material.subject}
                {material.semester && ` - ${material.semester}`}
              </p>

              {/* PDF Preview */}
              {material.fileUrl ? (
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden mb-6">
                  <iframe
                    src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${material.fileUrl.replace(/ /g, '%20')}`}
                    className="w-full"
                    style={{ height: '600px' }}
                    title="PDF Preview"
                  />

                </div>
              ) : (
                <div className="h-96 bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No preview available</p>
                  </div>
                </div>
              )}

              {/* Description */}
              {material.description && (
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{material.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Info Sidebar */}
          <div className="lg:w-96">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {material.title}
              </h2>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                {material.subject && (
                  <span className="px-3 py-1 bg-black text-white rounded-lg text-sm font-semibold">
                    {material.subject}
                  </span>
                )}
                {material.semester && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold">
                    {material.semester}
                  </span>
                )}
                {material.materialType && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
                    {material.materialType}
                  </span>
                )}
              </div>

              {material.description && (
                <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-4">
                  {material.description}
                </p>
              )}

              {/* Metadata */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Uploaded by</p>
                    <p className="font-semibold">
                      {material.author?.fullName || 'Anonymous'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Upload date</p>
                    <p className="font-semibold">
                      {new Date(material.date || material.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <DownloadIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Downloads</p>
                    <p className="font-semibold">{material.downloads || 0}</p>
                  </div>
                </div>

                {material.views !== undefined && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Eye className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Views</p>
                      <p className="font-semibold">{material.views}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition font-semibold"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialPreview;