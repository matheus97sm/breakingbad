import React, { useState, useEffect } from 'react';

import star from '../assets/star.svg'

export default function Characters(props) {
  const [ characters, setCharacters ] = useState({})

  useEffect(() => {
    setCharacters(props.characters)
  }, [props])

  return (
    <section className="characters">
      {
        characters.length > 0 ? (
          <ul>
            {
              characters.map(char => (
                <li key={char.char_id}>
                  <div className="char-img">
                    <img src={char.img} alt={char.name} />
                  </div>
                  <div className="char-txt">
                    <strong>{char.name}</strong>
                    <p><img src={star} alt="Data de Nascimento"/>{char.birthday}</p>
                    <p>{char.occupation && char.occupation.map((element, index) => index !== 0 ? `, ${element}` : element)}</p>
                  </div>
                </li>
              ))
            }
          </ul>
        ) : (
          <div className="over">Acabou :(</div>
        )
      }
    </section>
  );
}
