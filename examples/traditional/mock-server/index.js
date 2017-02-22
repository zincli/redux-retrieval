const data = [
  { id: '1', name: 'freedom', type: 'MG', price: '$35.00' },
  { id: '2', name: 'justice', type: 'MG', price: '$30.00' },
  { id: '3', name: 'impulse', type: 'MG', price: '$35.00' },
  { id: '4', name: 'strike freedom', type: 'PG', price: '$120.00' },
  { id: '5', name: 'unlimited justice', type: 'MG', price: '$32.00' },
  { id: '6', name: 'strike gundam', type: 'PG', price: '$100.00' },
  { id: '7', name: 'destiny', type: 'MG', price: '$35.00' },
  { id: '8', name: 'legend', type: 'HG', price: '$25.00' },
  { id: '9', name: 'legend', type: 'HG', price: '$25.00' },
  { id: '10', name: 'legend', type: 'HG', price: '$25.00' },
  { id: '11', name: 'legend', type: 'HG', price: '$25.00' },
  { id: '12', name: 'legend', type: 'HG', price: '$25.00' },
  { id: '13', name: 'legend', type: 'HG', price: '$25.00' },
];

export function find(conditions) {
  const keys = Object.keys(conditions);
  const items = keys.length > 0 ? data.filter((item) => {
    for (key of keys) {
      if (item[key] !== conditions[key]) {
        return false;
      }
    }
    return true;
  }) : data;

  return {
    items: items.slice(0, 10),
    total: items.length,
  };
}
