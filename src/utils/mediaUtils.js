// Utility for YouTube link parsing and client-side image compression

/**
 * Extracts YouTube video ID and returns an embed URL and metadata
 * Supports: watch?v=, youtu.be/, shorts/, embed/
 */
export function parseYouTubeVideo(url) {
  if (!url || typeof url !== 'string') return null;
  const cleanUrl = url.trim();
  if (!cleanUrl) return null;

  // Match 11-char YouTube ID
  const regExp = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
  const match = cleanUrl.match(regExp);

  if (match && match[1]) {
    const videoId = match[1];
    const isShort = cleanUrl.toLowerCase().includes('/shorts/');
    return {
      videoId,
      isShort,
      embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      originalUrl: cleanUrl
    };
  }

  // If already an embed URL
  if (cleanUrl.includes('youtube.com/embed/')) {
    return {
      videoId: cleanUrl.split('youtube.com/embed/')[1].split(/[?&]/)[0],
      isShort: false,
      embedUrl: cleanUrl,
      thumbnailUrl: '',
      originalUrl: cleanUrl
    };
  }

  return null;
}

/**
 * Compresses an uploaded image File using HTML5 Canvas
 * Resizes to max dimensions and converts to optimized Base64 JPEG
 */
export function compressImageFile(file, maxWidth = 900, maxHeight = 900, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while preserving aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        // Smooth scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to optimized JPEG Base64
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
      img.src = e.target.result;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Cloudinary Unsigned Upload Configuration
 */
export const CLOUDINARY_CONFIG = {
  cloudName: 'tb5bmwd5',
  uploadPreset: 'quins_preset',
  getUploadUrl: (cloudName = 'tb5bmwd5') => `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
};

/**
 * Uploads an image File/Blob directly to Cloudinary using an unsigned upload preset.
 * Reports real-time upload progress (0-100%) via onProgress callback.
 * 
 * @param {File|Blob} file - Image file from file picker or drag-drop
 * @param {Object} options - { cloudName, uploadPreset, onProgress }
 * @returns {Promise<{ secure_url: string, public_id: string, format: string, width: number, height: number }>}
 */
export function uploadToCloudinary(file, options = {}) {
  const cloudName = options.cloudName || CLOUDINARY_CONFIG.cloudName;
  const uploadPreset = options.uploadPreset || CLOUDINARY_CONFIG.uploadPreset;
  const onProgress = options.onProgress;

  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided for upload.'));
      return;
    }

    const endpoint = CLOUDINARY_CONFIG.getUploadUrl(cloudName);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint, true);

    if (onProgress && xhr.upload) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (data.secure_url) {
            resolve({
              secure_url: data.secure_url,
              url: data.url,
              public_id: data.public_id,
              format: data.format,
              width: data.width,
              height: data.height
            });
          } else if (data.url) {
            resolve({
              secure_url: data.url,
              url: data.url,
              public_id: data.public_id
            });
          } else {
            reject(new Error('Cloudinary response did not contain secure_url.'));
          }
        } catch (err) {
          reject(new Error('Failed to parse Cloudinary response: ' + err.message));
        }
      } else {
        try {
          const errData = JSON.parse(xhr.responseText);
          const msg = errData.error?.message || `Cloudinary upload failed (HTTP ${xhr.status})`;
          reject(new Error(msg));
        } catch (_) {
          reject(new Error(`Cloudinary upload failed with HTTP status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error occurred while uploading to Cloudinary.'));
    };

    xhr.send(formData);
  });
}

