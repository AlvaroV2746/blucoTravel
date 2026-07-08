

  export default function carrousel({ listRef, data, scrollToImage, currentIndex, goToSlide }) {
  return (
    <div className="slider-container">
      <div className='leftArrow' onClick={() => scrollToImage('prev')}>&#10092;</div>
      <div className='rightArrow' onClick={() => scrollToImage('next')}>&#10093;</div>
      <div className="container-images">
        <ul ref={listRef}>
          {data.map((item) => (
            <li key={item.id}>
              <img src={item.img} width="100%" height="500" alt={`Slide ${item.id}`} />
            </li>
          ))}
        </ul>
      </div>
      <div className="dots-container">
        {data.map((_, idx) => (
          <div key={idx}
            className={`dot-container-item ${idx === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(idx)}>
            &#9865;
          </div>
        ))}
      </div>
    </div>
  );
}