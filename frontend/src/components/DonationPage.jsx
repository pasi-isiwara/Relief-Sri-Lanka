import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Clock, Phone, Package, Building, CreditCard, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import './DonationPage.css';

export function DonationPage() {
  const { t } = useLanguage();
  const [copiedField, setCopiedField] = useState(null);

  const collectionCenters = [
    {
      id: 1,
      name: 'Colombo Municipal Council Relief Center',
      address: 'Town Hall, Colombo 7',
      phone: '011-2-691691',
      hours: '24/7',
      coordinates: { lat: 6.9271, lng: 79.8612 }
    },
    {
      id: 2,
      name: 'Gampaha District Secretariat',
      address: 'Main Street, Gampaha',
      phone: '033-2-222274',
      hours: '8:00 AM - 8:00 PM',
      coordinates: { lat: 7.0873, lng: 80.0143 }
    },
    {
      id: 3,
      name: 'Kalutara Relief Distribution Center',
      address: 'District Secretariat, Kalutara',
      phone: '034-2-222265',
      hours: '7:00 AM - 9:00 PM',
      coordinates: { lat: 6.5854, lng: 79.9607 }
    },
    {
      id: 4,
      name: 'Ratnapura Disaster Management Center',
      address: 'Main Street, Ratnapura',
      phone: '045-2-222279',
      hours: '24/7',
      coordinates: { lat: 6.7056, lng: 80.3847 }
    },
    {
      id: 5,
      name: 'Galle Community Center',
      address: 'Church Street, Galle',
      phone: '091-2-234051',
      hours: '6:00 AM - 10:00 PM',
      coordinates: { lat: 6.0535, lng: 80.2210 }
    },
    {
      id: 6,
      name: 'Kandy Red Cross Center',
      address: 'Peradeniya Road, Kandy',
      phone: '081-2-222271',
      hours: '8:00 AM - 6:00 PM',
      coordinates: { lat: 7.2906, lng: 80.6337 }
    },
    {
      id: 7,
      name: 'Matara District Relief Office',
      address: 'Main Street, Matara',
      phone: '041-2-222220',
      hours: '7:00 AM - 8:00 PM',
      coordinates: { lat: 5.9549, lng: 80.5550 }
    },
    {
      id: 8,
      name: 'Kurunegala Municipal Relief Center',
      address: 'Town Center, Kurunegala',
      phone: '037-2-222281',
      hours: '24/7',
      coordinates: { lat: 7.4863, lng: 80.3623 }
    }
  ];

  const bankAccounts = [
    {
      id: 1,
      accountName: t.donationPage.accountName,
      bankName: t.donationPage.bankName,
      accountNumber: '87451236',
      branch: t.donationPage.branch,
      swiftCode: 'BCEYLKLX'
    },
    {
      id: 2,
      accountName: 'National Disaster Relief Fund',
      bankName: 'People\'s Bank',
      accountNumber: '045-1-001-4-1234567',
      branch: 'Head Office Branch',
      swiftCode: 'PSBKLKLX'
    },
    {
      id: 3,
      accountName: 'Sri Lanka Red Cross Society',
      bankName: 'Sampath Bank',
      accountNumber: '001230123456',
      branch: 'Bambalapitiya Branch',
      swiftCode: 'BSAMLKLX'
    }
  ];

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleViewLocation = (coords) => {
    const url = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="donation-page">
      <div className="donation-hero">
        <h1 className="donation-title">{t.donationPage.title}</h1>
        <p className="donation-subtitle">{t.donationPage.subtitle}</p>
      </div>

      {/* Collection Centers Section */}
      <section className="donation-section">
        <div className="section-header">
          <Package className="section-icon" />
          <h2 className="section-title">{t.donationPage.collectionCenters}</h2>
        </div>
        <p className="section-description">{t.donationPage.collectionDescription}</p>
        
        <div className="centers-grid">
          {collectionCenters.map((center) => (
            <div key={center.id} className="center-card">
              <h3 className="center-name">{center.name}</h3>
              
              <div className="center-info">
                <div className="info-row">
                  <MapPin className="info-icon" />
                  <span className="info-text">{center.address}</span>
                </div>
                
                <div className="info-row">
                  <Phone className="info-icon" />
                  <a href={`tel:${center.phone}`} className="info-link">
                    {center.phone}
                  </a>
                </div>
                
                <div className="info-row">
                  <Clock className="info-icon" />
                  <span className="info-text">{center.hours}</span>
                </div>
                
                <div className="info-row">
                  <Package className="info-icon" />
                  <span className="info-text">{t.donationPage.allItems}</span>
                </div>
              </div>
              
              <button 
                onClick={() => handleViewLocation(center.coordinates)}
                className="view-location-btn"
              >
                <MapPin className="btn-icon" />
                {t.viewLocation}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Bank Details Section */}
      <section className="donation-section bank-section">
        <div className="section-header">
          <CreditCard className="section-icon" />
          <h2 className="section-title">{t.donationPage.bankDetails}</h2>
        </div>
        <p className="section-description">{t.donationPage.bankDescription}</p>
        
        <div className="bank-cards">
          {bankAccounts.map((account) => (
            <div key={account.id} className="bank-card">
              <div className="bank-card-header">
                <Building className="bank-icon" />
                <h3 className="bank-name">{account.bankName}</h3>
              </div>
              
              <div className="bank-details">
                <div className="bank-detail-row">
                  <span className="detail-label">Account Name:</span>
                  <div className="detail-value-wrapper">
                    <span className="detail-value">{account.accountName}</span>
                    <button 
                      onClick={() => handleCopy(account.accountName, `${account.id}-name`)}
                      className="copy-btn"
                      title="Copy"
                    >
                      {copiedField === `${account.id}-name` ? 
                        <Check className="copy-icon success" /> : 
                        <Copy className="copy-icon" />
                      }
                    </button>
                  </div>
                </div>
                
                <div className="bank-detail-row">
                  <span className="detail-label">Account Number:</span>
                  <div className="detail-value-wrapper">
                    <span className="detail-value account-number">{account.accountNumber}</span>
                    <button 
                      onClick={() => handleCopy(account.accountNumber, `${account.id}-account`)}
                      className="copy-btn"
                      title="Copy"
                    >
                      {copiedField === `${account.id}-account` ? 
                        <Check className="copy-icon success" /> : 
                        <Copy className="copy-icon" />
                      }
                    </button>
                  </div>
                </div>
                
                <div className="bank-detail-row">
                  <span className="detail-label">Branch:</span>
                  <span className="detail-value">{account.branch}</span>
                </div>
                
                <div className="bank-detail-row">
                  <span className="detail-label">SWIFT Code:</span>
                  <div className="detail-value-wrapper">
                    <span className="detail-value">{account.swiftCode}</span>
                    <button 
                      onClick={() => handleCopy(account.swiftCode, `${account.id}-swift`)}
                      className="copy-btn"
                      title="Copy"
                    >
                      {copiedField === `${account.id}-swift` ? 
                        <Check className="copy-icon success" /> : 
                        <Copy className="copy-icon" />
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
