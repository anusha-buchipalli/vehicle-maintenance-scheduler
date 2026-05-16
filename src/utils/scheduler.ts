interface Task {
  TaskID: string;
  Duration: number;
  Impact: number;
}

export const optimizeTasks = (
  tasks: Task[],
  maxHours: number
) => {

  const n = tasks.length;

  const dp: number[][] = Array.from(
    { length: n + 1 },
    () => Array(maxHours + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {

    const task = tasks[i - 1]!;

    for (let h = 0; h <= maxHours; h++) {

      if (task.Duration <= h) {

        dp[i]![h] = Math.max(
          task.Impact + dp[i - 1]![h - task.Duration]!,
          dp[i - 1]![h]!
        );

      } else {

        dp[i]![h] = dp[i - 1]![h]!;

      }
    }
  }

  const selectedTasks: Task[] = [];

  let h = maxHours;

  for (let i = n; i > 0; i--) {

    if (dp[i]![h] !== dp[i - 1]![h]) {

      const selectedTask = tasks[i - 1]!;

      selectedTasks.push(selectedTask);

      h -= selectedTask.Duration;
    }
  }

  const totalDuration = selectedTasks.reduce(
    (sum, task) => sum + task.Duration,
    0
  );

  return {
    totalImpact: dp[n]![maxHours]!,
    totalDuration,
    selectedTasks,
  };
};