const data = [
  { id: '1', name: 'freedom', type: 'MG', price: '$35.00', series: 'Seed', },
  { id: '2', name: 'justice', type: 'MG', price: '$30.00', series: 'Seed', },
  { id: '3', name: 'impulse', type: 'MG', price: '$35.00', series: 'Seed Destiny', },
  { id: '4', name: 'strike freedom', type: 'PG', price: '$120.00', series: 'Seed Destiny', },
  { id: '5', name: 'unlimited justice', type: 'MG', price: '$32.00', series: 'Seed Destiny', },
  { id: '6', name: 'strike gundam', type: 'PG', price: '$100.00', series: 'Seed', },
  { id: '7', name: 'destiny', type: 'MG', price: '$35.00', series: 'Seed Destiny', },
  { id: '8', name: 'legend', type: 'HG', price: '$25.00', series: 'Seed Destiny', },
  { id: '9', name: 'unicorn', type: 'MG', price: '$45.00', series: 'UC', },
  { id: '10', name: 'unicorn(PG)', type: 'PG', price: '$125.00', series: 'UC', },
  { id: '11', name: 'sinanju', type: 'MG', price: '$45.00', series: 'UC', },
  { id: '12', name: 'kshatriya', type: 'HG', price: '$35.00', series: 'UC', },
  { id: '13', name: 'banshee', type: 'PG', price: '$125.00', series: 'UC', },
];

export function retrieve(conditions) {
  const keys = Object.keys(conditions);
  const items = keys.length > 0 ? data.filter((item) => {
    for (let key of keys) {
      let targets;
      if (!Array.isArray(conditions[key])) {
        targets = [conditions[key]];
      } else {
        targets = conditions[key];
      }
      if (key === 'series' && conditions[key] === '') {
        return true;
      }
      if (key in item && targets.indexOf(item[key]) < 0) {
        return false;
      }
    }

    return true;
  }) : data;
  const { pageNumber = 1, pageSize = 3 } = conditions;

  return {
    items: items.slice((pageNumber - 1)*pageSize, pageNumber*pageSize),
    total: items.length,
  };
}
