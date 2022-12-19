let contador = 0;
let infos = {};
const rightCross = document.getElementById('rightcross');
const leftcross = document.getElementById('leftcross');
const buttonbottomPicture = document.getElementById('buttonbottomPicture');
const picture = document.getElementById('picture');

var insertDot = a => {
    a = a.toString(); // Transforma em String 
    var beforeDot = a.substring(0, a.length-1); // Captura do primeiro ao penúltimo caractere
    var afterDot = a.substring(a.length-1, a.length); // Captura o penúltimo ao último caractere
    return parseFloat(beforeDot + "." + afterDot); // retorna um NÚMERO com com o ponto inserido
  }

const search = id => {
    fetch('https://pokeapi.co/api/v2/pokemon/' + id)
    .then(response => response.json())
    .then(response => {
        infos = response;
        var stats = document.getElementById('stats');
        var img = document.getElementById('img-pokemon');

        stats.innerHTML = "";
        stats.innerHTML += `
            <strong>Name:</strong> ${response.name} <br>
            <strong>Height:</strong> ${insertDot(response.height)} cm <br>
            <strong>Weight:</strong> ${insertDot(response.weight)} kgs <br>
        `

        response.types.map((t,index) => {
            var type = index == 0 ? '<strong>Type: </strong>' + t.type.name : t.type.name;
            stats.innerHTML += type + ' | ';
        })

        //img.src = response.sprites.other.home.front_default;
        img.src = response.sprites.front_default;
        img.alt = response.name;
    });
}

rightCross.addEventListener('click', () => {
    contador = contador < 0 ? 1 : contador;
    search(++contador)
});
leftcross.addEventListener('click', () => {
    if(contador > 0)
    {
        search(--contador)
    }
});