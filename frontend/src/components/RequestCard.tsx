import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ReliefRequest } from '../types';
import { PhoneIcon, MapPinIcon, ClockIcon } from 'lucide-react';
interface RequestCardProps {
  request: ReliefRequest;
}
export function RequestCard({
  request
}: RequestCardProps) {
  const {
    t
  } = useLanguage();
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };
  const openMaps = () => {
    if (request.gpsLocation) {
      const {
        lat,
        lng
      } = request.gpsLocation;
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
    }
  };
  return <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg">{request.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
            <ClockIcon className="w-4 h-4" />
            {formatTimestamp(request.timestamp)}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-2 text-sm">
          <MapPinIcon className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
          <span className="text-gray-300">{request.address}</span>
        </div>
        {request.gpsLocation && <button onClick={openMaps} className="text-sm text-emerald-400 hover:text-emerald-300 underline ml-6">
            {t.viewLocation}
          </button>}
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-400 mb-2">
          Needed Materials:
        </h4>
        <div className="flex flex-wrap gap-2">
          {request.materials.map((material, index) => <span key={index} className="px-3 py-1.5 bg-gray-750 border border-gray-600 rounded-full text-sm">
              {t.materials[material.type]} × {material.quantity}
            </span>)}
        </div>
      </div>

      <div className="pt-3 border-t border-gray-700">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Contact:</h4>
        <div className="flex flex-wrap gap-2">
          {request.contactNumbers.map((number, index) => <a key={index} href={`tel:${number}`} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors font-medium">
              <PhoneIcon className="w-4 h-4" />
              {number}
            </a>)}
        </div>
      </div>
    </div>;
}