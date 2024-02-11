import { useState } from 'react';
import './App.css';
import { HeartIcon, SpinnerIcon } from './icons.jsx';
function App() {
  const [isLiked, setIsLiked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setIsError] = useState();

  async function handleLikeUnlike() {
    setIsFetching(true);
    setIsError(null);
    try {
      const response = await fetch(
        'https://www.greatfrontend.com/api/questions/like-button',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: isLiked ? 'unlike' : 'like' }),
        }
      );
      if (response.status >= 200 && response.status < 300) {
        setIsLiked(!isLiked);
      } else {
        const error = await response.json();
        setIsError(error.message);
        return;
      }
    } finally {
      setIsFetching(false);
    }
  }
  return (
    <>
      <div>
        <button
          disabled={isFetching}
          className={`btn ${isLiked ? ' liked' : ' like'}`}
          onClick={handleLikeUnlike}
        >
          {isFetching ? <SpinnerIcon /> : <HeartIcon />} Like
        </button>
        {error && <div>{error}</div>}
      </div>
    </>
  );
}

export default App;
