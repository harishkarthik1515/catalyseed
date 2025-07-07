import React, { useState, useRef, useEffect } from 'react';
import { X, Download, Copy, Sparkles, Check, Share2, Calendar, MapPin, Trophy, Users } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  story?: any;
  hackathon?: any;
  type: 'story' | 'hackathon';
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, story, hackathon, type }) => {
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const data = type === 'story' ? story : hackathon;

  useEffect(() => {
    if (data?.image && imageRef.current) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setImageLoaded(true);
      };
      img.src = data.image;
      imageRef.current = img;
    }
  }, [data?.image]);

  if (!isOpen) return null;
  if (!data) return null;

  const generateShareImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for social media sharing (1200x630 is optimal for most platforms)
    canvas.width = 1200;
    canvas.height = 630;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#7c3aed');
    gradient.addColorStop(1, '#ec4899');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle pattern overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < canvas.width; i += 80) {
      for (let j = 0; j < canvas.height; j += 80) {
        ctx.fillRect(i, j, 40, 40);
      }
    }

    // Main content area with rounded corners
    ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
    ctx.roundRect(40, 40, canvas.width - 80, canvas.height - 80, 20);
    ctx.fill();

    // Add shadow effect
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;

    // Left side - Content
    const contentWidth = 650;
    const imageWidth = 450;
    const padding = 60;

    // Catalyseed logo area
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#7c3aed';
    ctx.roundRect(padding, padding, 180, 50, 8);
    ctx.fill();

    // Logo text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText('✨ Catalyseed', padding + 15, padding + 32);

    // Title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 32px Arial, sans-serif';
    const title = type === 'story' ? data.company : data.title;
    const titleY = padding + 100;
    
    // Word wrap for title
    const words = title.split(' ');
    let line = '';
    let y = titleY;
    const lineHeight = 40;
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > contentWidth - 40 && n > 0) {
        ctx.fillText(line.trim(), padding, y);
        line = words[n] + ' ';
        y += lineHeight;
        if (y > titleY + lineHeight * 2) break; // Max 3 lines
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), padding, y);

    // Description
    ctx.fillStyle = '#6b7280';
    ctx.font = '18px Arial, sans-serif';
    const description = data.description || '';
    const descWords = description.split(' ').slice(0, 20).join(' ') + (description.split(' ').length > 20 ? '...' : '');
    
    // Word wrap for description
    const descLines = [];
    const descWordsArray = descWords.split(' ');
    let descLine = '';
    
    for (let i = 0; i < descWordsArray.length; i++) {
      const testLine = descLine + descWordsArray[i] + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > contentWidth - 40 && i > 0) {
        descLines.push(descLine.trim());
        descLine = descWordsArray[i] + ' ';
        if (descLines.length >= 3) break; // Max 3 lines
      } else {
        descLine = testLine;
      }
    }
    if (descLine.trim()) descLines.push(descLine.trim());

    let descY = y + 60;
    descLines.forEach((line, index) => {
      ctx.fillText(line, padding, descY + (index * 25));
    });

    // Details section
    const detailsY = descY + (descLines.length * 25) + 40;
    ctx.fillStyle = '#374151';
    ctx.font = '16px Arial, sans-serif';

    if (type === 'story') {
      ctx.fillText(`👤 Founder: ${data.founder}`, padding, detailsY);
      ctx.fillText(`🏢 Institute: ${data.institute}`, padding, detailsY + 25);
      ctx.fillText(`📍 Location: ${data.location}`, padding, detailsY + 50);
      if (data.tags && data.tags.length > 0) {
        ctx.fillText(`🏷️ Tags: ${data.tags.slice(0, 3).join(', ')}`, padding, detailsY + 75);
      }
    } else {
      ctx.fillText(`📅 Date: ${data.date}`, padding, detailsY);
      ctx.fillText(`📍 Location: ${data.location}`, padding, detailsY + 25);
      ctx.fillText(`🏆 Prize Pool: ${data.prizePool}`, padding, detailsY + 50);
      ctx.fillText(`👥 Participants: ${data.participants}`, padding, detailsY + 75);
    }

    // Right side - Image
    if (imageLoaded && imageRef.current) {
      const img = imageRef.current;
      const imageX = canvas.width - imageWidth - padding;
      const imageY = padding + 60;
      const imageHeight = 300;

      // Create clipping path for rounded image
      ctx.save();
      ctx.roundRect(imageX, imageY, imageWidth, imageHeight, 15);
      ctx.clip();
      
      // Calculate aspect ratio and draw image
      const aspectRatio = img.width / img.height;
      let drawWidth = imageWidth;
      let drawHeight = imageHeight;
      let drawX = imageX;
      let drawY = imageY;

      if (aspectRatio > imageWidth / imageHeight) {
        drawHeight = imageWidth / aspectRatio;
        drawY = imageY + (imageHeight - drawHeight) / 2;
      } else {
        drawWidth = imageHeight * aspectRatio;
        drawX = imageX + (imageWidth - drawWidth) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();

      // Add image border
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.2)';
      ctx.lineWidth = 2;
      ctx.roundRect(imageX, imageY, imageWidth, imageHeight, 15);
      ctx.stroke();
    } else {
      // Fallback gradient box if image not loaded
      const imageX = canvas.width - imageWidth - padding;
      const imageY = padding + 60;
      const imageHeight = 300;

      const imgGradient = ctx.createLinearGradient(imageX, imageY, imageX + imageWidth, imageY + imageHeight);
      imgGradient.addColorStop(0, '#f3e8ff');
      imgGradient.addColorStop(1, '#fce7f3');
      ctx.fillStyle = imgGradient;
      ctx.roundRect(imageX, imageY, imageWidth, imageHeight, 15);
      ctx.fill();

      // Add icon
      ctx.fillStyle = '#7c3aed';
      ctx.font = '48px Arial, sans-serif';
      const icon = type === 'story' ? '✨' : '🏆';
      ctx.fillText(icon, imageX + imageWidth/2 - 24, imageY + imageHeight/2 + 16);
    }

    // Footer
    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText('Discover more innovation stories at catalyseed.com', padding, canvas.height - 60);

    // Tamil Nadu pride badge
    ctx.fillStyle = '#7c3aed';
    ctx.roundRect(canvas.width - 250, canvas.height - 90, 180, 30, 15);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px Arial, sans-serif';
    ctx.fillText('🌟 Tamil Nadu Innovation', canvas.width - 240, canvas.height - 70);
  };

  const downloadImage = () => {
    generateShareImage();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `catalyseed-${type}-${data.id}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  const copyLink = () => {
    const url = `${window.location.origin}/${type === 'story' ? 'success-stories' : 'hackathons'}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToSocial = (platform: string) => {
    const url = `${window.location.origin}/${type === 'story' ? 'success-stories' : 'hackathons'}`;
    const text = type === 'story' 
      ? `Check out ${data.company} by ${data.founder} on Catalyseed! 🚀`
      : `Join ${data.title} on Catalyseed! 🏆`;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Share {type === 'story' ? 'Success Story' : 'Hackathon'}</h3>
                <p className="text-gray-600 text-sm">Spread the word about Tamil Nadu's innovation</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Enhanced Preview Card with Image */}
          <div className="mb-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <div className="flex items-start space-x-6">
              {/* Image */}
              <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                {data.image ? (
                  <img 
                    src={data.image} 
                    alt={type === 'story' ? data.company : data.title}
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoaded(true)}
                  />
                ) : (
                  <>
                    {type === 'story' ? (
                      <Sparkles className="w-12 h-12 text-white" />
                    ) : (
                      <Trophy className="w-12 h-12 text-white" />
                    )}
                  </>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  {type === 'story' ? data.company : data.title}
                </h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3 leading-relaxed">{data.description}</p>
                
                {/* Tags */}
                {data.tags && data.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {data.tags.slice(0, 3).map((tag: string, index: number) => (
                      <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Details */}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  {type === 'story' ? (
                    <>
                      <span className="flex items-center space-x-1">
                        <span>👤</span>
                        <span>{data.founder}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>🏢</span>
                        <span>{data.institute}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{data.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>❤️</span>
                        <span>{data.likes} likes</span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{data.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{data.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Trophy className="w-3 h-3" />
                        <span>{data.prizePool}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{data.participants} participants</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-purple-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-purple-700">Catalyseed</span>
              </div>
              <span className="text-xs text-purple-600 font-medium">Tamil Nadu Innovation Platform</span>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Share on Social Media</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'Twitter', color: 'bg-blue-500 hover:bg-blue-600', icon: '🐦' },
                  { name: 'LinkedIn', color: 'bg-blue-700 hover:bg-blue-800', icon: '💼' },
                  { name: 'Facebook', color: 'bg-blue-600 hover:bg-blue-700', icon: '📘' },
                  { name: 'WhatsApp', color: 'bg-green-500 hover:bg-green-600', icon: '💬' }
                ].map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => shareToSocial(platform.name.toLowerCase())}
                    className={`${platform.color} text-white p-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105`}
                  >
                    <span className="text-lg">{platform.icon}</span>
                    <span className="text-sm font-medium">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={copyLink}
                  className="flex items-center justify-center space-x-2 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  <span className="font-medium">{copied ? 'Link Copied!' : 'Copy Link'}</span>
                </button>
                <button
                  onClick={downloadImage}
                  className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span className="font-medium">Download Share Image</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hidden canvas for image generation */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      </div>
    </div>
  );
};

// Add roundRect method if not available
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x: number, y: number, width: number, height: number, radius: number) {
    this.beginPath();
    this.moveTo(x + radius, y);
    this.lineTo(x + width - radius, y);
    this.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.lineTo(x + width, y + height - radius);
    this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.lineTo(x + radius, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.lineTo(x, y + radius);
    this.quadraticCurveTo(x, y, x + radius, y);
    this.closePath();
  };
}

export default ShareModal;