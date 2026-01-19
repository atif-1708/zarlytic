
export const formatZAR = (amount: number): string => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getMonthName = (monthStr: string): string => {
  const [year, month] = monthStr.split('-');
  return new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
};

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const isEntryLocked = (dateStr: string, type: 'daily' | 'monthly'): boolean => {
  const now = new Date();
  if (type === 'daily') {
    const entryDate = new Date(dateStr);
    const diffInHours = (now.getTime() - entryDate.getTime()) / (1000 * 60 * 60);
    return diffInHours > 24;
  } else {
    const [year, month] = dateStr.split('-').map(Number);
    const entryMonthEnd = new Date(year, month, 0, 23, 59, 59);
    return now > entryMonthEnd;
  }
};
