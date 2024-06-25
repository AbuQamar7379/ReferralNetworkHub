import {
  exploreStyles as styles,
  useState,
  useEffect,
  Card,
  IoArrowForward,
  calculateColumns,
  getLeftoverGridClass,
  splitCardsIntoMainAndLeftover
}
  from './imports'

const Explore = () => {
  const cardData = [
    { name: 'John Doe', title: 'Software Engineer - 1', company: 'Company Logo', img: "https://via.placeholder.com/50" },
    { name: 'John Doe', title: 'Software Engineer - 1', company: 'Company Logo', img: "https://via.placeholder.com/50" },
    { name: 'John Doe', title: 'Software Engineer - 1', company: 'Company Logo', img: "https://via.placeholder.com/50" },
    { name: 'John Doe', title: 'Software Engineer - 1', company: 'Company Logo', img: "https://via.placeholder.com/50" },
    { name: 'John Doe', title: 'Software Engineer - 1', company: 'Company Logo', img: "https://via.placeholder.com/50" },
    { name: 'Johnrerger Doeergerg dfherherh', title: 'Software Engineer - 1', company: 'Company Logo', img: "https://via.placeholder.com/50" },
  ];

  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setColumns(calculateColumns(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { mainGridCards, leftoverCards } = splitCardsIntoMainAndLeftover(cardData, columns);

  return (
    <>
      <div className={styles.exploreWrapper}>
        <div className={styles.mainText}>
          <h1>Explore</h1>
          <IoArrowForward className={styles.arrowIcon} />
        </div>
        <div className={styles.gridContainer}>
          {mainGridCards.map((card, index) => (
            <div key={index} className={styles.gridItem}>
              <Card {...card} />
            </div>
          ))}
        </div>
        {leftoverCards.length > 0 && columns > 1 && (
          <div className={`${styles.leftoverGrid} ${getLeftoverGridClass(leftoverCards.length, styles)}`}>
            {leftoverCards.map((card, index) => (
              <div key={index} className={styles.gridItem}>
                <Card {...card} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Explore;
