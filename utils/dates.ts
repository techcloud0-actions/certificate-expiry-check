/**
 * Wrapper for days counting
 */
export const DateUtils = {
  /**
   * Seconds in a day
   */
  SECONDS_IN_DAY: 60 * 60 * 24,

  daysUntil: (date: Date): number => {
    const nowTimestamp = Math.floor(Date.now() / 1000);
    const thenTimestamp = Math.floor(date.getTime() / 1000);
    return Math.floor(
      (thenTimestamp - nowTimestamp) / DateUtils.SECONDS_IN_DAY
    );
  },
};
