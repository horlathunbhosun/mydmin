$(document).ready(function ($) {
  const navbar = document.querySelector("#navbar");
  const navlinks = document.querySelector(".navbar__links");
  const menuBtn = document.querySelector(".navbar__button");
  const dropDown = document.querySelector(".navbar__dropWrapper");

  const countrySelect = document.getElementById("countrySelect");
  const serviceSelect = document.getElementById("serviceSelect");
  const levelSelect = document.getElementById("levelSelect");
  const submitNext = document.getElementById("submitNext");
  const purchaseForm = document.querySelector(".purchaseForm__wrapper");
  const formSummary = document.querySelector(".purchaseForm__summary");
  const flagIcon = document.querySelector(".purchaseForm__flag");
  var selectedCountry = "";
  var selectedService = "";
  var selectedLevel = "";
  var amount = "";
  var amountWrapper = document.querySelector(".paymentAmount");

  const flags = {
    Canada: "../assets/img/flags/Canada.png",
    USA: "../assets/img/flags/USA.png",
    Europe: "../assets/img/flags/Europe.png",
    Australia: "../assets/img/flags/Australia.png",
    UK: "../assets/img/flags/UK.png",
  };

  $(menuBtn).click(function () {
    navlinks.classList.toggle("active");
  });

  $(".catalogue").click(function () {
    $(dropDown).toggleClass("reveal");
    $(".drop-ind").toggleClass("rotate");
  });

  // ### purchase form logic ###

  $(".purchaseForm__notif").hide();
   // $(".serviceSelect").hide();
   // $(".levelSelect").hide();

  // country assign
  countrySelect.addEventListener("change", () => {
    var targetCountry = document.querySelector(".countryName");
    var selectedCountryFlag = "";
    selectedCountry = countrySelect.options[countrySelect.selectedIndex].value;
    injectName(targetCountry, selectedCountry);

    // match selected country to flag
    switch (selectedCountry) {
      case "Canada":
        selectedCountryFlag = flags.Canada;
        break;
      case "UK":
        selectedCountryFlag = flags.UK;
        break;
      case "Europe":
        selectedCountryFlag = flags.Europe;
        break;
      case "Australia":
        selectedCountryFlag = flags.Australia;
        break;
      case "USA":
        selectedCountryFlag = flags.USA;
        break;
      default:
        selectedCountryFlag = flags.Canada;
        // selectedCountryFlag = "none";
    }
    // set flag src
    setFlag(selectedCountryFlag);

    // console.log(selectedCountry);
  });

   var v = document.getElementById('statementofPurpose');
  var w = v.options[v.selectedIndex].value;

  // service assign
  serviceSelect.addEventListener("change", () => {
    var targetService = document.querySelector(".serviceName");
    selectedService = serviceSelect.options[serviceSelect.selectedIndex].value;
    injectName(targetService, selectedService);

    // amount logic
    if (selectedCountry == "UK") {
      switch (selectedService) {
        case "Visa":
          amount = "FREE";
          break;
        case "Admission":
          amount = "N40,000";
         break;
      }
    } else if (selectedCountry == "Australia") {
      switch (selectedService) {
        case "Visa":
          amount = "FREE";
         break;
        case "Admission":
          amount = "N40,000";
          break;
        }
    } else if (selectedCountry == "USA") {
      switch (selectedService) {
        case "Visa":
          amount = "N100,000";
          $(".purchaseForm__notif").show();
         break;
        case "Admission":
          amount = "N100,000";
          $(".purchaseForm__notif").show();
         break;
        }
    } else if (selectedCountry == "Canada") {
      switch (selectedService) {
        case "Visa":
          amount = "N100,000";
          $(".purchaseForm__notif").show();
          break;
        case "Admission":
          amount = "N100,000";
          $(".purchaseForm__notif").show();
          break;
        }
    } else if (selectedCountry == "Europe") {
      switch (selectedService) {
        case "Visa":
          amount = "N100,000";
          $(".purchaseForm__notif").show();
          break;
        case "Admission":
          amount = "N100,000";
          $(".purchaseForm__notif").show();
          break;
        }
    }  

    var wygCountries = ["USA", "Canada", "Europe"];
    if (wygCountries.includes(selectedCountry)) {
      let offeringView = "";
      v = document.querySelector(".americas-visa");
      a = document.querySelector(".americas-admission");
     switch (selectedService) {
        case "Visa":
          showOffering(v);
          break;
        case "Admission":
          showOffering(a);
          break;
      }
    } else if (selectedCountry == "UK") {
      v = document.querySelector(".uk-visa");
      a = document.querySelector(".uk-admission");
      switch (selectedService) {
        case "Visa":
          showOffering(v);
          break;
        case "Admission":
          showOffering(a);
          break;
       
      }
    } else if (selectedCountry == "Australia") {
      v = document.querySelector(".aus-visa");
      a = document.querySelector(".aus-admission");
      switch (selectedService) {
        case "Visa":
          showOffering(v);
          break;
        case "Admission":
          showOffering(a);
          break;
      }
    }

    setAmount(amountWrapper, amount);
    // console.log(selectedService);
  });

  // level assign
  levelSelect.addEventListener("change", () => {
    var targetLevel = document.querySelector(".levelName");
    selectedLevel = levelSelect.options[levelSelect.selectedIndex].value;
    injectName(targetLevel, selectedLevel);
    // console.log(selectedLevel);
  });


  



  $("#submitNext").click(function (e) {
    e.preventDefault();
    if 
      (!selectedCountry || !selectedLevel || !selectedService) {
      launch_toast();
    } else
     {
      // go to next
      goNext();
    }
  });

  function goNext() {
    formSummary.classList.remove("remove");
    purchaseForm.classList.add("remove");
  }

  function injectName(target, value) {
    $(target).empty().append(value);
  }

  function setFlag(t) {
    flagIcon.src = t;
  }

  function setAmount(t, v) {
    $(t).empty().append(v);
  }

  function showOffering(t) {
    $(t).addClass("show");
  }

  // process payload
  $(".pay__btn").click(function () {
    var payload = {
      countryChoice: selectedCountry,
      serviceChoice: selectedService,
      levelChoice: selectedLevel,
      amountToPay: amount,
    };

    var payloadJSON = JSON.stringify(payload);

    // send data to server for processing
    $.ajax({
      type: "POST",
      url: "PHP FILE HERE",
      data: { payloadData: payloadJSON },
    });
  });

  // ## toast notif
  function launch_toast() {
    var x = document.getElementById("toast");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 5000);
  }

  // poster carousel

  new Splide(".splide").mount();
});



