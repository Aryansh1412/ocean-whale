// src/app/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useSearchAndFilter } from "@/app/hooks/useSearchAndFilter";
import UserCard from "@/app/components/UserCard";
import { User, RawUser } from "@/app/types/user";
import Input from "@/app/components/ui/Input";
import { MultiSelect } from "@/app/components/MultiSelect";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://dummyjson.com/users?limit=20");
      const data = await res.json();

      const processedUsers: User[] = data.users.map((user: RawUser) => {
        const fixedRating = (user.id % 5) + 1;
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          department: mockDepartment(),
          rating: fixedRating,
          image: user.image,
        };
      });

      setUsers(processedUsers);
    }

    fetchData();
  }, []);

  const { filters, setFilters, filteredUsers } = useSearchAndFilter(users);

  const departments = [...new Set(users.map((u) => u.department))];
  const ratings = [1, 2, 3, 4, 5];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-semibold">HR Dashboard</h1>

      {/* 🔍 Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search by name or email"
          value={filters.searchTerm}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
          }
        />
        <MultiSelect
          options={departments}
          selected={filters.departments}
          onChange={(val) =>
            setFilters((prev) => ({ ...prev, departments: val }))
          }
          placeholder="Filter by Department"
        />
        <MultiSelect
          options={ratings.map(String)}
          selected={filters.ratings.map(String)}
          onChange={(val) =>
            setFilters((prev) => ({
              ...prev,
              ratings: val.map(Number),
            }))
          }
          placeholder="Filter by Rating"
        />
      </div>

      {/* 🧍‍♂️ Users */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

// Example department mock
const departments = ["Engineering", "HR", "Marketing", "Finance"];
function mockDepartment() {
  return departments[Math.floor(Math.random() * departments.length)];
}
