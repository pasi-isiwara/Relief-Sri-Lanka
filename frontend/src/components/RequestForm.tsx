import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MaterialSelector } from './MaterialSelector';
import { Material, GPSLocation } from '../types';
import { MapPinIcon, PhoneIcon, PlusIcon, XIcon, LoaderIcon } from 'lucide-react';
interface RequestFormProps {
  onSubmit: (data: {
    name: string;
    address: string;
    gpsLocation: GPSLocation | null;
    materials: Material[];
    contactNumbers: string[];
  }) => Promise<boolean>;
}
export function RequestForm({
  onSubmit
}: RequestFormProps) {
  const {
    t,
    language
  } = useLanguage();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [gpsLocation, setGpsLocation] = useState<GPSLocation | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [contactNumbers, setContactNumbers] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const getGPSLocation = () => {
    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(position => {
      setGpsLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setIsGettingLocation(false);
    }, error => {
      console.error('Error getting location:', error);
      setIsGettingLocation(false);
      setMessage({
        type: 'error',
        text: 'Could not get location. Please enter address manually.'
      });
    });
  };
  const addContactNumber = () => {
    setContactNumbers([...contactNumbers, '']);
  };
  const updateContactNumber = (index: number, value: string) => {
    const updated = [...contactNumbers];
    updated[index] = value;
    setContactNumbers(updated);
  };
  const removeContactNumber = (index: number) => {
    setContactNumbers(contactNumbers.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!name.trim() || !address.trim() || materials.length === 0 || !contactNumbers.some(n => n.trim())) {
      setMessage({
        type: 'error',
        text: 'Please fill all required fields'
      });
      return;
    }
    setIsSubmitting(true);
    const success = await onSubmit({
      name: name.trim(),
      address: address.trim(),
      gpsLocation,
      materials,
      contactNumbers: contactNumbers.filter(n => n.trim())
    });
    setIsSubmitting(false);
    if (success) {
      setMessage({
        type: 'success',
        text: t.requestSubmitted
      });
      // Reset form
      setName('');
      setAddress('');
      setGpsLocation(null);
      setMaterials([]);
      setContactNumbers(['']);
      setTimeout(() => setMessage(null), 5000);
    } else {
      setMessage({
        type: 'error',
        text: t.errorSubmitting
      });
    }
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      {message && <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-emerald-900/30 border border-emerald-700 text-emerald-400' : 'bg-red-900/30 border border-red-700 text-red-400'}`}>
          {message.text}
        </div>}

      <div>
        <label className="block text-sm font-medium mb-2">{t.name} *</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t.namePlaceholder} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" required />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t.address} *</label>
        <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder={t.addressPlaceholder} rows={3} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none" required />
        <button type="button" onClick={getGPSLocation} disabled={isGettingLocation} className="mt-2 flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors disabled:opacity-50">
          {isGettingLocation ? <LoaderIcon className="w-4 h-4 animate-spin" /> : <MapPinIcon className="w-4 h-4" />}
          {gpsLocation ? t.locationCaptured : t.getLocation}
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t.contactNumbers} *
        </label>
        <div className="space-y-2">
          {contactNumbers.map((number, index) => <div key={index} className="flex gap-2">
              <div className="flex-1 relative">
                <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input type="tel" value={number} onChange={e => updateContactNumber(index, e.target.value)} placeholder={t.contactPlaceholder} className="w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" required />
              </div>
              {contactNumbers.length > 1 && <button type="button" onClick={() => removeContactNumber(index)} className="px-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors">
                  <XIcon className="w-5 h-5" />
                </button>}
            </div>)}
          <button type="button" onClick={addContactNumber} className="flex items-center gap-2 px-4 py-2 text-emerald-400 hover:text-emerald-300 transition-colors">
            <PlusIcon className="w-4 h-4" />
            {t.addContact}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">
          {t.selectMaterials} *
        </label>
        <MaterialSelector selectedMaterials={materials} onChange={setMaterials} />
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2">
        {isSubmitting ? <>
            <LoaderIcon className="w-5 h-5 animate-spin" />
            {t.submitting}
          </> : t.submitRequest}
      </button>
    </form>;
}