// import { demoForms } from "./demo";
// if (!window.formA) {
//     window.formA = demoForms
// }
const  formA = window.formA; 

// ---

export function loadForm(formSlug) {
    if (formA.forms[formSlug].remoteLoad) {
        return remoteRequest('load', formSlug, 'GET')
    } else {
        return new Promise((resolve) => {resolve(formA.forms[formSlug])})
    }
}

// ---

export function remoteRequest(action, formSlug , method, data) {
    let rp = formA.remote
    let  url = rp.url;
    let params = {
        method : method,
        mode: 'no-cors'   // comment for "yarn dev"
        // mode:'cors'
    };
    
    if (method == 'GET') {
        if (typeof data == 'object') {
            url += '&' + new URLSearchParams(data)
        } else {
            url += '/?action='+ action  + '&_wpnonce=' + rp.nonce + '&formSlug=' + formSlug;
        }
    } else {
        let fd = new FormData();
        fd.append('action', action)
        fd.append('_wpnonce', rp.nonce)
        fd.append('formSlug', formSlug)
        fd.append('data', JSON.stringify(data))
        
        const extractFiles = (d, p) => {
            for(let k in d) {
                let fd_key = p ? p + '[' + k + ']' : k
                if (d[k] instanceof File) {
                    fd.append(fd_key, d[k], d[k].name)
                }   else if (typeof d[k] == 'object') {
                    extractFiles(d[k], fd_key)
                }
            }
        }
        extractFiles(data, 'files')

        let headers;
        params = {...params, ...{
            headers: headers,
            body: fd 
        }};
    }

    return  fetch(url, params ).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return {result: false, payload:{}}
        }
    })
}
