import { useState } from 'react';

const AlphabetGame = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [message, setMessage] = useState('Aから始まる単語を入力してください！');
  const [currentLetter, setCurrentLetter] = useState('A');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const checkAnswer = () => {    
    const word = currentWord.trim().toUpperCase();
    
    if (word === '') {
      setMessage('単語を入力してください！');
      return;
    }

    if (!word.startsWith(currentLetter)) {
      setMessage(`${currentLetter}から始まる単語を入力してください！`);
      return;
    }

    // 次のアルファベットに進む
    const nextLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1);
    
    if (nextLetter > 'Z') {
      setGameOver(true);
      setMessage(`おめでとうございます！全26文字クリアしました！最終スコア: ${score + 1}点`);
    } else {
      setCurrentLetter(nextLetter);
      setScore(score + 1);
      setMessage(`正解！次は${nextLetter}から始まる単語を入力してください！`);
    }
    
    setCurrentWord('');
  };

  const resetGame = () => {
    setCurrentLetter('A');
    setCurrentWord('');
    setScore(0);
    setMessage('Aから始まる単語を入力してください！');
    setGameOver(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">アルファベット順単語ゲーム</h1>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">現在の文字: {currentLetter}</p>
          <p className="text-lg">スコア: {score}</p>
        </div>

        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 my-4">
          <p>{message}</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={currentWord}
            onChange={(e) => setCurrentWord(e.target.value)}
            placeholder="単語を入力"
            disabled={gameOver}
            className="w-full p-2 text-lg border rounded"
          />
          
          <div className="flex space-x-4">
            <button 
              onClick={checkAnswer}
              disabled={gameOver}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              回答する
            </button>
            
            <button 
              onClick={resetGame}
              className="w-full p-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              リセット
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlphabetGame;