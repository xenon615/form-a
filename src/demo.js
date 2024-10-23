export const demoForms = {
    remote: {
        nonce: "25e94a50ff",
        url: "https://pie-v1.dev.local/wp-json/form-a/all"
    },
    forms : {
        'local-form-0': {
            data: {},
            def: {
                title: 'Form',
                remoteSubmit: true,
                buttons: [
                    {
                        text: 'Action1',
                        classes: ['button', 'button-primary','button-large'],
                        type: 'submit',
                    },
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
                        },
                        disabled: true
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
                        label: 'File',
                        type: 'file',  
                        name: 'file',
                        classes: ['col-3'],
                    },                    
                    {
                        label: 'Date',
                        type: 'datetime',  
                        name: 'date-field',
                        classes: ['col-3'],
                        yearRange: [1970, 2030],
                        default:  477222900,
                        breakAfter:true
                    },                    
                ]    
            }
        },

        // ==================

        'local-form-1' : {
            data: {},
            def: {
                title: 'Form with some hierarcy',
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
                    },
                    {
                        label: 'Table',
                        type: 'table',  
                        name: 'table',
                        fields: [
                            {
                                label: 'Name',
                                type: 'text',  
                                name: 'name',
                                classes: ['col-9'],
                            },
                            {
                                label: 'Default',
                                type: 'true-false',  
                                name: 'is_default',
                                classes: ['col-4'],
                            },
                        ]
                    }
                ]
            }
        },

        // ==============================================

        'local-form-2' : {
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
                            {label: 'Eat', value: 'eat',  checked: true},
                        ], 
                        // default: 'sleep'
                    },
                    {
                        type: 'group',
                        label: 'Group',
                        name: 'g1',
                        fields: [
                            {
                                type: 'text',
                                label: 'Magic word',
                                name: 'mword',
                                breakAfter: true
                            },
                            {
                                type: 'html',
                                default: '(Choose <strong>Drink</strong> , and type <strong>Please</strong> )',
                                name: 'info'
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
        },
        
        // ===============================================

        'local-form-3': {
            data: {},
            def: {
                title: 'Multiple Actions Form',
                remoteSubmit: true,
                buttons: [
                    {
                        text: 'Action1',
                        classes: ['button', 'button-primary','button-large'],
                        type: 'submit',
                        action: 'action1'
                    },
                    {
                        text: 'Action2',
                        classes: ['button', 'button-primary','button-large'],
                        type: 'submit',
                        action: 'action2'
                    }
                ],    
                fields: [
                    {
                        label: 'Text',
                        type: 'text',  
                        name: 'text',
                        classes: ['col-3'],
                    },                    
                ]    
            }
        },
    }
}



//                             {
//                                 label: 'Media',
//                                 type: 'media',  
//                                 name: 'media',
//                                 classes: ['col-5'],
//                             },

//                             {
//                                 type: 'hidden',  
//                                 name: 'id',
//                             },
//                         ],

//                         classes: ['col-9'],
//                     },
//                     */
//                     // {
//                     //     type: 'checkbox', 
//                     //     name: 'desire',
//                     //     label: 'What you want ?',
//                     //     classes: ['col-4', 'horizontal'],  // "vertical" is default
//                     //     options : [
//                     //         {label: 'Sleep', value: 'sleep', checked: true},
//                     //         {label: 'Drink', value: 'drink', checked: true},
//                     //         {label: 'Eat', value: 'eat'},
//                     //     ], 
//                     //     // default: ['eat']
//                     // },



//                     // {
//                     //     label: 'Media',
//                     //     type: 'media',  
//                     //     name: 'media',
//                     //     default: 111,
//                     //     classes: ['col-9'],
//                     // },

//                     // {
//                     //     label: 'Currency',
//                     //     type: 'currency',  
//                     //     name: 'dollar',
//                     //     default: '$234234234.33',
//                     //     classes: ['col-9', 'inline'],
//                     // },
                    
//                     // {
//                     //     label: 'Date from  (help)',
//                     //     type: 'datetime',  
//                     //     name: 'date-field-1',
//                     //     classes: ['col-9', 'inline'],
//                     //     help: 'aaaadsds das sd'
//                     // },
//                     // {
//                     //     label: 'Date to',
//                     //     type: 'datetime',  
//                     //     name: 'date-field-2',
//                     //     classes: ['col-9', 'inline'],
//                     // },


//                 ]
// /*                
//                 fields: [
//                     {
//                         label: 'Date',
//                         type: 'datetime',  
//                         name: 'date-field',
//                         classes: ['col-2'],
//                         breakAfter:true
//                     },

//                     {
//                         type: 'html',  
//                         name: 'html-field',
//                         default: '<h1>html-val</h1>',
//                         classes: ['col-2'],
//                         breakAfter:true
//                     },

//                     {
//                         type: 'text',  //  email |  password |  number | textarea
//                         name: 'text-field',
//                         label: 'Text Field',   // short form  default position  - "before"
//                         default: 'Text Value',
//                         classes: ['col-2'],  //  grid of 18 columns
//                         breakAfter: false , //  "true" for new line 
//                         validators: {
//                             required: true   // at the moment only "required" implemented
//                         },
//                         disabled: true
//                     },
//                     {
//                         type: 'true-false', 
//                         name: 'true_or_false',
//                         label: {text:'R U Ok?', position: 'before'},  // full form 
//                         classes: ['col-1'],
//                     },
                    
