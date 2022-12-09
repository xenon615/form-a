
//const  formA = window.formA

const  formA = window.formA ??  {   //test data
    remote: {
        nonce: "25e94a50ff",
        url: "https://pie-v1.local/wp-json/form-a/all"
    },
    forms : {
        // 'pie-gifts-import': {
        //     remoteLoad: true,
        // },
        "payment-a-settings": {
            remoteLoad: false,
        },
        'pie-gifts-import': {
            def: {
                title: 'The Form2',
                // formSelector: 'form#post,form#edittag',
                'remoteSubmit': true,
                buttons: [
                    {
                        text: 'Update Settings2',
                        classes: ['button', 'button-primary','button-large'],
                        type: 'submit'
                    }
                ],    
                fields: [
                    {
                        type: 'group',
                        name: 'g1',
                        label: 'G1',
                        fields: [
                            {
                                name: 'g11',
                                type: 'text',
                                label: 'g11'
                            },
                            {
                                name: 'g12',
                                type: 'text',
                                label: 'g12'
                            },
        
                        ]

                         
                    },
                    {
                        type: 'true-false',
                        name: 'tf',
                        label: 'TF'
                    },

                    {
                        name: 'one2',
                        type: 'checkbox',
                        label: 'One',
                        classes: ['col-9', 'horizontal'],
                        options : [
                            {label: 'one', value: 1},
                            {label: 'two', value: 2},
                        ], 
                        validators: {
                            required: true
                        }
                    },
                    {
                        name: '1111',
                        type: 'text',
                        label: 'ssssss',
                        validators: {
                            required: true
                        }

                    },

                    {
                        name: 'f1',
                        type: 'file',
                        label: 'file'
                    }

                ]
            },
            data:  {}
        },
    }
}


export function loadForm(formSlug) {
    // console.log(formA);
    if (formA.forms[formSlug].remoteLoad) {
        return remoteRequest('load', formSlug, 'GET')
    } else {
        return new Promise((resolve) => {resolve(formA.forms[formSlug])})
    }
}

// export function remoteRequest(action, formSlug , method, data) {
//     let rp = formA.remote
//     let  url = rp.url + '/?action='+ action  + '&_wpnonce=' + rp.nonce + '&formSlug=' + formSlug;
    

//     let params = {
//         method : method,
//         mode: 'no-cors'   // comment for "yarn dev"
//         // mode:'cors'
//     };
    
//     if (method == 'GET') {
//         if (typeof data == 'object') {
//             url += '&' + new URLSearchParams(data)
//         }
//     } else {
//         let body;
//         let headers;
//             body =  JSON.stringify(data);
//             headers = {
//                 'Content-Type': 'application/json'
//             };
//         params = {...params, ...{
//             headers: headers,
//             body: body 
//         }};
//         // console.log(params)
//     }

//     return  fetch(url, params ).then(response => {
//         // console.log(response)
//         if (response.ok) {
//             return response.json()
//         } else {
//             return {result: false, payload:{}}
//         }
        
//     })
// }


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

        // const ffd = (d, p) => {
        //     for(let k in d) {
        //         // console.log(k, d)
        //         if (d[k] instanceof File) {
        //             fd.append(p + '[' + k + ']', d[k], d[k].name)
        //         }   else if (typeof d[k] !== 'object') {
        //             fd.append(p + '[' + k + ']', d[k])
        //         } else {
        //             ffd(d[k], p + '[' + k + ']')
        //         }
        //     }
        // }
        // ffd(data, 'data')

        let headers;
        params = {...params, ...{
            headers: headers,
            body: fd 
        }};
        // console.log(params)
    }

    return  fetch(url, params ).then(response => {
        // console.log(response)
        if (response.ok) {
            return response.json()
        } else {
            return {result: false, payload:{}}
        }
        
    })
}
