"use client";

import { useMemo, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import Filters from "@/components/Filters/Filters";
import CamperCard from "@/components/CamperCard/CamperCard";
import Loader from "@/components/Loader/Loader";
import { useCampersInfinite } from "@/hooks/useCampersInfinite";
import { CamperFilters } from "@/lib/types";
import styles from "./catalog.module.css";

export default function CatalogPage() {
  const [filters, setFilters] = useState<CamperFilters>({});

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
  } = useCampersInfinite(filters);

  const campers = useMemo(
    () => data?.pages.flatMap((page) => page.campers ?? []) ?? [],
    [data]
  );

  const hasResults = campers.length > 0;
  const showEmptyState = !isLoading && !isError && !hasResults;

  return (
    <div className={`container ${styles.page}`}>
      <aside className={styles.sidebar}>
        <Filters
          initialFilters={filters}
          onSearch={setFilters}
          onClear={() => setFilters({})}
        />
      </aside>

      <section className={styles.results}>
        {isLoading && <Loader overlay />}

        {isError && (
          <div className={styles.emptyState}>
            <h2>Something went wrong</h2>
            <p>We couldn&apos;t load campers right now. Please try again.</p>
          </div>
        )}

        {showEmptyState && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <FaSearch />
            </div>
            <h2>No campers found</h2>
            <p>
              We couldn&apos;t find any campers that match your filters.
              <br />
              Try adjusting your search or clearing some filters.
            </p>
            <div className={styles.emptyActions}>
              <button
                className="btn btn-outline"
                onClick={() => setFilters({})}
              >
                <FaTimes size={14} />
                Clear filters
              </button>
              <button
                className="btn btn-accent"
                onClick={() => setFilters({})}
              >
                View all campers
              </button>
            </div>
          </div>
        )}

        {hasResults && (
          <>
            <ul className={styles.list}>
              {campers.map((camper) => (
                <CamperCard key={camper.id} camper={camper} />
              ))}
            </ul>

            {hasNextPage && (
              <div className={styles.loadMoreWrap}>
                <button
                  className="btn btn-accent"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
