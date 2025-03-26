export const generateDummyData = () => {
    return Array.from({ length: 5 }, () => ({
      id: Math.floor(Math.random() * 1000),
      name: `User ${Math.floor(Math.random() * 100)}`,
      city: `City ${Math.floor(Math.random() * 10)}`,
    }));
  };
  