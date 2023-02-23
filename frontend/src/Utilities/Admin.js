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

export const adminLogin =  async (email, password) => {
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
        const response = await fetch(`${process.env.REACT_APP_BASE}/v1/admins/login`, requestOptions)
        const result = JSON.parse(await response.text())
        if(result._id){
            sessionStorage.setItem('adminLogin',true)
            sessionStorage.setItem('adminId',result._id)
            sessionStorage.setItem('adminName',result.username)
        }
        return result
    }catch(err)
    {
        console.log(err)
    }
}
export const adminLogout = () => {
    console.log('logout')
    sessionStorage.removeItem('adminLogin',false)
    sessionStorage.removeItem('adminId')
    window.location.reload()

}