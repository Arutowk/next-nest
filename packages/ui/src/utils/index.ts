/**
 * 防抖函数（Debounce）
 * @param func 需要防抖的函数
 * @param wait 等待时间（毫秒）
 * @param immediate 是否立即执行（true: 首次调用立即执行）
 * @returns 包装后的防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;

    const later = () => {
      timeoutId = null;
      if (!immediate) func.apply(context, args);
    };

    const shouldCallNow = immediate && timeoutId === null;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(later, wait);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  };
}

/**
 * 节流函数（Throttle）
 * @param func 需要节流的函数
 * @param delay 节流时间间隔（毫秒）
 * @returns 包装后的节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let lastExecTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    const currentTime = Date.now();
    const timeSinceLastExec = currentTime - lastExecTime;

    // 清除未执行的延迟调用
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    // 如果距离上次执行已超过延迟时间，立即执行
    if (timeSinceLastExec >= delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      // 否则设置延迟调用（确保最后一次触发会执行）
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
        timeoutId = null;
      }, delay - timeSinceLastExec);
    }
  };
}
