console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
function fetchImages() {
    fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
        const dogsArray = data.message
        dogsArray.map(dogLink => {
            const pic = document.createElement('img')
            pic.src = dogLink
            document.getElementById('dog-image-container').appendChild(pic)
        })
    })
}
function fetchBreeds() {
    function makeLi(dog, id, newClass) {
        const li = document.createElement('li')
        li.textContent = dog
        li.className = newClass
        document.getElementById(id).appendChild(li)
    }
    function makeLiWithNestedUl(object, dog, id) {
        const li = document.createElement('li')
        li.textContent = dog
        document.getElementById(id).appendChild(li)
        li.className = 'parent-li'
        const ul = document.createElement('ul')
        ul.id = `child-ul-for-${dog}`
        li.appendChild(ul)
        object[dog].map(element => makeLi(element, `child-ul-for-${dog}`, 'child-li'))
    }
    fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
        for (const dog in data.message) {
            data.message[dog].length === 0 ? makeLi(dog, 'dog-breeds', 'parent-li') : makeLiWithNestedUl(data.message, dog, 'dog-breeds')
        }
        handleColors()
        handleDropdown()
    })
}
function handleColors() {
    //Got some questions here
    const parentLiArray = Array.from(document.querySelectorAll('.parent-li'))
    const ulArray = Array.from(document.querySelectorAll('ul'))
    ulArray.map(ul => ul.style.color = 'black')
    parentLiArray.map(li => {
        li.addEventListener('click', e => {
            if (e.target.parentElement === document.getElementById('dog-breeds')) {
                e.target.style.color === 'blue' ? e.target.style.color = 'black' : e.target.style.color = 'blue'
            } else {
                e.target.style.color === 'red' ? e.target.style.color = 'black' : e.target.style.color = 'red'
            }
        })
    })
}
function handleDropdown() {
    const breedDropdown = document.getElementById('breed-dropdown')
    const defaultChoice = document.createElement('option')
    defaultChoice.textContent = 'all'
    defaultChoice.value = ''
    defaultChoice.selected = true
    breedDropdown.prepend(defaultChoice)
    const dogList = Array.from(document.querySelectorAll('.parent-li'))
    const nonADogs = dogList.filter(dog => dog.textContent[0] !== 'a')
    const nonBDogs = dogList.filter(dog => dog.textContent[0] !== 'b')
    const nonCDogs = dogList.filter(dog => dog.textContent[0] !== 'c')
    const nonDDogs = dogList.filter(dog => dog.textContent[0] !== 'd')
    breedDropdown.addEventListener('change', e => {
        if (e.target.value === 'a') {
            dogList.map(dog => dog.style.display = '')
            nonADogs.map(dog => dog.style.display = 'none')
        } else if (e.target.value === 'b') {
            dogList.map(dog => dog.style.display = '')
            nonBDogs.map(dog => dog.style.display = 'none')
        } else if (e.target.value === 'c') {
            dogList.map(dog => dog.style.display = '')
            nonCDogs.map(dog => dog.style.display = 'none')
        } else if (e.target.value === 'd') {
            dogList.map(dog => dog.style.display = '')
            nonDDogs.map(dog => dog.style.display = 'none')
        } else {
            dogList.map(dog => dog.style.display = '')
        }
    })
}

function handleFetches() {
    fetchImages()
    fetchBreeds()
}

document.addEventListener('DOMContentLoaded', handleFetches)