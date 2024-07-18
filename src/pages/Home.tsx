import Typewriter from 'typewriter-effect';
import '../styles/home.css';

function Home() {
  return (
    <Header />
  )
}

function Header() {
  return (
    <div className='homepage-header'>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString('<h1>I am Francesco</h1>')
            .pauseFor(500)
            .typeString('<h2>Passionate Software Engineer</h2>')
            .pauseFor(500)
            .typeString('Nice to meet you!')
            .start();
        }}
      />
    </div>
  )
}

export default Home;