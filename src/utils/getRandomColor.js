const getRandomColor = () => {
    const colors = [
      "green",
      "turquoise",
      "navy",
      "blue",
      "purple",
      "grey",
      "gray",
      "red",
      "orange",
      "yellow",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  

export default getRandomColor;