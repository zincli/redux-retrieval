export default function types(...names) {
  const result = {};

  names.forEach((name) => {
    result[name] = `@@redux-retrieval/${name}`;
  });

  return result;
}
