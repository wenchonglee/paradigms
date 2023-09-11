// mock a blocking, expensive function
export const sleep = (seconds: number) => {
  const start = new Date();
  while ((new Date().getTime() - start.getTime()) / 1000 < seconds);
};
