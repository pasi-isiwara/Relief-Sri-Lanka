import { Language, MaterialType } from '../types';
export const translations: Record<Language, {
  appTitle: string;
  requestHelp: string;
  viewRequests: string;
  name: string;
  namePlaceholder: string;
  address: string;
  addressPlaceholder: string;
  getLocation: string;
  locationCaptured: string;
  contactNumbers: string;
  contactPlaceholder: string;
  addContact: string;
  selectMaterials: string;
  quantity: string;
  submitRequest: string;
  submitting: string;
  requestSubmitted: string;
  errorSubmitting: string;
  noRequests: string;
  loading: string;
  filterAll: string;
  callNow: string;
  viewLocation: string;
  requestedAt: string;
  materials: Record<MaterialType, string>;
  categories: {
    food: string;
    medicine: string;
    water: string;
    shelter: string;
    clothing: string;
    other: string;
  };
}> = {
  en: {
    appTitle: 'Relief Sri Lanka',
    requestHelp: 'Request Help',
    viewRequests: 'View Requests',
    name: 'Your Name',
    namePlaceholder: 'Enter your full name',
    address: 'Address / Location',
    addressPlaceholder: 'Enter your address or describe your location',
    getLocation: 'Get My GPS Location',
    locationCaptured: 'Location Captured',
    contactNumbers: 'Contact Numbers',
    contactPlaceholder: 'Enter phone number',
    addContact: 'Add Another Number',
    selectMaterials: 'Select Needed Materials',
    quantity: 'Quantity',
    submitRequest: 'Submit Request',
    submitting: 'Submitting...',
    requestSubmitted: 'Request submitted successfully!',
    errorSubmitting: 'Failed to submit. Please try again.',
    noRequests: 'No requests yet. Your request will appear here for donors to see.',
    loading: 'Loading requests...',
    filterAll: 'All',
    callNow: 'Call',
    viewLocation: 'View Location',
    requestedAt: 'Requested',
    materials: {
      rice: 'Rice',
      bread: 'Bread',
      canned_food: 'Canned Food',
      baby_food: 'Baby Food',
      first_aid: 'First Aid Kit',
      prescription: 'Prescription Medicine',
      pain_relief: 'Pain Relief',
      drinking_water: 'Drinking Water',
      purification_tablets: 'Water Purification',
      tarpaulin: 'Tarpaulin',
      blankets: 'Blankets',
      tents: 'Tents',
      adult_clothing: 'Adult Clothing',
      children_clothing: 'Children Clothing',
      infant_clothing: 'Infant Clothing',
      batteries: 'Batteries',
      flashlights: 'Flashlights',
      phone_chargers: 'Phone Chargers'
    },
    categories: {
      food: 'Food',
      medicine: 'Medicine',
      water: 'Water',
      shelter: 'Shelter',
      clothing: 'Clothing',
      other: 'Other'
    }
  },
  si: {
    appTitle: 'සහන ශ්‍රී ලංකා',
    requestHelp: 'උදව් ඉල්ලන්න',
    viewRequests: 'ඉල්ලීම් බලන්න',
    name: 'ඔබේ නම',
    namePlaceholder: 'ඔබේ සම්පූර්ණ නම ඇතුළත් කරන්න',
    address: 'ලිපිනය / ස්ථානය',
    addressPlaceholder: 'ඔබේ ලිපිනය හෝ ස්ථානය විස්තර කරන්න',
    getLocation: 'මගේ GPS ස්ථානය ලබා ගන්න',
    locationCaptured: 'ස්ථානය ලබා ගන්නා ලදී',
    contactNumbers: 'සම්බන්ධතා අංක',
    contactPlaceholder: 'දුරකථන අංකය ඇතුළත් කරන්න',
    addContact: 'තවත් අංකයක් එක් කරන්න',
    selectMaterials: 'අවශ්‍ය ද්‍රව්‍ය තෝරන්න',
    quantity: 'ප්‍රමාණය',
    submitRequest: 'ඉල්ලීම ඉදිරිපත් කරන්න',
    submitting: 'ඉදිරිපත් කරමින්...',
    requestSubmitted: 'ඉල්ලීම සාර්ථකව ඉදිරිපත් කරන ලදී!',
    errorSubmitting: 'ඉදිරිපත් කිරීම අසාර්ථක විය. කරුණාකර නැවත උත්සාහ කරන්න.',
    noRequests: 'තවම ඉල්ලීම් නැත. ඔබේ ඉල්ලීම දායකයින්ට පෙනෙනු ඇත.',
    loading: 'ඉල්ලීම් පූරණය වෙමින්...',
    filterAll: 'සියල්ල',
    callNow: 'අමතන්න',
    viewLocation: 'ස්ථානය බලන්න',
    requestedAt: 'ඉල්ලා ඇත',
    materials: {
      rice: 'සහල්',
      bread: 'පාන්',
      canned_food: 'කෑන් කළ ආහාර',
      baby_food: 'ළදරු ආහාර',
      first_aid: 'ප්‍රථමාධාර කට්ටලය',
      prescription: 'වට්ටෝරු ඖෂධ',
      pain_relief: 'වේදනා නාශක',
      drinking_water: 'පානීය ජලය',
      purification_tablets: 'ජල පිරිසිදු කිරීම',
      tarpaulin: 'ටාපොලින්',
      blankets: 'බ්ලැන්කට්',
      tents: 'කූඩාරම්',
      adult_clothing: 'වැඩිහිටි ඇඳුම්',
      children_clothing: 'ළමා ඇඳුම්',
      infant_clothing: 'ළදරු ඇඳුම්',
      batteries: 'බැටරි',
      flashlights: 'විදුලි පන්දම්',
      phone_chargers: 'දුරකථන චාජර්'
    },
    categories: {
      food: 'ආහාර',
      medicine: 'ඖෂධ',
      water: 'ජලය',
      shelter: 'නවාතැන',
      clothing: 'ඇඳුම්',
      other: 'වෙනත්'
    }
  },
  ta: {
    appTitle: 'நிவாரண இலங்கை',
    requestHelp: 'உதவி கோரவும்',
    viewRequests: 'கோரிக்கைகளைக் காண்க',
    name: 'உங்கள் பெயர்',
    namePlaceholder: 'உங்கள் முழு பெயரை உள்ளிடவும்',
    address: 'முகவரி / இடம்',
    addressPlaceholder: 'உங்கள் முகவரி அல்லது இடத்தை விவரிக்கவும்',
    getLocation: 'எனது GPS இடத்தைப் பெறவும்',
    locationCaptured: 'இடம் பதிவு செய்யப்பட்டது',
    contactNumbers: 'தொடர்பு எண்கள்',
    contactPlaceholder: 'தொலைபேசி எண்ணை உள்ளிடவும்',
    addContact: 'மற்றொரு எண்ணைச் சேர்க்கவும்',
    selectMaterials: 'தேவையான பொருட்களைத் தேர்ந்தெடுக்கவும்',
    quantity: 'அளவு',
    submitRequest: 'கோரிக்கையைச் சமர்ப்பிக்கவும்',
    submitting: 'சமர்ப்பிக்கிறது...',
    requestSubmitted: 'கோரிக்கை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!',
    errorSubmitting: 'சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
    noRequests: 'இன்னும் கோரிக்கைகள் இல்லை. உங்கள் கோரிக்கை நன்கொடையாளர்களுக்குத் தெரியும்.',
    loading: 'கோரிக்கைகள் ஏற்றப்படுகின்றன...',
    filterAll: 'அனைத்தும்',
    callNow: 'அழைக்கவும்',
    viewLocation: 'இடத்தைக் காண்க',
    requestedAt: 'கோரப்பட்டது',
    materials: {
      rice: 'அரிசி',
      bread: 'ரொட்டி',
      canned_food: 'பதப்படுத்தப்பட்ட உணவு',
      baby_food: 'குழந்தை உணவு',
      first_aid: 'முதலுதவி பெட்டி',
      prescription: 'மருந்து பரிந்துரை',
      pain_relief: 'வலி நிவாரணி',
      drinking_water: 'குடிநீர்',
      purification_tablets: 'நீர் சுத்திகரிப்பு',
      tarpaulin: 'தார்ப்பாய்',
      blankets: 'போர்வைகள்',
      tents: 'கூடாரங்கள்',
      adult_clothing: 'பெரியவர் உடைகள்',
      children_clothing: 'குழந்தை உடைகள்',
      infant_clothing: 'குழந்தை உடைகள்',
      batteries: 'பேட்டரிகள்',
      flashlights: 'மின்விளக்குகள்',
      phone_chargers: 'தொலைபேசி சார்ஜர்கள்'
    },
    categories: {
      food: 'உணவு',
      medicine: 'மருந்து',
      water: 'நீர்',
      shelter: 'தங்குமிடம்',
      clothing: 'உடைகள்',
      other: 'மற்றவை'
    }
  }
};