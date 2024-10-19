import React, { useState } from 'react';
import { Shirt, Image as ImageIcon, Upload } from 'lucide-react';

interface FashionFormProps {
  onGenerate: (formData: any) => void;
  isProcessing: boolean;
}

const FashionForm: React.FC<FashionFormProps> = ({ onGenerate, isProcessing }) => {
  const [formData, setFormData] = useState({
    key: '',
    prompt: '',
    negative_prompt: 'Low quality, unrealistic, bad cloth, warped cloth, distorted proportions',
    init_image: '',
    cloth_image: '',
    cloth_type: 'upper_body',
    height: 512,
    width: 384,
    guidance_scale: 8.0,
    num_inference_steps: 30,
    seed: Math.floor(Math.random() * 1000000),
    refine_face: 'yes',
    opacity: 0.7,
    scale: 5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="key" className="block text-sm font-medium text-gray-700">API Key</label>
        <input
          type="text"
          name="key"
          id="key"
          value={formData.key}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Prompt</label>
        <textarea
          name="prompt"
          id="prompt"
          value={formData.prompt}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div>
        <label htmlFor="init_image" className="block text-sm font-medium text-gray-700">Model Image URL</label>
        <input
          type="url"
          name="init_image"
          id="init_image"
          value={formData.init_image}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="cloth_image" className="block text-sm font-medium text-gray-700">Cloth Image URL</label>
        <input
          type="url"
          name="cloth_image"
          id="cloth_image"
          value={formData.cloth_image}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="cloth_type" className="block text-sm font-medium text-gray-700">Cloth Type</label>
        <select
          name="cloth_type"
          id="cloth_type"
          value={formData.cloth_type}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="upper_body">Upper Body</option>
          <option value="lower_body">Lower Body</option>
          <option value="dress">Dress</option>
        </select>
      </div>
      <div>
        <label htmlFor="num_inference_steps" className="block text-sm font-medium text-gray-700">Inference Steps</label>
        <input
          type="number"
          name="num_inference_steps"
          id="num_inference_steps"
          value={formData.num_inference_steps}
          onChange={handleChange}
          min="20"
          max="50"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="seed" className="block text-sm font-medium text-gray-700">Seed (optional)</label>
        <input
          type="number"
          name="seed"
          id="seed"
          value={formData.seed}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="opacity" className="block text-sm font-medium text-gray-700">Opacity</label>
        <input
          type="number"
          name="opacity"
          id="opacity"
          value={formData.opacity}
          onChange={handleChange}
          min="0.1"
          max="1"
          step="0.1"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="scale" className="block text-sm font-medium text-gray-700">Scale</label>
        <input
          type="number"
          name="scale"
          id="scale"
          value={formData.scale}
          onChange={handleChange}
          min="1"
          max="10"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isProcessing ? 'Generating...' : 'Generate Image'}
        </button>
      </div>
    </form>
  );
};

export default FashionForm;