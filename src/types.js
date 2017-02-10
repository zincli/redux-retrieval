export default function types(...names) {
  const result = {};

  names.forEach((name) => {
    result[name] = `@@REDUX/RETRIEVAL/${name}`;
  });

  return result;
}
