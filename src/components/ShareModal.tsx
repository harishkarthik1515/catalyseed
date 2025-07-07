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
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const data = type === 'story' ? story : hackathon;

  useEffect(() => {
    if (data?.image) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setImageLoaded(true);
        if (imageRef.current) {
          imageRef.current = img;
        }
      };
      img.onerror = () => {
        console.log('Image failed to load, using fallback');
        setImageLoaded(false);
      };
      img.src = data.image;
    }
  }, [data?.image]);

  if (!isOpen) return null;
  if (!data) return null;

  const generateShareImage = async (): Promise<void> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        resolve();
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve();
        return;
      }

      // Set canvas size for portrait mode (optimal for mobile sharing)
      canvas.width = 800;
      canvas.height = 1200;

      // Clear canvas first
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#7c3aed');
      gradient.addColorStop(1, '#ec4899');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle pattern overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for (let i = 0; i < canvas.width; i += 60) {
        for (let j = 0; j < canvas.height; j += 60) {
          ctx.fillRect(i, j, 30, 30);
        }
      }

      // Main content area with rounded corners
      const contentPadding = 40;
      const contentWidth = canvas.width - (contentPadding * 2);
      const contentHeight = canvas.height - (contentPadding * 2);

      // Draw rounded rectangle manually since roundRect might not be available
      const drawRoundedRect = (x: number, y: number, width: number, height: number, radius: number) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      };

      ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
      drawRoundedRect(contentPadding, contentPadding, contentWidth, contentHeight, 20);
      ctx.fill();

      const padding = 60;
      let currentY = padding + 20;

      // Catalyseed logo area
      ctx.fillStyle = '#7c3aed';
      drawRoundedRect(padding, currentY, 200, 50, 8);
      ctx.fill();

      // Logo text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 20px Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('✨ Catalyseed', padding + 20, currentY + 25);

      currentY += 80;

      // Image section
      const imageHeight = 300;
      const imageWidth = contentWidth - (padding * 2);
      
      if (imageLoaded && imageRef.current) {
        const img = imageRef.current;
        
        // Create clipping path for rounded image
        ctx.save();
        drawRoundedRect(padding, currentY, imageWidth, imageHeight, 15);
        ctx.clip();
        
        // Calculate aspect ratio and draw image
        const aspectRatio = img.width / img.height;
        let drawWidth = imageWidth;
        let drawHeight = imageHeight;
        let drawX = padding;
        let drawY = currentY;

        if (aspectRatio > imageWidth / imageHeight) {
          drawHeight = imageWidth / aspectRatio;
          drawY = currentY + (imageHeight - drawHeight) / 2;
        } else {
          drawWidth = imageHeight * aspectRatio;
          drawX = padding + (imageWidth - drawWidth) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        ctx.restore();

        // Add image border
        ctx.strokeStyle = 'rgba(124, 58, 237, 0.2)';
        ctx.lineWidth = 2;
        drawRoundedRect(padding, currentY, imageWidth, imageHeight, 15);
        ctx.stroke();
      } else {
        // Fallback gradient box if image not loaded
        const imgGradient = ctx.createLinearGradient(padding, currentY, padding + imageWidth, currentY + imageHeight);
        imgGradient.addColorStop(0, '#f3e8ff');
        imgGradient.addColorStop(1, '#fce7f3');
        ctx.fillStyle = imgGradient;
        drawRoundedRect(padding, currentY, imageWidth, imageHeight, 15);
        ctx.fill();

        // Add icon
        ctx.fillStyle = '#7c3aed';
        ctx.font = '64px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const icon = type === 'story' ? '✨' : '🏆';
        ctx.fillText(icon, padding + imageWidth / 2, currentY + imageHeight / 2);
      }

      currentY += imageHeight + 40;

      // Title
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 36px Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      const title = type === 'story' ? (data.company || 'Untitled') : (data.title || 'Untitled');
      
      // Word wrap for title
      const words = title.split(' ');
      let line = '';
      const lineHeight = 45;
      const maxWidth = contentWidth - (padding * 2);
      
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line.trim(), padding, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
          if (currentY > canvas.height - 400) break;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), padding, currentY);

      currentY += 50;

      // Description
      ctx.fillStyle = '#6b7280';
      ctx.font = '20px Arial, sans-serif';
      const description = data.description || 'No description available';
      const descWords = description.split(' ').slice(0, 30).join(' ') + (description.split(' ').length > 30 ? '...' : '');
      
      // Word wrap for description
      const descLines = [];
      const descWordsArray = descWords.split(' ');
      let descLine = '';
      
      for (let i = 0; i < descWordsArray.length; i++) {
        const testLine = descLine + descWordsArray[i] + ' ';
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && i > 0) {
          descLines.push(descLine.trim());
          descLine = descWordsArray[i] + ' ';
          if (descLines.length >= 4) break;
        } else {
          descLine = testLine;
        }
      }
      if (descLine.trim()) descLines.push(descLine.trim());

      descLines.forEach((line, index) => {
        ctx.fillText(line, padding, currentY + (index * 28));
      });

      currentY += (descLines.length * 28) + 50;

      // Details section
      ctx.fillStyle = '#374151';
      ctx.font = '18px Arial, sans-serif';
      const detailLineHeight = 35;

      if (type === 'story') {
        ctx.fillText(`👤 Founder: ${data.founder || 'Unknown'}`, padding, currentY);
        currentY += detailLineHeight;
        ctx.fillText(`🏢 Institute: ${data.institute || 'Unknown'}`, padding, currentY);
        currentY += detailLineHeight;
        ctx.fillText(`📍 Location: ${data.location || 'Unknown'}`, padding, currentY);
        currentY += detailLineHeight;
        if (data.tags && data.tags.length > 0) {
          ctx.fillText(`🏷️ Tags: ${data.tags.slice(0, 3).join(', ')}`, padding, currentY);
          currentY += detailLineHeight;
        }
      } else {
        ctx.fillText(`📅 Date: ${data.date || 'TBD'}`, padding, currentY);
        currentY += detailLineHeight;
        ctx.fillText(`📍 Location: ${data.location || 'Unknown'}`, padding, currentY);
        currentY += detailLineHeight;
        ctx.fillText(`🏆 Prize Pool: ${data.prizePool || 'TBD'}`, padding, currentY);
        currentY += detailLineHeight;
        ctx.fillText(`👥 Participants: ${data.participants || 'TBD'}`, padding, currentY);
        currentY += detailLineHeight;
      }

      // Footer section
      currentY = canvas.height - 120;
      
      // Tamil Nadu pride badge
      ctx.fillStyle = '#7c3aed';
      const badgeWidth = 280;
      const badgeHeight = 40;
      const badgeX = (canvas.width - badgeWidth) / 2;
      drawRoundedRect(badgeX, currentY, badgeWidth, badgeHeight, 20);
      ctx.fill();
      
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🌟 Tamil Nadu Innovation', badgeX + badgeWidth / 2, currentY + badgeHeight / 2);

      // Website footer
      currentY += 60;
      ctx.fillStyle = '#9ca3af';
      ctx.font = '16px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Discover more at catalyseed.com', canvas.width / 2, currentY);

      // Use requestAnimationFrame to ensure rendering is complete
      requestAnimationFrame(() => {
        resolve();
      });
    });
  };

  const downloadImage = async () => {
    setIsGenerating(true);
    
    try {
      await generateShareImage();
      
      // Small delay to ensure canvas is fully rendered
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Convert to blob for better compatibility
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `catalyseed-${type}-${data.id || 'share'}.png`;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, 'image/png', 1.0);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
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
                  { 
                    name: 'Twitter', 
                    color: 'bg-black hover:bg-gray-800', 
                    svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  },
                  { 
                    name: 'LinkedIn', 
                    color: 'bg-black hover:bg-gray-800', 
                    svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  },
                  { 
                    name: 'Facebook', 
                    color: 'bg-black hover:bg-gray-800', 
                    svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  },
                  { 
                    name: 'WhatsApp', 
                    color: 'bg-black hover:bg-gray-800', 
                    svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.488"/></svg>
                  }
                ].map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => shareToSocial(platform.name.toLowerCase())}
                    className={`${platform.color} text-white p-4 rounded-lg transition-all duration-200 flex items-center justify-center transform hover:scale-105`}
                    title={`Share on ${platform.name}`}
                  >
                    {platform.svg}
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
                  disabled={isGenerating}
                  className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  <span className="font-medium">
                    {isGenerating ? 'Generating...' : 'Download Share Image'}
                  </span>
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

export default ShareModal;