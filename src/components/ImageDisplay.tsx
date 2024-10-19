import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImageDisplayProps {
  generatedImage: string | null;
  isProcessing: boolean;
  error: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ generatedImage, isProcessing, error }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4">
      {isProcessing ? (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-sm">Generating image...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center text-red-500">
          <p className="text-sm">{error}</p>
        </div>
      ) : generatedImage ? (
        <img src={generatedImage} alt="Generated Fashion" className="max-w-full h-auto rounded-lg shadow-md" />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <ImageIcon size={64} />
          <p className="mt-2 text-sm">Generated image will appear here</p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;