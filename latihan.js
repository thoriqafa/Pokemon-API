// console.log("hello");

// let x = 10;
// console.log(typeof x);

/*
  - Array vs Object di JS?
    -> Array  = number, index, []
    -> Object = string, key value, {} 

  - Perbedaan Array di JS vs lain?
    -> tipe data bebas / untype => tipe data bisa masuk semua (js)
*/

// int[] numbers = {0,1,2}; => java
let arrays = [1, "kucing", true, null, NaN];
console.log(typeof arrays[4]);

arrays.push("dor");
console.log(arrays);

arrays.pop();
console.log(arrays);

arrays.unshift(false);
console.log(arrays);

arrays.shift();
console.log(arrays);

let datas = [1, 2, 3, ["hello", "awas", "ada", "kucing", ["Semangat"]], true];
console.log(datas[3][4][0]);

let mahasiswa = {
  nim: 123,
  name: "Budi Doremi",
  age: 17,
  address: "Surabaya",
  generation: 2023,
  hobby: ["renang", "mancing"],
};
console.log(mahasiswa);

mahasiswa.hobby.push("badminton", "membaca");
console.log(mahasiswa.hobby);

mahasiswa.gender = "pria";
console.log(mahasiswa);

let employees = [
  {
    name: "Budi Doremi",
    gender: "Pria",
    province: "Jawa Timur",
    city: { name: "Surabaya" },
  },
  {
    name: "Nada",
    gender: "Wanita",
    province: "Jawa Timur",
    city: { name: "Surabaya" },
  },
  {
    name: "Doni",
    gender: "Pria",
    province: "DKI Jakarta",
    city: { name: "Jakarta Barat" },
  },
  {
    name: "Bunga",
    gender: "Wanita",
    province: "Jawa Timur",
    city: { name: "Surabaya" },
  },
  {
    name: "Marni",
    gender: "Wanita",
    province: "DKI Jakarta",
    city: { name: "Jakarta Barat" },
  },
];

/*
  1. Tampilkan data yang merupakan gender = Wanita
  2. Tampilkan data yang city = Surabaya
*/

// Task 1 - cara 1
let wanita1 = [];
for (let i = 0; i < employees.length; i++) {
  if (employees[i].gender === "Wanita") {
    wanita1.push(employees[i]);
  }
}
console.log(wanita1);

// Task 1 - cara 2
let wanita2 = employees.filter((emp) => emp.gender === "Wanita");
console.log(wanita2);

// Task 1 - cara 3
let wanita3 = employees.map((e) => {
  return {
    name: e.name,
    gender: e.gender,
    detail: e.gender === "Wanita" ? "Cantik dong" : "Garang asem",
    province: e.province,
    city: e.city.name,
  };
});
console.log(wanita3);

// Task 2
let city = employees.filter((e) => e.city.name === "Surabaya");
console.log(city);
