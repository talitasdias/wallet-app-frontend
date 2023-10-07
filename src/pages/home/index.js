const onLogout = () => {
    localStorage.clear();
    window.open('../../../index.html', '_self');
}

const onDeleteItem = async(id) => {
    try {
        const email = localStorage.getItem("@WalletApp:userEmail")
        await fetch(`https://mp-wallet-app-api.herokuapp.com/finances/${id}`, {
            method: "DELETE", headers: { email: email }
        });
        onLoadFinancesData();
    }catch(error){
        alert('Erro ao deletar item!')
    }
}

const renderFinancesList = (data) => {
    const table = document.getElementById('finances-table');
    table.innerHTML = "";
    const tableHeader = document.createElement('tr');

    const thTitle = document.createElement('th');
    thTitle.innerText = 'Título';
    tableHeader.appendChild(thTitle);

    const thCategory = document.createElement('th');
    thCategory.innerText = 'Categoria';
    tableHeader.appendChild(thCategory);

    const thDate = document.createElement('th');
    thDate.innerText = 'Data';
    thDate.className = 'center'
    tableHeader.appendChild(thDate);

    const thValue = document.createElement('th');
    thValue.innerText = 'Valor';
    thValue.className = 'center'
    tableHeader.appendChild(thValue);

    const thAction = document.createElement('th');
    thAction.innerText = 'Ação';
    thAction.className = 'right'
    tableHeader.appendChild(thAction);

    table.appendChild(tableHeader);

    data.map(item => {
        const tableRow = document.createElement('tr');
        tableRow.className = 'mt smaller'

        //title
        const titleTd = document.createElement('td');
        const titleText = document.createTextNode(item.title);
        titleTd.appendChild(titleText);
        tableRow.appendChild(titleTd);

        //category
        const categoryTd = document.createElement('td');
        const categoryText = document.createTextNode(item.name);
        categoryTd.appendChild(categoryText);
        tableRow.appendChild(categoryTd);

        //date
        const dateTd = document.createElement('td');
        const dateText = document.createTextNode(new Date(item.date).toLocaleDateString());
        dateTd.className = 'center'
        dateTd.appendChild(dateText);
        tableRow.appendChild(dateTd);

        //value
        const valueTd = document.createElement('td');
        const valueText = document.createTextNode(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value));
        valueTd.className = 'center'
        valueTd.appendChild(valueText);
        tableRow.appendChild(valueTd);

        //delete
        const deleteTd = document.createElement('td');
        deleteTd.style.cursor = 'pointer'
        deleteTd.onclick = () => onDeleteItem(item.id);
        const deleteText = document.createTextNode("Deletar");
        deleteTd.className = 'right'
        deleteTd.appendChild(deleteText);
        tableRow.appendChild(deleteTd);
        
        //table add tableRow
        table.appendChild(tableRow)
    })
}

const renderFinancesElements = (data) => {
    const totalItems = data.length;
    const revenues = data.filter((item) => Number(item.value) > 0).reduce((acc, item) => acc + Number(item.value), 0);
    const expenses = data.filter((item) => Number(item.value) < 0).reduce((acc, item) => acc + Number(item.value), 0);
    const totalValue = revenues + expenses;

    // render total items
    const financeCard1 = document.getElementById('finance-card-1');
    const itemsText = document.createTextNode(totalItems);
    const elementTotalItems = document.getElementById('total-items');
    elementTotalItems.innerHTML = "";
    elementTotalItems.appendChild(itemsText)
    //const itemsTextElement = document.createElement("h1");
    elementTotalItems.className = 'mt smaller';
    //itemsTextElement.appendChild(itemsText);
    financeCard1.appendChild(elementTotalItems);

    // render revenues
    const financeCard2 = document.getElementById('finance-card-2');
    const revenueText = document.createTextNode(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(revenues));
    const elementTotalRevenues = document.getElementById('total-revenues');
    elementTotalRevenues.innerHTML = "";
    elementTotalRevenues.className = 'mt smaller';
    elementTotalRevenues.appendChild(revenueText);
    financeCard2.appendChild(elementTotalRevenues);

    // render exepenses
    const financeCard3 = document.getElementById('finance-card-3');
    const expensesText = document.createTextNode(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(expenses));
    const elementTotalExpenses = document.getElementById('total-expenses');
    elementTotalExpenses.innerHTML = "";
    elementTotalExpenses.appendChild(expensesText)
    elementTotalExpenses.className = 'mt smaller';
    financeCard3.appendChild(elementTotalExpenses);

    // render balance
    const financeCard4 = document.getElementById('finance-card-4');
    const balanceText = document.createTextNode(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue));
    const elementTotalBalance = document.getElementById('total-balance');
    elementTotalBalance.innerHTML = "";
    elementTotalBalance.className = 'mt smaller';
    elementTotalBalance.style.color = '#5936cd';
    elementTotalBalance.appendChild(balanceText);
    financeCard4.appendChild(elementTotalBalance);
}

