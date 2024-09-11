export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  let timerId: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback(...args), delay);
  };
}
