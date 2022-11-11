;(() => {
  let pokemons = [],
    randomPokemon,
    pok_container,
    pok_img,
    pok_name,
    pok_level,
    btn_start,
    btn_stop,
    resetSuffle

  pok_container = document.querySelector('.pok_container')
  pok_img = document.querySelector('.pok_img').querySelector('span')
  pok_name = document.querySelector('h1')
  pok_level = document.querySelector('.top').querySelector('span')
  btn_start = document.querySelector('.btn_start')
  btn_stop = document.querySelector('.btn_stop')

  const getPokemon = () => {
    fetch('https://pokeapi-enoki.netlify.app/pokeapi.json')
      .then(function (response) {
        // The API call was successful!
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response)
        }
      })
      .then(function (data) {
        // This is the JSON from pokemon response

        pokemons = data.pokemons
        randomPokemon = getRandomObject(pokemons)
        setPokemon(randomPokemon)
      })
      .catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err)
      })
  }
  const getRandomObject = (list) => {
    return list[Math.floor(Math.random() * list.length)]
  }
  const setPokemon = (pokemon) => {
    //   setting image -
    let styles = window.getComputedStyle(pok_img)
    pok_img.style.backgroundImage = `url(${pokemon.image})`

    //setting name -
    pok_name.innerHTML = pokemon.name

    //setting level -
    pok_level.innerHTML = pokemon.level

    // setting details -
    document
      .querySelectorAll('.pok_details')
      .forEach((section) => section.remove())
    pokemon.abilities.forEach((ability) => {
      let section_parent = document.createElement('section')
      section_parent.classList.add('pok_details')

      let section_child = document.createElement('section')
      section_child.classList.add('details_top')

      let h2 = document.createElement('h2')
      h2.innerHTML = ability.name
      section_child.appendChild(h2)

      let p = document.createElement('p')
      p.innerHTML = ability.power
      section_child.appendChild(p)

      section_parent.appendChild(section_child)

      let p2 = document.createElement('p')
      p2.innerHTML = ability.description
      section_parent.appendChild(p2)

      pok_container.appendChild(section_parent)
    })
  }
  let counter = 15

  const sufflePokemon = () => {
    resetSuffle = setInterval(() => {
      randomPokemon = getRandomObject(pokemons)
      setPokemon(randomPokemon)
      counter = counter - 1
      btn_stop.innerHTML = `Stop(${counter} sec)`
      if (counter == 0) clearInterval(resetSuffle)
    }, 1000)
  }

  btn_start.addEventListener('click', sufflePokemon)
  btn_stop.addEventListener('click', () => clearInterval(resetSuffle))

  getPokemon()
})()
