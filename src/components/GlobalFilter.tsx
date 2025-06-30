import React, { createContext, useContext, ReactNode, useState } from 'react';

interface FilterContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  clearFilters: () => void;
  activeFiltersCount: number;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDistrict('all');
    setSelectedSector('all');
    setSelectedStatus('all');
  };

  const activeFiltersCount = [
    searchTerm !== '',
    selectedCategory !== 'all',
    selectedDistrict !== 'all',
    selectedSector !== 'all',
    selectedStatus !== 'all'
  ].filter(Boolean).length;

  return (
    <FilterContext.Provider value={{
      searchTerm,
      setSearchTerm,
      selectedCategory,
      setSelectedCategory,
      selectedDistrict,
      setSelectedDistrict,
      selectedSector,
      setSelectedSector,
      selectedStatus,
      setSelectedStatus,
      clearFilters,
      activeFiltersCount
    }}>
      {children}
    </FilterContext.Provider>
  );
};