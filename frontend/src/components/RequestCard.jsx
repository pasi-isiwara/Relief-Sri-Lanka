import { useLanguage } from '../contexts/LanguageContext';
import { PhoneIcon, MapPinIcon, ClockIcon } from 'lucide-react';
import './RequestCard.css';
export function RequestCard({
  request
}) {
  const {
    t
  } = useLanguage();
  const formatTimestamp = date => {
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
  return <div className="request-card">
      <div className="card-header">
        <div>
          <h3 className="card-name">{request.name}</h3>
          <div className="card-timestamp">
            <ClockIcon className="timestamp-icon" />
            {formatTimestamp(request.timestamp)}
          </div>
        </div>
      </div>

      <div className="card-section">
        <div className="location-row">
          <MapPinIcon className="location-icon" />
          <span className="location-text">{request.address}</span>
          {request.gpsLocation && <button onClick={openMaps} className="req-view-location-btn">
              {t.viewLocation}
            </button>}
        </div>
      </div>

      <div className="card-section">
        <h4 className="section-title">Needed Materials:</h4>
        <div className="materials-tags">
          {request.materials.map((material, index) => <span key={index} className="material-tag">
              {t.materials[material.type]} × {material.quantity}
            </span>)}
        </div>
      </div>

      <div className="card-footer">
        <h4 className="section-title">Contact:</h4>
        <div className="contact-buttons">
          {request.contactNumbers.map((number, index) => <a key={index} href={`tel:${number}`} className="contact-button">
              <PhoneIcon className="contact-btn-icon" />
              {number}
            </a>)}
        </div>
      </div>
    </div>;
}