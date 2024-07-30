import Typewriter, { TypewriterClass } from 'typewriter-effect';

function Header() {
  let nameTypewriter: TypewriterClass | null = null;
  let professionTypewriter: TypewriterClass | null = null;
  let greetingsTypewriter: TypewriterClass | null = null;
  let discoverMoreBtnTypewriter: TypewriterClass | null = null;

  const setCursorDisplayByContainerId = (containerId: string, display: string): void => {
    const cursor = document.querySelector<HTMLElement>(`#${containerId} .Typewriter__cursor`);
    if (cursor)
      cursor.style.display = display;
  }

  return (
    <div className='homepage-header'>
      <h1 id='name-typewriter'>
        <Typewriter
          onInit={(_nameTypewriter) => {
            _nameTypewriter
              .typeString('Hi, I am Francesco')
              .callFunction(() => {
                professionTypewriter?.start();
                setCursorDisplayByContainerId('name-typewriter', 'none');
              })
              .stop();

            nameTypewriter = _nameTypewriter;
          }}
        />
      </h1>
      <h2 id='profession-typewriter'>
        <Typewriter
          onInit={(_professionTypewriter) => {
            setCursorDisplayByContainerId('profession-typewriter', 'none');

            _professionTypewriter
              .callFunction(() => {
                setCursorDisplayByContainerId('profession-typewriter', 'inline');
              })
              .changeDelay(50)
              .pauseFor(500)
              .typeString('Passionate Software Engineer')
              .callFunction(() => {
                greetingsTypewriter?.start();
                setCursorDisplayByContainerId('profession-typewriter', 'none');
              })
              .stop();

            professionTypewriter = _professionTypewriter;
          }}
        />
      </h2>
      <h3 id='greetings-typewriter'>
        <Typewriter
          onInit={(_greetingsTypewriter) => {
            setCursorDisplayByContainerId('greetings-typewriter', 'none');

            _greetingsTypewriter
              .callFunction(() => {
                setCursorDisplayByContainerId('greetings-typewriter', 'inline');
              })
              .changeDelay(50)
              .pauseFor(300)
              .typeString('Nice to meet you!')
              .callFunction(() => {
                discoverMoreBtnTypewriter?.start();
                setCursorDisplayByContainerId('greetings-typewriter', 'none');
              })
              .stop();

            greetingsTypewriter = _greetingsTypewriter;
          }}
        />
      </h3>
      <span id="discover-more-btn-typewriter">
      <Typewriter
          onInit={(_discoverMoreBtnTypewriter) => {
            setCursorDisplayByContainerId('discover-more-btn-typewriter', 'none');

            _discoverMoreBtnTypewriter
              .callFunction(() => {
                setCursorDisplayByContainerId('discover-more-btn-typewriter', 'inline');
              })
              .changeDelay(50)
              .pauseFor(300)
              .typeString('> Click to discover more about me!')
              .stop();

            discoverMoreBtnTypewriter = _discoverMoreBtnTypewriter;

            nameTypewriter?.start();
          }}
        />
      </span>
    </div>
  )
}

export default Header;