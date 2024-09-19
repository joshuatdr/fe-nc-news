export const ArticleSort = ({ searchParams, setSearchParams }) => {
  const handleChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(e.target.name, e.target.value);
    setSearchParams(newParams);
  };
  return (
    <form className='sort-form'>
      <select name='sort_by' id='sort_by' onChange={handleChange}>
        <optgroup label='Sort by'>
          <option value='created_at'>Date</option>
          <option value='comment_count'>Comments</option>
          <option value='votes'>Votes</option>
        </optgroup>
      </select>
      <select name='order' id='order' onChange={handleChange}>
        <optgroup label='Order by'>
          <option value='desc'>Descending</option>
          <option value='asc'>Ascending</option>
        </optgroup>
      </select>
    </form>
  );
};
