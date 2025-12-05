import { create } from 'zustand';
import { Investment, OwnerInvestment } from '../types';

interface InvestmentState {
  investments: Investment[];
  ownerInvestments: OwnerInvestment[];
  selectedInvestment: Investment | null;
  isLoading: boolean;
  setInvestments: (investments: Investment[]) => void;
  setOwnerInvestments: (investments: OwnerInvestment[]) => void;
  setSelectedInvestment: (investment: Investment | null) => void;
  addOwnerInvestment: (investment: OwnerInvestment) => void;
}

export const useInvestmentStore = create<InvestmentState>((set) => ({
  investments: [],
  ownerInvestments: [],
  selectedInvestment: null,
  isLoading: false,
  setInvestments: (investments) => set({ investments }),
  setOwnerInvestments: (investments) => set({ ownerInvestments: investments }),
  setSelectedInvestment: (investment) => set({ selectedInvestment: investment }),
  addOwnerInvestment: (investment) =>
    set((state) => ({ ownerInvestments: [...state.ownerInvestments, investment] })),
}));

