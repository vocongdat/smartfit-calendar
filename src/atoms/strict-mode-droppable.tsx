import { useEffect, useState } from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

/**
 * react-beautiful-dnd's <Droppable> does not register correctly under
 * React 18 StrictMode (the double-invoked effects break its registration).
 * Delaying mount by one animation frame works around the known issue.
 * See: https://github.com/atlassian/react-beautiful-dnd/issues/2399
 */
export function StrictModeDroppable({ children, ...props }: DroppableProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(raf);
      setEnabled(false);
    };
  }, []);

  if (!enabled) return null;

  return <Droppable {...props}>{children}</Droppable>;
}
