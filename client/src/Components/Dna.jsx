import React from 'react';
import ReactTypingEffect from 'react-typing-effect';

const Dna = () => {
  return (
    <>
      

      <br />

      <ReactTypingEffect className='dna'
        text={["Local,Fresh and Organic 💚 "]}
        cursorRenderer={cursor => <h1>{cursor}</h1>}
        displayTextRenderer={(text, i) => {
          return (
            <h1>
              {text.split('').map((char, i) => {
                const key = `${i}`;
                return (
                  <span
                    key={key}
                  >{char}</span>
                );
              })}
            </h1>
          );
        }}        
      />
    </>
  );
};

export default Dna;