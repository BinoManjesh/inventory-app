export default function (date) {
  return (Date.now() - date.getTime()) / (60 * 60 * 1000);
}
