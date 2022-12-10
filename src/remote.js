const  formA = window.formA ??  {   //dummy form for test
    remote: {
        nonce: "25e94a50ff",
        url: "https://localhost/wp-json/form-a/all"
    },
    forms : {
        'remote-form': {
            remoteLoad: true
        },
        'local-form-1': {
            def: {
                title: 'Plain Form',
                // formSelector: 'form#post,form#edittag',
                remoteSubmit: true,
                buttons: [
                    {
                        text: 'Submit',
                        classes: ['button', 'button-primary','button-large'],
                        type: 'submit'
                    }
                ],    
                fields: [
                    {
                        type: 'text',  //  email |  password |  number | textarea
                        name: 'text-field',
                        label: 'Text Field',   // short form  default position  - "before"
                        default: 'Text Value',
                        classes: ['col-2'],  //  grid of 18 columns
                        breakAfter: false , //  "true" for new line 
                        validators: {
                            required: true   // at the moment only "required" implemented
                        }
                    },
                    {
                        type: 'true-false', 
                        name: 'true_or_false',
                        label: {text:'R U Ok?', position: 'before'},  // full form 
                        classes: ['col-1'],
                    },
                    {
                        type: 'checkbox', 
                        name: 'desire',
                        label: 'What you want ?',
                        classes: ['col-4', 'horizontal'],  // "vertical" is default
                        options : [
                            {label: 'Sleep', value: 'sleep'},
                            {label: 'Drink', value: 'drink'},
                            {label: 'Eat', value: 'eat'},
                        ], 
                        default: ['eat']
                    },
                    {
                        type: 'radio', 
                        name: 'choice',
                        label: 'What you want first?',
                        classes: ['col-3'],  
                        options : [
                            {label: 'Sleep', value: 'sleep'},
                            {label: 'Drink', value: 'drink'},
                            {label: 'Eat', value: 'eat'},
                        ], 
                        default: 'eat'
                    },
                    {
                        type: 'select', 
                        name: 'select',
                        label: 'What you want first?',
                        classes: ['col-3'],  
                        options : [
                            {label: 'Sleep', value: 'sleep'},
                            {label: 'Drink', value: 'drink'},
                            {label: 'Eat', value: 'eat'},
                        ], 
                        default: 'drink'
                    },
                    {
                        name: 'file',
                        type: 'file',
                        label: 'File'
                    }
                ]
            },
            data:  {}
        },
        'local-form-2' : {
            data: {},
            def: {
                title: 'Non Plain Form',
                remoteSubmit: true,
                buttons: [
                    {
                        text: 'Submit',
                        classes: ['button', 'button-primary','button-large'],
                        type: 'submit'
                    }
                ],    
                fields: [
                    {
                        type: 'group',
                        label : 'Group1',
                        name: 'user',
                        classes: ['col-4'],
                        fields: [
                            {
                                type: 'text',
                                label: 'First Name',
                                name: 'fname'
                            },
                            {
                                type: 'text',
                                label: 'Last Name',
                                name: 'lname'
                            }
                        ]
                    },
                    {
                        type: 'repeater',
                        label : 'Rep 1',
                        name: 'users',
                        classes: ['col-5'],
                        fields: [
                            {
                                type: 'text',
                                label: 'First Name',
                                name: 'fname'
                            },
                            {
                                type: 'text',
                                label: 'Last Name',
                                name: 'lname'
                            }
                        ]
                    }

                ]
            }
        },
        'local-form-3' : {
            data: {},
            def: {
                title: 'Form with logic',
                remoteSubmit: true,
                buttons: [
                    {
                        text: 'Submit',
                        classes: ['button', 'button-primary','button-large'],
                        type: 'submit'
                    }
                ],    
                fields: [
                    {
                        type: 'select', 
                        name: 'select',
                        label: 'What you want first?',
                        classes: ['col-3'],  
                        options : [
                            {label: 'Sleep', value: 'sleep'},
                            {label: 'Drink', value: 'drink'},
                            {label: 'Eat', value: 'eat'},
                        ], 
                        default: 'sleep'
                    },
                    {
                        type: 'group',
                        label: 'Group',
                        name: 'g1',
                        fields: [
                            {
                                type: 'text',
                                label: 'Magic word',
                                name: 'mword'
                            },
                        ]
                    },
                    {
                        type: 'number', 
                        name: 'count',
                        default : 12,
                        label: 'How much ?',
                        classes: ['col-3'],  
                        cLogic: [
                            {
                                path: 'select',
                                value: 'drink',
                                compare: '==',
                                relation: 'and'
                            },
                            {
                                path: 'g1--mword',
                                value: 'please',
                                compare: '==',
                                relation: 'or'
                            },

                        ]
                    },
                ]
            }    
        }    
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
    }

    return  fetch(url, params ).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return {result: false, payload:{}}
        }
    })
}
