import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='container mx-auto'>
      <h1 className='text-center lg:text-5xl md:text-4xl text-3xl font-bold lg:my-24 md:my-20 my-16'>
        Welcome to the Trivia Challenge!
      </h1>
      <p className='text-center lg:text-4xl md:text-3xl text-3xl lg:my-24 md:my-20 my-16'>
        You will be presented with 10 True or False questions.
      </p>
      <p className='text-center lg:text-4xl md:text-3xl text-3xl lg:my-24 md:my-20 my-16'>
        Can you score 100%?
      </p>
      <div className='lg:mt-24 md:mt-20 mt-16'>
        <Link
          to='/quiz'
          className='mx-auto flex justify-center items-center w-min lg:text-4xl md:text-3xl text-3xl bg-indigo-600 lg:rounded-3xl md:rounded-2xl rounded-md lg:py-6 lg:px-12 md:py-4 md:px-8 py-2 px-4 text-white'
        >
          BEGIN
        </Link>
      </div>
    </div>
  );
}

export default Home;
