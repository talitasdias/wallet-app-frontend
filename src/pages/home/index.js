const renderFinancesElements = (data) => {
    const totalItems = data.length;
    const revenues = data.filter((item) => Number(item.value) > 0);
    const expenses = data.filter((item) => Number(item.value) < 0);
    
}

const onLoadFinancesData = async () => {
    try {
        const date = '2022-12-15'
        const email = localStorage.getItem("@WalletApp:userEmail")
        const result = await fetch(`https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`, {
            method: "GET", headers: { email: email }
        });
        const data = await result.json();
        renderFinancesElements(data)
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


window.onload = () => {
    onLoadUserInfor();
    onLoadFinancesData();
}