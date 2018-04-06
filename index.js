fetch('/token')
  .then(res => res.json())
  .then(data => {
    document.getElementById('app').textContent = data.access_token;
  });

  // xy8mh2b2m4y39stwbwatspaj 2018.04.06.