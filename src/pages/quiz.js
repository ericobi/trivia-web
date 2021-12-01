import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import he from 'he';

const API_URL =
  'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean';
const TOTAL_QUESTIONS = 10;

function Quiz() {
  const [index, setIndex] = useState(-1);
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [errorText, setErrorText] = useState('');

  const getQuestions = async () => {
    const response = await fetch(API_URL).catch((error) => {
      setErrorText(error);
    });

    const { results } = await response.json();
    setData(results);
    setIndex(0);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const getNumCorrectAnswers = () => {
    let count = 0;
    for (let i = 0; i < 10; i++) {
      if (data[i].correct_answer === answers[i]) {
        count++;
      }
    }
    return count;
  };

  if (index === -1) {
    // Loading Page
    return (
      <div className='container mx-auto'>
        <h2 className='text-center text-4xl my-24'>
          {errorText === '' ? 'Loading...' : errorText}
        </h2>
      </div>
    );
  } else if (index >= 10) {
    // Result Page
    return (
      <div className='container mx-auto'>
        <h2 className='text-center lg:text-5xl md:text-4xl text-3xl font-bold lg:my-16 md:my-12 my-12'>
          You scored <br />
          {getNumCorrectAnswers()} / {TOTAL_QUESTIONS}
        </h2>
        <div className='mt-12'>
          {answers.map((answer, idx) => {
            if (idx >= 10) return null;

            return (
              <p className='lg:text-4xl md:text-3xl text-3xl pb-10'>
                {answer === data[idx].correct_answer ? '+' : '-'}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {he.decode(data[idx].question)}
              </p>
            );
          })}
        </div>
        <div className='flex flex-row justify-between'>
          <Link
            to='/'
            className='mx-auto flex justify-center items-center lg:text-4xl md:text-3xl text-3xl bg-indigo-600 lg:rounded-3xl md:rounded-2xl rounded-md lg:py-6 lg:px-12 md:py-4 md:px-8 py-2 px-4 text-white'
          >
            PLAY AGAIN?
          </Link>
        </div>
      </div>
    );
  } else {
    // Quiz Page
    return (
      <div className='container mx-auto'>
        <h2 className='text-center lg:text-5xl md:text-4xl text-3xl font-bold lg:my-24 md:my-20 my-16'>
          {data[index].category}
        </h2>
        <p className='text-center lg:text-4xl md:text-3xl text-3xl my-24 border-2 lg:p-24 md:p-20 p-16 mx-4'>
          {he.decode(data[index].question)}
        </p>
        <nav className='text-center lg:text-3xl md:text-2xl text-2xl lg:my-12 my-10'>
          {index + 1} of {TOTAL_QUESTIONS}
        </nav>
        <div className='flex flex-row justify-between'>
          <button
            onClick={() => {
              setAnswers([...answers, 'False']);
              setIndex(index + 1);
            }}
            className='mx-auto flex justify-center items-center lg:text-4xl md:text-3xl text-3xl bg-indigo-600 lg:rounded-3xl md:rounded-2xl rounded-md lg:py-6 lg:px-12 md:py-4 md:px-8 py-2 px-4 text-white'
          >
            NO
          </button>
          <button
            onClick={() => {
              setAnswers([...answers, 'True']);
              setIndex(index + 1);
            }}
            className='mx-auto flex justify-center items-center lg:text-4xl md:text-3xl text-3xl bg-indigo-600 lg:rounded-3xl md:rounded-2xl rounded-md lg:py-6 lg:px-12 md:py-4 md:px-8 py-2 px-4 text-white'
          >
            YES
          </button>
        </div>
      </div>
    );
  }
}

export default Quiz;