//                     {
//                         type: 'checkbox', 
//                         name: 'desire',
//                         label: 'What you want ?',
//                         classes: ['col-4', 'horizontal'],  // "vertical" is default
//                         options : [
//                             {label: 'Sleep', value: 'sleep'},
//                             {label: 'Drink', value: 'drink'},
//                             {label: 'Eat', value: 'eat'},
//                         ], 
//                         default: ['eat']
//                     },
                    
//                     {
//                         type: 'radio', 
//                         name: 'choice',
//                         label: 'What you want first?',
//                         classes: ['col-3'],  
//                         options : [
//                             {label: 'Sleep', value: 'sleep'},
//                             {label: 'Drink', value: 'drink'},
//                             {label: 'Eat', value: 'eat'},
//                         ], 
//                         default: 'eat'
//                     },
//                     {
//                         type: 'select', 
//                         name: 'select',
//                         label: 'What you want first?',
//                         classes: ['col-3'],  
//                         options : [
//                             {label: 'Sleep', value: 'sleep'},
//                             {label: 'Drink', value: 'drink'},
//                             {label: 'Eat', value: 'eat'},
//                         ], 
//                         default: 'drink'
//                     },
//                     {
//                         name: 'file',
//                         type: 'file',
//                         label: 'File'
//                     }
//                 ]
//                 */
//             },
//             data:  {
//                 table: [
//                     // {name: 'aaaa',    is_default: true, id : 1, other: 'dasdasdas'},
//                     // {name: 'bbbb', is_default: false, id : 2, other: 'qweqweqw'},
//                 ],
//                 'date-field': 477222900

//             }
//         },

//     }
// }

// const  formA = window.formA ??  {   //dummy form for test
//     remote: {
//         nonce: "25e94a50ff",
//         url: "https://localhost/wp-json/form-a/all"
//     },
//     forms : {

//         // 'remote-form': {
//         //     remoteLoad: true
//         // },
//         'local-form-2' : {
//             data: {},
//             def: {
//                 title: 'Non Plain Form',
//                 remoteSubmit: true,
//                 buttons: [
//                     {
//                         text: 'Submit',
//                         classes: ['button', 'button-primary','button-large'],
//                         type: 'submit'
//                     }
//                 ],    
//                 fields: [
//                     {
//                         type: 'group',
//                         label : 'Group1',
//                         name: 'user',
//                         classes: ['col-4'],
//                         fields: [
//                             {
//                                 type: 'text',
//                                 label: 'First Name',
//                                 name: 'fname'
//                             },
//                             {
//                                 type: 'text',
//                                 label: 'Last Name',
//                                 name: 'lname'
//                             }
//                         ]
//                     },
//                     {
//                         type: 'repeater',
//                         label : 'Rep 1',
//                         name: 'users',
//                         classes: ['col-5'],
//                         fields: [
//                             {
//                                 type: 'text',
//                                 label: 'First Name',
//                                 name: 'fname'
//                             },
//                             {
//                                 type: 'text',
//                                 label: 'Last Name',
//                                 name: 'lname'
//                             }
//                         ]
//                     }

//                 ]
//             }
//         },
//         'local-form-3' : {
//             data: {},
//             def: {
//                 title: 'Form with logic',
//                 remoteSubmit: true,
//                 buttons: [
//                     {
//                         text: 'Submit',
//                         classes: ['button', 'button-primary','button-large'],
//                         type: 'submit'
//                     }
//                 ],    
//                 fields: [
//                     {
//                         type: 'select', 
//                         name: 'select',
//                         label: 'What you want first?',
//                         classes: ['col-3'],  
//                         options : [
//                             {label: 'Sleep', value: 'sleep'},
//                             {label: 'Drink', value: 'drink'},
//                             {label: 'Eat', value: 'eat',  checked: true},
//                         ], 
//                         // default: 'sleep'
//                     },
//                     {
//                         type: 'group',
//                         label: 'Group',
//                         name: 'g1',
//                         fields: [
//                             {
//                                 type: 'text',
//                                 label: 'Magic word',
//                                 name: 'mword',
//                                 breakAfter: true
//                             },
//                             {
//                                 type: 'html',
//                                 default: '(Choose <strong>Drink</strong> , and type <strong>Please</strong> )',
//                                 name: 'info'
//                             },

//                         ]
//                     },
//                     {
//                         type: 'number', 
//                         name: 'count',
//                         default : 12,
//                         label: 'How much ?',
//                         classes: ['col-3'],  
//                         cLogic: [
//                             {
//                                 path: 'select',
//                                 value: 'drink',
//                                 compare: '==',
//                                 relation: 'and'
//                             },
//                             {
//                                 path: 'g1--mword',
//                                 value: 'please',
//                                 compare: '==',
//                                 relation: 'or'
//                             },

//                         ]
//                     },
//                 ]
//             }    
//         }    
//     }
// }
