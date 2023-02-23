
export const customerLogin =  async (email, password) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "username": email,
        "password": password
    });

    const requestOptions = {
        method: 'post',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try{
        const response = await fetch(`${process.env.REACT_APP_BASE}/v1/customers/login`, requestOptions)
        const result = JSON.parse(await response.text())
        if(result._id){
            sessionStorage.setItem('cutomerLogin',true)
            sessionStorage.setItem('customerId',result._id)
            sessionStorage.setItem('customerName',result.username)
        }
        return result
    }catch(err)
    {
        console.log(err)
    }
}

export const customerLogout = () => {
    console.log('logout')
    sessionStorage.removeItem('cutomerLogin',false)
    sessionStorage.removeItem('customerId')
    window.location.reload()

}

export const getProducts = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    const requestOptions = {
        method: 'get',
        headers: myHeaders,
        redirect: 'follow'
    };

    try{
        const response = await fetch(`${process.env.REACT_APP_BASE}/v1/products`, requestOptions)
        const result = JSON.parse(await response.text())
        return result
    }catch(err)
    {
        console.log(err)
    }
}

export const getMyProducts = async (id) => {
    console.log(id)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    const requestOptions = {
        method: 'get',
        headers: myHeaders,
        redirect: 'follow'
    };

    try{
        const response = await fetch(`${process.env.REACT_APP_BASE}/v1/bids/customer/${id}`, requestOptions)
        const result = JSON.parse(await response.text())
        return result
    }catch(err)
    {
        console.log(err)
    }
}

export const getProductById = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    const requestOptions = {
        method: 'get',
        headers: myHeaders,
        redirect: 'follow'
    };

    try{
        const response = await fetch(`${process.env.REACT_APP_BASE}/v1/products/${id}`, requestOptions)
        const result = JSON.parse(await response.text())
        return result
    }catch(err)
    {
        console.log(err)
    }
}

export const getBidsByProductId = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    const requestOptions = {
        method: 'get',
        headers: myHeaders,
        redirect: 'follow'
    };

    try{
        const response = await fetch(`${process.env.REACT_APP_BASE}/v1/bids/product/${id}`, requestOptions)
        const result = JSON.parse(await response.text())
        return result.data
    }catch(err)
    {
        console.log(err)
    }
}

export const createBid =  async (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({data});

    const requestOptions = {
        method: 'post',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try{
        const response = await fetch(`${process.env.REACT_APP_BASE}/v1/bids/create`, requestOptions)
        const result = JSON.parse(await response.text())
        return result
    }catch(err)
    {
        console.log(err)
    }
}

export const deleteProduct =  async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({  "id": id });

    const requestOptions = {
        method: 'delete',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try{
        const response = await fetch(`${process.env.REACT_APP_BASE}/v1/products`, requestOptions)
        const result = JSON.parse(await response.text())
        return result
    }catch(err)
    {
        console.log(err)
    }
}
