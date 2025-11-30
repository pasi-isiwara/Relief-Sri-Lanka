import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PackageIcon, PillIcon, DropletIcon, HomeIcon, ShirtIcon, BatteryIcon } from 'lucide-react';
import './MaterialSelector.css';
const materialCategories = {
  food: ['rice', 'bread', 'canned_food', 'baby_food'],
  medicine: ['first_aid', 'prescription', 'pain_relief'],
  water: ['drinking_water', 'purification_tablets'],
  shelter: ['tarpaulin', 'blankets', 'tents'],
  clothing: ['adult_clothing', 'children_clothing', 'infant_clothing'],
  other: ['batteries', 'flashlights', 'phone_chargers']
};
const categoryIcons = {
  food: PackageIcon,
  medicine: PillIcon,
  water: DropletIcon,
  shelter: HomeIcon,
  clothing: ShirtIcon,
  other: BatteryIcon
};
export function MaterialSelector({
  selectedMaterials,
  onChange
}) {
  const {
    t
  } = useLanguage();
  const [expandedCategory, setExpandedCategory] = useState('food');
  const isSelected = type => {
    return selectedMaterials.some(m => m.type === type);
  };
  const getQuantity = type => {
    return selectedMaterials.find(m => m.type === type)?.quantity || 1;
  };
  const toggleMaterial = type => {
    if (isSelected(type)) {
      onChange(selectedMaterials.filter(m => m.type !== type));
    } else {
      onChange([...selectedMaterials, {
        type,
        quantity: 1
      }]);
    }
  };
  const updateQuantity = (type, quantity) => {
    onChange(selectedMaterials.map(m => m.type === type ? {
      ...m,
      quantity: Math.max(1, quantity)
    } : m));
  };
  return <div className="material-selector">
      {Object.entries(materialCategories).map(([category, materials]) => {
      const Icon = categoryIcons[category];
      const isExpanded = expandedCategory === category;
      const selectedCount = selectedMaterials.filter(m => materials.includes(m.type)).length;
      return <div key={category} className="category-container">
            <button onClick={() => setExpandedCategory(isExpanded ? null : category)} className="category-header">
              <div className="category-title">
                <Icon className="category-icon" />
                <span className="category-name">{t.categories[category]}</span>
              </div>
              <span className="selected-count">{selectedCount} selected</span>
            </button>

            {isExpanded && <div className="materials-list">
                {materials.map(type => <div key={type} className={`material-item ${isSelected(type) ? 'selected' : ''}`}>
                    <label className="material-label">
                      <input type="checkbox" checked={isSelected(type)} onChange={() => toggleMaterial(type)} className="material-checkbox" />
                      <span className="material-name">{t.materials[type]}</span>
                    </label>

                    {isSelected(type) && <div className="quantity-controls">
                        <button onClick={() => updateQuantity(type, getQuantity(type) - 1)} className="quantity-btn">
                          -
                        </button>
                        <span className="quantity-value">{getQuantity(type)}</span>
                        <button onClick={() => updateQuantity(type, getQuantity(type) + 1)} className="quantity-btn">
                          +
                        </button>
                      </div>}
                  </div>)}
              </div>}
          </div>;
    })}
    </div>;
}