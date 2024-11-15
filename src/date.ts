export function getRandomDateWithinOneYear() {
  const today = new Date();
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(today.getFullYear() - 1);

  const randomTime = today.getTime() + Math.random() * (oneYearFromNow.getTime() - today.getTime());
  return new Date(randomTime);
}
