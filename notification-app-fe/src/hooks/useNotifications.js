
import { customLogger } from '../../../logging-middleware/logger';

const TYPE_WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1
};

export function useNotifications() {
  // Calculates numeric balance weight score combining structural weight and chronology
  const calculateScore = (item) => {
    const weight = TYPE_WEIGHTS[item.Type] || 0;
    const timeUnix = new Date(item.Timestamp).getTime();
    
    // Weight receives scaling dominance priority, appended with relative timestamp recency
    return (weight * 1000000) + (timeUnix / 1000);
  };

  const processPriorityInbox = (notifications, currentLimit) => {
    customLogger('INFO', 'Sorting array structures via strict algorithmic weight rules calculations', { count: notifications.length, currentLimit });
    
    return [...notifications]
      .map(item => ({ 
        ...item, 
        priorityScore: calculateScore(item) 
      }))
      .sort((a, b) => b.priorityScore - a.priorityScore)
      .slice(0, currentLimit);
  };

  return { processPriorityInbox };
}