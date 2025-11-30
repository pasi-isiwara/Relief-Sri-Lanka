import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MaterialSelector } from './MaterialSelector';
import { MapPinIcon, PhoneIcon, PlusIcon, XIcon, LoaderIcon } from 'lucide-react';
import './RequestForm.css';
export function RequestForm({
  onSubmit
}) {
  const {
    t,
    language
  } = useLanguage();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [gpsLocation, setGpsLocation] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [contactNumbers, setContactNumbers] = useState(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [message, setMessage] = useState(null);
  const autoSubmitTimerRef = useRef(null);
  
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

  const updateContactNumber = (index, value) => {
    const updated = [...contactNumbers];
    updated[index] = value;
    setContactNumbers(updated);
  };

  const removeContactNumber = index => {
    setContactNumbers(contactNumbers.filter((_, i) => i !== index));
  };
  
  const handleSubmit = useCallback(async (e, isAutoSubmit = false) => {
    if (e) {
      e.preventDefault();
    }
    
    setMessage(null);
    
    // Clear auto-submit timer
    if (autoSubmitTimerRef.current) {
      clearTimeout(autoSubmitTimerRef.current);
    }
    
    // Validation: Phone number is always required
    if (!contactNumbers.some(n => n.trim())) {
      setMessage({
        type: 'error',
        text: 'At least one contact number is required'
      });
      return;
    }
    
    // For manual submission, all fields are required
    if (!isAutoSubmit) {
      if (!name.trim() || materials.length === 0) {
        setMessage({
          type: 'error',
          text: 'Please fill all required fields'
        });
        return;
      }
      
      // Either address or GPS location must be provided
      if (!address.trim() && !gpsLocation) {
        setMessage({
          type: 'error',
          text: 'Please provide either an address or GPS location'
        });
        return;
      }
    }
    
    setIsSubmitting(true);
    const success = await onSubmit({
      name: name.trim() || 'Unknown',
      address: address.trim() || (gpsLocation ? 'Location via GPS' : 'Not provided'),
      gpsLocation,
      materials: materials.length > 0 ? materials : [{ type: 'other', quantity: 1 }],
      contactNumbers: contactNumbers.filter(n => n.trim()),
      language,
      isAutoSubmit
    });
    setIsSubmitting(false);
    if (success) {
      setMessage({
        type: 'success',
        text: isAutoSubmit ? 'Request auto-submitted successfully' : t.requestSubmitted
      });
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
  }, [contactNumbers, materials, name, address, gpsLocation, language, onSubmit, t.requestSubmitted, t.errorSubmitting]);

  // Reset auto-submit timer on any input change
  const resetAutoSubmitTimer = useCallback(() => {
    if (autoSubmitTimerRef.current) {
      clearTimeout(autoSubmitTimerRef.current);
    }
    
    // Only set timer if there's at least one contact number
    const hasContactNumber = contactNumbers.some(n => n.trim());
    if (hasContactNumber) {
      autoSubmitTimerRef.current = setTimeout(() => {
        // Auto-submit with minimum required data
        if (contactNumbers.some(n => n.trim())) {
          handleSubmit(null, true);
        }
      }, 180000); // 3 minutes = 180000ms
    }
  }, [contactNumbers, handleSubmit]);

  useEffect(() => {
    resetAutoSubmitTimer();
    return () => {
      if (autoSubmitTimerRef.current) {
        clearTimeout(autoSubmitTimerRef.current);
      }
    };
  }, [name, address, materials, contactNumbers, resetAutoSubmitTimer]);

  return <form onSubmit={handleSubmit} className="request-form">
      {message && <div className={`message ${message.type}`}>
          {message.text}
        </div>}

      <div className="form-group">
        <label className="form-label">{t.name} *</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t.namePlaceholder} className="form-input" required />
      </div>

      <div className="form-group">
        <label className="form-label">{t.address} {!gpsLocation && '*'}</label>
        <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder={t.addressPlaceholder} rows={3} className="form-textarea" required={!gpsLocation} />
        <button type="button" onClick={getGPSLocation} disabled={isGettingLocation} className="gps-button">
          {isGettingLocation ? <LoaderIcon className="icon spin" /> : <MapPinIcon className="icon" />}
          {gpsLocation ? t.locationCaptured : t.getLocation}
        </button>
      </div>

      <div className="form-group">
        <label className="form-label">{t.contactNumbers} *</label>
        <div className="contacts-list">
          {contactNumbers.map((number, index) => <div key={index} className="contact-row">
              <div className="contact-input-wrapper">
                <PhoneIcon className="contact-icon" />
                <input type="tel" value={number} onChange={e => updateContactNumber(index, e.target.value)} placeholder={t.contactPlaceholder} className="contact-input" required />
              </div>
              {contactNumbers.length > 1 && <button type="button" onClick={() => removeContactNumber(index)} className="remove-contact-btn">
                  <XIcon className="icon" />
                </button>}
            </div>)}
          <button type="button" onClick={addContactNumber} className="add-contact-btn">
            <PlusIcon className="icon-sm" />
            {t.addContact}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">{t.selectMaterials} *</label>
        <MaterialSelector selectedMaterials={materials} onChange={setMaterials} />
      </div>

      <button type="submit" disabled={isSubmitting} className="submit-button">
        {isSubmitting ? <>
            <LoaderIcon className="icon spin" />
            {t.submitting}
          </> : t.submitRequest}
      </button>
    </form>
}