const onLoadFinancesData = async () => {
    try {
        const dateInputValue = document.getElementById('select-date').value;
        const email = localStorage.getItem("@WalletApp:userEmail")
        const result = await fetch(`https://mp-wallet-app-api.herokuapp.com/finances?date=${dateInputValue}`, {
            method: "GET", headers: { email: email }
        });
        const data = await result.json();
        renderFinancesElements(data);
        renderFinancesList(data);
        return data;
    } catch(error) {
        return { error }
    }
}


const onLoadUserInfor = () => {
    const email = localStorage.getItem("@WalletApp:userEmail");
    const name = localStorage.getItem("@WalletApp:userName");

    const navbarUserInfo = document.getElementById("navbar-user-container");
    const navbarUserAvatar = document.getElementById("navbar-user-avatar");

    //Add user email
    const emailElement = document.createElement("p");
    const emailText = document.createTextNode(email);
    emailElement.appendChild(emailText);
    navbarUserInfo.appendChild(emailElement);

    //Add logout link
    const logoutElement = document.createElement("a");
    logoutElement.style.cursor = 'pointer';
    logoutElement.onclick = () => onLogout();
    const logoutText = document.createTextNode("Sair");
    logoutElement.appendChild(logoutText);
    navbarUserInfo.appendChild(logoutElement);

    //Add user first letter inside avatar
    const nameElement = document.createElement("h3");
    const nameText = document.createTextNode(name.charAt(0));
    nameElement.appendChild(nameText)
    navbarUserAvatar.appendChild(nameElement)
}

const onLoadCategories = async () => {
    try{
        const categoriesSelect = document.getElementById('input-category');
        const response = await fetch('https://mp-wallet-app-api.herokuapp.com/categories')
        const categoriesResult = await response.json();
        categoriesResult.map((category) => {
            const option = document.createElement('option');
            const categoryText = document.createTextNode(category.name);
            option.id = `category_${category.id}`;
            option.value = category.id;
            option.appendChild(categoryText);
            categoriesSelect.appendChild(option);
        })
    }catch(error){
        alert("Erro ao carregar categorias!")
    }
}

const onOpenModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex'
}

const onCloseModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'none'
}

const onCallAddFinance = async(data) => {

    try {
        const email = localStorage.getItem("@WalletApp:userEmail")
    
        const response = await fetch('https://mp-wallet-app-api.herokuapp.com/finances', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              email: email,
            },
            body: JSON.stringify(data),
          });

          const user = await response.json();
          return user;
    } catch(error){
        return { error };
    }
}

const onCreateFinanceRelease = async (target) => {
    try{
        const title = target[0].value;
        const value = Number(target[1].value);
        const date = target[2].value;
        const category = Number(target[3].value);
        const result = await onCallAddFinance({title, value, date, category_id:category,});

        if(result.error){
            alert("Erro ao adicionar novo dado financeiro.")
            return;
        }
        onCloseModal();
        const form = document.getElementById('form-add-finance-release');
        form.reset();
        onLoadFinancesData();
    }catch(error){
        alert("Erro ao adicionar novo dado financeirooooooo.")
    }
};

const setInitialDate = () => {
    const dateInput = document.getElementById('select-date');
    const nowDate = new Date().toISOString().split("T")[0];
    dateInput.value = nowDate;
    dateInput.addEventListener("change", () => {
        onLoadFinancesData();
    })
}

window.onload = () => {
    setInitialDate();
    onLoadUserInfor();
    onLoadFinancesData();
    onLoadCategories();

    const form = document.getElementById('form-add-finance-release');
    form.onsubmit = (event) => {
        event.preventDefault();
        onCreateFinanceRelease(event.target);
    };
}