function toggleTheme() {
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
  } else {
      localStorage.setItem("theme", "light");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
  }
});

window.addEventListener("scroll", () => {
  const scrollToTopButton = document.getElementById("scrollToTop");
  if (window.scrollY > 300) { 
      scrollToTopButton.style.display = "block";
  } else {
      scrollToTopButton.style.display = "none";
  }
});

function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
}

function updateClock() {
  const now = new Date();
  
  let hours = now.getHours().toString().padStart(2, '0');
  let minutes = now.getMinutes().toString().padStart(2, '0');
  let seconds = now.getSeconds().toString().padStart(2, '0');

  const currentTime = `${hours}:${minutes}:${seconds}`;

  document.getElementById("clock").textContent = currentTime;
}
updateClock();

setInterval(updateClock, 100);
document.getElementById('saveButton').addEventListener('click', function() {
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;

  function validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
  }

  function validatePhone(phone) {
    const phonePattern = /^(0|\+370)\d{8}$/;
    return phonePattern.test(phone);
  }
  function validateAddress(address) {
      return address.length >= 5; 
  }


  if (!validateEmail(email)) {
      alert("Neteisingas el. pašto adresas!");
      return;
  }

  if (!validatePhone(phone)) {
      alert("Neteisingas telefono numeris!");
      return;
  }

  if (!validateAddress(address)) {
      alert("Adresas turi būti bent 5 simbolių ilgio!");
      return;
  }


  const contactData = {
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      address: address,
      questions: {
          designRating: parseInt(document.getElementById('question1').value),
          functionalityRating: parseInt(document.getElementById('question2').value),
          informationFindingEase: parseInt(document.getElementById('question3').value),
          speedRating: parseInt(document.getElementById('question4').value),
          recommendationLikelihood: parseInt(document.getElementById('question5').value)
      }
  };

  let average = (contactData.questions.designRating + contactData.questions.functionalityRating + 
      contactData.questions.informationFindingEase + contactData.questions.speedRating + 
      contactData.questions.recommendationLikelihood) / 5;
    if(average <4){
      averageColor = "red";
    }
    else if(average<7)
    {averageColor = "orange";}
    else{
      averageColor = "lime";
    }

  const outputDiv = document.getElementById('output');
  outputDiv.style.display = 'block';
  outputDiv.innerHTML = `
      <p><strong>Vardas:</strong> ${contactData.name} <strong>Pavardė:</strong> ${contactData.surname}</p>
      <p><strong>El. paštas:</strong> ${contactData.email}</p>
      <p><span style="color: ${averageColor};">${average.toFixed(2)}</span></p>
  `;

  const fullText = `
      Vardas: ${contactData.name}, 
      Pavardė: ${contactData.surname}, 
      El. paštas: ${contactData.email}, 
      Telefonas: ${contactData.phone}, 
      Adresas: ${contactData.address}, 
      Svetainės dizainas: ${contactData.questions.designRating}, 
      Funkcionalumas: ${contactData.questions.functionalityRating}, 
      Informacijos radimo lengvumas: ${contactData.questions.informationFindingEase}, 
      Svetainės greitis: ${contactData.questions.speedRating}, 
      Rekomendacija: ${contactData.questions.recommendationLikelihood}, 
      Vidurkis: ${average.toFixed(2)}
  `;

  console.log(fullText); 
});
