export const createProduct =  async (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "productDetails":
            {"name": data.get('productName'),
            "minPrice": data.get('price'),
            "picture": URL.createObjectURL(data.get('image')),
            "seller_id": sessionStorage.getItem('sellerId'),
            "status": "open"}
    });

    const requestOptions = {
        method: 'post',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try{
        const response = await fetch(`${process.env.REACT_APP_BASE}/v1/products/create`, requestOptions)
        const result = JSON.parse(await response.text())
        return result
    }catch(err)
    {
        console.log(err)
    }
}

export const getBidsBySellerId = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    const requestOptions = {
        method: 'get',
        headers: myHeaders,
        redirect: 'follow'
    };

    try{
        const response = await fetch(`${process.env.REACT_APP_BASE}/v1/bids/seller/${id}`, requestOptions)
        const result = JSON.parse(await response.text())
        return result.data
    }catch(err)
    {
        console.log(err)
    }
}

export const approveBid = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    const requestOptions = {
        method: 'get',
        headers: myHeaders,
        redirect: 'follow'
    };

    try{
        const response = await fetch(`${process.env.REACT_APP_BASE}/v1/bids/approveBid/${id}`, requestOptions)
        const result = JSON.parse(await response.text())
        return result.data
    }catch(err)
    {
        console.log(err)
    }
}

export const sellerLogin =  async (email, password) => {
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
        const response = await fetch(`${process.env.REACT_APP_BASE}/v1/sellers/login`, requestOptions)
        const result = JSON.parse(await response.text())
        if(result._id){
            sessionStorage.setItem('sellerLogin',true)
            sessionStorage.setItem('sellerId',result._id)
            sessionStorage.setItem('sellerName',result.username)
        }
        return result
    }catch(err)
    {
        console.log(err)
    }
}
export const sellerLogout = () => {
    console.log('logout')
    sessionStorage.removeItem('sellerLogin',false)
    sessionStorage.removeItem('sellerId')
    window.location.reload()

}