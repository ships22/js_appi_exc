;(() => {
  let pokemons = [],
    pokemonId,
    randomPokemon,
    pok_container,
    pok_img,
    pok_name,
    pok_level,
    btn_start,
    btn_stop,
    resetSuffle,
    isSuffling = false,
    counter,
    sideBoxes,
    selectedSidebox = 0

  pok_container = document.querySelector('.pok_container')
  pok_img = document.querySelector('.pok_img').querySelector('span')
  pok_name = document.querySelector('h1')
  pok_level = document.querySelector('.top').querySelector('span')
  btn_start = document.querySelector('.btn_start')
  btn_stop = document.querySelector('.btn_stop')
  sideBoxes = document.querySelectorAll('.box')

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
    //saving id -
    pokemonId = pokemon.id

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

  const sufflePokemon = () => {
    counter = 16
    isSuffling = true
    resetSuffle = setInterval(() => {
      randomPokemon = getRandomObject(pokemons)
      setPokemon(randomPokemon)
      counter = counter - 1
      btn_stop.innerHTML = `Stop(${counter} sec)`
      if (counter == 0) {
        clearInterval(resetSuffle)
        btn_stop.innerHTML = `Stop`
        counter = 0
        isSuffling = false
      }
    }, 1000)
  }
  const stop = () => {
    clearInterval(resetSuffle)
    btn_stop.innerHTML = `Stop`
    counter = 0
    isSuffling = false
  }

  btn_start.addEventListener('click', sufflePokemon)
  btn_stop.addEventListener('click', stop)
  getPokemon()

  //Select pokemeon -
  const selectPokemon = () => {
    if (isSuffling || selectedSidebox > 5) return
    let targetBox = sideBoxes[selectedSidebox]

    // find pokemon -
    let pokemon = pokemons.find((pokemon) => pokemon.id == pokemonId)

    let select_parent = document.createElement('section')
    select_parent.classList.add('selectedPok')

    let section_top = document.createElement('section')
    section_top.classList.add('select_top')

    let name = document.createElement('h3')
    name.innerHTML = pokemon.name
    section_top.appendChild(name)

    let levelContainer = document.createElement('div')
    levelContainer.innerHTML = 'NV'

    let level = document.createElement('em')
    name.innerHTML = pokemon.level
    levelContainer.appendChild(level)

    let imgDrop = document.createElement('img')
    imgDrop.classList.add('drop')
    imgDrop.src = '../fond/water_drop.jpg'
    levelContainer.appendChild(imgDrop)

    let imgPok = document.createElement('img')
    imgPok.classList.add('pok_photo')
    imgPok.src = pokemon.image
    levelContainer.appendChild(imgPok)

    section_top.appendChild(levelContainer)

    select_parent.appendChild(section_top)

    pokemon.abilities.forEach((ability) => {
      let details_container = document.createElement('section')
      details_container.classList.add('select_bottom')

      let skill = document.createElement('h3')
      skill.innerHTML = ability.name
      details_container.appendChild(skill)

      let em = document.createElement('em')
      em.innerHTML = ability.power
      details_container.appendChild(em)

      let p = document.createElement('p')
      p.innerHTML = ability.description
      details_container.appendChild(p)

      select_parent.appendChild(details_container)
    })

    targetBox.appendChild(select_parent)

    selectedSidebox++
  }

  pok_container.addEventListener('click', selectPokemon)
})()
