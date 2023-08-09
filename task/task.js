// listSW
// https://swapi.dev/api/people

// $.ajax({
//   url: "https://swapi.dev/api/people",
//   success: function (res) {
//     console.log(res.results);

//     // let text = `<li>${res.results[0].name}</li>`;
//     // // console.log(text);
//     // $("#listSW").html(text);

//     let text = "";
//     $.each(res.results, function (key, val) {
//       // console.log(key);
//       // console.log(val.name);
//       text += `<li>${val.name}</li>`;
//     });

//     $("#listSW").html(text);
//   },
// });

// tbodySW
$(document).ready(function () {
  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0",
    success: function (res) {
      let text = "";
      let requests = [];

      $.each(res.results, function (key, val) {
        requests.push(
          $.ajax({
            url: val.url,
            success: function (pk) {
              let weightpk = (pk.weight * 0.1).toFixed(1);
              text += `
                <tr>
                  <td>${key + 1}</td>
                  <td><img src="${pk.sprites.other.home.front_default}" alt="apple" class="mb-2" width="120"><br/>${pk.name}</td>
                  <td>${pk.height} cm</td>
                  <td>${weightpk} kg</td>
                  <td>
                    <button
                      type="button"
                      class="btn bg-primary-subtle"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onclick="detail('${val.url}')"
                    >
                      Detail
                    </button>
                  </td>
                </tr>`;
            },
          })
        );
      });

      // Menunggu selesainya semua permintaan ajax
      $.when.apply($, requests).then(function () {
        $("#tbodySW").html(text);

        // Inisialisasi DataTable setelah data selesai dimuat
        $('#datatables').DataTable({
          searching: true,
          paging: true
        });
        var bioPkDiv = document.getElementById("bioPk");
        var bioText = `
          <p><center><strong>Height:</strong> </center></p>
          <p><center><strong>Weight:</strong> </center></p>
        `;
        bioPkDiv.innerHTML = bioText;
      });
    },
  });
});

