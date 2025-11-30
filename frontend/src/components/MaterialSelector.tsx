import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Material, MaterialType } from '../types';
import { PackageIcon, PillIcon, DropletIcon, HomeIcon, ShirtIcon, BatteryIcon } from 'lucide-react';
interface MaterialSelectorProps {
  selectedMaterials: Material[];
  onChange: (materials: Material[]) => void;
}
const materialCategories: Record<string, MaterialType[]> = {
  food: ['rice', 'bread', 'canned_food', 'baby_food'],
  medicine: ['first_aid', 'prescription', 'pain_relief'],
  water: ['drinking_water', 'purification_tablets'],
  shelter: ['tarpaulin', 'blankets', 'tents'],
  clothing: ['adult_clothing', 'children_clothing', 'infant_clothing'],
  other: ['batteries', 'flashlights', 'phone_chargers']
};
const categoryIcons: Record<string, typeof PackageIcon> = {
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
}: MaterialSelectorProps) {
  const {
    t
  } = useLanguage();
  const [expandedCategory, setExpandedCategory] = useState<string | null>('food');
  const isSelected = (type: MaterialType) => {
    return selectedMaterials.some(m => m.type === type);
  };
  const getQuantity = (type: MaterialType) => {
    return selectedMaterials.find(m => m.type === type)?.quantity || 1;
  };
  const toggleMaterial = (type: MaterialType) => {
    if (isSelected(type)) {
      onChange(selectedMaterials.filter(m => m.type !== type));
    } else {
      onChange([...selectedMaterials, {
        type,
        quantity: 1
      }]);
    }
  };
  const updateQuantity = (type: MaterialType, quantity: number) => {
    onChange(selectedMaterials.map(m => m.type === type ? {
      ...m,
      quantity: Math.max(1, quantity)
    } : m));
  };
  return <div className="space-y-3">
      {Object.entries(materialCategories).map(([category, materials]) => {
      const Icon = categoryIcons[category];
      const isExpanded = expandedCategory === category;
      return <div key={category} className="bg-gray-800 rounded-lg overflow-hidden">
            <button onClick={() => setExpandedCategory(isExpanded ? null : category)} className="w-full flex items-center justify-between p-4 hover:bg-gray-750 transition-colors">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-emerald-500" />
                <span className="font-medium">
                  {t.categories[category as keyof typeof t.categories]}
                </span>
              </div>
              <span className="text-gray-400 text-sm">
                {selectedMaterials.filter(m => materials.includes(m.type)).length}{' '}
                selected
              </span>
            </button>

            {isExpanded && <div className="p-4 pt-0 space-y-2">
                {materials.map(type => <div key={type} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${isSelected(type) ? 'bg-emerald-900/30 border border-emerald-700' : 'bg-gray-750'}`}>
                    <label className="flex items-center gap-3 flex-1 cursor-pointer">
                      <input type="checkbox" checked={isSelected(type)} onChange={() => toggleMaterial(type)} className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0" />
                      <span className="text-sm">{t.materials[type]}</span>
                    </label>

                    {isSelected(type) && <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(type, getQuantity(type) - 1)} className="w-8 h-8 flex items-center justify-center rounded bg-gray-700 hover:bg-gray-600 transition-colors">
                          -
                        </button>
                        <span className="w-12 text-center font-medium">
                          {getQuantity(type)}
                        </span>
                        <button onClick={() => updateQuantity(type, getQuantity(type) + 1)} className="w-8 h-8 flex items-center justify-center rounded bg-gray-700 hover:bg-gray-600 transition-colors">
                          +
                        </button>
                      </div>}
                  </div>)}
              </div>}
          </div>;
    })}
    </div>;
}