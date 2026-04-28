import type { Owner } from '@/types';

export const currentOwnerId = 'OWN001';

export const MOCK_OWNER: Owner = {
  id: currentOwnerId,
  name: 'Công ty TNHH EV Solutions Quận 1',
  legalName: 'Công ty TNHH EV Solutions Quận 1',
  taxId: '0101234567',
  contactEmail: 'contact@evsolutions.vn',
  contactPhone: '0901234567',
  bankAccount: {
    bankName: 'Vietcombank',
    accountNumber: '0071001234567',
    accountHolder: 'CÔNG TY TNHH EV SOLUTIONS QUẬN 1',
  },
  ownsParkings: ['ST001', 'ST003', 'ST005'], // 3 parkings
  revenueSharePercent: 70, // owner gets 70%, platform 30%
  createdAt: '2023-01-15T00:00:00Z',
};
