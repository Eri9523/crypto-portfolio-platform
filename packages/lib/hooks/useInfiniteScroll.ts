import { useRef, useCallback, useEffect } from "react";

export const useInfiniteScroll = (
  loadMore: () => void,
  hasMore: boolean,
  isLoading: boolean
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setObserverNode = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new window.IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isLoading, hasMore, loadMore]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return setObserverNode;
};
