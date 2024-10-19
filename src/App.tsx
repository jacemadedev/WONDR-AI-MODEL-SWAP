import React, { useState } from 'react';
import { Shirt } from 'lucide-react';
import FashionForm from './components/FashionForm';
import ImageDisplay from './components/ImageDisplay';

function App() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pollForResult = async (fetchUrl: string, originalData: any, retries = 10, interval = 5000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(fetchUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(originalData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success' && data.output && data.output.length > 0) {
          setGeneratedImage(data.output[0]);
          setIsProcessing(false);
          return;
        } else if (data.status === 'processing') {
          await new Promise(resolve => setTimeout(resolve, interval));
        } else {
          throw new Error(data.message || 'Image generation failed');
        }
      } catch (error) {
        console.error('Error fetching result:', error);
      }
    }

    setError('Timeout: Image generation took too long');
    setIsProcessing(false);
  };

  const handleGenerate = async (formData: any) => {
    setIsProcessing(true);
    setError(null);
    setGeneratedImage(null);

    try {
      console.log('Sending request with data:', JSON.stringify(formData, null, 2));
      const response = await fetch('https://stablediffusionapi.com/api/v5/fashion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          prompt: `${formData.prompt}, high quality, detailed, realistic`,
          refine_face: 'yes',
          temp: 'yes',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const data = await response.json();
      console.log('Received response:', JSON.stringify(data, null, 2));

      if (data.status === 'success' && data.output && data.output.length > 0) {
        setGeneratedImage(data.output[0]);
        setIsProcessing(false);
      } else if (data.status === 'processing') {
        pollForResult(data.fetch_result, { key: formData.key, id: data.id });
      } else {
        throw new Error(data.message || 'Image generation failed');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      setError(`Error generating image: ${error instanceof Error ? error.message : String(error)}`);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center">
          <Shirt className="mr-2" /> Fashion Image Generator
        </h1>
        <p className="mt-2 text-xl text-gray-600">Try on virtual clothes with AI</p>
      </header>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FashionForm onGenerate={handleGenerate} isProcessing={isProcessing} />
          <ImageDisplay generatedImage={generatedImage} isProcessing={isProcessing} error={error} />
        </div>
      </div>
    </div>
  );
}

export default App;