function detail(val) {
  $.ajax({
    url: val,
    success: function (res) {

      let weightPokemon = (res.weight * 0.1).toFixed(1);
      let text = `
        <p class="mb-0 mt-0"><center><img src="${res.sprites.other.home.front_default}" alt="Pokemon Image" style="width:700px;height:700px;"><span class="image-number">${res.id}</span></center></p>
        <p class = "fs-1 text-uppercase mb-0 text-center fw-bolder d-flex justify-content-center text-dark">${res.name}</p>
        <ul class=" mt-0 d-flex list-inline text-center justify-content-center" id="typeList">`;

      res.abilities.forEach((ability) => {
        text += `<li class="me-1 bg-success p-1 rounded-3 fw-bold fs-4 text-white">${ability.ability.name}</li>`;
      })

      text += `</ul>
        <ul class=" mt-0 d-flex list-inline text-center justify-content-center" id="typeList">`;

      res.types.forEach((type) => {
        text += `<li class="me-1 bg-danger p-1 rounded-3 fw-bold text-white">${type.type.name}</li>`;
      })

      text += `</ul>`;

      let skillText = `
        <div class = "fs-6 mb-0 text-start fw-bolder d-flex text-dark">HP :</div>
        <div class="progress" style="height: 30px;" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped bg-success" style="width: ${res.stats[0].base_stat}%">${res.stats[0].base_stat}%</div>
        </div>

        <div class = "fs-6 mb-0 text-start fw-bolder d-flex text-dark">Attack :</div>
        <div class="progress" style="height: 30px;" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped bg-primary" style="width: ${res.stats[1].base_stat}%">${res.stats[1].base_stat}%</div>
        </div>

        <div class = "fs-6 mb-0 text-start fw-bolder d-flex text-dark">Defense :</div>
        <div class="progress" style="height: 30px;" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped bg-danger" style="width: ${res.stats[2].base_stat}%">${res.stats[2].base_stat}%</div>
        </div>

        <div class = "fs-6 mb-0 text-start fw-bolder d-flex text-dark">Special Attack :</div>
        <div class="progress" style="height: 30px;" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped bg-info" style="width: ${res.stats[3].base_stat}%">${res.stats[3].base_stat}%</div>
        </div>

        <div class = "fs-6 mb-0 text-start fw-bolder d-flex text-dark">Special Defense :</div>
        <div class="progress" style="height: 30px;" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped bg-red-subtle" style="width: ${res.stats[4].base_stat}%">${res.stats[4].base_stat}%</div>
        </div>

        <div class = "fs-6 mb-0 text-start fw-bolder d-flex text-dark">Speed :</div>
        <div class="progress" style="height: 30px;" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped bg-warning" style="width: ${res.stats[5].base_stat}%">${res.stats[5].base_stat}%</div>
        </div>


        `;

      let movePoke = `<div class="row"><div class="col-12"><p class="me-1 bg-danger-subtle p-4 rounded-3 fs-4 fw-bold border border-black">`;

      res.moves.forEach((move, index) => {
        movePoke += `${move.move.name}`;

        if (index !== res.moves.length - 1) {
          movePoke += ', ';
        }
      })
      movePoke = movePoke.split()
      movePoke += ` </p></div></div>`;

      $("#bodyPk").html(text);
      $("#skillPk").html(skillText);
      $("#movePk").html(movePoke);


      $.ajax({
        url: res.species.url,
        success: function (species) {
          let habitatUrl = species.habitat.url;
          $.ajax({
            url: habitatUrl,
            success: function (habitat) {

              let eggGroupsText = "";
              species.egg_groups.forEach((group) => {
                eggGroupsText += `<li>${group.name}</li>`;
              });


              bioText = `
                <p class = "fs-5"><strong>Height:</strong> <br/> ${res.height} cm</p>
                <p class = "fs-5"><strong>Weight:</strong> <br/> ${weightPokemon} kg</p>
                <p class = "fs-5"><strong>Habitat:</strong> <br/> ${habitat.name}</p>
                <p class = "fs-5"><strong>Base Exp:</strong> <br/> ${res.base_experience}</p>
              `;

              let eggText = `<p class = "fs-5 mb-0"><strong>Egg Groups:</strong></p><ul>${eggGroupsText}</ul>
              <p class = "fs-5"><strong>Color:</strong> <br/> ${species.color.name}</p>
              <p class = "fs-5"><strong>Shape:</strong> <br/> ${species.shape.name}</p>
              <p class = "fs-5"><strong>Base Happiness:</strong> <br/> ${species.base_happiness}</p>
              `;


              var bioPkDiv = document.getElementById("bioPk1");
              bioPkDiv.innerHTML = bioText;
              var eggPk = document.getElementById("bioPk2");
              eggPk.innerHTML = eggText;

            },
          });
        },

      });

    },
  });
}

// fetch('https://pokeapi.co/api/v2/pokemon')
//   .then(response => response.json())
//   .then(data => {
//     // Extract gender ratio from each Pokemon
//     const genderRatioData = data.results.map(pokemon => {
//       return {
//         name: pokemon.name,
//         genderRatio: pokemon.species.gender_rate
//       };
//     });

//     // Prepare data for the chart
//     const labels = genderRatioData.map(pokemon => pokemon.name);
//     const ratios = genderRatioData.map(pokemon => pokemon.genderRatio);

//     // Create a pie chart
//     const ctx = document.getElementById('evo1').getContext('2d');
//     const pokemonChart = new Chart(ctx, {
//       type: 'pie',
//       data: {
//         labels: labels,
//         datasets: [{
//           data: ratios,
//           backgroundColor: [
//             'rgba(255, 99, 132, 0.6)', // Female color
//             'rgba(54, 162, 235, 0.6)'  // Male color
//           ]
//         }]
//       },
//       options: {
//         title: {
//           display: true,
//           text: 'Pokemon Gender Ratio'
//         }
//       }
//     });
//   });

  // <p><center><strong>Height:</strong> ${res.height}</center></p>
  // <p><center><strong>Weight:</strong> ${weightPokemon}</center></p>


  