const logo = document.querySelector('.logo');
const icon = document.querySelector('.icon');

logo.addEventListener('mouseover', () => {
    icon.style.color = '#EECAD5';
});

logo.addEventListener('mouseout', () => {
    icon.style.color = '#FF69B4';
});


// function search_animal() {
//     document.getElementById("list").style.display = "block";
//     let input = document.getElementById('searchbar').value
//     input = input.toLowerCase();
//     let x = document.getElementsByClassName('animals');

//     for (i = 0; i < x.length; i++) {
//         if (!x[i].innerHTML.toLowerCase().includes(input)) {
//             x[i].style.display = "none";
//         }
//         else {
//             x[i].style.display = "list-item";
//         }
//     }
// }