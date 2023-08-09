// console.log("Hello");

let judul = document.getElementById("judul");

// console.log(judul);
judul.style.backgroundColor = "red";
judul.style.color = "white";
judul.style.textAlign = "center";
judul.innerHTML = "Hello MCC 78";

let container = document.getElementById("container");
// console.log(container);
let paragraf = container.getElementsByTagName("p");
// console.log(paragraf);

// paragraf[2].style.backgroundColor = "green";

for (let i = 0; i < paragraf.length; i++) {
  paragraf[i].style.backgroundColor = "green";
  paragraf[i].style.color = "white";
  paragraf[i].style.fontWeight = "bold";
}

let list2 = document.querySelector(".list:nth-child(2)");
// console.log(list2);
list2.style.backgroundColor = "brown";
list2.style.color = "white";
list2.style.fontWeight = "bold";

let inputHobby = document.getElementById("inputHobby");
let listHobby = document.getElementById("listHobby");

let hobbies = [];

function getHobby() {
  let hobby = inputHobby.value;
  // console.log(hobby);
  hobbies.push(hobby);
  // console.log(hobbies);
  listHobby.innerHTML = hobbies;
}

let list3 = document.querySelector(".list:nth-child(3)");
function ubah() {
  list3.innerHTML = "Semangat cuy";
  list3.style.backgroundColor = "orange";
  list3.style.color = "white";
  list3.style.fontWeight = "bold";
}

let list1 = document.querySelector(".list:nth-child(1)");
list1.addEventListener("click", function () {
  list1.innerHTML = "Rezki vs Habib";
  list1.style.backgroundColor = "yellow";
  list1.style.color = "black";
  list1.style.fontWeight = "bold";
});

let list4 = $(".list:nth-child(4)");
// console.log(list4);

// $(".list:nth-child(4)").on("mouseenter", function () {
//   list4.html("Semangat...");
//   list4.css("background-color", "blue");
//   list4.css("color", "white");
//   list4.css("font-weight", "bold");
// });

// $(".list:nth-child(4)").on("mouseleave", function () {
//   list4.html("Ini adalah list ke - 4");
//   list4.css("background-color", "white");
//   list4.css("color", "black");
//   list4.css("font-weight", "normal");
// });

// $(".list:nth-child(4)").on({
//   mouseenter: function () {
//     list4.html("Semangat...");
//     list4.css("background-color", "blue");
//     list4.css("color", "white");
//     list4.css("font-weight", "bold");
//   },
//   mouseleave: function () {
//     list4.html("Ini adalah list ke - 4");
//     list4.css("background-color", "white");
//     list4.css("color", "black");
//     list4.css("font-weight", "normal");
//   },
// });

$(".list:nth-child(4)").hover(
  function () {
    $(this)
      .css({
        "background-color": "blue",
        color: "white",
        fontWeight: "bold",
      })
      .html("Semangat...");
  },
  function () {
    $(this)
      .css({
        "background-color": "white",
        color: "black",
        fontWeight: "normal",
      })
      .html("Ini adalah list ke - 4");
  }
);
