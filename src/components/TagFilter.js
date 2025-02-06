import React, { useState } from 'react';

function TagFilter() {
  const [tag, setTag] = useState('');

  const handleFilter = () => {
    // Add filter logic
    console.log(tag);
  };

  return (
    <div>
      <input 
        type="text" 
        value={tag} 
        onChange={(e) => setTag(e.target.value)} 
        placeholder="Filter by tag..." 
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
}

export default TagFilter;
