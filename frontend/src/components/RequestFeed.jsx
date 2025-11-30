import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { RequestCard } from './RequestCard';
import { LoaderIcon } from 'lucide-react';
import './RequestFeed.css';
const materialCategories = {
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
}) {
  const {
    t
  } = useLanguage();
  const [filter, setFilter] = useState('all');
  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true;
    const categoryMaterials = materialCategories[filter] || [];
    return request.materials.some(m => categoryMaterials.includes(m.type));
  });
  if (loading) {
    return <div className="feed-loading">
        <LoaderIcon className="loading-icon" />
        <p>{t.loading}</p>
      </div>;
  }
  return <div className="request-feed">
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')} className={`filter-btn ${filter === 'all' ? 'active' : ''}`}>
          {t.filterAll}
        </button>
        {Object.keys(materialCategories).map(category => <button key={category} onClick={() => setFilter(category)} className={`filter-btn ${filter === category ? 'active' : ''}`}>
            {t.categories[category]}
          </button>)}
      </div>

      {filteredRequests.length === 0 ? <div className="empty-state">
          <p>{t.noRequests}</p>
        </div> : <div className="requests-list">
          {filteredRequests.map(request => <RequestCard key={request.id} request={request} />)}
        </div>}
    </div>;
}