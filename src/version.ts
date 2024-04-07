document.addEventListener("DOMContentLoaded", async () => {
    console.log('version.ts init 🤖');

    const app: HTMLDivElement = <HTMLDivElement>document.getElementById("app");
    const body = document.body;
    
    const version: String = APP_VERSION;
    const date: Date = new Date();
    
    console.group('version.ts');
    console.log('version:', version)
    console.log('build date:', date)
    console.groupEnd();
    
    await fetch('http://89.111.136.61/api/')
    .then(async (res: Response) => {
        const data = <{
            error: null | {msg: string, code: number}, 
            response: {
                last: string, 
                versions: {
                    api: string,
                    client: Array<{build: string, date: string}>
                }
            }
        }>await res.json();
        
        if(!data.error){
            const current_version = data.response.last;
            if(version >= current_version)
                return;
            let div =  <HTMLDivElement>document.createElement("div");
            div.innerHTML = `<div style="background-color: red;color: white;text-align: center;display: block;position: fixed;z-index: 1000;width: 100%;">
                <span style="font-size: 24px;">Вы используете устаревшую версию клиента!</br> 
                    Текущая: <b style="background-color: darkorange;">${version}</b>, Актуальная: <b style="background-color: green;">${current_version}</b> </br>
                    Очистите локальный кэш этого сайта или свяжитесь с менеджером.
                    </span>
                </div>`;
            body.prepend(div)

        }else{
            throw new Error(data.error.msg)
        }
    })
    .catch((err) => {
        let _error = err.toString();
        let div =  <HTMLDivElement>document.createElement("div");
        div.innerHTML = `<div style="background-color: red;color: white;text-align: center;display: block;position: fixed;z-index: 1000;width: 100%;">
            <span style="font-size: 24px;">Ошибка проверки версии!</br> 
                Если вы видете это окно, пожалуйста свяжитесь с вашим менеджером. </br>
                ${_error}
                </span>
            </div>`;
        body.prepend(div)
    })
})

