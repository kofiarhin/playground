import styles from './MenuFilters.styles.scss';

const MenuFilters = ({ search, onSearchChange, categories, activeCategory, onCategoryChange }) => {
  return (
    <div className={styles.filters}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search menu"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <select className={styles.input} value={activeCategory} onChange={(event) => onCategoryChange(event.target.value)}>
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MenuFilters;
