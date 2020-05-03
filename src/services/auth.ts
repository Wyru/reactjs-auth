interface IResponse {
    token: string,
    user: {
        name: string,
        email: string
    }
}

const login = (): Promise<IResponse> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: 'o89wquerljkqnasdlopíasd~çlfkwdskjfhao',
                user: {
                    name: 'Will',
                    email: 'wsaymon@email.com'
                }
            });
        }, 1000)
    });
}


export default { login };