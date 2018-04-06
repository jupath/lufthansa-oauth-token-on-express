fetch('/token')
  .then(res => res.json())
  .then(data => {
    document.getElementById('app').textContent = data.access_token;
  });
