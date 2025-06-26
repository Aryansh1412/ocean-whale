import { useState, useMemo } from "react";
import { User } from "@/app/types/user";

type Filters = {
  searchTerm: string;
  departments: string[];
  ratings: number[];
};

export function useSearchAndFilter(users: User[]) {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    departments: [],
    ratings: [],
  });

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const search = filters.searchTerm.toLowerCase();

      const nameMatch =
        (user.firstName?.toLowerCase().includes(search) || false) ||
        (user.lastName?.toLowerCase().includes(search) || false);

      const emailMatch = (user.email ?? "")
        .toLowerCase()
        .includes(search);

      const deptMatch =
        filters.departments.length === 0 ||
        filters.departments.includes(user.department);

      const ratingMatch =
        filters.ratings.length === 0 ||
        filters.ratings.includes(user.rating);

      return (nameMatch || emailMatch) && deptMatch && ratingMatch;
    });
  }, [users, filters]);

  return {
    filters,
    setFilters,
    filteredUsers,
  };
}
