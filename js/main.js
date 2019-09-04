const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search states.json and filter it
const searchStates = async searchText => {
  const res = await fetch("../data/states.json");
  const states = await res.json();
  //console.log(states)

  // Get matches to current text input
  let matches = states.filter(state => {
    const regex = RegExp(`^${searchText}`, "gi");
    return state.village.match(regex) || state.ps.match(regex);
  });

  // To check if text field is empty
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }
  //console.log(matches)
  outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `
      <div class="card card-body mb-1">
        <h4> ${match.village} (${match.ps}) <span class="text-primary"> ${match.distric}</span></h4>
        <small>Lat: ${match.let} / Long: ${match.long} </small>
      </div>
    `
      )
      .join("");
    matchList.innerHTML = html;
    //console.log(html);
  } else {
    html = `<div class="card card-body mb-1">
        <h4>No data found</h4>
      </div>`;

    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchStates(search.value));
