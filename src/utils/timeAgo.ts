export const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
  
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);
  
    if (diff < 60) return `${diff}s ago`;
  
    const mins = Math.floor(diff / 60);
    if (mins < 60) return `${mins}m ago`;
  
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
  
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };