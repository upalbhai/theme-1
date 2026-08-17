/**
 * Combines multiple CSS class names into a single string.
 */
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats an ISO date string into a friendly, human-readable format.
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return 'No due date';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Gets a relative time description (e.g., "Due tomorrow", "Overdue by 2 days").
 */
export function getRelativeDueDate(dateString?: string): { text: string; isOverdue: boolean } {
  if (!dateString) return { text: 'No due date', isOverdue: false };
  
  const due = new Date(dateString);
  due.setHours(0, 0, 0, 0);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    const absDays = Math.abs(diffDays);
    return { 
      text: `Overdue by ${absDays} day${absDays > 1 ? 's' : ''}`, 
      isOverdue: true 
    };
  }
  
  if (diffDays === 0) {
    return { text: 'Due today', isOverdue: false };
  }
  
  if (diffDays === 1) {
    return { text: 'Due tomorrow', isOverdue: false };
  }
  
  return { text: `Due in ${diffDays} days`, isOverdue: false };
}

function startOfCalendarDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Whether two dates fall on the same local calendar day. */
export function isSameCalendarDay(a: Date, b: Date): boolean {
  return startOfCalendarDay(a).getTime() === startOfCalendarDay(b).getTime();
}

/** Chat date separator label: Today, Yesterday, or formatted date. */
export function formatChatDayLabel(date: Date): string {
  const today = startOfCalendarDay(new Date());
  const target = startOfCalendarDay(date);
  const diffDays = Math.round((today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';

  const now = new Date();
  if (target.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}


/**
 * Dynamically resolves a ChatChannel name for direct messages.
 */
export function getChannelDisplayName(channel: import('@/types/chat').ChatChannel, currentUserId?: number): string {
  if (channel.type !== 'direct') return channel.name;
  
  if (channel.members.length === 1) {
    return 'Notes to Self';
  }
  
  if (channel.members.length === 2 && currentUserId) {
    const otherMember = channel.members.find((m) => m.id !== currentUserId);
    if (otherMember) {
      return otherMember.name;
    }
  }
  
  return channel.name;
}
