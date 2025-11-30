import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { RequestCard } from './RequestCard';
import { ReliefRequest, MaterialType } from '../types';
import { LoaderIcon } from 'lucide-react';
interface RequestFeedProps {
  requests: ReliefRequest[];
  loading: boolean;
}
const materialCategories: Record<string, MaterialType[]> = {
  food: ['rice', 'bread', 'canned_food', 'baby_food'],
  medicine: ['first_aid', 'prescription', 'pain_relief'],
  water: ['drinking_water', 'purification_tablets'],
  shelter: ['tarpaulin', 'blankets', 'tents'],
  clothing: ['adult_clothing', 'children_clothing', 'infant_clothing'],
  other: ['batteries', 'flashlights', 'phone_chargers']
};
export function RequestFeed({
  requests,
  loading
}: RequestFeedProps) {
  const {
    t
  } = useLanguage();
  const [filter, setFilter] = useState<string>('all');
  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true;
    const categoryMaterials = materialCategories[filter] || [];
    return request.materials.some(m => categoryMaterials.includes(m.type));
  });
  if (loading) {
    return <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <LoaderIcon className="w-8 h-8 animate-spin mb-3" />
        <p>{t.loading}</p>
      </div>;
  }
  return <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'all' ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
          {t.filterAll}
        </button>
        {Object.keys(materialCategories).map(category => <button key={category} onClick={() => setFilter(category)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === category ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
            {t.categories[category as keyof typeof t.categories]}
          </button>)}
      </div>

      {filteredRequests.length === 0 ? <div className="text-center py-20 text-gray-400">
          <p>{t.noRequests}</p>
        </div> : <div className="space-y-4">
          {filteredRequests.map(request => <RequestCard key={request.id} request={request} />)}
        </div>}
    </div>;
}