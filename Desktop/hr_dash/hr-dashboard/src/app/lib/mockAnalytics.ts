export const getAverageDepartmentRatings = () => {
  return [
    { department: 'Engineering', averageRating: 4.2 },
    { department: 'Marketing', averageRating: 3.8 },
    { department: 'HR', averageRating: 4.0 },
    { department: 'Sales', averageRating: 3.5 },
    { department: 'Finance', averageRating: 4.3 },
  ];
};

export const getBookmarkTrends = () => {
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [5, 8, 15, 12, 20, 25],
  };
};
