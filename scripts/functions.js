// fonction qui ajoute active
function addActive (button) {
    button.classList.add("active")
}

//fonction qui supprime toutes les class = "active"
function delActive () {
    const buttons = [btn5, btn10, btn15, btn25, btn50];

    for (const button of buttons) {
        button.classList.remove("active");
    }
}

// fonction assurant le choix d'un tip unique
function click() {
    const buttons = [
        {   name : btn5,
            value : 0.05
        }, 
        {   name : btn10,
            value : 0.1
        },
        {   name : btn15,
            value : 0.15
        },
        {   name : btn25,
            value : 0.25
        },
        {   name : btn50,
            value : 0.5
        },
    ]

    for (const button of buttons) {
        button.name.addEventListener("click", () => {
            delActive()
            addActive(button.name)
            tip = Number(button.value)
            show()
        })
    }
}

// fonction affichant le warning
function startVisible () {
    visibleOption.classList.remove("invisible")
}

// fonction cachant le warning
function endVisible () {
    visibleOption.classList.add("invisible")
}

//fonction qui arrondie les résultats au deuxième chiffre apres la virgule
function arrondir2(nombre) {
    return Number(nombre.toFixed(2));
}

//fonction permettant l'affichage des résultats dans la partie allResult
function show() {
    if (billValue && tip && nbPeople) {

        if (nbPeople === 0) {
            startVisible()
            tipAmount.textContent = "0.00"
            totalResult.textContent = "0.00"
            disableReset()
        } else {
            amount =  billValue * tip / nbPeople
            total = billValue * tip

            endVisible()
            tipAmount.textContent = arrondir2(amount)
            totalResult.textContent = arrondir2(total)
            enableReset()
            resetAll()
        }
        
    } else if ((billValue && tip && !nbPeople)) {
        startVisible()
        tipAmount.textContent = "0.00"
        totalResult.textContent = "0.00"
        disableReset()

    }

}

//Fonction principale
function main() {
    billInput.value = ""
    nbPeopleInput.value = ""
    click()

    // Ajout d'un écouteur d'événement keydown à l'élément billInput qui restreint les entrées possibles
    billInput.addEventListener('keydown', (event) => {
        // Empêcher les caractères non autorisés
      const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'Backspace'];
      if (!allowedChars.includes(event.key)) {
        event.preventDefault();
      }
      
      // Limiter la longueur à 10 caractères (y compris le point)
      if (billInput.value.length >= 10 && event.key !== '.' && event.key !== 'Backspace') {
        event.preventDefault();
      }
      
      // Empêcher plusieurs points
      if (event.key === '.' && billInput.value.includes('.')) {
        event.preventDefault();
      }
    });
    
    // Ajouter un écouteur d'événement keyup à l'élément billInput qui recupère la valeur inscrit en temps réel
    billInput.addEventListener('keyup', (event) => {
        billValue = Number(billInput.value);
        show()
    });
    
    // Ajout d'un écouteur d'événement keydown à l'élément nbPeopleInput qui restreint les entrées possibles
    nbPeopleInput.addEventListener('keydown', (event) => {
        // Empêcher les caractères non autorisés
      const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace'];  
      if (!allowedChars.includes(event.key)) {
        event.preventDefault();
      }
      
      // Limiter la longueur à 3 caractères 
      if (nbPeopleInput.value.length >= 3 && event.key !== 'Backspace') {
        event.preventDefault();
      }
    });
    
    // Ajouter un écouteur d'événement keyup à l'élément nbPeopleInput qui recupère la valeur inscrit en temps réel
    nbPeopleInput.addEventListener('keyup', (event) => {
        nbPeople = Number(nbPeopleInput.value);
        show()
    });


}



//fonction permettant l'utilisation du boutton RESET 
function enableReset () {
    resetButton.disabled = false
    resetButton.classList.remove("disabled")
}

//fonction retirant la permission d'utiliser le boutton RESET 
function disableReset () {
    resetButton.disabled = true
    resetButton.classList.add("disabled")
}


//fonction gérant le button reset
function resetAll() {
    resetButton.addEventListener("click", () =>{
        console.log("ici")
        billValue = 0
        nbPeople = 0
        tip = 0
        billInput.value = ""
        delActive()
        nbPeopleInput.value = ""
        tipAmount.textContent = "0.00"
        totalResult.textContent = "0.00"
        disableReset()
    })    
}