// ON LOAD
function fresh() {

    $("#levelSelect").hide();

    $("#serviceSelect").hide();

    $("#statementofPurpose").hide();
}


function CHOICE() {

  var s = document.getElementById('countrySelect');
  var q = s.options[s.selectedIndex].value;
 if (q == "UK" || q == "Canada" || q == "Australia" || q == "Europe" || q == "USA") {
    $("#levelSelect").show();
    $("#serviceSelect").show();
    document.getElementById('statementofPurpose').style.display ="none";
 }
  else if (q == "Statement of Purpose") {
    document.getElementById('levelSelect').style.display ="none";
    document.getElementById('serviceSelect').style.display ="none";
    document.getElementById('statementofPurpose').style.display ="block";
 }
  else {
    document.getElementById('levelSelect').style.display ="none";
    document.getElementById('serviceSelect').style.display ="none";
    document.getElementById('statementofPurpose').style.display ="none";
  }
}
 


// ON SUBMIT
function FINAL() {
  var s = document.getElementById('countrySelect');
  var q = s.options[s.selectedIndex].value;

  var v = document.getElementById('statementofPurpose');
  var w = v.options[v.selectedIndex].value;

  t = document.querySelector(".direct-application");

   const purchaseForm = document.querySelector(".purchaseForm__wrapper");
  const formSummary = document.querySelector(".purchaseForm__summary");

 // BOOK CONSULTATION
  if (q == "Book Consultation") {
    formSummary.classList.remove("remove");
    purchaseForm.classList.add("remove");

    $(".purchaseForm__flag").hide();
    $(".purchaseForm__wyg-title").hide();
    $(".purchaseForm__notif").show();
    $(".purchaseForm__price").show();
    $(".paymentAmount").text("N20,000")
    $("#comment").text("Book Consultation with our certified ICEF student counsellor and British Education UK Agent at N20,000 for 30 minutes");
    $("#toast").hide();
  } 
  // DIRECT VISA APPLICATION
  else if (q == "Direct Visa Application") {
    formSummary.classList.remove("remove");
    purchaseForm.classList.add("remove");
    $(".purchaseForm__flag").hide();
    $(".purchaseForm__price").show();
    $(".paymentAmount").text("N150,000"); 
    $(t).addClass("show");
    $("#toast").hide();  
 } 
 // STATEMENT OF PURPOSE
  else if ( w == "admission-statement-of-purpose") {
    formSummary.classList.remove("remove");
    purchaseForm.classList.add("remove");

    $(".purchaseForm__flag").hide();
    $(".purchaseForm__wyg-title").hide();
    $(".purchaseForm__notif").show();
    $(".purchaseForm__price").show();
    $(".serviceName").show();
    $("#serviceName").text(" Admission statement of purpose")
    $(".paymentAmount").text("N10,000")
    $("#comment").text("Error free and anti-plagiarism checked Admission Statement of purpose at N10,000 per course selected");
    $("#toast").hide();
 }
   else if ( w == "Visa-explanation-letter") {
    formSummary.classList.remove("remove");
    purchaseForm.classList.add("remove");

    $(".purchaseForm__flag").hide();
    $(".purchaseForm__wyg-title").hide();
    $(".purchaseForm__notif").show();
    $(".purchaseForm__price").show();
    $(".serviceName").show();
    $("#serviceName").text(" Visa Explanation letter")
    $(".paymentAmount").text("N50,000")
    $("#comment").text("Well detailed and relevant Visa explanation letter that increases your visa chance by 100%");
    $("#toast").hide();
 } 



}