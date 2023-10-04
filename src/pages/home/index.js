const renderFinancesList = (data) => {
    const table = document.getElementById('finances-table')
    /* <tr>
            <td>Título1</td>
            <td class="center">Título2</td>
            <td class="center">Título3</td>
            <td class="center">Título2</td>
            <td class="right">Título3</td>
        </tr> */
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
    const itemsTextElement = document.createElement("h1");
    itemsTextElement.className = 'mt smaller';
    itemsTextElement.appendChild(itemsText);
    financeCard1.appendChild(itemsTextElement);

    // render revenues
    const financeCard2 = document.getElementById('finance-card-2');
    const revenueText = document.createTextNode(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(revenues));
    const revenueTextElement = document.createElement("h1");
    revenueTextElement.className = 'mt smaller';
    revenueTextElement.appendChild(revenueText);
    financeCard2.appendChild(revenueTextElement);

    // render exepenses
    const financeCard3 = document.getElementById('finance-card-3');
    const expensesText = document.createTextNode(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(expenses));
    const expensesTextElement = document.createElement("h1");
    expensesTextElement.className = 'mt smaller';
    expensesTextElement.appendChild(expensesText);
    financeCard3.appendChild(expensesTextElement);

    // render balance
    const financeCard4 = document.getElementById('finance-card-4');
    const balanceText = document.createTextNode(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue));
    const balanceTextElement = document.createElement("h1");
    balanceTextElement.className = 'mt smaller';
    balanceTextElement.style.color = '#5936cd';
    balanceTextElement.appendChild(balanceText);
    financeCard4.appendChild(balanceTextElement);
}

const onLoadFinancesData = async () => {
    try {
        const date = '2022-12-15'
        const email = localStorage.getItem("@WalletApp:userEmail")
        const result = await fetch(`https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`, {
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

window.onload = () => {
    onLoadUserInfor();
    onLoadFinancesData();
    onLoadCategories();
}